export type AdsReadDeviceInfoRequestData = void;

export type AdsInvalidRequestData = never;

export type AdsReadRequestData = {
  indexGroup: number;
  indexOffset: number;
  readBytes: number;
};

export type AdsWriteRequestData = {
  indexGroup: number;
  indexOffset: number;
  data?: Buffer;
};

export type AdsReadStateRequestData = void;

export type AdsWriteControlRequestData = {
  state: {
    ads: number;
    device: number;
  };
  data?: Buffer;
};

export enum AdsDeviceNotificationTransmissionMode {}

export type AdsAddDeviceNotificationRequestData = {
  indexGroup: number;
  indexOffset: number;
  bytes: number;
  maxDelay: number;
  transmissionMode: AdsDeviceNotificationTransmissionMode;
  cycleTime: number;
};

export type AdsDeleteDeviceNotificationRequestData = {
  id: number;
};

export type AdsSample = {
  id: number;
  data: Buffer;
};

export type AdsStampHeader = {
  timestamp: number;
  samples: AdsSample[];
};

export type AdsDeviceNotificationRequestData = AdsStampHeader[];

export type AdsReadWriteRequesteData = AdsReadRequestData & AdsWriteRequestData;
