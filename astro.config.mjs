// @ts-check
import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";


// https://astro.build/config
export default defineConfig({
    integrations: [react(), mdx({
            remarkPlugins: [remarkMath], rehypePlugins: [
                [rehypeKatex, {}
                ]
            ]
        }
    ), tailwind()],
});
