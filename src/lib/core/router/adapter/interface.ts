import { NetworkProtocol } from "./types";

export abstract class NetworkAdapter {
  public abstract get protocol(): NetworkProtocol
  
  public abstract isValidAddress(addr: string): boolean;
  public abstract dispatch(message: Buffer): void;
  public abstract onMessage(message: Buffer): void;
}
