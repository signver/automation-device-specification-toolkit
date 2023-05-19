import { AMSNetAddress } from './ams-net-address'

describe("AMSNetAddress", () => {
    it("should set the port within the range", () => {
        const addr = new AMSNetAddress()
        expect(() => {
            addr.port = -1
        }).not.toThrow()
        expect(addr.port).toStrictEqual(0)
        expect(() => {
            addr.port = 0xffff + 1
        }).not.toThrow()
        expect(addr.port).toStrictEqual(0xffff)
    })
})