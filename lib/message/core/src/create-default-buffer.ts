import { BufferStream } from "@signver/buffer-stream";

export function createDefaultBuffer(n: number = 0) {
  return new BufferStream({ size: 38 + Math.max(n, 0), expand: true, increment: 64 })
}