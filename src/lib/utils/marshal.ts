import * as obj from './object';

export type MarshalDirective = {
  accessor: string;
  bytes: number;
  offset: number;
  primitive?: {
    float: boolean;
    signed: boolean;
    string: boolean;
  };
};

export default ({
  bigEndian = false,
  nullTerminatedStrings = false,
}: {
  bigEndian?: boolean;
  nullTerminatedStrings?: boolean;
} = {}) => ({
  o2b: <T extends {}>(
    object: T,
    buffer: Buffer,
    directives: MarshalDirective[]
  ) => {
    for (const directive of directives) {
      const value = obj.get(object, directive.accessor);
      if (Buffer.isBuffer(value)) {
        value.copy(buffer, directive.offset ?? 0, directive.offset);
      } else {
        switch (typeof value) {
          case 'string':
            buffer.write(value, directive.offset, 'ascii');
            nullTerminatedStrings &&
              buffer.writeUInt8(0, directive.offset + value.length);
            break;
          case 'bigint':
            if (directive.primitive?.signed) {
              if (bigEndian) buffer.writeBigInt64BE(value, directive.offset);
              else buffer.writeBigInt64LE(value, directive.offset);
              break;
            }
            if (bigEndian) buffer.writeBigUInt64BE(value, directive.offset);
            else buffer.writeBigUInt64LE(value, directive.offset);
            break;
          case 'number':
            switch (directive.bytes) {
              case 1:
                if (directive.primitive?.signed)
                  buffer.writeInt8(value, directive.offset);
                else buffer.writeUInt8(value, directive.offset);
                break;
              case 2:
                if (directive.primitive?.signed) {
                  if (bigEndian) buffer.writeInt16BE(value, directive.offset);
                  else buffer.writeInt16LE(value, directive.offset);
                  break;
                }
                if (bigEndian) buffer.writeUInt16BE(value, directive.offset);
                else buffer.writeUInt16LE(value, directive.offset);
                break;
              case 4:
                if (directive.primitive?.float) {
                  if (bigEndian) buffer.writeFloatBE(value, directive.offset);
                  else buffer.writeFloatLE(value, directive.offset);
                  break;
                }
                if (directive.primitive?.signed) {
                  if (bigEndian) buffer.writeInt32BE(value, directive.offset);
                  else buffer.writeInt32LE(value, directive.offset);
                  break;
                }
                if (bigEndian) buffer.writeUInt32BE(value, directive.offset);
                else buffer.writeUInt32LE(value, directive.offset);
                break;
              case 8:
                if (bigEndian) buffer.writeDoubleBE(value, directive.offset);
                else buffer.writeDoubleLE(value, directive.offset);
                break;
              default:
                break;
            }
          case 'boolean':
            buffer.writeUInt8(value ? 1 : 0, directive.offset);
            break;
          default:
            break;
        }
      }
    }
  },
  b2o: <T extends {} = any>(buffer: Buffer, directives: MarshalDirective[]) => {
    const data = {};
    for (const directive of directives) {
      if (!directive.primitive) {
        obj.set(
          data,
          directive.accessor,
          Buffer.from(buffer, directive.offset, directive.bytes)
        );
        break;
      }
      if (directive.primitive.string) {
        obj.set(
          data,
          directive.accessor,
          buffer.toString(
            'ascii',
            directive.offset,
            directive.offset + directive.bytes + (nullTerminatedStrings ? 1 : 0)
          )
        );
        break;
      }
      if (directive.primitive.float) {
        switch (directive.bytes) {
          case 4:
            obj.set(
              data,
              directive.accessor,
              bigEndian
                ? buffer.readFloatBE(directive.offset)
                : buffer.readFloatLE(directive.offset)
            );
            break;
          case 8:
            obj.set(
              data,
              directive.accessor,
              bigEndian
                ? buffer.readDoubleBE(directive.offset)
                : buffer.readDoubleLE(directive.offset)
            );
            break;
          default:
            break;
        }
        break;
      }
      if (directive.primitive.signed) {
        switch (directive.bytes) {
          case 1:
            obj.set(
              data,
              directive.accessor,
              buffer.readInt8(directive.offset)
            );
            break;
          case 2:
            obj.set(
              data,
              directive.accessor,
              bigEndian
                ? buffer.readInt16BE(directive.offset)
                : buffer.readInt16LE(directive.offset)
            );
            break;
          case 4:
            obj.set(
              data,
              directive.accessor,
              bigEndian
                ? buffer.readInt32BE(directive.offset)
                : buffer.readInt32LE(directive.offset)
            );
            break;
          case 8:
            obj.set(
              data,
              directive.accessor,
              bigEndian
                ? buffer.readBigInt64BE(directive.offset)
                : buffer.readBigInt64LE(directive.offset)
            );
            break;
          default:
            break;
        }
        break;
      }
      switch (directive.bytes) {
        case 1:
          obj.set(
            data,
            directive.accessor,
            buffer.readUInt8(directive.offset)
          );
          break;
        case 2:
          obj.set(
            data,
            directive.accessor,
            bigEndian
              ? buffer.readUInt16BE(directive.offset)
              : buffer.readUInt16LE(directive.offset)
          );
          break;
        case 4:
          obj.set(
            data,
            directive.accessor,
            bigEndian
              ? buffer.readUInt32BE(directive.offset)
              : buffer.readUInt32LE(directive.offset)
          );
          break;
        case 8:
          obj.set(
            data,
            directive.accessor,
            bigEndian
              ? buffer.readBigUInt64BE(directive.offset)
              : buffer.readBigUInt64LE(directive.offset)
          );
          break;
        default:
          break;
      }
    }
    return data as T;
  },
});
