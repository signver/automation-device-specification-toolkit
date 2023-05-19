import { between } from './range'

export function rangeOfUint8(value: any) {
    return between(
        value,
        0,
        0xff
    )
}

export function rangeOfUint16(value: any) {
    return between(
        value,
        0,
        0xffff
    )
}

export function rangeOfUint32(value: any) {
    return between(
        value,
        0,
        0xffffffff
    )
}
