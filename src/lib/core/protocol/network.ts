export type AmsNetId = string;

export const NULL_ID: AmsNetId = '0.0.0.0.0.0';

export type AmsNetAddress = {
  id: AmsNetId;
  port: number;
};

export type AmsNetRoute = {
  ams: AmsNetId;
  ipv4: string;
};
