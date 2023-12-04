type AdsResponseResult = {
  result: number;
};

export type AdsReadDeviceInfoResponseData = AdsResponseResult & {
  version: {
    major: number;
    minor: number;
    build: number;
  };
  name: string;
};

export type AdsReadResponseData = AdsResponseResult & {
  data: Buffer;
};

export type AdsWriteResponseData = AdsResponseResult;

export type AdsReadStateResponseData = AdsResponseResult & {
  state: {
    ads: number;
    device: number;
  };
};

export type AdsWriteControlResponseData = AdsResponseResult;

export type AdsAddDeviceNotificationResponseData = AdsResponseResult & {
  id: number;
};

export type AdsDeleteDeviceNotificationRequestData = AdsResponseResult;

export type AdsSample = AdsResponseResult & {
  id: number;
  bytes: number;
  data: Buffer;
};

export type AdsStampHeader = {
  timestamp: number;
  count: number;
  samples: AdsSample[];
};

export type AdsDeviceNotificationRequestData = never;

export type AdsReadWriteResponseData = AdsReadResponseData &
  AdsWriteResponseData;
