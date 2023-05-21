import { ADSReadRequest, AMSPacket } from '@signver/ams-core'
import { injectMetaStage, ReadRequestStage } from "../common"
import { rangeOfUint32 } from '@signver/assert/numbers'

export default function createReadStage(message: AMSPacket<ADSReadRequest>) {
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
    }
  } as ReadRequestStage
  stage = injectMetaStage(message, stage)
  return stage
}