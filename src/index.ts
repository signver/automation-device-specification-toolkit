import { AMSMessagePacket } from '@signver/ads-message'

const packet = new AMSMessagePacket()
packet.tcpReqFlag.from('', 0).to('', 0).read.errorCode(0).invokeID(0).data