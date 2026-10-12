import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation', 'development'],
    },
    {
      type: 'category',
      label: 'Operations',
      items: ['vdeployer', 'releasing'],
    },
    {
      type: 'category',
      label: 'Support',
      items: ['troubleshooting', 'contact'],
    },
  ],
};

export default sidebars;
