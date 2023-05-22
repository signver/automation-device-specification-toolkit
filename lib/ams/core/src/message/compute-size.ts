import { Command, PacketBaseSize } from './enums'
import { ADSAddDeviceNotificationRequest, ADSData, ADSDeleteDeviceNotificationRequest, ADSDeviceNotificationRequest, ADSReadRequest, ADSReadWriteRequest, ADSWriteControlRequest, ADSWriteRequest, AMSPacket } from './types'
import getMessageFormat from './compute-format'

export default (() => {
  const requests = {
    [Command.ReadDeviceInfo]: (data: ADSReadRequest) => PacketBaseSize.Request[Command.ReadDeviceInfo],
    [Command.Read]: (data: ADSReadRequest) => PacketBaseSize.Request[Command.Read],
    [Command.Write]: (data: ADSWriteRequest) => PacketBaseSize.Request[Command.Write] + (data.data?.byteLength ?? 0),
    [Command.ReadState]: () => PacketBaseSize.Request[Command.ReadState],
    [Command.WriteControl]: (data: ADSWriteControlRequest) => PacketBaseSize.Request[Command.WriteControl] + (data.data?.byteLength ?? 0),
    [Command.AddDeviceNotification]: (data: ADSAddDeviceNotificationRequest) => PacketBaseSize.Request[Command.AddDeviceNotification],
    [Command.DeleteDeviceNotification]: (data: ADSDeleteDeviceNotificationRequest) => PacketBaseSize.Request[Command.DeleteDeviceNotification],
    [Command.DeviceNotification]: (data: ADSDeviceNotificationRequest) => PacketBaseSize.Request[Command.WriteControl] + (data.data?.byteLength ?? 0),
    [Command.ReadWrite]: (data: ADSReadWriteRequest) => PacketBaseSize.Request[Command.ReadWrite] + (data.data?.byteLength ?? 0),
  } as {
      [cmd in Command]?: (data: ADSData) => number
    }

  return function computeMessageSize<T>(message: AMSPacket<T>) {
    if (getMessageFormat(message).request) {
      const delegate = requests[message.header.command as keyof typeof requests]
      if (!delegate) throw new Error(/**@todo */)
      return delegate((message as AMSPacket<ADSData>).data)
    }

  }
})()