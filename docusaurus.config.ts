import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'japj.net',
  tagline: 'Personal blog & docs',
  favicon: 'favicon.ico',

  // Set the production url of your site here
  url: 'https://www.japj.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'japj', // Usually your GitHub org/user name.
  projectName: 'japj.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/japj/japj.github.io/tree/main/',
          showLastUpdateTime: true,
          sidebarCollapsed: false,
        },
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/japj/japj.github.io/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          showLastUpdateTime: true,
          blogSidebarCount: 'ALL',
          blogTitle: 'Blog',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        pages: {
          routeBasePath: 'pages',
          showLastUpdateTime: true,
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'japj.net',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      items: [

        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Create Vocal Learning Tracks',
        },
        {
          to: 'pages/about',
          label: 'About Me',
          position: 'right',
        },
        {
          href: 'https://github.com/japj',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Create Vocal Learning Tracks',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'BlueSky',
              href: 'https://bsky.app/profile/japj.bsky.social',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@japjnl',
            },
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Jeroen Janssen. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true
      }
    }

  } satisfies Preset.ThemeConfig,

  plugins: [
      ["posthog-docusaurus", {
          apiKey: "phc_fBglQXinvEBtnSiSEcg42GwxiWhHk5WWlYtuh2W5dXX",
          appUrl: "https://eu.i.posthog.com",
          enableInDevelopment: false, // optional
          person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
      }],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        blogRouteBasePath: '/',
        docsRouteBasePath: '/docs',
        blogDir: './',
        highlightSearchTermsOnTargetPage: true,


        // For Docs using Chinese, it is recomended to set:
        // language: ["en", "zh"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      }),
    ],
  ],

  markdown: {
    mermaid: true
  },

  // Configuration for faster builds
  future: {
    v4: true,
    experimental_faster: true,
  }
};

export default config;
