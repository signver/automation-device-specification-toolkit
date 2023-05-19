import { rangeOfUint16 } from '@signver/assert/numbers'
import { AMSNetID } from './ams-net-id'

export class AMSNetAddress extends AMSNetID {
    private amsNetPort: number

    public constructor() {
        super()
        this.amsNetPort = 0
    }

    public static clone(adr: AMSNetAddress) {
        return new AMSNetAddress().octet(adr.octet().join('.')).port(adr.port())
    }

    public port(): number
    public port(n: number): AMSNetAddress
    public port(n?: number) {
        if (typeof n === 'number') {
            this.amsNetPort = rangeOfUint16(n)
            return this as AMSNetAddress
        }
        return this.amsNetPort
    }

    public override octet(): number[]
    public override octet(n: number): number
    public override octet(n: string): AMSNetAddress
    public override octet(n: number, b: number): AMSNetAddress
    public override octet(n: number, b: string): AMSNetAddress
    public override octet(n?: string | number, b?: string | number): number | AMSNetAddress | number[] {
        return (super.octet as any)(n, b)
    }

}