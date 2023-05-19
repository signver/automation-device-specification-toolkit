import { AMSMessagePacket } from './ams-message-packet'
import { Command, Flag } from './constants'

describe("AMSMessagePacket", () => {
    describe(".flags", () => {
        it("should have a default value", () => {
            const packet = new AMSMessagePacket()
            expect(packet.flags).toStrictEqual(Flag.Command)
        })
        it("should set the bits", () => {
            const packet = new AMSMessagePacket()
            expect(packet.tcpReqFlag.flags).toStrictEqual(Flag.Command | Flag.Request | Flag.TCP)
            expect(packet.tcpResFlag.flags).toStrictEqual(Flag.Command | Flag.Response | Flag.TCP)
            expect(packet.udpReqFlag.flags).toStrictEqual(Flag.Command | Flag.Request | Flag.UDP)
            expect(packet.udpResFlag.flags).toStrictEqual(Flag.Command | Flag.Response | Flag.UDP)
        })
    })
    describe(".command", () => {
        it("should have a default value", () => {
            const packet = new AMSMessagePacket()
            expect(packet.command).toStrictEqual(Command.Invalid)
        })
        it("should be set", () => {
            const packet = new AMSMessagePacket()
            expect(packet.addDeviceNotification.command).toStrictEqual(Command.AddDeviceNotification)
            expect(packet.deleteDeviceNotification.command).toStrictEqual(Command.DeleteDeviceNotification)
            expect(packet.deviceNotification.command).toStrictEqual(Command.DeviceNotification)
            expect(packet.read.command).toStrictEqual(Command.Read)
            expect(packet.readDeviceInfo.command).toStrictEqual(Command.ReadDeviceInfo)
            expect(packet.readState.command).toStrictEqual(Command.ReadState)
            expect(packet.readWrite.command).toStrictEqual(Command.ReadWrite)
            expect(packet.write.command).toStrictEqual(Command.Write)
            expect(packet.writeControl.command).toStrictEqual(Command.WriteControl)
        })
    })
    describe(".from", () => {
        it("should set the from address", () => {
            const packet = new AMSMessagePacket()
            packet.from('192.168.0.1.1.1', 200)
            expect(packet.from().octet()).toEqual(expect.arrayContaining([192, 168, 0, 1, 1, 1]))
            expect(packet.from().port).toStrictEqual(200)
        })
    })
    describe(".to", () => {
        it("should set the from address", () => {
            const packet = new AMSMessagePacket()
            packet.to('192.168.0.1.1.1', 200)
            expect(packet.to().octet()).toEqual(expect.arrayContaining([192, 168, 0, 1, 1, 1]))
            expect(packet.to().port).toStrictEqual(200)
        })
    })
    describe(".dataLength", () => {
        it("should read and write corrent", () => {
            const packet = new AMSMessagePacket()
            packet.dataLength()
            expect(packet.dataLength(900).dataLength()).toStrictEqual(900)
        })
        it("should limit value to uint16", () => {
            const packet = new AMSMessagePacket()
            expect(() => { packet.dataLength(0xffffffff) }).toThrow()
        })
    })
    describe(".errorCode", () => {
        it("should read and write corrent", () => {
            const packet = new AMSMessagePacket()
            packet.errorCode()
            expect(packet.errorCode(900).errorCode()).toStrictEqual(900)
        })
        it("should limit value to uint16", () => {
            const packet = new AMSMessagePacket()
            expect(() => { packet.errorCode(0xffffffff) }).toThrow()
        })
    })
    describe(".invokeID", () => {
        it("should read and write corrent", () => {
            const packet = new AMSMessagePacket()
            packet.invokeID()
            expect(packet.invokeID(900).invokeID()).toStrictEqual(900)
        })
        it("should limit value to uint16", () => {
            const packet = new AMSMessagePacket()
            expect(() => { packet.invokeID(0xffffffff) }).toThrow()
        })
    })
})