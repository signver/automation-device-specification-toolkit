export class AMSNetID {
    private static readonly octetPattern = /^(2[5][0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/
    private static readonly validPattern = /^(2[5][0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?:\.(2[5][0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){5}$/
    private byteID: number[]

    public constructor() {
        this.byteID = new Array(6).fill(0)
    }

    public static validate(s?: string | null) {
        if (typeof s === 'string') {
            return AMSNetID.validPattern.test(s)
        }
        return false
    }

    public static parse(s?: string | null) {
        if (s && AMSNetID.validate(s)) return new AMSNetID().assign(s)
        throw new Error(/**@todo */)
    }

    public octet(): number[]
    public octet(n: number): number
    public octet(n: string): void
    public octet(n: number, b: number): void
    public octet(n: number, b: string): void
    public octet(n?: number | string, b?: number | string) {
        if (typeof n === 'string') {
            if (!AMSNetID.validate(n)) throw new Error(/**@todo */)
            this.assign(n)
            return 
        }
        if (typeof n !== 'number') {
            return [...this.byteID]
        }
        if (n < 0 || n >= this.byteID.length) throw new Error(/**@todo */)
        if (typeof b === 'number') {
            const rounded = Math.round(b)
            if (rounded < 0 || rounded > 255) throw new Error(/**@todo */)
            this.byteID[n] = rounded
        }
        if (typeof b === 'string') {
            if (AMSNetID.octetPattern.test(b)) throw new Error(/**@todo */)
            this.byteID[n] = parseInt(b)
        }
        return this.byteID[n]
    }

    public assign(s: string) {
        this.byteID = s.split('.').map(
            (sb, i) => parseInt(sb)
        )
        return this
    }

}