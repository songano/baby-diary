import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js 내장 모듈
            'external', // [[npm]]으로 설치한 패키지
            'internal', // 프로젝트 내부 모듈 (경로 별칭 사용)
            'parent', // 상위 디렉토리 모듈
            'sibling', // 동일 디렉토리 모듈
            'index', // 현재 디렉토리의 index 파일
            'object', // object-imports
            'type', // 타입 import
          ],
          pathGroups: [
            // React 관련 패키지를 최상단으로
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'next/**', group: 'builtin', position: 'before' },
            // 별칭 경로 처리 (Next.js의 경우 주로 ~ 또는 @ 사용)
            { pattern: '~/**', group: 'internal' },
            // 스타일 관련 파일을 마지막으로
            { pattern: '*.css', group: 'index', position: 'after' },
            { pattern: '*.scss', group: 'index', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  { ignores: ['**/node_modules/*', '**/out/*', '**/.next/*', 'src/app/globals.css'] },
  {
    languageOptions: {
      // 다양한 환경의 전역 변수를 허용
      globals: {
        ...globals.browser, // 브라우저 환경의 전역 변수(window, document 등)
        ...globals.jest, // Jest 테스트 환경의 전역 변수(describe, Buffer등)
        ...globals.node, // Node.js 환경의 전역 변수(process, Buffer 등)
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 구문 분석을 활성화합니다.
        },
      },
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지
      },
    },
  },
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
