import { AMSMessagePacket } from './ams-message-packet'
import { Flag } from './constants'

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
})