import { between } from './range'

export function integerString(value: string) {
    if (!/^(?:[1-9][0-9]*)?[0-9]$/.test(value)) throw new Error(/**@todo */)
    return value
}

export function rangeOfUint8(value: number) {
    return between(
        value,
        0,
        0xff
    )
}

export function rangeOfUint16(value: number) {
    return between(
        value,
        0,
        0xffff
    )
}

export function rangeOfUint32(value: number) {
    return between(
        value,
        0,
        0xffffffff
    )
}
