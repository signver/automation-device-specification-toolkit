export interface ResizeBufferHandler {
    (len: number): void
}

export class ADSDataRoot {
    private resizebufferhandler: ResizeBufferHandler | null = null

    protected handleResizeBuffer(len: number) {
        this.resizebufferhandler?.(len)
    }

    public set onresizebuffer(f: ResizeBufferHandler) {
        this.resizebufferhandler = f
    }
}