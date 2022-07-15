import { MarshalDirective, marshal } from 'lib/utils';
import { ADSPacket, ADSRequestPacket, ADSResponsePacket } from './types';
import { isADSResponsePacket } from './utils';
import ADSCommand from '../ads-command';

const getBasePacketAllocation = (): [number, MarshalDirective[]] => {
  const AMSTCPHeaderSize = 6;
  const AMSHeaderSize = 32;
  return [
    AMSTCPHeaderSize + AMSHeaderSize,
    [
      {
        accessor: 'tcpLength',
        bytes: 4,
        offset: 2,
        primitive: { float: false, signed: false, string: false },
      },
      { accessor: 'targetNetId', bytes: 6, offset: 6 },
      {
        accessor: 'targetPort',
        bytes: 2,
        offset: 12,
        primitive: { float: false, signed: false, string: false },
      },
      { accessor: 'sourceNetId', bytes: 6, offset: 14 },
      {
        accessor: 'sourcePort',
        bytes: 2,
        offset: 20,
        primitive: { float: false, signed: false, string: false },
      },
      {
        accessor: 'command',
        bytes: 2,
        offset: 22,
        primitive: { float: false, signed: false, string: false },
      },
      {
        accessor: 'state',
        bytes: 2,
        offset: 24,
        primitive: { float: false, signed: false, string: false },
      },
      {
        accessor: 'amsLength',
        bytes: 4,
        offset: 26,
        primitive: { float: false, signed: false, string: false },
      },
      {
        accessor: 'errorCode',
        bytes: 4,
        offset: 30,
        primitive: { float: false, signed: false, string: false },
      },
      {
        accessor: 'invocationId',
        bytes: 4,
        offset: 34,
        primitive: { float: false, signed: false, string: false },
      },
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
          {
            accessor: 'indexGroup',
            bytes: 4,
            offset: baseSize,
            primitive: { float: false, signed: false, string: false },
          },
          {
            accessor: 'indexOffset',
            bytes: 4,
            offset: baseSize + 4,
            primitive: { float: false, signed: false, string: false },
          },
          {
            accessor: 'readLength',
            bytes: 4,
            offset: baseSize + 4 + 4,
            primitive: { float: false, signed: false, string: false },
          },
        ],
      ];
    case ADSCommand.Write:
      return [
        baseSize + 4 + 4 + 4 + packet.data.length,
        [
          ...baseDirectives,
          {
            accessor: 'indexGroup',
            bytes: 4,
            offset: baseSize,
            primitive: { float: false, signed: false, string: false },
          },
          {
            accessor: 'indexOffset',
            bytes: 4,
            offset: baseSize + 4,
            primitive: { float: false, signed: false, string: false },
          },
          {
            accessor: 'writeLength',
            bytes: 4,
            offset: baseSize + 4 + 4,
            primitive: { float: false, signed: false, string: false },
          },
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
          {
            accessor: 'indexGroup',
            bytes: 4,
            offset: baseSize,
            primitive: { float: false, signed: false, string: false },
          },
          {
            accessor: 'indexOffset',
            bytes: 4,
            offset: baseSize + 4,
            primitive: { float: false, signed: false, string: false },
          },
          {
            accessor: 'readLength',
            bytes: 4,
            offset: baseSize + 4 + 4,
            primitive: { float: false, signed: false, string: false },
          },
          {
            accessor: 'writeLength',
            bytes: 4,
            offset: baseSize + 4 + 4 + 4,
            primitive: { float: false, signed: false, string: false },
          },
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

const computeResponseAllocation = (
  packet: ADSResponsePacket
): [number, MarshalDirective[]] => {
  const [baseSize, baseDirectives] = getBasePacketAllocation();
  // TODO
  switch (packet.command) {
    case ADSCommand.Read:
      return [
        baseSize + 4 + 4 + packet.data.length,
        [
          {
            accessor: 'commandError',
            bytes: 4,
            offset: baseSize + 0,
            primitive: { signed: false, float: false, string: false },
          },
          {
            accessor: 'dataLength',
            bytes: 4,
            offset: baseSize + 4,
            primitive: { signed: false, float: false, string: false },
          },
          {
            accessor: 'data',
            bytes: packet.data.length,
            offset: baseSize + 4 + 4,
            primitive: { signed: false, float: false, string: false },
          },
        ],
      ];
    case ADSCommand.ReadWrite:
      return [
        baseSize + 4 + 4 + packet.data.length,
        [
          {
            accessor: 'commandError',
            bytes: 4,
            offset: baseSize + 0,
            primitive: { signed: false, float: false, string: false },
          },
          {
            accessor: 'dataLength',
            bytes: 4,
            offset: baseSize + 4,
            primitive: { signed: false, float: false, string: false },
          },
          {
            accessor: 'data',
            bytes: packet.data.length,
            offset: baseSize + 4 + 4,
          },
        ],
      ];
    case ADSCommand.Write:
      return [
        baseSize + 4,
        [
          {
            accessor: 'commandError',
            bytes: 4,
            offset: baseSize + 0,
            primitive: { signed: false, float: false, string: false },
          },
        ],
      ];
    default:
      return [baseSize, [...baseDirectives]];
  }
};

const computePacketAllocation = (
  packet: ADSPacket
): [number, MarshalDirective[]] =>
  isADSResponsePacket(packet)
    ? computeResponseAllocation(packet as ADSResponsePacket)
    : computeRequestAllocation(packet as ADSRequestPacket);

export const serialize = (packet: ADSPacket) => {
  const [size, directives] = computePacketAllocation(packet);
  return marshal().o2b(packet, Buffer.alloc(size), directives);
};

const deserializeRequest = (buffer: Buffer, packet: ADSPacket) => {
  const [, directives] = computeRequestAllocation(packet as ADSRequestPacket);
  return marshal().b2o(buffer, directives);
};
const deserializeResponse = (buffer: Buffer, packet: ADSPacket) => {
  const [, directives] = computeResponseAllocation(packet as ADSResponsePacket);
  return marshal().b2o(buffer, directives);
};
export const deserialize = (buffer: Buffer) => {
  const [, baseDirectives] = getBasePacketAllocation();
  const packetHeader = marshal().b2o(buffer, baseDirectives) as ADSPacket;
  if (isADSResponsePacket(packetHeader))
    return deserializeResponse(buffer, packetHeader);
  return deserializeRequest(buffer, packetHeader);
};
