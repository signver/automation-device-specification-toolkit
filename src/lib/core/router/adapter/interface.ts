import { NetworkProtocol } from './types';

export type NetworkMessageHandler = {
  (message: Buffer, meta?: { sender?: string }): void;
};

export abstract class NetworkAdapter {
  public abstract get protocol(): NetworkProtocol;

  public abstract isValidAddress(addr: string): boolean;

  public abstract dispatch(addr: string, message: Buffer): Promise<void>;

  public abstract onMessage(action: NetworkMessageHandler): void;
}
