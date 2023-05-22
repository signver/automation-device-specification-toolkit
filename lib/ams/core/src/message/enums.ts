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

const RequestPacketBaseSize = {
  [Command.Invalid]: 0,
  [Command.ReadDeviceInfo]: 0,
  [Command.Read]: 4 + 4 + 4,
  [Command.Write]: 4 + 4 + 4,
  [Command.ReadState]: 0,
  [Command.WriteControl]: 8,
  [Command.AddDeviceNotification]: 32,
  [Command.DeleteDeviceNotification]: 4,
  [Command.DeviceNotification]: 8,
  [Command.ReadWrite]: 4 + 4 + 4 + 4
} as Readonly<{ [cmd in Command]: number }>

export const PacketBaseSize = {
  Request: RequestPacketBaseSize,
  DeviceNotification: {
    TimestampHeader: 12,
    Sample: 8
  }
} as const