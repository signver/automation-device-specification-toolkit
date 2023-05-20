import { amsNetAddress, amsNetID } from './validate'

describe("amsNetID", () => {
  it("should require 6 octet", () => {
    expect(amsNetID('0.0.0.0.0')).toStrictEqual(false)
    expect(amsNetID('0.0.0.0.0.0.0')).toStrictEqual(false)
    expect(amsNetID('255.255.0.0.0.0')).toStrictEqual(true)
  })
})

describe("amsNetAddress", () => {
  it("should require port number", () => {
    expect(amsNetAddress('255.255.0.0.0.0')).toStrictEqual(false)
    expect(amsNetAddress('255.255.0.0.0.0:0')).toStrictEqual(true)
  })
})
