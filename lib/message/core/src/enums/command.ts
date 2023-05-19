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