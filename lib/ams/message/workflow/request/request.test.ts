import { AMSPacket, Command } from '@signver/ams-core'
import { RequestStage } from '../common'
import requestWorkflow from './request'

let message: AMSPacket
let worflow: RequestStage

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
  worflow = requestWorkflow(message)
}

describe("request workflow", () => {
  describe("packet size initialization", () => {
    describe("readDeviceInfo", () => {
      beforeAll(() => {
        initialize()
        worflow.readDeviceInfo
      })

      it("should set the command value", () => {
        expect(message.header.command).toStrictEqual(Command.ReadDeviceInfo)
      })

      it("should initialize the packet length", () => {
        expect(message.header.length).toStrictEqual(0)
        expect(message.protocolHeader.length).toStrictEqual(32)
      })

    })

    describe("read", () => {
      beforeAll(() => {
        initialize()
        worflow.read
      })

      it("should set the command value", () => {
        expect(message.header.command).toStrictEqual(Command.Read)
      })

      it("should initialize the packet length", () => {
        const sizeWithoutData = 4 + 4 + 4
        expect(message.header.length).toStrictEqual(sizeWithoutData)
        expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData)
      })

    })

    describe("write", () => {
      beforeAll(() => {
        initialize()
        worflow.write
      })

      it("should set the command value", () => {
        expect(message.header.command).toStrictEqual(Command.Write)
      })

      it("should initialize the packet length", () => {
        const sizeWithoutData = 4 + 4 + 4
        expect(message.header.length).toStrictEqual(sizeWithoutData)
        expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData)
      })

    })

    describe("readState", () => {
      beforeAll(() => {
        initialize()
        worflow.readState
      })

      it("should set the command value", () => {
        expect(message.header.command).toStrictEqual(Command.ReadState)
      })

      it("should initialize the packet length", () => {
        expect(message.header.length).toStrictEqual(0)
        expect(message.protocolHeader.length).toStrictEqual(32)
      })

    })

    describe("writeControl", () => {
      beforeAll(() => {
        initialize()
        worflow.writeControl
      })

      it("should set the command value", () => {
        expect(message.header.command).toStrictEqual(Command.WriteControl)
      })

      it("should initialize the packet length", () => {
        const sizeWithoutData = 2 + 2 + 4
        expect(message.header.length).toStrictEqual(sizeWithoutData)
        expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData)
      })

    })

    describe("readWrite", () => {
      beforeAll(() => {
        initialize()
        worflow.readWrite
      })

      it("should set the command value", () => {
        expect(message.header.command).toStrictEqual(Command.ReadWrite)
      })

      it("should initialize the packet length", () => {
        const sizeWithoutData = 4 + 4 + 4 + 4
        expect(message.header.length).toStrictEqual(sizeWithoutData)
        expect(message.protocolHeader.length).toStrictEqual(32 + sizeWithoutData)
      })

    })
  })

  // Common flow for no-data requests
  describe("meta workflow", () => {
    beforeAll(initialize)

    it("should set errorCode", () => {
      const input = 0xff
      expect(worflow.readDeviceInfo.errorCode(input).errorCode()).toStrictEqual(input)
      expect(message.header.errorCode).toStrictEqual(input)
    })

    it("should set invokeID", () => {
      const input = 0xff
      expect(worflow.readDeviceInfo.invokeID(input).invokeID()).toStrictEqual(input)
      expect(message.header.invokeID).toStrictEqual(input)
    })

  })

})