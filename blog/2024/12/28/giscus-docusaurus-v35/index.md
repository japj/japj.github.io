---
title: Adding Giscus to Docusaurus
authors: japj
tags: [docusaurus]
---

I tried following the instructions from [Alex Fornuto - Adding Comments to Docusaurus Sites](https://alexfornuto.com/blog/2024/04/01/giscus/) 
but ran into some issues (including applying feedback from the comments).

Here is what I had to do to get it working for my (v3.6) Docusaurus:
<!-- truncate -->

1. install @giscus/react: `npm -i @giscus/react`
2. follow instructions from [http://giscus.app](https://giscus.app) to configure giscus for your repository.
3. Add GiscusComponent code
    ```tsx title='src/components/GiscusComponent/index.tsx'
    import React from 'react';
    import Giscus from "@giscus/react";
    import { useColorMode } from '@docusaurus/theme-common';
    
    export default function GiscusComponent() {
        const { colorMode } = useColorMode();
    
        return (
            <Giscus
                repo="repo"
                repoId="id"
                category="Announcements"
                categoryId="id"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={colorMode}
                lang={currentLocale}
                loading="lazy"
                crossorigin="anonymous"
                async
                />
            );
    }
    ```
4. Add BlogPostItem code
    ```tsx title='src/theme/BlogPostItem/index.tsx'
    import React from 'react';
    import BlogPostItem from '@theme-original/BlogPostItem';
    import type BlogPostItemType from '@theme/BlogPostItem';
    import type {WrapperProps} from '@docusaurus/types';
    import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
    import GiscusComponent from '@site/src/components/GiscusComponent';
    
    type Props = WrapperProps<typeof BlogPostItemType>;
    
    export default function BlogPostItemWrapper(props: Props): JSX.Element {
        const { isBlogPostPage } = useBlogPost();
        return (
            <>
                <BlogPostItem {...props} />
                {isBlogPostPage && (
                    <div >
                        <hr />
                        <GiscusComponent />
                    </div>
                )}
            </>
        );
    }
    ```
5. Done

The issues I ran into were related to:
- the `useBlogPost` hook was moved from `@docusaurus/theme-common/internal` to `@docusaurus/plugin-content-blog/client` in [docusaurus v3.5](https://docusaurus.io/blog/releases/3.5#other-changes:~:text=%2310313%3A%20Blog%2Drelated,docs/client.).
- the initial post used "eject-swizzling" on the "BlogPostPage", but in the comments an easier method was described using "wrap-swizzling" on the "BlogPostItem".