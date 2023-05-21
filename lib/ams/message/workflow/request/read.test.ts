import { ADSReadRequest, AMSPacket } from '@signver/ams-core'
import { ReadRequestStage } from '../common'
import readRequestWorkflow from './read'

let message: AMSPacket<ADSReadRequest>
let workflow: ReadRequestStage
function initialPacket(): AMSPacket<ADSReadRequest> {
  return {
    data: {
      indexGroup: 0,
      indexOffset: 0,
      length: 0,
    },
    header: {
      command: 0,
      destination: {
        id: '',
        port: 0
      },
      errorCode: 0,
      flags: 0,
      invokeID: 0,
      length: 0,
      source: {
        id: '',
        port: 0
      }
    },
    protocolHeader: {
      length: 0
    }
  }
}

beforeEach(() => {
  message = initialPacket()
  workflow = readRequestWorkflow(message)
})

describe("readRequestWorkflow", () => {
  describe("indexGroup", () => {
    it("should set", () => {
      const input = 0xffffffff
      workflow.indexGroup(input)
      expect(workflow.indexGroup()).toStrictEqual(input)
      expect(message.data.indexGroup).toStrictEqual(input)
    })
    it("should be limited to uint32 values", () => {
      const input = 0xffffffff01
      expect(() => {
        workflow.indexGroup(input)
      }).toThrow()
    })
  })
  describe("length", () => {
    it("should set", () => {
      const input = 0xff
      workflow.length(input)
      expect(workflow.length()).toStrictEqual(input)
      expect(message.data.length).toStrictEqual(input)
    })
    it("should be limited to uint32 values", () => {
      const input = 0xffffffff01
      expect(() => {
        workflow.length(input)
      }).toThrow()
    })

  })
  describe("indexOffset", () => {
    it("should set", () => {
      const input = 0xffffffff
      workflow.indexOffset(input)
      expect(workflow.indexOffset()).toStrictEqual(input)
      expect(message.data.indexOffset).toStrictEqual(input)
    })
    it("should be limited to uint32 values", () => {
      const input = 0xffffffff01
      expect(() => {
        workflow.indexOffset(input)
      }).toThrow()
    })

  })
  describe("errorCode", () => {
    it("should set", () => {
      const input = 0xffffffff
      workflow.errorCode(input)
      expect(workflow.errorCode()).toStrictEqual(input)
      expect(message.header.errorCode).toStrictEqual(input)
    })
    it("should be limited to uint16 values", () => {
      const input = 0xffffffff01
      expect(() => {
        workflow.errorCode(input)
      }).toThrow()
    })
  })
  describe("invokeID", () => {
    it("should set", () => {
      const input = 0xffffffff
      workflow.invokeID(input)
      expect(workflow.invokeID()).toStrictEqual(input)
      expect(message.header.invokeID).toStrictEqual(input)
    })
    it("should be limited to uint16 values", () => {
      const input = 0xffffffff01
      expect(() => {
        workflow.invokeID(input)
      }).toThrow()
    })
  })
})