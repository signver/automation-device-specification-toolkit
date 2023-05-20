export const {
  amsNetAddress,
  amsNetID,
} = (() => {
  const netid = /^(2(?:5[0-5]|[0-4][0-9])|1[0-9]{2}|[1-9]?[0-9])(?:\.(2(?:5[0-5]|[0-4][0-9])|1[0-9]{2}|[1-9]?[0-9])){5}$/
  const address = /^(2(?:5[0-5]|[0-4][0-9])|1[0-9]{2}|[1-9]?[0-9])(?:\.(2(?:5[0-5]|[0-4][0-9])|1[0-9]{2}|[1-9]?[0-9])){5}:(?:[1-9][0-9]*)?[0-9]$/
  return {
    amsNetID(value: string) {
      return netid.test(value)
    },
    amsNetAddress(value: string) {
      return address.test(value)
    },
  }
})()
