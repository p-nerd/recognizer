import type { TSample } from "../../../lib/types";
import { For } from "solid-js";

const SampleRow = (p: { name: string; samples: TSample[] }) => {
    return (
        <div class="flex w-full items-center gap-2 rounded bg-zinc-900 p-5">
            <div class="w-[14%] truncate">
                {p.name}
                <br />({p.samples[0].student_id})
            </div>
            <div class="flex w-full flex-wrap items-center gap-2">
                <For each={p.samples}>
                    {sample => (
                        <div class="w-[11.85%] rounded bg-zinc-950 p-1 text-center">
                            <div class="truncate">{sample.label}</div>
                            <img src={`/data/dataset/img/${sample.id}.png`} />
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default SampleRow;
