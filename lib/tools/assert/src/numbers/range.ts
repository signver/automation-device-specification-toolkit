export function between(value: any, min: number, max: number) {
    if (max < min) throw new Error(/**@todo */)
    if (value < min) throw new Error(/**@todo */)
    if (value > max) throw new Error(/**@todo */)
    return value
}