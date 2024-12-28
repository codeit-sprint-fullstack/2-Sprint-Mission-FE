declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    import React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}