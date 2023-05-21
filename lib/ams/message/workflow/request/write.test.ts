import { ADSWriteRequest, AMSPacket } from '@signver/ams-core'
import { WriteRequestStage, RequestStage } from '../common'
import requestWorkflow from './request'

type AMSReadRequestPacket = AMSPacket<ADSWriteRequest>

let message: AMSPacket | AMSReadRequestPacket
let workflow: RequestStage
let flow: WriteRequestStage
function initialize() {
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
  workflow = requestWorkflow(message)
  flow = workflow.write
}

beforeAll(() => {
  initialize()
})
describe("write", () => {
  describe("initialization", () => {
    it("should set packet base size", () => {
      const sizeWithoutData = 4 + 4 + 4
      expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData)
      expect(message.header.length).toStrictEqual(sizeWithoutData)
    })

    it("should append data structure to message", () => {
      expect(message).toHaveProperty("data.indexGroup")
      expect(message).toHaveProperty("data.indexOffset")
      expect(message).toHaveProperty("data.data")
    })

  })

  describe("workflow", () => {
    it("should set index group", () => {
      const input = 0xff
      expect(flow.indexGroup(input).indexGroup()).toStrictEqual(input)
      expect((message as AMSReadRequestPacket).data.indexGroup).toStrictEqual(input)
    })

    it("should set index offset", () => {
      const input = 0xfe
      expect(flow.indexOffset(input).indexOffset()).toStrictEqual(input)
      expect((message as AMSReadRequestPacket).data.indexOffset).toStrictEqual(input)
    })

    describe("data", () => {
      const input = new DataView(new ArrayBuffer(8))
      beforeAll(() => {
        input.setUint8(4, 0xdc)
        flow.data(input.buffer)
      })

      it("should set data ", () => {
        expect((message as AMSReadRequestPacket).data).toBeTruthy()
        const data = new DataView(flow.data())
        const msgData = new DataView((message as AMSReadRequestPacket).data.data as ArrayBuffer)
        expect(data.byteLength).toStrictEqual(input.byteLength)
        expect(msgData.byteLength).toStrictEqual(input.byteLength)
        for (let i = 0; i < data.byteLength; i++) {
          const b = input.getUint8(i)
          expect(data.getUint8(i)).toStrictEqual(b)
          expect(msgData.getUint8(i)).toStrictEqual(b)
        }
      })

      it("should update packet length ", () => {
        const sizeWithoutData = 4 + 4 + 4
        expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData + input.byteLength)
        expect(message.header.length).toStrictEqual(sizeWithoutData + input.byteLength)
      })

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