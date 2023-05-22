import { ADSWriteControlRequest, AMSPacket } from '@signver/ams-core'
import { WriteControlRequestStage, RequestStage } from '../common'
import requestWorkflow from './request'

type AMSRequestPacket = AMSPacket<ADSWriteControlRequest>

let message: AMSPacket | AMSRequestPacket
let workflow: RequestStage
let flow: WriteControlRequestStage
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
  flow = workflow.writeControl
}

beforeAll(() => {
  initialize()
})
describe("writeControl", () => {
  describe("initialization", () => {
    it("should set packet base size", () => {
      const sizeWithoutData = 2 + 2 + 4
      expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData)
      expect(message.header.length).toStrictEqual(sizeWithoutData)
    })

    it("should append data structure to message", () => {
      expect(message).toHaveProperty("data.adsState")
      expect(message).toHaveProperty("data.deviceState")
      expect(message).toHaveProperty("data.data")
    })

  })

  describe("workflow", () => {
    it("should set index group", () => {
      const input = 0xff
      expect(flow.adsState(input).adsState()).toStrictEqual(input)
      expect((message as AMSRequestPacket).data.adsState).toStrictEqual(input)
    })

    it("should set index offset", () => {
      const input = 0xfe
      expect(flow.deviceState(input).deviceState()).toStrictEqual(input)
      expect((message as AMSRequestPacket).data.deviceState).toStrictEqual(input)
    })

    describe("data", () => {
      const input = new DataView(new ArrayBuffer(8))
      beforeAll(() => {
        input.setUint8(4, 0xdc)
        flow.data(input.buffer)
      })

      it("should set data ", () => {
        expect((message as AMSRequestPacket).data).toBeTruthy()
        const data = new DataView(flow.data())
        const msgData = new DataView((message as AMSRequestPacket).data.data as ArrayBuffer)
        expect(data.byteLength).toStrictEqual(input.byteLength)
        expect(msgData.byteLength).toStrictEqual(input.byteLength)
        for (let i = 0; i < data.byteLength; i++) {
          const b = input.getUint8(i)
          expect(data.getUint8(i)).toStrictEqual(b)
          expect(msgData.getUint8(i)).toStrictEqual(b)
        }
      })

      it("should update packet length ", () => {
        const sizeWithoutData = 2 + 2 + 4
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