import { createServer } from 'net';
import createChain from '@signver/handle-chain';
import { ADSCommand, ADSRequestPacket, NetworkPort } from './protocol';

export type ADSContext<StateObject extends {} = any> = {
  readonly response: {
    readonly send: (payload: any) => Promise<void>;
  };
  readonly request: {
    readonly packet: ADSRequestPacket;
    readonly raw: Buffer;
  };
  readonly state: StateObject;
};

const factory = () => {
  const handler = createChain<ADSContext>();
  const server = createServer((socket) => {
    socket.on('data', (data) => {
      // TODO - parse data
      handler.dispatch({
        response: {
          async send() {},
        },
        request: {
          packet: {
            state: 0,
            amsLength: 0,
            command: ADSCommand.Read,
            errorCode: 0,
            indexGroup: 0,
            indexOffset: 0,
            readLength: 0,
            invocationId: 0,
            sourceNetId: Buffer.alloc(6).fill(0),
            sourcePort: 0,
            targetNetId: Buffer.alloc(6).fill(0),
            targetPort: 0,
            tcpLength: 0,
          },
          raw: data,
        },
        state: {},
      });
    });
    socket.on('error', (error) => {
      // TODO
    });
  });
  server.on('error', (error) => {
    // TODO
  });
  server.listen(NetworkPort.TCP);
};
