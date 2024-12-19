declare module "*.svg" {
    import React from "react";
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export { ReactComponent };
    export default string;
  }

declare module "*.png" {
  import React from "react";
    const ReactComponent: React.FunctionComponent<React.PNGProps<PNGPNGElement>>;
    export { ReactComponent };
    export default string;
}