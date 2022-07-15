import { MarshalDirective, marshal } from 'lib/utils';
import { ADSRequestPacket } from './types'
import ADSCommand from '../ads-command';
import ADSStateFlag from '../ads-state-flag';

const getBasePacketAllocation = (): [number, MarshalDirective[]] => {
  const AMSTCPHeaderSize = 6;
  const AMSHeaderSize = 32;
  return [
    AMSTCPHeaderSize + AMSHeaderSize,
    [
      { accessor: 'tcpLength', bytes: 4, offset: 2 },
      { accessor: 'targetNetId', bytes: 6, offset: 6 },
      { accessor: 'targetPort', bytes: 2, offset: 12 },
      { accessor: 'sourceNetId', bytes: 6, offset: 14 },
      { accessor: 'sourcePort', bytes: 2, offset: 20 },
      { accessor: 'command', bytes: 2, offset: 22 },
      { accessor: 'state', bytes: 2, offset: 24 },
      { accessor: 'amsLength', bytes: 4, offset: 26 },
      { accessor: 'errorCode', bytes: 4, offset: 30 },
      { accessor: 'invocationId', bytes: 4, offset: 34 },
    ],
  ];
};

const computeRequestAllocation = (
  packet: ADSRequestPacket
): [number, MarshalDirective[]] => {
  const [baseSize, baseDirectives] = getBasePacketAllocation();
  switch (packet.command) {
    case ADSCommand.Read:
      return [
        baseSize + 4 + 4 + 4,
        [
          ...baseDirectives,
          { accessor: 'indexGroup', bytes: 4, offset: baseSize },
          { accessor: 'indexOffset', bytes: 4, offset: baseSize + 4 },
          { accessor: 'readLength', bytes: 4, offset: baseSize + 4 + 4 },
        ],
      ];
    case ADSCommand.Write:
      return [
        baseSize + 4 + 4 + 4 + packet.data.length,
        [
          ...baseDirectives,
          { accessor: 'indexGroup', bytes: 4, offset: baseSize },
          { accessor: 'indexOffset', bytes: 4, offset: baseSize + 4 },
          { accessor: 'data.length', bytes: 4, offset: baseSize + 4 + 4 },
          {
            accessor: 'data',
            bytes: packet.data.length,
            offset: baseSize + 4 + 4 + 4,
          },
        ],
      ];
    case ADSCommand.ReadWrite:
      return [
        baseSize + 4 + 4 + 4 + 4 + packet.data.length,
        [
          ...baseDirectives,
          { accessor: 'indexGroup', bytes: 4, offset: baseSize },
          { accessor: 'indexOffset', bytes: 4, offset: baseSize + 4 },
          { accessor: 'readLength', bytes: 4, offset: baseSize + 4 + 4 },
          { accessor: 'data.length', bytes: 4, offset: baseSize + 4 + 4 + 4 },
          {
            accessor: 'data',
            bytes: packet.data.length,
            offset: baseSize + 4 + 4 + 4 + 4,
          },
        ],
      ];
    /** @todo other commands */
    default:
      return [baseSize, [...baseDirectives]];
  }
};

const computePacketAllocation = (
  packet: ADSRequestPacket
): [number, MarshalDirective[]] => {
  const isResponse = (ADSStateFlag.Response & packet.state) > 0;
  // TODO
  if (isResponse) return [0, []];
  return computeRequestAllocation(packet);
};

export const serialize = (packet: ADSRequestPacket) => {
  const [size, directives] = computePacketAllocation(packet);
  return marshal().o2b(packet, Buffer.alloc(size), directives);
};
