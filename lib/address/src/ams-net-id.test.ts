import { AMSNetID } from './ams-net-id'


describe("AMSNetID", () => {
    describe(".validate", () => {
        it("should fail for non-strings", () => {
            expect(AMSNetID.validate(null)).toStrictEqual(false)
            expect(AMSNetID.validate()).toStrictEqual(false)
        })

        it("should only allow 6 octet", () => {
            expect(AMSNetID.validate('0.0.0.0.0.0.0')).toStrictEqual(false)
            expect(AMSNetID.validate('0.0.0.0.0')).toStrictEqual(false)
        })

        it("should only not allow preceding 0", () => {
            expect(AMSNetID.validate('0.0.0.0.0.01')).toStrictEqual(false)
            expect(AMSNetID.validate('0.0.0.0.0.001')).toStrictEqual(false)
        })
    
    })

    describe(".octet", () => {
        it("should set the id from a string", () => {
            const id = new AMSNetID()
            expect(() => {
                id.octet('256.168.0.1.1.1')
            }).toThrow()
            expect(id.octet('192.168.0.1.1.1').octet()).toEqual(expect.arrayContaining([ 192, 168, 0, 1, 1, 1 ]))
        })
    
        it("should limit the range", () => {
            const id = AMSNetID.parse('192.168.0.1.1.1')
            expect(() => {
                id.octet(-1, 100)
            }).toThrow()
            expect(() => {
                id.octet(7, 100)
            }).toThrow()
            expect(() => {
                id.octet(3, -1)
            }).toThrow()
            expect(() => {
                id.octet(3, 256)
            }).toThrow()
            expect(() => {
                id.octet(3, '-1')
            }).toThrow()
            expect(() => {
                id.octet(3, '256')
            }).toThrow()
        })
    
        it("should set an octet in the id", () => {
            const id = AMSNetID.parse('192.168.0.1.1.1')
            expect(id.octet(3, 100).octet(3)).toStrictEqual(100)
            expect(id.octet(3, '200').octet(3)).toStrictEqual(200)
        })
    
    })

})