import { rangeOfUint16, rangeOfUint32, rangeOfUint8 } from '@signver/assert/numbers'
import { Command, DataEvent } from '../constants'

export interface IAMSMessageDataBufferSizeChangedHandler {
    (dataLength: number): void
}

export interface IAMSMessageData<Packet> {
    packet: Packet

    requestResult: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    adsState: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    deviceState: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    majorVersion: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    minorVersion: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    buildVersion: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    deviceName: {
        (): string
        (n: string): IAMSMessageData<Packet>
    }

    notificationHandle: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    indexGroup: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    indexOffset: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    readLength: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    readData: {
        (): ArrayBuffer | null
        (n: ArrayBuffer | null): IAMSMessageData<Packet>
    }

    writeLength: {
        (): number
        (n: number): IAMSMessageData<Packet>
    }

    writeData: {
        (): ArrayBuffer | null
        (n: ArrayBuffer | null): IAMSMessageData<Packet>
    }
}

export type ADSEmptyData<Packet> = Pick<IAMSMessageData<Packet>, 'packet'>
export type ADSGenericData<Packet, K extends Exclude<keyof IAMSMessageData<Packet>, 'packet'>> = ADSEmptyData<Packet> & { [key in K]: IAMSMessageData<Packet>[key] }
export type ADSEmptyResponseData<Packet> = ADSGenericData<Packet, 'requestResult'>
export type ADSGenericResponseData<Packet, K extends Exclude<keyof IAMSMessageData<Packet>, 'packet' | 'requestResult'>> = ADSEmptyResponseData<Packet> & { [key in K]: IAMSMessageData<Packet>[key] }

export type ADSReadDeviceInfoRequestData<Packet> = ADSEmptyData<Packet>
export type ADSReadRequestData<Packet> = ADSGenericData<Packet, 'indexGroup' | 'indexOffset' | 'readLength'>
export type ADSWriteRequestData<Packet> = ADSGenericData<Packet, 'indexGroup' | 'indexOffset' | 'writeLength' | 'writeData'>
export type ADSReadStateRequestData<Packet> = ADSEmptyData<Packet>
export type ADSWriteControlRequestData<Packet> = ADSGenericData<Packet, 'adsState' | 'deviceState' | 'writeLength' | 'writeData'>
/**@todo device notifications */
export type ADSDeleteDeviceNotificationRequestData<Packet> = ADSGenericData<Packet, 'notificationHandle'>
export type ADSReadWriteRequestData<Packet> = ADSGenericData<Packet, 'indexGroup' | 'indexOffset' | 'writeLength' | 'writeData'>

export type ADSReadDeviceInfoResponseData<Packet> = ADSGenericResponseData<Packet, 'majorVersion' | 'minorVersion' | 'buildVersion' | 'deviceName'>
export type ADSReadResponseData<Packet> = ADSGenericResponseData<Packet, 'readLength' | 'readData'>
export type ADSWriteResponseData<Packet> = ADSEmptyResponseData<Packet>
export type ADSReadStateResponseData<Packet> = ADSGenericResponseData<Packet, 'adsState' | 'deviceState'>
export type ADSWriteControlResponseData<Packet> = ADSEmptyResponseData<Packet>
/**@todo device notifications */
export type ADSDeleteDeviceNotificationResponseData<Packet> = ADSEmptyResponseData<Packet>
export type ADSReadWriteResponseData<Packet> = ADSGenericResponseData<Packet, 'readLength' | 'readData'>




export class AMSMessageData<Parent> implements IAMSMessageData<Parent> {
    private link: Parent
    private baseSize = 0
    private dataADSState = 0
    private dataDeviceState = 0
    private dataMajorVersion = 0
    private dataMinorVersion = 0
    private dataBuildVersion = 0
    private dataRequestResult = 0
    private dataDeviceName = ''
    private dataIndexGroup = 0
    private dataIndexOffset = 0
    private dataReadLength = 0
    private dataWriteLength = 0
    private dataReadData: ArrayBuffer | null = null
    private dataWriteData: ArrayBuffer | null = null
    private dataNotificationHandle = 0
    private handle: Partial<{ [key in DataEvent]: Function }> = {}

