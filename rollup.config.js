import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'haunted.min.mjs',
            format: 'esm',
            plugins: [terser()]
        },
        {
            file: 'haunted.mjs',
            format: 'esm',
        }
    ],
};