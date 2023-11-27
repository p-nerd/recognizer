import { defineConfig } from "vite";

import solid from "vite-plugin-solid";
import tsconfig_paths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [solid(), tsconfig_paths()],
});
