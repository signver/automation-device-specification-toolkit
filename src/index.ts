import {
  ADSCommand,
  ADSRequestPacket,
  ADSStateFlag,
  serialize,
  deserialize,
} from './lib/protocol';

const buffer = serialize({
  command: ADSCommand.Read,
  amsLength: 12,
  commandError: 0,
  indexGroup: 0x1,
  indexOffset: 0x3,
  errorCode: 0x3,
  invocationId: 0x44,
  readLength: 0x33,
  sourceNetId: Buffer.alloc(6).fill(1),
  sourcePort: 0xa,
  targetNetId: Buffer.alloc(6).fill(2),
  targetPort: 0xb,
  state: ADSStateFlag.Request | ADSStateFlag.Command,
  tcpLength: 6 + 32 + 12,
} as ADSRequestPacket);

console.log(deserialize(buffer));
