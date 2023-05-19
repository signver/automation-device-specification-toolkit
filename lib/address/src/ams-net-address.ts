import { AMSNetID } from './ams-net-id'

export class AMSNetAddress extends AMSNetID {
    private static readonly constrainPortMin = 0
    private static readonly constrainPortMax = 0xffff
    private amsNetPort: number

    public constructor() {
        super()
        this.amsNetPort = 0
    }

    public get port() {
        return this.amsNetPort
    }

    public set port(n: number) {
        this.amsNetPort = Math.max(
            AMSNetAddress.constrainPortMin,
            Math.min(
                AMSNetAddress.constrainPortMax,
                n
            )
        )
    }
}