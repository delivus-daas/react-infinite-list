import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const packageJson = require('./package.json');

export default [{
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            name: 'react-lib'
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        resolve(),
        json({
            compact: true
        }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        terser(),
        postcss({
            plugins: [autoprefixer()],
            modules: {
                scopeBehaviour: 'global',
            },
            sourceMap: true,
            extract: true,
        }) //새로 추가
    ]
    },

    {    //새로 추가
        input: 'dist/esm/types/index.d.ts', //새로 추가
        output: [{ file: 'dist/index.d.ts', format: "esm" }], //새로 추가
        external: [/\.css$/],//새로 추가
        plugins: [dts()],//새로 추가
    }]
