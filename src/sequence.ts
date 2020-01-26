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
import {
  PubSubBindings,
  PubSubPublishFn,
  PubSubCallbackFn,
  CallbackObject,
} from 'loopback-pubsub-component';

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
    @inject(PubSubBindings.PUBSUB_PUBLISH_ACTION)
    protected publish: PubSubPublishFn,
    @inject(PubSubBindings.PUBSUB_CALLBACK_ACTION)
    protected checkCallback: PubSubCallbackFn,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async triggerCallback(callback: CallbackObject, result: any) {
    // compose route and payload from CallbackObject with response, request object then ...
    const route = `${callback.path}/${callback.method}`;
    await this.publish(route, result);
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
