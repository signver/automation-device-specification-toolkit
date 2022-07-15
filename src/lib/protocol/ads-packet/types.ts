import { CombineWithPreset } from 'lib/utils';
import ADSCommand from '../ads-command';
import ADSState from '../ads-state';
import ADSTransmissionMode from '../ads-transmission-mode';

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
