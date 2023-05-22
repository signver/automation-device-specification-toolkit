import { AMSPacket, MessageFlag } from ".";

export default function computeMessageFormat<T>(message: AMSPacket<T>) {
  const response = (message.header.flags & MessageFlag.Response) > 0
  return {
    request: !response,
    response
  }
}
