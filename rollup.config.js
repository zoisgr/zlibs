import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default [
    {
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
            },
        ]
    },
    {
        input: 'src/react.js',
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            resolve(),
            commonjs(),
        ],
        output: [
            {
                file: 'dist/react.mjs',
                format: 'esm',
            },
        ]
    },
];