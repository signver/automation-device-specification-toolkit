import * as obj from './object'

export type MarshalDirective = {
  accessor: string;
  bytes: number;
  offset: number;
  primitive?: Partial<{
    float: boolean;
    signed: boolean;
  }>;
};

export default ({
  bigEndian = false,
  nullTerminatedStrings = false,
}: {
  bigEndian?: boolean;
  nullTerminatedStrings?: boolean;
}) => ({
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
            nullTerminatedStrings && buffer.writeUInt8(0, directive.offset + value.length);
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
});
