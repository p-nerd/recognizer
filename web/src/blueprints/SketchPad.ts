import type { TMouse, TPath } from "../../../lib/draw";

import draw from "../../../lib/draw";

const cal_mouse = (canvas: HTMLCanvasElement, e: MouseEvent): TMouse => {
    const rect = canvas.getBoundingClientRect();
    return [Math.round(e.clientX - rect.left), Math.round(e.clientY - rect.top)];
};

class SketchPad {
    private _canvas: HTMLCanvasElement;
    private _undo_btn: HTMLButtonElement;
    private _ctx: CanvasRenderingContext2D;
    private _paths: TPath[] = [];
    private _is_drawing: boolean = false;

    public paths = () => this._paths;

    public constructor(container_selector: string, size = 400) {
        this._canvas = document.createElement("canvas");
        this._canvas.width = size;
        this._canvas.height = size;
        this._canvas.className = "bg-zinc-900 shadow-lg rounded";

        this._undo_btn = document.createElement("button");
        this._undo_btn.innerText = "UNDO";
        this._undo_btn.className = "rounded disabled:bg-zinc-900/50 disabled:text-white/50 py-2 bg-zinc-900 m-1 px-5";

        const container = document.querySelector(container_selector);
        container?.appendChild(this._canvas);
        container?.appendChild(this._undo_btn);

        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;

        this.reset();
        this.add_event_listeners();
    }

    public reset = () => {
        this._paths = [];
        this._is_drawing = false;
        this.redraw();
    };

    private add_event_listeners = () => {
        this._canvas.onmousedown = e => {
            this._paths.push([cal_mouse(this._canvas, e)]);
            this._is_drawing = true;
        };
        this._canvas.onmousemove = e => {
            if (this._is_drawing) {
                const last_path = this._paths[this._paths.length - 1];
                last_path.push(cal_mouse(this._canvas, e));
                this.redraw();
            }
        };
        document.onmouseup = () => {
            this._is_drawing = false;
        };
        this._canvas.ontouchstart = e => {
            const loc = e.touches[0];
            // @ts-ignore
            this._canvas.onmousedown(loc);
        };
        this._canvas.ontouchmove = e => {
            const loc = e.touches[0];
            // @ts-ignore
            this._canvas.onmousemove(loc);
        };
        document.ontouchend = e => {
            const loc = e.touches[0];
            // @ts-ignore
            document.onmouseup(loc);
        };

        this._undo_btn.onclick = () => {
            this._paths.pop();
            this.redraw();
        };
    };

    private redraw = () => {
        this._ctx?.clearRect(0, 0, this._canvas.width, this._canvas.height);
        draw.paths(this._ctx, this._paths);
        this._undo_btn.disabled = this._paths.length <= 0;
    };
}

export default SketchPad;
