import { createAMSMessagePacket } from '@signver/ads-message'

const packet = createAMSMessagePacket()
packet.tcpReqFlag.from('', 0).to('', 0).read.errorCode(0).invokeID(0).dataLength()