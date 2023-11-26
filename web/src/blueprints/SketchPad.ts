import type { TCanvas, TCtx, TButton } from "@/helpers/types";
import type { TMouse, TPath } from "@/helpers/draw";

import draw from "@/helpers/draw";

const cal_mouse = (canvas: TCanvas, e: MouseEvent): TMouse => {
    const rect = canvas.getBoundingClientRect();
    return [Math.round(e.clientX - rect.left), Math.round(e.clientY - rect.top)];
};

class SketchPad {
    private canvas: TCanvas;
    private undo_btn: TButton;
    private ctx: TCtx;
    private paths: TPath[] = [];
    private is_drawing: boolean = false;

    constructor(container_selector: string, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.className = "bg-zinc-900 shadow-lg rounded";

        this.undo_btn = document.createElement("button");
        this.undo_btn.innerText = "UNDO";
        this.undo_btn.className = "py-2 bg-zinc-900 m-1 px-5 rounded disabled:bg-zinc-900/50 disabled:text-white/50";

        const container = document.querySelector(container_selector);
        container?.appendChild(this.canvas);
        container?.appendChild(this.undo_btn);

        this.ctx = this.canvas.getContext("2d") as TCtx;

        this.paths = [];
        this.is_drawing = false;

        this.add_event_listeners();

        this.redraw();
    }

    private add_event_listeners = () => {
        this.canvas.onmousedown = e => {
            this.paths.push([cal_mouse(this.canvas, e)]);
            this.is_drawing = true;
        };
        this.canvas.onmousemove = e => {
            if (this.is_drawing) {
                const last_path = this.paths[this.paths.length - 1];
                last_path.push(cal_mouse(this.canvas, e));
                this.redraw();
            }
        };
        this.canvas.onmouseup = () => {
            this.is_drawing = false;
        };
        this.canvas.ontouchstart = e => {
            const loc = e.touches[0];
            // @ts-ignore
            this.canvas.onmousedown(loc);
        };
        this.canvas.ontouchmove = e => {
            const loc = e.touches[0];
            // @ts-ignore
            this.canvas.onmousemove(loc);
        };
        this.canvas.ontouchend = e => {
            const loc = e.touches[0];
            // @ts-ignore
            this.canvas.onmouseup(loc);
        };

        this.undo_btn.onclick = () => {
            this.paths.pop();
            this.redraw();
        };
    };

    private redraw = () => {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);
        this.undo_btn.disabled = this.paths.length <= 0;
    };
}

export default SketchPad;
