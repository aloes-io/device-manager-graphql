import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {CacheBindings, CacheCheckFn, CacheSetFn} from 'loopback-api-cache';
import {PubSubBindings, PubSubPublishFn} from 'loopback-pubsub-component';
import {
  CallbackBindings,
  CheckCallbackFn,
  CallbackObject,
  ResolveCallbackFn,
} from 'loopback-callback-component';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(CacheBindings.CACHE_CHECK_ACTION)
    protected checkCache: CacheCheckFn,
    @inject(CacheBindings.CACHE_SET_ACTION) protected setCache: CacheSetFn,
    @inject(CallbackBindings.CALLBACK_CHECK)
    protected checkCallback: CheckCallbackFn,
    @inject(CallbackBindings.CALLBACK_RESOLVE)
    protected resolveCallback: ResolveCallbackFn,
    @inject(PubSubBindings.PUBSUB_PUBLISH) public publish: PubSubPublishFn,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async triggerCallback(callback: CallbackObject, result: any) {
    const {topic, payload} = await this.resolveCallback(callback, result);
    await this.publish(topic, payload);
  }

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);

      const callback = await this.checkCallback(request, response);

      const cache = await this.checkCache(request);
      if (cache) {
        this.send(response, cache.data);
        if (callback) {
          await this.triggerCallback(callback, cache.data);
        }
        return;
      }

      const result = await this.invoke(route, args);
      if (callback) {
        await this.triggerCallback(callback, result);
      }
      this.send(response, result);
      await this.setCache(request, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
