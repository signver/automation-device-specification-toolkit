import { ADSReadRequest, AMSPacket } from '@signver/ams-core'
import { ReadRequestStage, RequestStage } from '../common'
import requestWorkflow from './request'

type AMSReadRequestPacket = AMSPacket<ADSReadRequest>

let message: AMSPacket | AMSReadRequestPacket
let workflow: RequestStage
let readflow: ReadRequestStage
function initialize(data?: boolean) {
  message = {
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
  if (data) (message as AMSPacket<ADSReadRequest>).data = {
    indexGroup: 0,
    indexOffset: 0,
    length: 0,
  }
  workflow = requestWorkflow(message)
  readflow = workflow.read
}

beforeAll(() => {
  initialize()
})
describe("read", () => {
  describe("initialization", () => {
    it("should set packet base size", () => {
      const sizeWithoutData = 4 + 4 + 4
      expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData)
      expect(message.header.length).toStrictEqual(sizeWithoutData)
    })

    it("should append data structure to message", () => {
      expect(message).toHaveProperty("data.indexGroup")
      expect(message).toHaveProperty("data.indexOffset")
      expect(message).toHaveProperty("data.length")
    })

  })

  describe("workflow", () => {
    it("should set index group", () => {
      const input = 0xff
      expect(workflow.read.indexGroup(input).indexGroup()).toStrictEqual(input)
      expect((message as AMSReadRequestPacket).data.indexGroup).toStrictEqual(input)
    })

    it("should set index offset", () => {
      const input = 0xfe
      expect(workflow.read.indexOffset(input).indexOffset()).toStrictEqual(input)
      expect((message as AMSReadRequestPacket).data.indexOffset).toStrictEqual(input)
    })

    it("should set index offset", () => {
      const input = 0xfd
      expect(workflow.read.length(input).length()).toStrictEqual(input)
      expect((message as AMSReadRequestPacket).data.length).toStrictEqual(input)
    })

  })

  describe("meta flow", () => {
    it("should set error code", () => {
      const input = 0xff
      expect(workflow.read.errorCode(input).errorCode()).toStrictEqual(input)
      expect(message.header.errorCode).toStrictEqual(input)
    })

    it("should set invoke ID", () => {
      const input = 0xfe
      expect(workflow.read.invokeID(input).invokeID()).toStrictEqual(input)
      expect(message.header.invokeID).toStrictEqual(input)
    })

    it("should set chainable", () => {
      const input = [0xff, 0xfe]
      const stage = workflow.read.errorCode(input[0]).invokeID(input[1])
      expect(stage.errorCode()).toStrictEqual(input[0])
      expect(stage.invokeID()).toStrictEqual(input[1])
      expect(message.header.errorCode).toStrictEqual(input[0])
      expect(message.header.invokeID).toStrictEqual(input[1])
    })

  })

})