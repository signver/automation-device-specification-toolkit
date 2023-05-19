import { ADSResponseRoot } from './root'

export class ADSReadResponse extends ADSResponseRoot {
    private dataReadLength = 0
    private dataReadBuffer = new ArrayBuffer(0)

    public readLength(): number
    public readLength(set: number): ThisType<ADSReadResponse>
    public readLength(set?: number) {
        if (typeof set === 'number') {
            this.dataReadLength = set
            return this
        }
        return this.dataReadLength
    }

    public readBuffer(): ArrayBuffer
    public readBuffer(set: ArrayBuffer): ThisType<ADSReadResponse>
    public readBuffer(set?: ArrayBuffer) {
        if (!!set) {
            this.dataReadBuffer = set
            return this
        }
        return this.dataReadBuffer
    }
}