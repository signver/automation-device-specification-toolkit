import { AMSMessageData, IAMSMessageData } from './ams-message-data'
import { Command, Flag } from './constants'

interface IAMSCommand {
    readDeviceInfo: IAMSMessagePacket
    read: IAMSMessagePacket
    write: IAMSMessagePacket
    readState: IAMSMessagePacket
    writeControl: IAMSMessagePacket
    addDeviceNotification: IAMSMessagePacket
    deleteDeviceNotification: IAMSMessagePacket
    deviceNotification: IAMSMessagePacket
    readWrite: IAMSMessagePacket
}

interface IAMSFlags {
    reqFlag: IAMSMessagePacket
    resFlag: IAMSMessagePacket
    tcpFlag: IAMSMessagePacket
    udpFlag: IAMSMessagePacket
}

interface IAMSMessagePacket extends IAMSCommand, IAMSFlags {}

export class AMSMessagePacket implements IAMSMessagePacket {
    private adsCommand: number = Command.Invalid
    private adsFlags: number = Flag.Command

    // Commands
    public get readDeviceInfo() {
        this.adsCommand = Command.ReadDeviceInfo
        return this
    }
    public get read() {
        this.adsCommand = Command.Read
        return this
    }
    public get write() {
        this.adsCommand = Command.Write
        return this
    }
    public get readState() {
        this.adsCommand = Command.ReadState
        return this
    }
    public get writeControl() {
        this.adsCommand = Command.WriteControl
        return this
    }
    public get addDeviceNotification() {
        this.adsCommand = Command.AddDeviceNotification
        return this
    }
    public get deleteDeviceNotification() {
        this.adsCommand = Command.DeleteDeviceNotification
        return this
    }
    public get deviceNotification() {
        this.adsCommand = Command.DeviceNotification
        return this
    }
    public get readWrite() {
        this.adsCommand = Command.ReadWrite
        return this
    }

    // Flags
    public get flags() {
        return this.adsFlags
    }
    public get reqFlag() {
        this.adsFlags = this.adsFlags & (0xff ^ Flag.Response)
        return this
    }
    public get resFlag() {
        this.adsFlags = this.adsFlags | Flag.Response
        return this
    }
    public get tcpFlag() {
        this.adsFlags = this.adsFlags & (0xff ^ Flag.UDP)
        return this
    }
    public get udpFlag() {
        this.adsFlags = this.adsFlags | Flag.UDP
        return this
    }
}