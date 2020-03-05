import { terser } from 'rollup-plugin-terser';

export default [{
    input: 'src/haunted.js',
    output: [
        {
            file: 'dist/haunted.min.mjs',
            format: 'esm',
            plugins: [terser()]
        },
        {
            file: 'dist/haunted.mjs',
            format: 'esm',
        }
    ],
}];