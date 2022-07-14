import { CombineWithPreset, MarshalDirective, marshal } from 'lib/utils';
import ADSCommand from './ads-command';
import ADSState from './ads-state';
import ADSTransmissionMode from './ads-transmission-mode';

export type AMSTCPHeader = {
  tcpLength: number;
};

export type AMSHeader = {
  targetNetId: any;
  targetPort: number;
  sourceNetId: any;
  sourcePort: number;
  command: ADSCommand;
  state: number;
  amsLength: number;
  errorCode: number;
  invocationId: number;
};

export type ADSReadPayload = {
  indexGroup: number;
  indexOffset: number;
  readLength: number;
};
export type ADSReadWritePayload = {
  indexGroup: number;
  indexOffset: number;
  readLength: number;
  data: Buffer;
};
export type ADSWritePayload = {
  indexGroup: number;
  indexOffset: number;
  data: Buffer;
};
export type ADSWriteControlPayload = {
  adsState: ADSState;
  deviceState: number;
  data: Buffer;
};
export type ADSAddDeviceNotificationPayload = {
  indexGroup: number;
  indexOffset: number;
  readLength: number;
  transmissionMode: ADSTransmissionMode;
  maxDelay: number;
  cycleTime: number;
};
export type ADSDeleteDeviceNotificationPayload = {
  handle: number;
};
export type ADSDeviceNotificationPayload = {
  handle: number;
};

export type ADSPacketBase<
  CommandPayload extends {},
  Command extends AMSHeader['command']
> = CombineWithPreset<
  CommandPayload,
  AMSTCPHeader & AMSHeader,
  'command',
  Command
>;
export type ADSReadRequestPacket = ADSPacketBase<
  ADSReadPayload,
  ADSCommand.Read
>;
export type ADSReadDeviceInfoRequestPacket = ADSPacketBase<
  {},
  ADSCommand.ReadDeviceInfo
>;
export type ADSReadStateRequestPacket = ADSPacketBase<{}, ADSCommand.ReadState>;
export type ADSReadWriteRequestPacket = ADSPacketBase<
  ADSReadWritePayload,
  ADSCommand.ReadWrite
>;
export type ADSWriteRequestPacket = ADSPacketBase<
  ADSWritePayload,
  ADSCommand.Write
>;
export type ADSWriteControlRequestPacket = ADSPacketBase<
  ADSWriteControlPayload,
  ADSCommand.WriteControl
>;
export type ADSAddDeviceNotificationRequestPacket = ADSPacketBase<
  ADSAddDeviceNotificationPayload,
  ADSCommand.AddDeviceNotification
>;
export type ADSDeleteNotificationRequestPacket = ADSPacketBase<
  ADSDeleteDeviceNotificationPayload,
  ADSCommand.DeleteDeviceNotification
>;
export type ADSDeviceNotificationRequestPacket = ADSPacketBase<
  ADSDeviceNotificationPayload,
  ADSCommand.DeviceNotification
>;

export type ADSRequestPacket =
  | ADSReadRequestPacket
  | ADSReadDeviceInfoRequestPacket
  | ADSReadStateRequestPacket
  | ADSReadWriteRequestPacket
  | ADSWriteRequestPacket
  | ADSWriteControlRequestPacket
  | ADSAddDeviceNotificationRequestPacket
  | ADSDeleteNotificationRequestPacket
  | ADSDeviceNotificationRequestPacket;

const computeRequestAllocation = (
  packet: ADSRequestPacket
): [number, MarshalDirective[]] => {
  const AMSTCPHeaderSize = 6;
  const AMSHeaderSize = 32;
  const baseSize = AMSTCPHeaderSize + AMSHeaderSize;
  const baseDirectives: MarshalDirective[] = [
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
  ];
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

export const serializeRequest = (packet: ADSRequestPacket) => {
  const [size, directives] = computeRequestAllocation(packet);
  return marshal().o2b(packet, Buffer.alloc(size), directives);
};
