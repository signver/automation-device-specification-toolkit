import { AdsCommand } from './protocol'
import * as RequestProtocol from './protocol.request'

class Client {
    constructor(
        private router: any
    ) {}

    to() {}

    send(command: AdsCommand.Invalid, data: RequestProtocol.AdsInvalidRequestData): void;
    send(command: AdsCommand.ReadDeviceInfo, data: RequestProtocol.AdsReadDeviceInfoRequestData): void;
    send(command: AdsCommand.Read, data: RequestProtocol.AdsReadRequestData): void;
    send(command: AdsCommand.Write, data: RequestProtocol.AdsWriteRequestData): void;
    send(command: AdsCommand.ReadState, data: RequestProtocol.AdsReadStateRequestData): void;
    send(command: AdsCommand.WriteControl, data: RequestProtocol.AdsWriteControlRequestData): void;
    send(command: AdsCommand.AddDeviceNotification, data: RequestProtocol.AdsAddDeviceNotificationRequestData): void;
    send(command: AdsCommand.DeleteDeviceNotification, data: RequestProtocol.AdsDeleteDeviceNotificationRequestData): void;
    send(command: AdsCommand.DeviceNotification, data: RequestProtocol.AdsDeviceNotificationRequestData): void;
    send(command: AdsCommand.ReadWrite, data: RequestProtocol.AdsReadWriteRequesteData): void;
    send(command:any, data: any) {
        switch(command) {}
    }
}