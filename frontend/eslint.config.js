import globals from "globals";
import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import tseslint from "typescript-eslint";
import reactPlugin from 'eslint-plugin-react';
import reactHook from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ["dist", "coverage"] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: { ecmaVersion: 2020, globals: globals.browser },
      plugins: {
        ['react']: fixupPluginRules(reactPlugin),
        ['react-hooks']: fixupPluginRules(reactHook),
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...reactHook.configs.recommended.rules,
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': ['off'],
        quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'react/destructuring-assignment': [
          'error',
          'always',
          { destructureInSignature: 'always' },
        ],
        'no-restricted-imports': [
          2,
          {
            name: 'axios',
            message:
              'Imports of axios package is forbidden. Pwease use axios from /serivces-components/axios',
          },
        ],
      },
    },
    eslintConfigPrettier,