import type { TSample } from "../../../lib/types.ts";
import { group_by } from "../../../lib/utils.ts";
import { For } from "solid-js";

import samples from "../../../data/dataset/samples.ts";

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

const groups: Record<string, TSample[]> = group_by(samples, "student_id");

const sliced_groups = Object.keys(groups); //.filter((_, i) => i < 100);

export default () => {
    return (
        <div class="mx-auto flex w-[90%] flex-col items-center gap-2 py-20 text-white">
            <For each={sliced_groups}>
                {key => <SampleRow name={groups[key][0].student_name} samples={groups[key]} />}
            </For>
        </div>
    );
};
