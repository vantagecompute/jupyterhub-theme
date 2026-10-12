import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import {staticDir, getProjectVersion} from '@vantagecompute/docusaurus-theme';

const projectVersion = getProjectVersion();

const config: Config = {
  title: 'jupyterhub-theme',
  tagline: `The Vantage Compute JupyterLab theme (${projectVersion})`,
  favicon: 'img/favicon.ico',

  url: 'https://docs.vantagecompute.ai',
  baseUrl: '/developer/jupyterhub-theme/',
  noIndex: true,

  organizationName: 'vantagecompute',
  projectName: 'jupyterhub-theme',
  deploymentBranch: 'main',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  // The theme renders the navbar and footer itself: this site is a developer
  // spoke, so it gets the developer navbar with these buttons. There is no
  // themeConfig.navbar and no footer here; both belong to the theme.
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@vantagecompute/docusaurus-theme',
      {
        navbarLinks: [
          {label: 'GitHub', url: 'https://github.com/vantagecompute/jupyterhub-theme'},
        ],
      },
    ],
  ],

  staticDirectories: ['static', staticDir],

  presets: [
    [
      'classic',
      {
        docs: {
          path: './docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/vantagecompute/jupyterhub-theme/tree/main/docusaurus/',
        },
        blog: false,
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-llms',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        docsDir: 'docs',
        title: 'jupyterhub-theme Documentation',
        description: 'Documentation for jh-vantage-theme, the Vantage Compute JupyterLab theme.',
        includeBlog: false,
        excludeImports: true,
        removeDuplicateHeadings: true,
        generateMarkdownFiles: true,
        includeOrder: [],
        includeUnmatchedLast: true,
        pathTransformation: {
          ignorePaths: ['docs'],
        },
      },
    ],
  ],

  customFields: {
    projectVersion: projectVersion,
  },

  themeConfig: {
    codeBlock: {
      showCopyButton: true,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['shell-session', 'bash', 'json', 'yaml', 'toml', 'docker'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
  },
};

export default config;
