import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    "introduction",
    {
      type: 'category',
      label: 'Mixing Learning Tracks',
      link: {
        type: 'generated-index',
        title: 'Mixing Learning Tracks',
        description:
          "Let's learn about mixing Vocal Learning Tracks",
        keywords: ['guides'],
      },
      items: [
        'mixing/overview',
        {
          type: 'category',
          label: 'Manual Export Examples',
          link: {
            type: 'generated-index',
            title: 'Manual Export Examples',
            description:
              "Examples of manual exporting mixes from different programs:",
            keywords: ['guides'],
          },
          items: [
            'mixing/manual-export/dorico',
          ]
        },
        {
          type: 'category',
          label: 'DAW Mixing Templates',
          link: {
            type: 'generated-index',
            title: 'Example DAW Mixing Templates',
            description:
              "Examples of DAW Mixing Templates",
            keywords: ['guides'],
          },
          items: [
            'mixing/templates/concept',
            'mixing/templates/satb',
          ]
        }
      ]
    }
  ],
};

export default sidebars;
