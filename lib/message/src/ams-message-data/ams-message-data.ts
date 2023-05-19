import { DataEvent, Command } from '../constants'

export interface IAMSMessageDataBufferSizeChangedHandler {
    (dataLength: number): void
}

export interface IAMSMessageData<Packet> {
    packet: Packet
    on: {
        (type: DataEvent.BufferSizeChanged, handler: IAMSMessageDataBufferSizeChangedHandler): void
    }
}

export class AMSMessageData<Parent> implements IAMSMessageData<Parent> {
    private link: Parent
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
}