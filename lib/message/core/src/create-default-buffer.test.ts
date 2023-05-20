import { createDefaultBuffer } from './create-default-buffer'

describe("createDefaultBuffer", () => {
  it("should create an expandable buffer", () => {
    const buf = createDefaultBuffer()
    expect(buf.isExpandable).toStrictEqual(true)
  })
})