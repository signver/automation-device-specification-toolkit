export function isAmsNetId(value: any): boolean {
  if (typeof value === 'string') {
    const octets = value.split('.');
    return (
      octets.length === 6 &&
      octets.reduce(
        (test, o) =>
          test && /^(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/.test(o),
        true
      )
    );
  }
  if (Array.isArray(value)) {
    return (
      value.length === 6 &&
      value.reduce(
        (test, b) => test && typeof b === 'number' && b >= 0 && b <= 255,
        true
      )
    );
  }
  return false;
}

export function tryParseAmsNetId(str: string) {
  if (!isAmsNetId(str)) {
    return null;
  }
  return str.split('.').map((s) => parseInt(s, 10));
}
