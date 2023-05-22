import { ADSReadWriteRequest, AMSPacket } from '@signver/ams-core'
import { injectMetaStage, ReadWriteRequestStage } from "../common"
import { rangeOfUint32 } from '@signver/assert/numbers'

export default function createReadWriteStage(message: AMSPacket<ADSReadWriteRequest>) {
  let stage = {
    indexGroup(n?: number) {
      if (typeof n === 'number') {
        message.data.indexGroup = rangeOfUint32(n)
        return stage
      }
      return message.data.indexGroup
    },
    indexOffset(n?: number) {
      if (typeof n === 'number') {
        message.data.indexOffset = rangeOfUint32(n)
        return stage
      }
      return message.data.indexOffset
    },
    length(n?: number) {
      if (typeof n === 'number') {
        message.data.length = rangeOfUint32(n)
        return stage
      }
      return message.data.length
    },
    data(n?: ArrayBuffer) {
      if (!!n) {
        const original = new DataView(n)
        const clone = new DataView(new ArrayBuffer(n.byteLength))
        for (let i = 0; i < original.byteLength; i++) {
          clone.setUint8(i, original.getUint8(i))
        }
        message.protocolHeader.length = 32 + 16 + original.byteLength
        message.header.length = 16 + original.byteLength
        message.data.data = clone.buffer
        return stage
      }
      // robustness
      /* istanbul ignore next */
      const clone = new DataView(new ArrayBuffer(message.data.data?.byteLength || 0))
      // robustness
      /* istanbul ignore next */
      const original = new DataView(message.data.data || new ArrayBuffer(0))
      for (let i = 0; i < original.byteLength; i++) {
        clone.setUint8(i, original.getUint8(i))
      }
      return clone.buffer
    }
  } as ReadWriteRequestStage
  stage = injectMetaStage(message, stage)
  return stage
}