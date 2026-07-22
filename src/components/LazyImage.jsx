import { useEffect, useRef, useState } from "react";

/**
 * Image that lazy-loads (native `loading="lazy"`) and fades in once it has
 * decoded, so the UI never abruptly pops images in or jumps layout.
 * Parents should reserve space (fixed height / aspect ratio) for zero CLS.
 */
function LazyImage({ src, alt = "", className = "", eager = false, ...rest }) {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        // Avoid calling setState synchronously inside the effect body to
        // prevent cascading renders. Schedule the reset on the next tick.
        const t = setTimeout(() => setLoaded(false), 0);
        const img = ref.current;
        // Cached images can finish loading before React attaches onLoad.
        if (img && img.complete) {
            // If already complete, mark as loaded (also scheduled to avoid sync setState).
            setTimeout(() => setLoaded(true), 0);
        }
        return () => clearTimeout(t);
    }, [src]);

    return (
        <img
            ref={ref}
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                }`}
            {...rest}
        />
    );
}

export default LazyImage;
