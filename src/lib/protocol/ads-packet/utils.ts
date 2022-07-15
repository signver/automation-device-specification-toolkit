import { ADSPacket } from './types'
import ADSStateFlag from '../ads-state-flag';

export const isADSResponsePacket = (packet: ADSPacket) => (packet.state & ADSStateFlag.Response) > 0