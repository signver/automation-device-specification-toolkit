import { ADSCommand, ADSRequestPacket, serialize } from './lib/protocol';

console.log(
  serialize({
    command: ADSCommand.Read,
    amsLength: 12,
    commandError: 0,
    indexGroup: 0x1,
    indexOffset: 0x2,
    errorCode: 0x3,
    invocationId: 0x44,
    readLength: 0x33,
    sourceNetId: Buffer.alloc(6).fill(1),
    sourcePort: 1,
    targetNetId: Buffer.alloc(6).fill(2),
    state: 0,
    targetPort: 2,
    tcpLength: 6 + 32 + 12,
  } as ADSRequestPacket)
);
