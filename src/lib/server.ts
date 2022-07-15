import { createServer, Server, Socket } from 'net';
import createChain from '@signver/handle-chain';
import {
  ADSRequestPacket,
  ADSResponsePacket,
  deserialize,
  isADSResponsePacket,
  NetworkPort,
} from './protocol';
import { serialize } from 'v8';
import { Nullable } from './utils';

export type ADSContext<StateObject extends {} = any> = {
  readonly response: {
    readonly send: (payload: ADSResponsePacket) => Promise<void>;
  };
  readonly request: {
    readonly packet: ADSRequestPacket;
    readonly raw: Buffer;
  };
  readonly state: StateObject;
};

const createADSContext = (
  socket: Socket,
  packet: ADSRequestPacket,
  data: Buffer
): ADSContext => {
  let hasResponded = false;
  const raw = Buffer.alloc(data.length);
  data.copy(raw);
  return {
    response: {
      async send(payload) {
        if (hasResponded) {
          console.warn('');
          return;
        }
        hasResponded = true;
        socket.write(serialize(payload));
      },
    },
    request: {
      packet,
      raw,
    },
    state: {},
  };
};

let server: Nullable<Server> = null;
const handlers = createChain<ADSContext>();
const factory = () => {
  if (!server) {
    server = createServer((socket) => {
      socket.on('data', (data) => {
        const packet = deserialize(data);
        if (!isADSResponsePacket(packet)) {
          const context = createADSContext(
            socket,
            packet as ADSRequestPacket,
            data
          );
          handlers.dispatch(context);
        }
      });
      socket.on('error', (error) => {
        // TODO
      });
    });
    server.on('error', (error) => {
      // TODO
    });
  }
  return {
    listen: (port: number = NetworkPort.TCP, host: string = '0.0.0.0') => {
      server && !server?.listening && server.listen(port, host);
    },
    attach: handlers.attach,
    detach: handlers.detach,
  };
};

export default factory;
