import { AmsNetId } from '../protocol';
import { isAmsNetId } from '../utils';
import { NetworkAdapter, NetworkProtocol, NetworkRoute } from './adapter';

export class AmsRouteTable {
  public static readonly ERROR_INVALID_ALIAS = '';
  public static readonly ERROR_INVALID_AMS_NET_ID = '';
  public static readonly ERROR_DUPLILCATE_AMS_NET_ID = '';
  public static readonly ERROR_MISSING_AMS_NET_ID = '';
  public static readonly ERROR_ASSIGNED_TO_SELF = '';

  #lut: {
    netid: {
      [netid: string]: {
        route: string;
        alias?: string;
      };
    };
    alias: {
      [alias: string]: string;
    };
  } = {
    netid: {},
    alias: {},
  };

  constructor(private id: any) {}

  update(id: string, route: string) {
    if (!isAmsNetId(id)) {
      throw new Error(AmsRouter.ERROR_INVALID_AMS_NET_ID);
    }
    this.#lut.netid[id] = { ...this.#lut.netid[id], route };
    return this;
  }

  alias(id: string, name: string) {
    if (!isAmsNetId(id)) throw new Error(AmsRouter.ERROR_INVALID_AMS_NET_ID);
    if (!(id in this.#lut.netid))
      throw new Error(AmsRouter.ERROR_MISSING_AMS_NET_ID);
    if (/^(?:\s.*|.*(?:\s|\n))$/.test(name) || !name)
      throw new Error(AmsRouter.ERROR_INVALID_ALIAS);
    const { alias } = this.#lut.netid[id];
    if (alias) {
      delete this.#lut.alias[alias];
    }
    this.#lut.netid[id].alias = name;
    this.#lut.alias[name] = id;
    return this;
  }

  remove(id: string) {
    if (!(id in this.#lut.netid)) return this;
    const alias = this.#lut.netid[id]?.alias;
    if (alias) {
      delete this.#lut.alias[alias];
    }
    delete this.#lut.netid[id];
    return this;
  }

  lookUp(target: string) {
    const alias = this.#lut.alias[target];
    if (alias) {
      return this.#lut.netid[alias]?.route;
    }
    return this.#lut.netid[target]?.route;
  }
}

interface LookUpTableEventTable {
  remove: (key: string) => void;
}

class LookUpTable<T> {
  #table: { [index: string]: T } = {};

  drop(key: string) {
    delete this.#table[key];
    return this;
  }

  exists(key: string) {
    return key in this.#table;
  }
}

export class RouteTable {


  #splitRoute(route: NetworkRoute) {
    const [protocol, path] = route.split(NETWORK_ROUTE_DELIMITER);
    return [parseInt(protocol), path] as [NetworkProtocol, string];
  }

  constructor(
    private adapters: Readonly<{ [key in NetworkProtocol]: NetworkAdapter }>
  ) {}

  public addRoute(id: AmsNetId, route: NetworkRoute) {
    const [] = this.#splitRoute(route);
  }
}
