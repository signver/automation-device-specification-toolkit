export enum Command {
  Invalid = 0x0,
  ReadDeviceInfo,
  Read,
  Write,
  ReadState,
  WriteControl,
  AddDeviceNotification,
  DeleteDeviceNotification,
  DeviceNotification,
  ReadWrite
}

export enum MessageFlag {
  Response = 0x1,
  Command = 0x4,
  UDP = 0x40,
}
