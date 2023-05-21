import { amsNetID, fromString } from './address'

describe("amsNetID", () => {
  test("> 6 octet", () => {
    expect(() => {
      amsNetID('0.0.0.0.0.0.0')
    }).toThrow()
  })
  test("< 6 octet", () => {
    expect(() => {
      amsNetID('0.0.0.0.0')
    }).toThrow()
  })
  test("6 octet", () => {
    expect(() => {
      amsNetID('0.0.0.0.0.0')
    }).not.toThrow()
  })
  test("> 255", () => {
    expect(() => {
      amsNetID('0.0.0.0.0.256')
    }).toThrow()
    expect(() => {
      amsNetID('0.0.0.0.0.300')
    }).toThrow()
  })
  test("leading zero", () => {
    expect(() => {
      amsNetID('0.0.0.0.0.01')
    }).toThrow()
  })
})

describe("fromString", () => {
  test("without port", () => {
    expect(() => {
      fromString('0.0.0.0.0.0')
    }).toThrow()
  })
  test("valid", () => {
    expect(
      fromString('192.168.0.1.1.1:100')
    ).toEqual(expect.objectContaining({
      id: '192.168.0.1.1.1',
      port: 100
    }))
  })
})