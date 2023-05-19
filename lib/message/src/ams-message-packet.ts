import { AMSNetAddress } from '@signver/ams-address'
import { AMSMessageData } from './ams-message-data'
import { AdsPacketDataEvent, Command, Flag } from './constants'

interface IAMSMessagePacket extends IAMSMessageCommand, IAMSMessageFlags, IAMSMessageMeta, IAMSMessageReceiver, IAMSMessageSender {
    data: AMSMessageData<IAMSMessagePacket>
}

interface IAMSMessageMeta {
    dataLength: {
        (): number
        (l: number): IAMSMessagePacket
    }
    errorCode: {
        (): number
        (l: number): IAMSMessagePacket
    }
    invokeID: {
        (): number
        (l: number): IAMSMessagePacket
    }
}

interface IAMSMessageCommand {
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

interface IAMSMessageReceiver {
    to: {
        (): AMSNetAddress
        (n: string, port: number): IAMSMessageCommand
    }
}

interface IAMSMessageSender {
    from: {
        (): AMSNetAddress
        (n: string, port: number): IAMSMessageReceiver
    }
}

interface IAMSMessageFlags {
    tcpReqFlag: IAMSMessageSender
    tcpResFlag: IAMSMessageSender
    udpReqFlag: IAMSMessageSender
    udpResFlag: IAMSMessageSender
}



export class AMSMessagePacket implements IAMSMessageFlags, IAMSMessageSender, IAMSMessageReceiver, IAMSMessageCommand, IAMSMessagePacket {
    private static readonly amsHeaderLength = 32
    private adsCommand: number = Command.Invalid
    private adsFlags: number = Flag.Command
    private adsData: AMSMessageData<IAMSMessagePacket>
    private adsDataLength: number = 0
    private adsErrorCode: number = 0
    private adsInvokeID: number = 0
    private adsFrom = new AMSNetAddress()
    private adsTo = new AMSNetAddress()

    private allowOnlyUint16(n: number) {
        const rounded = Math.round(n)
        if (rounded < 0 || rounded > 0xffff) throw new Error(/**@todo */)
        return rounded
    }

    public constructor() {
        this.adsData = new AMSMessageData(this)
        this.adsData.on(
            AdsPacketDataEvent.BufferSizeChanged, 
            (len) => {
                this.adsDataLength = len + AMSMessagePacket.amsHeaderLength
            }
        )
    }

    public get data() {
        return this.adsData
    }

    // Addressing 
    public from(): AMSNetAddress
    public from(n: string, port: number): IAMSMessageReceiver
    public from(n?: string, port?: number) {
        if (typeof n === 'string' && typeof port === 'number') {
            this.adsFrom.octet(n)
            this.adsFrom.port = port
            return this as IAMSMessageReceiver
        }
        const clone = new AMSNetAddress()
        clone.port = this.adsFrom.port
        clone.octet(this.adsFrom.octet().join('.'))
        return clone
    }

    public to(): AMSNetAddress
    public to(n: string, port: number): IAMSMessageCommand
    public to(n?: string, port?: number) {
        if (typeof n === 'string' && typeof port === 'number') {
            this.adsTo.octet(n)
            this.adsTo.port = port
            return this as IAMSMessageCommand
        }
        const clone = new AMSNetAddress()
        clone.port = this.adsTo.port
        clone.octet(this.adsTo.octet().join('.'))
        return clone
    }

    // Commands
    public get command() {
        return this.adsCommand
    }
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
    public get tcpReqFlag() {
        this.adsFlags = Flag.Command | Flag.Request | Flag.TCP
        return this
    }
    public get tcpResFlag() {
        this.adsFlags = Flag.Command | Flag.Response | Flag.TCP
        return this
    }
    public get udpReqFlag() {
        this.adsFlags = Flag.Command | Flag.Request | Flag.UDP
        return this
    }
    public get udpResFlag() {
        this.adsFlags = Flag.Command | Flag.Response | Flag.UDP
        return this
    }

    // Others
    public dataLength(): number
    public dataLength(l: number): IAMSMessagePacket
    public dataLength(l?: number) {
        if (typeof l === 'number') {
            this.adsDataLength = this.allowOnlyUint16(l)
            return this as IAMSMessagePacket
        }
        return this.adsDataLength
    }
    public errorCode(): number
    public errorCode(n: number): IAMSMessagePacket
    public errorCode(n?: number) {
        if (typeof n === 'number') {
            this.adsErrorCode = this.allowOnlyUint16(n)
            return this as IAMSMessagePacket
        }
        return this.adsErrorCode
    }
    public invokeID(): number
    public invokeID(n: number): IAMSMessagePacket
    public invokeID(n?: number) {
        if (typeof n === 'number') {
            this.adsInvokeID = this.allowOnlyUint16(n)
            return this as IAMSMessagePacket
        }
        return this.adsInvokeID
    }
}
