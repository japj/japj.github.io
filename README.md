# Website

This personal website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Dependencies

I am using the following additional dependencies:

- @cmfcmf/docusaurus-search-local: to have a local search index of the website
- @giscus/react: for allowing comments (using github)
- posthog-docusaurus: for EU friendly web analytics
- @docusaurus/theme-mermaid: for inline rendering of mermaid diagrams
- react-player: for inline youtube video player

### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

