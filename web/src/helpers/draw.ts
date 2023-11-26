import type { TCtx } from "@/helpers/types";

export type TMouse = [number, number];
export type TPath = TMouse[];

const draw = {
    path: (ctx: TCtx, path: TPath, color = "white") => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(...path[0]);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(...path[i]);
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    },

    paths: (ctx: TCtx, paths: TPath[], color = "white") => {
        for (const path of paths) {
            draw.path(ctx, path, color);
        }
    },
};

export default draw;
