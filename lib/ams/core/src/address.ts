import { integerString, rangeOfUint16 } from "@signver/assert/numbers"

export interface AMSNetAddress {
  id: string,
  port: number
}

export function amsNetID(s: string) {
  if (!/^(2(?:5[0-5]|[0-4][0-9])|1[0-9]{2}|[1-9]?[0-9])(?:\.(2(?:5[0-5]|[0-4][0-9])|1[0-9]{2}|[1-9]?[0-9])){5}$/.test(s))
    throw new Error(/**@todo */)
  return s
}

export function fromString(s: string) {
  const [id, port] = s.split(':')
  return {
    id: amsNetID(id),
    port: rangeOfUint16(parseInt(integerString(port))),
  } as AMSNetAddress
}
