export enum NetworkProtocol {
  ipv4,
}

export const NETWORK_ROUTE_DELIMITER = '::';

export type NetworkRoute =
  `${NetworkProtocol}${typeof NETWORK_ROUTE_DELIMITER}${string}`;
