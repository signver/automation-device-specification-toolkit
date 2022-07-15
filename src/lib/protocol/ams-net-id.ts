import { Nullable } from '../utils';

export type AMSNetID = [number, number, number, number, number, number];

export type AMSNetIDString =
  `${number}.${number}.${number}.${number}.${number}.${number}`;

const byteListRequiredLength = 6;

export const amsNetIdFromBuffer = (buffer: Buffer): AMSNetID =>
  new Array(byteListRequiredLength)
    .fill(0)
    .map((initial, i) => buffer?.[i] ?? initial) as AMSNetID;

export const amsNetIdToBuffer = (netId: AMSNetID): Buffer => Buffer.from(netId);

export const parseAMSNetId = (netId: string): Nullable<AMSNetID> => {
  const netIdOctetPattern =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){5}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
  const meetsPatternRequirement = netIdOctetPattern.test(netId);
  if (!meetsPatternRequirement) return null;
  return netId.split('.').map((value) => parseInt(value, 10)) as AMSNetID;
};

export const stringifyAMSNetId = (
  bytes: number[],
  offset = 0
): Nullable<AMSNetIDString> => {
  const slice = bytes.slice(offset, offset + 6);
  const meetsLengthRequirement = slice.length >= byteListRequiredLength;
  const meetsByteRangeRequirement =
    meetsLengthRequirement &&
    slice.reduce((isValid, byte) => isValid && !(byte > 255 || byte < 0), true);
  if (!meetsByteRangeRequirement) return null;
  return (slice as AMSNetID).join('.') as AMSNetIDString;
};
