import type { TPaths } from "../../lib/draw";

import fs from "node:fs";
import draw from "../../lib/draw";

import { createCanvas } from "canvas";
import { dir } from "../../lib/def";
import { print_progress } from "./utils";

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d") as unknown as CanvasRenderingContext2D;

const file_names = fs.readdirSync(dir.ROW);

type TSample = {
    id: number;
    label: string;
    student_name: string;
    student_id: number;
};

const samples: TSample[] = [];

let id = 1;

type TContent = {
    session: number;
    student: string;
    drawings: Record<string, TPaths>;
};

const generateImageFile = (out_file_path: string, paths: TPaths) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw.paths(ctx, paths);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(out_file_path, buffer);
};

file_names.forEach((fn) => {
    const content = fs.readFileSync(`${dir.ROW}/${fn}`);

    const { session, student, drawings } = JSON.parse(content.toString()) as TContent;

    for (const label in drawings) {
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session,
        });

        const paths: TPaths = drawings[label];

        fs.writeFileSync(`${dir.JSON}/${id}.json`, JSON.stringify(paths));

        generateImageFile(`${dir.IMG}/${id}.png`, paths);

        print_progress(id, file_names.length * 8);

        id++;
    }
});

fs.writeFileSync(dir.SAMPLES, JSON.stringify(samples));
fs.writeFileSync(dir.SAMPLES_TS, `const samples = ${JSON.stringify(samples)};\n\nexport default samples;`);
