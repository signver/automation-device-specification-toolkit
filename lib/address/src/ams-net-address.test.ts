import { AMSNetAddress } from './ams-net-address'

describe("AMSNetAddress", () => {
    it("should set the port within the range", () => {
        const addr = new AMSNetAddress()
        expect(() => {
            addr.port(-1)
        }).toThrow()
        expect(() => {
            addr.port(0xffff + 1)
        }).toThrow()
        addr.port(100)
        expect(addr.port()).toStrictEqual(100)
    })

    it("should return self", () => {
        const addr = new AMSNetAddress()
        expect(addr.octet('192.168.0.1.1.1')).toStrictEqual(addr)
        expect(addr.port(100)).toStrictEqual(addr)
    })

    describe(".clone", () => {
        it("should return new instance", () => {
            const addr = new AMSNetAddress().octet('192.168.0.1.1.1').port(100)
            expect(AMSNetAddress.clone(addr) === addr).toStrictEqual(false)
        })

        it("should have the same valuse", () => {
            const addr = new AMSNetAddress().octet('192.168.0.1.1.1').port(100)
            const clone = AMSNetAddress.clone(addr)
            expect(clone.port()).toStrictEqual(addr.port())
            expect(clone.octet()).toEqual(expect.arrayContaining(addr.octet()))
        })

    })
})