    public constructor(parent: Parent) {
        this.link = parent
    }

    public get packet() {
        return this.link
    }

    public on(type: DataEvent.BufferSizeChanged, handler: IAMSMessageDataBufferSizeChangedHandler): void
    public on(type: DataEvent, handler: Function) {
        this.handle[type] = handler
        return
    }

    public adsState(): number
    public adsState(n: number): IAMSMessageData<Parent>
    public adsState(n?: number) {
        if (typeof n === 'number') {
            this.dataADSState = rangeOfUint16(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataADSState

    }

    public deviceState(): number
    public deviceState(n: number): IAMSMessageData<Parent>
    public deviceState(n?: number) {
        if (typeof n === 'number') {
            this.dataDeviceState = rangeOfUint16(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataDeviceState
    }

    public majorVersion(): number
    public majorVersion(n: number): IAMSMessageData<Parent>
    public majorVersion(n?: number) {
        if (typeof n === 'number') {
            this.dataMajorVersion = rangeOfUint8(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataMajorVersion
    }

    public minorVersion(): number
    public minorVersion(n: number): IAMSMessageData<Parent>
    public minorVersion(n?: number) {
        if (typeof n === 'number') {
            this.dataMinorVersion = rangeOfUint8(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataMinorVersion
    }

    public buildVersion(): number
    public buildVersion(n: number): IAMSMessageData<Parent>
    public buildVersion(n?: number) {
        if (typeof n === 'number') {
            this.dataBuildVersion = rangeOfUint16(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataBuildVersion
    }

    public requestResult(): number
    public requestResult(n: number): IAMSMessageData<Parent>
    public requestResult(n?: number) {
        if (typeof n === 'number') {
            this.dataRequestResult = rangeOfUint32(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataRequestResult
    }

    public deviceName(): string
    public deviceName(n: string): IAMSMessageData<Parent>
    public deviceName(n?: string) {
        if (typeof n === 'string') {
            this.dataDeviceName = n
            return this as IAMSMessageData<Parent>
        }
        return this.dataDeviceName
    }

    public indexGroup(): number
    public indexGroup(n: number): IAMSMessageData<Parent>
    public indexGroup(n?: number) {
        if (typeof n === 'number') {
            this.dataIndexGroup = rangeOfUint32(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataIndexGroup
    }

    public indexOffset(): number
    public indexOffset(n: number): IAMSMessageData<Parent>
    public indexOffset(n?: number) {
        if (typeof n === 'number') {
            this.dataIndexGroup = rangeOfUint32(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataIndexOffset
    }

    public readLength(): number
    public readLength(n: number): IAMSMessageData<Parent>
    public readLength(n?: number) {
        if (typeof n === 'number') {
            this.dataReadLength = rangeOfUint32(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataReadLength
    }

    public writeLength(): number
    public writeLength(n: number): IAMSMessageData<Parent>
    public writeLength(n?: number) {
        if (typeof n === 'number') {
            this.dataWriteLength = rangeOfUint32(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataWriteLength
    }

    public readData(): ArrayBuffer | null
    public readData(n: ArrayBuffer | null): IAMSMessageData<Parent>
    public readData(n?: ArrayBuffer | null) {
        if (n === null || !!n) {
            this.dataReadData = n
            return this as IAMSMessageData<Parent>
        }
        return this.dataReadData
    }

    public writeData(): ArrayBuffer | null
    public writeData(n: ArrayBuffer | null): IAMSMessageData<Parent>
    public writeData(n?: ArrayBuffer | null) {
        if (n === null || !!n) {
            this.dataWriteData = n
            return this as IAMSMessageData<Parent>
        }
        return this.dataWriteData
    }

    public notificationHandle(): number
    public notificationHandle(n: number): IAMSMessageData<Parent>
    public notificationHandle(n?: number) {
        if (typeof n === 'number') {
            this.dataNotificationHandle = rangeOfUint32(n)
            return this as IAMSMessageData<Parent>
        }
        return this.dataNotificationHandle
    }

}