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
