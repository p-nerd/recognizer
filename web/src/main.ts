import "./style.css";
import type { TPath } from "./helpers/draw";
import SketchPad from "@/blueprints/SketchPad";

const advance_button = document.querySelector("#advance-btn") as HTMLButtonElement;
const student_input = document.querySelector("#student") as HTMLInputElement;
const sketch_pad_container = document.querySelector("#sketch-pad-container") as HTMLDivElement;
const instructors_span = document.querySelector("#instructors") as HTMLSpanElement;

const data: {
    student: string;
    session: number;
    drawings: Record<string, TPath[]>;
} = {
    student: "",
    session: new Date().getTime(),
    drawings: {},
};

const sketch_pad = new SketchPad("#sketch-pad-container");

let index = 0;
const labels = ["car", "fish", "house", "tree", "bicycle", "guitar", "pencil", "clock"];

const start = () => {
    if (student_input.value === "") {
        alert("Please type name first");
        return;
    }
    data.student = student_input.value;
    student_input.style.display = "none";
    sketch_pad_container.style.visibility = "visible";

    const label = labels[index];
    instructors_span.innerText = `Please draw a '${label}'`;
    instructors_span.style.display = "inline-block";
    advance_button.innerText = "NEXT";
    advance_button.onclick = next;
};

const next = () => {
    if (sketch_pad.paths().length === 0) {
        alert("Please draw something first!");
        return;
    }
    const label: string = labels[index];
    data.drawings[label] = sketch_pad.paths();
    sketch_pad.reset();

    if (index + 1 !== labels.length) {
        index++;
        const next_label = labels[index];
        instructors_span.innerText = `Please draw a '${next_label}'`;
        return;
    }

    sketch_pad_container.style.visibility = "hidden";
    instructors_span.innerText = "Thank you!";
    advance_button.innerText = "SAVE";
    advance_button.onclick = save;
};

const save = () => {
    advance_button.style.display = "none";
    instructors_span.innerText = "Take your download file and place it alongside the others in the dataset!";
    instructors_span.style.marginLeft = "20px";
    instructors_span.style.marginRight = "20px";

    const a_element = document.createElement("a");
    a_element.setAttribute("href", `data:text/plain;charset=utf-8, ${encodeURIComponent(JSON.stringify(data))}`);

    const filename = `${data.session}.json`;
    a_element.setAttribute("download", filename);

    a_element.style.display = "none";
    document.body.appendChild(a_element);
    a_element.click();
    document.body.removeChild(a_element);
};

advance_button.onclick = start;
