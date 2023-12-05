import { endianness } from 'node:os';
import { AmsNetAddress } from './protocol';

export function isAmsNetId(value: any): boolean {
  if (typeof value === 'string') {
    return /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){5}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/.test(
      value
    );
  }
  if (Array.isArray(value)) {
    return (
      value.length === 6 &&
      value.reduce(
        (test, b) =>
          test && typeof b === 'number' && b >= 0 && b <= 255 && b % 1 === 0,
        true
      )
    );
  }
  return false;
}

export function tryParseAmsNetId(str: string) {
  if (!isAmsNetId(str)) {
    return null;
  }
  return str.split('.').map((s) => parseInt(s, 10));
}

export function serializeAmsNetAddress(addr: AmsNetAddress) {
  const { id, port } = addr;
  const b = tryParseAmsNetId(id);
  if (!b)
    throw new Error(serializeAmsNetAddress.ERROR_UNABLE_TO_PARSE_AMS_NET_ID);
  const isFloatingPoint = port % 1 > 0;
  const isRangeOfUint16 = !isFloatingPoint && port >> 16 === 0;
  if (!isRangeOfUint16)
    throw new Error(serializeAmsNetAddress.ERROR_PORT_OUT_OF_RANGE);
  const buffer = Buffer.alloc(8);
  const writePort: {
    [key in ReturnType<typeof endianness>]: { (value: number): void };
  } = {
    BE(value: number) {
      buffer.writeUint16BE(value, 6);
    },
    LE(value: number) {
      buffer.writeUint16LE(value, 6);
    },
  };
  b.forEach((byte, i) => {
    buffer.writeUint8(byte, i);
  });
  writePort[endianness()](port);
  return buffer;
}
serializeAmsNetAddress.ERROR_UNABLE_TO_PARSE_AMS_NET_ID = '';
serializeAmsNetAddress.ERROR_PORT_OUT_OF_RANGE = '';
