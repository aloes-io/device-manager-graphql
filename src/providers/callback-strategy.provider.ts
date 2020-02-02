/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-object-injection */
import {inject, Provider, ValueOrPromise} from '@loopback/core';
import {Request, Response} from '@loopback/rest';
import {
  CallbackBindings,
  CallbackStrategy,
  CallbackMetadata,
  CallbackObject,
  isRuntimeExpression,
  resolveTriggerName,
  resolvePayload,
} from 'loopback-callback-component';

export class CallbackStrategyProvider
  implements Provider<CallbackStrategy | undefined> {
  constructor(
    @inject(CallbackBindings.METADATA) private metadata: CallbackMetadata,
  ) {}

  value(): ValueOrPromise<CallbackStrategy | undefined> {
    return {
      checkCallback: async (
        request: Request,
        response: Response,
        options?: Object,
      ) => {
        if (!this.metadata) {
          return Promise.resolve(undefined);
        }

        // console.log(
        //   'CHECK CALLBACK',
        //   this.metadata,
        //   request.path,
        //   request.method,
        //   request.body,
        // );
        // use this.metadata.parent to retrieve Oas path ?
        const callbackObject: CallbackObject = {
          [this.metadata.expression]: {
            [this.metadata.method]: {
              operationId: `${this.metadata.name}`,
              description: `${this.metadata.name} callback`,
              requestBody: request.body,
              parameters: request.params,
              // url: request.url,
              // method: request.method,
              // responses: ResponsesObject,
            },
          },
        };
        return Promise.resolve(callbackObject);
      },

      resolveCallback: async (callback: CallbackObject, result: any) => {
        // console.log('RESOLVE CALLBACK', callback);
        if (!this.metadata) {
          throw new Error(
            'Callback metadata are mandatory to resolve the callback',
          );
        }
        let value = this.metadata.expression;
        const method = this.metadata.method;
        const cbName = this.metadata.name;
        const resolveData = {
          usedPayload: callback[value][method].requestBody ?? {},
          usedParams: callback[value][method].parameters,
          usedRequestOptions: {method},
        };

        // Replace callback expression with appropriate values
        let topic: string;
        if (value.search(/{|}/) === -1) {
          topic = isRuntimeExpression(value)
            ? resolveTriggerName(cbName, value, resolveData, result)
            : value;
        } else {
          const cbParams = value.match(/{([^}]*)}/g) ?? [];
          cbParams.forEach(cbParam => {
            value = value.replace(
              cbParam,
              resolveTriggerName(
                cbName,
                cbParam.substring(1, cbParam.length - 1),
                resolveData,
                result,
              ),
            );
          });
          topic = value;
        }

        // topic = `${process.env.ALOES_CLIENT_ID}/tx/${topic}`
        let payload;
        try {
          payload = resolvePayload(cbName, result, 'object');
        } catch (e) {
          payload = resolvePayload(cbName, result, 'string');
        }
        // const payload = resolvePayload(cbName, result, 'object');
        // console.log('resolved callback', topic, payload);
        return {topic, payload};
      },
    };
  }
}
/* eslint-enable security/detect-object-injection */
/* eslint-enable @typescript-eslint/no-explicit-any */
