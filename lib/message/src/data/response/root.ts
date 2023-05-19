import { ADSDataRoot } from '../root'

export class ADSResponseRoot extends ADSDataRoot {
    private dataReqResult = 0

    constructor() {
        super()
    }

    public requestResult(): number
    public requestResult(set: number): ThisType<ADSResponseRoot>
    public requestResult(set?: number) {
        if (typeof set === 'number') {
            this.dataReqResult = set
            return this
        }
        return this.dataReqResult
    }
}