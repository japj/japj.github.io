import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
    const { colorMode } = useColorMode();

    return (
        <Giscus
            repo="japj/japj.github.io"
            repoId="R_kgDONigtoQ"
            category="Giscus Comments"
            categoryId="DIC_kwDONigtoc4ClkfH"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="1"
            inputPosition="bottom"
            theme={colorMode}
            lang="en"
            loading="lazy"
            />
        );
}
