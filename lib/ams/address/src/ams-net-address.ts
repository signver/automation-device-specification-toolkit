export interface IAMSNetAddress {
  id: string
  port: number
}

export function createAddress(): IAMSNetAddress {
  return {
    id: '',
    port: 0
  }
}