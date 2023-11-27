import type { TSample } from "../../lib/types.ts";
import { group_by } from "../../lib/utils.ts";
import samples from "../../data/dataset/samples.ts";
import { For } from "solid-js";
import SampleRow from "./components/SampleRow.tsx";

const groups: Record<string, TSample[]> = group_by(samples, "student_id");

const sliced_groups = Object.keys(groups); //.filter((_, i) => i < 100);

const App = () => {
    return (
        <div class="mx-auto flex w-[90%] flex-col items-center gap-2 py-20 text-white">
            <For each={sliced_groups}>
                {key => <SampleRow name={groups[key][0].student_name} samples={groups[key]} />}
            </For>
        </div>
    );
};

export default App;
