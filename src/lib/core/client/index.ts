import { EventEmitter } from 'node:events';
import { AdsCommand } from '../protocol';
import * as RequestProtocol from '../protocol/data.request';

export interface IAdsClientCommand {
  (
    command: AdsCommand.Invalid,
    data: RequestProtocol.AdsInvalidRequestData
  ): void;
  (
    command: AdsCommand.ReadDeviceInfo,
    data: RequestProtocol.AdsReadDeviceInfoRequestData
  ): void;
  (command: AdsCommand.Read, data: RequestProtocol.AdsReadRequestData): void;
  (command: AdsCommand.Write, data: RequestProtocol.AdsWriteRequestData): void;
  (
    command: AdsCommand.ReadState,
    data: RequestProtocol.AdsReadStateRequestData
  ): void;
  (
    command: AdsCommand.WriteControl,
    data: RequestProtocol.AdsWriteControlRequestData
  ): void;
  (
    command: AdsCommand.AddDeviceNotification,
    data: RequestProtocol.AdsAddDeviceNotificationRequestData
  ): void;
  (
    command: AdsCommand.DeleteDeviceNotification,
    data: RequestProtocol.AdsDeleteDeviceNotificationRequestData
  ): void;
  (
    command: AdsCommand.DeviceNotification,
    data: RequestProtocol.AdsDeviceNotificationRequestData
  ): void;
  (
    command: AdsCommand.ReadWrite,
    data: RequestProtocol.AdsReadWriteRequesteData
  ): void;
}

export type AdsClient = {
  from: {
    (): {
      to: {
        send: IAdsClientCommand;
      };
    };
  };
};

export abstract class Client {
  public abstract to(): IAdsClient;
}
