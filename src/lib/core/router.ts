import { AmsNetId } from './protocol';
import { isAmsNetId } from './utils';

export class Router {
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

  add(id: string, route: string) {
    if (!isAmsNetId(id)) {
      throw new Error(Router.ERROR_INVALID_AMS_NET_ID);
    }
    if (id === this.id) {
      throw new Error(Router.ERROR_ASSIGNED_TO_SELF);
    }
    if (id in this.#lut.netid) {
      throw new Error(Router.ERROR_DUPLILCATE_AMS_NET_ID);
    }
    this.#lut.netid[id] = { route };
    return this;
  }

  update(id: string, route: string) {
    if (!isAmsNetId(id)) {
      throw new Error(Router.ERROR_INVALID_AMS_NET_ID);
    }
    if (!(id in this.#lut.netid)) {
      throw new Error(Router.ERROR_MISSING_AMS_NET_ID);
    }
    this.#lut.netid[id].route = route;
    return this;
  }

  alias(id: string, name: string) {
    if (!(id in this.#lut.netid)) {
      throw new Error(Router.ERROR_MISSING_AMS_NET_ID);
    }
    if (/^(?:\s.*|.*\s)$/.test(name)) {
      throw new Error(Router.ERROR_INVALID_ALIAS);
    }
    const alias = this.#lut.netid[id]?.alias;
    if (alias) {
      delete this.#lut.alias[alias];
    }
    this.#lut.netid[id].alias = name;
    this.#lut.alias[name] = id;
    return this;
  }

  remove(id: string) {
    const alias = this.#lut.netid[id]?.alias;
    if (alias) {
      delete this.#lut.alias[alias];
    }
    delete this.#lut.netid[id];
    return this;
  }
}
