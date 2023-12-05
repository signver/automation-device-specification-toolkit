export enum AdsCommand {
  Invalid,
  ReadDeviceInfo,
  Read,
  Write,
  ReadState,
  WriteControl,
  AddDeviceNotification,
  DeleteDeviceNotification,
  DeviceNotification,
  ReadWrite,
}

export enum AdsState {
  Request,
  Response,
}

export const ADS_COMMAND_FLAG = 0x4;

export enum AdsTransport {
  Tcp,
  Udp = 0x40,
}
