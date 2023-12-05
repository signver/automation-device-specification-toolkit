import { Socket, connect, isIPv4 } from 'node:net';
import { NetworkAdapter, NetworkMessageHandler } from './interface';
import { NetworkProtocol } from './types';

type QueueAction = {
  (): Promise<void>;
};

export class TcpAdapter extends NetworkAdapter {
  public constructor(private readonly port: number) {
    super();
  }

  public get protocol(): NetworkProtocol {
    return NetworkProtocol.tcpIpv4;
  }

  public isValidAddress(addr: string): boolean {
    return isIPv4(addr);
  }

  public async dispatch(addr: string, message: Buffer): Promise<void> {
    const socket = connect(this.port, addr);
    return new Promise((resolve, reject) => {
      socket.write(message, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      });
      socket.on(
        "data",
        (data) => {
            resolve()
        }
      )
    });
  }

  public onMessage(action: NetworkMessageHandler): void {
    throw new Error('Method not implemented.');
  }
}
