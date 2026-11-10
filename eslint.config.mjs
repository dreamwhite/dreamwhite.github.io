import babelParser from '@babel/eslint-parser';
import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: 'module',
        babelOptions: {
          babelrc: false,
          configFile: false,
          parserOpts: {
            plugins: ['typescript', 'jsx'],
          },
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {},
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.flat.recommended.rules,
      ...importPlugin.flatConfigs.recommended.rules,
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      'react/jsx-no-target-blank': 'off',
      'jsx-a11y/alt-text': 'warn',
      'import/no-anonymous-default-export': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'warn',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'node_modules/**',
    'tmp/**',
  ]),
]);
