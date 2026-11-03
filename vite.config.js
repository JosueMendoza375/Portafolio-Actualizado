import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import * as glob from "glob";
import Handlebars from "vite-plugin-handlebars";
import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

const __dirname = import.meta.dirname;
const base_path = process.env.DEPLOY_BASE_URL || "./";

function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob
            .sync("./**/*.html", {
                ignore: ["./dist/**", "./node_modules/**"],
            })
            .map((file) => [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file),
            ])
    );
}

export default defineConfig({
    appType: "mpa",
    base: base_path,
    css: {
        postcss: {
            plugins: [
                purgeCSSPlugin({
                    content: [...Object.values(obtenerHtmlFiles()), "./src/**/*.hbs", "./src/**/*.js"],
                    safelist: ["indicador"],
                }),
            ],
        },
    },
    build: {
        minify: true,
        cssMinify: true,
        rolldownOptions: {
            input: obtenerHtmlFiles(),
        },
    },
    plugins: [
        new Handlebars({
            partialDirectory: "src/components",
        }),
    ],
});
