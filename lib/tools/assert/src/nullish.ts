export function mandatory(value: any) {
    if (typeof value === 'number') return value
    throw new Error(/**@todo */)
}
