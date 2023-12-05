import { randomUUID } from 'node:crypto';
import { AdsCommand, AmsNetAddress, AmsNetId } from '../protocol';
import { AmsRouter } from '../router/route-table';

export type AdsClientRequest = {
  command: AdsCommand;
  error: number;
  data: Buffer;
};

export type AdsClientContext = {
  serializedAddress: Buffer
  networkAddress: string
};
