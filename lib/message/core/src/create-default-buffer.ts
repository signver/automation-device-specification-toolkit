import { BufferStream } from "@signver/buffer-stream";

export function createDefaultBuffer() {
  return new BufferStream({ size: 38, expand: true, increment: 64 })
}