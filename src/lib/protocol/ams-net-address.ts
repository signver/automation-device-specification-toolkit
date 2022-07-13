import { Nullable } from 'lib/utils';
import {
  AMSNetID,
  AMSNetIDString,
  parseAMSNetId,
  stringifyAMSNetId,
} from './ams-net-id';

export type AMSNetAddressString = `${AMSNetIDString}:${number}`;
export type AMSNetAddress = {
  netId: AMSNetID;
  port: number;
};

export const parseAMSNetAddress = (
  netAddress: string
): Nullable<AMSNetAddress> => {
  const netAddressOctetPattern =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){5}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]):[0-9]+$/;
  const meetsPatternRequirement = netAddressOctetPattern.test(netAddress);
  if (!meetsPatternRequirement) return null;
  const [netIdString, portString] = netAddress.split(':');
  const netId = parseAMSNetId(netIdString);
  const port = parseInt(portString, 10);
  const meetsValidValueRequirement = netId && !isNaN(port);
  if (!meetsValidValueRequirement) return null;
  return {
    netId,
    port,
  };
};

export const stringifyAMSNetAddress = (address: AMSNetAddress) =>
  `${stringifyAMSNetId(address.netId)}:${address.port}`;
