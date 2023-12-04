export enum AdsCommand {
  Invalid,
  ReadDeviceInfo,
  Read,
  Write,
  ReadState,
  WriteControl,
  AddDeviceNotification,
  DeleteDeviceNotification,
  DeviceNotification,
  ReadWrite,
}

export enum AdsState {
  Request,
  Response,
}

export enum AdsTransport {
  Tcp,
  Udp = 0x40,
}

export type AmsNetId = [number, number, number, number, number, number];

export const NULL_ID: AmsNetId = [0, 0, 0, 0, 0, 0];

export type AmsNetAddress = {
  id: AmsNetId;
  port: number;
};

export type AmsNetRoute = {
  id: AmsNetId;
  ipv4: [number, number, number, number];
};

export type AmsHeader = {
  from: AmsNetAddress;
  to: AmsNetAddress;
  command: number;
  state: number;
  size: number;
  error: number;
  invoke: number;
};
