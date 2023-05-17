class AmsAddress {
    private static readonly pattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{1,2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{1,2}|[1-9]?[0-9])){5}$/
    public static parse(value: string) {
        if (!AmsAddress.pattern.test(value)) throw new Error()
    }
}