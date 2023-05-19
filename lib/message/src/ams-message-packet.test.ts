import { AMSMessagePacket } from './ams-message-packet'
import { Command, Flag } from './constants'

describe("AMSMessagePacket", () => {
    describe(".flags", () => {
        it("should have a default value", () => {
            const packet = new AMSMessagePacket()
            expect(packet.flags).toStrictEqual(Flag.Command)
        })
        it("should toggle the response bit", () => {
            const packet = new AMSMessagePacket()
            expect(packet.resFlag.flags).toStrictEqual(Flag.Command | Flag.Response)
            expect(packet.reqFlag.flags).toStrictEqual(Flag.Command | Flag.Request)
        })
        it("should toggle the udp bit", () => {
            const packet = new AMSMessagePacket()
            expect(packet.udpFlag.flags).toStrictEqual(Flag.Command | Flag.UDP)
            expect(packet.tcpFlag.flags).toStrictEqual(Flag.Command | Flag.TCP)
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
})