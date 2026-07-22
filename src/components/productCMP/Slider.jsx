import { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


function Slider({ product, slides, activeImage, onSelect }) {
    const [internalIndex, setInternalIndex] = useState(0);

    const images = useMemo(() => {
        if (Array.isArray(slides) && slides.length > 0) return slides;
        if (!product) return [];
        if (Array.isArray(product.gallery) && product.gallery.length > 0) return product.gallery;
        if (Array.isArray(product.images) && product.images.length > 0) return product.images;
        return product.image ? [product.image] : [];
    }, [product, slides]);

    if (images.length === 0) return null;

    const activeIndex = activeImage ? images.indexOf(activeImage) : -1;
    const current = activeIndex >= 0 ? activeIndex : internalIndex;

    const select = (idx) => {
        setInternalIndex(idx);
        if (onSelect) onSelect(images[idx]);
    };

    const goPrevious = () => select(current === 0 ? images.length - 1 : current - 1);
    const goNext = () => select(current === images.length - 1 ? 0 : current + 1);

    const arrowBase =
        " cursor-pointer  h-30 px-2 text-white transition-colors hover:border-red-700 hover:bg-red-700";

    return (
        <div className="flex w-152 flex-col items-center">
            <div className="flex w-full  items-center justify-center gap-2">
                <button type="button" onClick={goPrevious} aria-label="Previous image" className={arrowBase}>
                    <IoIosArrowBack className="text-xl" />
                </button>

                <div className="flex flex-1 items-center gap-3  overflow-x-auto pb-1">
                    {images.map((src, idx) => {
                        const isActive = idx === current;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => select(idx)}
                                aria-label={`View image ${idx + 1}`}
                                className={
                                    "relative h-30 w-30 shrink-0 cursor-pointer overflow-hidden border bg-white/5 transition-colors " +
                                    (isActive
                                        ? "border-red-700 ring-1 ring-red-700"
                                        : "border-white/20 hover:border-white/60")
                                }
                            >
                                <img
                                    src={src}
                                    alt={product?.name ? `${product.name} view ${idx + 1}` : `Product view ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </button>
                        );
                    })}
                </div>

                <button type="button" onClick={goNext} aria-label="Next image" className={arrowBase}>
                    <IoIosArrowForward className="text-xl" />
                </button>
            </div>

            {images.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => select(idx)}
                            aria-label={`Go to image ${idx + 1}`}
                            className={
                                "h-2 w-2 cursor-pointer rounded-full transition-colors " +
                                (idx === current ? "bg-red-700" : "bg-white/30 hover:bg-white/60")
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Slider;
