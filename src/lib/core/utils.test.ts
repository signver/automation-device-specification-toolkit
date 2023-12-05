import { isAmsNetId, serializeAmsNetAddress, tryParseAmsNetId } from './utils';

jest.mock('node:os', () => ({
  endianness: jest.fn().mockReturnValue('LE'),
}));

describe('isAmsNetId', () => {
  describe('string', () => {
    it('should return true if valid', () => {
      expect(isAmsNetId('0.0.0.0.0.0')).toBe(true);
      expect(isAmsNetId('1.1.1.1.1.1')).toBe(true);
      expect(isAmsNetId('99.99.99.99.99.99')).toBe(true);
      expect(isAmsNetId('199.199.199.199.199.199')).toBe(true);
      expect(isAmsNetId('249.249.249.249.249.249')).toBe(true);
      expect(isAmsNetId('255.255.255.255.255.255')).toBe(true);
    });
    it('should return false if missing or extra octet', () => {
      // extra
      expect(isAmsNetId('1.1.1.1.1.1.1')).toBe(false);
      expect(isAmsNetId('1.1.1.1.1.1.')).toBe(false);
      // missing
      expect(isAmsNetId('1.1.1.1.1.')).toBe(false);
      expect(isAmsNetId('1.1.1.1.1')).toBe(false);
    });
    it('should return false if out of range', () => {
      expect(isAmsNetId('1.1.1.1.1.256')).toBe(false);
      expect(isAmsNetId('1.1.1.1.1.300')).toBe(false);
    });
    it('should return false if trailing 0', () => {
      expect(isAmsNetId('1.1.1.1.1.01')).toBe(false);
    });
  });
  describe('array', () => {
    it('should return true if valid', () => {
      expect(isAmsNetId(new Array(6).fill(0))).toBe(true);
      expect(isAmsNetId(new Array(6).fill(255))).toBe(true);
    });
    it('should return false if length is not 6', () => {
      expect(isAmsNetId([1, 1, 1, 1, 1, 1, 1])).toBe(false);
      expect(isAmsNetId([1, 1, 1, 1, 1])).toBe(false);
    });
    it('should return false if out of range', () => {
      expect(isAmsNetId([1, 1, 1, 256, 1, 1])).toBe(false);
      expect(isAmsNetId([1, 1, 1, -1, 1, 1])).toBe(false);
    });
    it('should return false if floating point', () => {
      expect(isAmsNetId([1, 1, 1, 1.1, 1, 1])).toBe(false);
    });
    it('should return false if contains non-numbers', () => {
      const netid = new Array(6).fill(0);
      netid[1] = '2';
      expect(isAmsNetId(netid)).toBe(false);
    });
  });
  describe('else', () => {
    it('should return false', () => {
      expect(isAmsNetId(1)).toBe(false);
      expect(isAmsNetId({})).toBe(false);
      expect(isAmsNetId(() => {})).toBe(false);
    });
  });
});

describe('tryParseAmsNetId', () => {
  it('should return number array if valid', () => {
    expect(tryParseAmsNetId('1.1.1.1.1.1')).toEqual(
      expect.arrayContaining([expect.any(Number)])
    );
  });
  it('should return null if invalid', () => {
    expect(tryParseAmsNetId('1.1.1.1')).toBe(null);
  });
});

describe('serializeAmsNetAddress', () => {
  it('should throw if invalid AMS net ID', () => {
    const addr = {
      id: '0.0.0.0.0.999',
      port: 0,
    };
    expect(() => {
      serializeAmsNetAddress(addr);
    }).toThrow();
  });
  it('should throw if invalid port', () => {
    const addr = {
      id: '0.0.0.0.0.0',
      port: 0,
    };
    expect(() => {
      addr.port = -1;
      serializeAmsNetAddress(addr);
    }).toThrow();
    expect(() => {
      addr.port = 0x1ffff;
      serializeAmsNetAddress(addr);
    }).toThrow();
    expect(() => {
      addr.port = 1.1;
      serializeAmsNetAddress(addr);
    }).toThrow();
  });
  it("should return buffer", () => {
    const addr = {
      id: '1.2.3.4.5.6',
      port: 0xff00,
    };
    const endianness = require("node:os").endianness as jest.Mock
    endianness.mockReturnValue("LE");
    const b1 = serializeAmsNetAddress(addr);
    expect(b1.readUInt8(0)).toBe(1)
    expect(b1.readUInt8(1)).toBe(2)
    expect(b1.readUInt8(2)).toBe(3)
    expect(b1.readUInt8(3)).toBe(4)
    expect(b1.readUInt8(4)).toBe(5)
    expect(b1.readUInt8(5)).toBe(6)
    // endianness test
    expect(b1.readUInt8(6)).toBe(0x00)
    expect(b1.readUInt8(7)).toBe(0xff)
    endianness.mockReturnValue("BE");
    const b2 = serializeAmsNetAddress(addr);
    // endianness test
    expect(b2.readUInt8(6)).toBe(0xff)
    expect(b2.readUInt8(7)).toBe(0x00)
  }) 
});
