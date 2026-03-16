import { useState } from "react";

const LazyImage = ({ src, alt, width, height, className, style, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="lazy-image"
      style={{
        position: "relative",
        width: width || "100%",
        height: height || "100%",
        ...style,
      }}
    >
      {!loaded && <div className="lazy-image__skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`lazy-image__img${loaded ? " lazy-image__img--loaded" : ""}${className ? ` ${className}` : ""}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default LazyImage;
