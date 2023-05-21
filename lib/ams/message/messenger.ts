import { AMSPacket, amsNetID, fromString, MessageFlag } from "@signver/ams-core";
import { rangeOfUint16 } from "@signver/assert/numbers";

export type ScribleOptions = {
  protocol: 'udp' | 'tcp'
}

export default (() => {
  const initializeFlag = {
    tcp: (current: number) => current & (0xffff ^ MessageFlag.UDP),
    udp: (current: number) => current | MessageFlag.UDP,
  }
  return function scrible() {
    const message: AMSPacket = {
      header: {
        command: 0,
        destination: {
          id: amsNetID('0.0.0.0.0.0'),
          port: rangeOfUint16(0)
        },
        errorCode: 0,
        flags: MessageFlag.Command,
        invokeID: 0,
        length: 0,
        source: {
          id: amsNetID('0.0.0.0.0.0'),
          port: rangeOfUint16(0)
        }
      },
      protocolHeader: {
        length: 0
      }
    }
    const wf = {
      from(f: string) {
        message.header.source = fromString(f)
        return message
      }
    }
    return new Proxy(
      {
        tcp: wf,
        udp: wf,
        ...wf
      },
      {
        get(target, p) {
          const handler = initializeFlag[p as keyof typeof initializeFlag]
          if (handler) {
            message.header.flags = handler(message.header.flags)
          }
          return target[p as keyof typeof target]
        }
      }
    )
  }
})()
