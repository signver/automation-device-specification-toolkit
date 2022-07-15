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

export type ADSReadRequestPayload = {
  indexGroup: number;
  indexOffset: number;
  readLength: number;
};
export type ADSReadWriteRequestPayload = {
  indexGroup: number;
  indexOffset: number;
  readLength: number;
  writeLength: number;
  data: Buffer;
};
export type ADSWriteRequestPayload = {
  indexGroup: number;
  indexOffset: number;
  writeLength: number;
  data: Buffer;
};
export type ADSWriteControlRequestPayload = {
  adsState: ADSState;
  deviceState: number;
  writeLength: number;
  data: Buffer;
};
export type ADSAddDeviceNotificationRequestPayload = {
  indexGroup: number;
  indexOffset: number;
  readLength: number;
  transmissionMode: ADSTransmissionMode;
  maxDelay: number;
  cycleTime: number;
};
export type ADSDeleteDeviceNotificationRequestPayload = {
  handle: number;
};
export type ADSDeviceNotificationRequestPayload = {
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
  ADSReadRequestPayload,
  ADSCommand.Read
>;
export type ADSReadDeviceInfoRequestPacket = ADSPacketBase<
  {},
  ADSCommand.ReadDeviceInfo
>;
export type ADSReadStateRequestPacket = ADSPacketBase<{}, ADSCommand.ReadState>;
export type ADSReadWriteRequestPacket = ADSPacketBase<
  ADSReadWriteRequestPayload,
  ADSCommand.ReadWrite
>;
export type ADSWriteRequestPacket = ADSPacketBase<
  ADSWriteRequestPayload,
  ADSCommand.Write
>;
export type ADSWriteControlRequestPacket = ADSPacketBase<
  ADSWriteControlRequestPayload,
  ADSCommand.WriteControl
>;
export type ADSAddDeviceNotificationRequestPacket = ADSPacketBase<
  ADSAddDeviceNotificationRequestPayload,
  ADSCommand.AddDeviceNotification
>;
export type ADSDeleteNotificationRequestPacket = ADSPacketBase<
  ADSDeleteDeviceNotificationRequestPayload,
  ADSCommand.DeleteDeviceNotification
>;
export type ADSDeviceNotificationRequestPacket = ADSPacketBase<
  ADSDeviceNotificationRequestPayload,
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

export type ADSReadResponsePayload = {
  commandError: number;
  dataLength: number;
  data: Buffer;
};

export type ADSReadWriteResponsePayload = {
  commandError: number;
  dataLength: number;
  data: Buffer;
};

export type ADSWriteResponsePayload = {
  commandError: number;
};
export type ADSReadResponsePacket = ADSPacketBase<
  ADSReadResponsePayload,
  ADSCommand.Read
>;
export type ADSReadWriteResponsePacket = ADSPacketBase<
  ADSReadWriteResponsePayload,
  ADSCommand.ReadWrite
>;
export type ADSWriteResponsePacket = ADSPacketBase<
  ADSWriteResponsePayload,
  ADSCommand.Write
>;
export type ADSResponsePacket =
  | ADSReadResponsePacket
  | ADSReadWriteResponsePacket
  | ADSWriteResponsePacket;

export type ADSPacket = ADSRequestPacket | ADSReadResponsePacket;
