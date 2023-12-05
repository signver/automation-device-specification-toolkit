import { randomUUID } from 'node:crypto';
import { AdsClientContext } from './context';
import { AdsNetworkAdapter } from '../router/adapter';
import { AmsNetAddress } from '../protocol';
import { AmsRouter } from '../router/route-table';
import { isAmsNetId } from '../utils';

interface IAdsRequest {
  (): void;
}

interface IAdsClientChain {
  to: {
    (target: AmsNetAddress): {
      send: IAdsRequest;
    };
  };
}

export function adsClient(router: AmsRouter, adapter: AdsNetworkAdapter): IAdsClientChain {
  return {
    to(target) {
      const { id, port } = target;
      router.lookUp(id);
      const validPort = port >= 0 && port <= 0xffff;
      const canProceed = isAmsNetId(id) && validPort;
      if (!canProceed) throw new Error();
      const context: AdsClientContext = {
        id: randomUUID(),
        routes: {},
        target: serializeAmsNetAddress(target),
      };
      return send(context);
    },
  };
}

function send(
  context: AdsClientContext
): ReturnType<ReturnType<IAdsClientChain['from']>['to']> {
  return {
    send() {},
  };
}

function to(context: AdsClientContext): ReturnType<IAdsClientChain['to']> {
  return {
    to(target: AmsNetAddress) {
      return send(context);
    },
  };
}
