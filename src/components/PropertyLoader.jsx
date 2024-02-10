import React from "react";
import ContentLoader from "react-content-loader";

const PropertyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={440}
    viewBox="0 0 400 440"
    backgroundColor="#c9c9c9"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="6" y="312" rx="12" ry="12" width="332" height="23" />
    <rect x="5" y="16" rx="12" ry="12" width="395" height="249" />
    <rect x="7" y="344" rx="12" ry="12" width="259" height="23" />
    <rect x="7" y="282" rx="12" ry="12" width="166" height="23" />
    <rect x="8" y="376" rx="12" ry="12" width="85" height="23" />
    <rect x="100" y="377" rx="12" ry="12" width="85" height="23" />
  </ContentLoader>
);

export default PropertyLoader;
