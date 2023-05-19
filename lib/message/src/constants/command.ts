export enum Command {
    Invalid = 0x0,
    ReadDeviceInfo = 0x1,
    Read = 0x2,
    Write = 0x3,
    ReadState = 0x4,
    WriteControl = 0x5,
    AddDeviceNotification = 0x6,
    DeleteDeviceNotification = 0x7,
    DeviceNotification = 0x8,
    ReadWrite = 0x9,
}