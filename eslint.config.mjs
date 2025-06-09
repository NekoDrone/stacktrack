import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import pluginQuery from "@tanstack/eslint-plugin-query";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const ignoreConfig = defineConfig([
    globalIgnores([".config/*", ".next/*", "drizzle/*", ".idea/*"]),
]);

const tsEslintConfig = tseslint.config(
    ...compat.extends("next/core-web-vitals").map((config) => ({
        ...config,
        languageOptions: {
            ...config.languageOptions,
            parserOptions: {
                ...config.languageOptions?.parserOptions,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                project: true,
            },
        },
    })),
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            "@typescript-eslint/consistent-type-imports": "error",
        },
    },
    {
        plugins: {
            "@tanstack/query": pluginQuery,
        },
        rules: {
            "@tanstack/query/exhaustive-deps": "error",
        },
    },
    ignoreConfig,
);

export default tsEslintConfig;
