import { CombineWithPreset } from 'lib/utils';
import ADSCommand from './ads-command';
import ADSState from './ads-state';
import ADSTransmissionMode from './ads-transmission-mode';

export type AMSTCPHeader = {
  tcpLength: number;
};

export type AMSHeader = {
  targetAddress: any;
  targetPort: number;
  sourceAddress: any;
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
export type ADSReadPacket = ADSPacketBase<ADSReadPayload, ADSCommand.Read>;
export type ADSReadDeviceInfoPacket = ADSPacketBase<{}, ADSCommand.Write>;
export type ADSReadStatePacket = ADSPacketBase<{}, ADSCommand.Write>;
export type ADSReadWritePacket = ADSPacketBase<
  ADSReadWritePayload,
  ADSCommand.ReadWrite
>;
export type ADSWritePacket = ADSPacketBase<ADSWritePayload, ADSCommand.Write>;
export type ADSWriteControlPacket = ADSPacketBase<
  ADSWriteControlPayload,
  ADSCommand.WriteControl
>;
export type ADSAddDeviceNotificationPacket = ADSPacketBase<
  ADSAddDeviceNotificationPayload,
  ADSCommand.AddDeviceNotification
>;
export type ADSDeleteNotificationPacket = ADSPacketBase<
  ADSDeleteDeviceNotificationPayload,
  ADSCommand.DeleteDeviceNotification
>;
export type ADSDeviceNotificationPacket = ADSPacketBase<
  ADSDeviceNotificationPayload,
  ADSCommand.DeviceNotification
>;

export type ADSPacket =
  | ADSReadPacket
  | ADSReadDeviceInfoPacket
  | ADSReadStatePacket
  | ADSReadWritePacket
  | ADSWritePacket
  | ADSWriteControlPacket
  | ADSAddDeviceNotificationPacket
  | ADSDeleteNotificationPacket
  | ADSDeviceNotificationPacket;
