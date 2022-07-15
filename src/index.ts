import {
  ADSCommand,
  ADSRequestPacket,
  ADSStateFlag,
  serialize,
  deserialize,
} from './lib/protocol';

const buffer = serialize({
  tcpLength: 6 + 32 + 12,
  targetNetId: '1.2.4.8.16.32',
  targetPort: 0xb,
  sourceNetId: '1.2.3.4.5.6',
  sourcePort: 0xa,
  command: ADSCommand.Read,
  state: ADSStateFlag.Request | ADSStateFlag.Command,
  amsLength: 12,
  errorCode: 0x3,
  invocationId: 0x44,
  commandError: 0,
  indexGroup: 0x1,
  indexOffset: 0x3,
  readLength: 0x33,
} as ADSRequestPacket);

console.log(deserialize(buffer));
