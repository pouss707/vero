import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/catalog";
import LazyImage from "../components/LazyImage";
import { GiCottonFlower } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { BiSolidWasher } from "react-icons/bi";
import { LuBanknote } from "react-icons/lu";
import { FaTruck, FaWallet } from "react-icons/fa";
import Slider from "../components/productCMP/Slider"

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOR_OPTIONS = [
    { name: "Black", hex: "#111111" },
    { name: "White", hex: "#f5f5f5" },
    { name: "Red", hex: "#b91c1c" },
    { name: "Blue", hex: "#2563eb" },
    { name: "Pink", hex: "#ec4899" },
];

function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = getProductById(id);

    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState(product?.color || "Black");
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(
        product?.gallery?.[0] || product?.image
    );

    // Reset transient UI state whenever we land on a different product.
    useEffect(() => {
        // Defer state resets to avoid synchronous setState within the effect
        const t = setTimeout(() => {
            setSelectedSize("M");
            setSelectedColor(product?.color || "Black");
            setQuantity(1);
            setAdded(false);
            setSelectedImage(product?.gallery?.[0] || product?.image);
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 0);
        return () => clearTimeout(t);
    }, [id, product?.color, product?.gallery, product?.image]);

    const related = useMemo(() => getRelatedProducts(id, 4), [id]);

    if (!product) {
        return (
            <section className="min-h-screen bg-black px-4 py-20 text-center text-white sm:px-6 lg:px-10">
                <h1 className="text-3xl font-semibold sm:text-4xl">Product not found</h1>
                <p className="mt-3 text-sm text-white/70">
                    We couldn't find that piece. It may have sold out.
                </p>
                <Link
                    to="/collection"
                    className="mt-6 inline-flex rounded-full bg-red-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-800"
                >
                    Back to collection
                </Link>
            </section>
        );
    }

    const addToCart = () => {
        const saved = window.localStorage.getItem("vero-cart");
        const cart = saved ? JSON.parse(saved) : [];
        const lineId = `${product.id}-${selectedSize}-${selectedColor}`;
        const existing = cart.find((item) => item.lineId === lineId);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ ...product, color: selectedColor, size: selectedSize, quantity, lineId });
        }

        window.localStorage.setItem("vero-cart", JSON.stringify(cart));
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <>
            {/* Top: black gallery + product info */}
            <section className="min-h-screen w-full px-5 py-10 bg-black  text-white ">
                <nav className="mb-4 flex items-center gap-2 text-sm text-white/60">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <span>/</span>
                    <Link to="/collection" className="hover:text-white">Collection</Link>
                    <span>/</span>
                    <span className="text-white">{product.name}</span>
                </nav>

                <div className="w-full h-full flex justify-center items-center ">
                    <div className="flex justify-center items-center gap-10 w-full">
                        {/* Gallery */}
                        <div className="flex flex-col gap-4 w-[50%] justify-center items-center ">
                            <div className="overflow-hidden h-150 bg-white/5">
                                <LazyImage
                                    src={selectedImage}
                                    alt={product.name}
                                    eager
                                    className=" w-full object-cover h-full"
                                />
                            </div>
                            <Slider
                                product={product}
                                activeImage={selectedImage}
                                onSelect={setSelectedImage}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-start items-start gap-7 pl-10 h-211 w-[50%]">
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-red-700">
                                    {product.brand}
                                </p>
                                <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
                                    {product.name}
                                </h1>
                                <p className="mt-3 text-2xl font-semibold text-white">
                                    ${product.price}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-gray-400">A timless essential. Crafted from premium cotton <br />for everyday comfort and durability.</p>
                                <div className="flex gap-4">
                                    <span className="flex items-center text-gray-400 gap-1"><GiCottonFlower />100% premium cotton</span>
                                    <span className="flex items-center text-gray-400 gap-1"><GiClothes />Pre-shrunk</span>
                                    <span className="flex items-center text-gray-400 gap-1"><BiSolidWasher />Machine wash cold</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm text-white/70">
                                <span className=" border border-white/20 px-3 py-1">
                                    {product.category}
                                </span>
                                <span className=" border border-white/20 px-3 py-1">
                                    {product.gender}
                                </span>
                                <span className=" border border-white/20 px-3 py-1">
                                    {selectedColor}
                                </span>
                            </div>

                            <div className="w-80">
                                <h2 className="mb-3 text-sm font-medium text-red-700">Select color</h2>
                                <div className="grid grid-cols-3 gap-2 w-70">
                                    {COLOR_OPTIONS.map((colorOption) => {
                                        return (
                                            <button
                                                key={colorOption.name}
                                                type="button"
                                                onClick={() => setSelectedColor(colorOption.name)}
                                                className=
                                                "flex items-center gap-2 border  border-gray-400 px-2 py-2 text-sm font-medium transition-all duration-200 cursor-pointer "
                                            >
                                                <span
                                                    className="h-4 w-4  border border-gray-400"
                                                    style={{ backgroundColor: colorOption.hex }}
                                                />
                                                {colorOption.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="w-80">
                                <h2 className="mb-3 text-sm font-medium text-red-700">Select size</h2>
                                <div className="grid grid-cols-3 gap-2 ">
                                    {SIZE_ORDER.map((s) => {
                                        const active = selectedSize === s;
                                        return (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setSelectedSize(s)}
                                                className={
                                                    "flex h-12 items-center justify-center border text-sm font-medium transition-all duration-200 cursor-pointer " +
                                                    (active
                                                        ? "border-red-700 bg-red-700 text-white"
                                                        : "border-white/40 bg-black text-white hover:border-white")
                                                }
                                            >
                                                {s}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex  gap-5">
                                <div className="flex border border-white/20 bg-black p-1">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="h-9 w-7  text-lg cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center text-sm font-medium flex justify-center items-center">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="h-9 w-7  text-lg cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={addToCart}
                                    className={
                                        "flex justify-center items-center w-63 px-4 py-3 text-sm font-medium transition " +
                                        (added
                                            ? "bg-green-600 text-white"
                                            : "bg-red-700 text-white hover:bg-red-800")
                                    }
                                >
                                    {added ? "Added to cart ✓" : "Add to cart"}
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/checkout")}
                                className="w-91  border border-white/40 px-4 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
                            >
                                Buy now
                            </button>
                            <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
                                <p className="flex items-center gap-2">
                                    <FaTruck /> Free Delivery
                                </p>
                                <p className="flex items-center gap-2">
                                    <LuBanknote /> Money Back Guarantee
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaWallet /> Secure Payments
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section >

            {/* Mid: white section */}
            <section section className="w-full bg-white px-4 py-14 text-black sm:px-6 lg:px-10" >
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-3xl font-semibold text-red-700 sm:text-4xl">
                        DETAILS & FIT
                    </h2>
                    <div className="mt-6 grid gap-8 sm:grid-cols-2">
                        <div>
                            <h1 className="mb-2 text-lg text-black">Material & care</h1>
                            <p className="text-sm leading-6 text-black/70">
                                100% premium cotton blend. Machine wash cold, tumble dry low.
                                Made to keep its shape wash after wash.
                            </p>
                        </div>
                        <div>
                            <h1 className="mb-2 text-lg text-black">Sizing</h1>
                            <p className="text-sm leading-6 text-black/70">
                                True to size. Model is 6'1" and wears M. Between sizes? Size
                                down for a fitted look or up for an relaxed one.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Bottom: black "you may also like" rail */}
            <section section className="w-full bg-black px-4 py-14 text-white sm:px-6 lg:px-10" >
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-8 text-3xl font-semibold text-red-700 sm:text-4xl">
                        YOU MAY ALSO LIKE
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                        {related.map((item) => (
                            <Link
                                key={item.id}
                                to={`/product/${item.id}`}
                                className="overflow-hidden bg-white shadow-sm"
                            >
                                <LazyImage
                                    src={item.image}
                                    alt={item.name}
                                    className="aspect-4/5 w-full object-cover"
                                />
                                <div className="flex items-center justify-between gap-2 bg-black px-3 py-2">
                                    <h1 className="truncate text-sm font-semibold text-white">
                                        {item.name}
                                    </h1>
                                    <h1 className="shrink-0 text-sm font-semibold text-white">
                                        ${item.price}
                                    </h1>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section >
        </>
    );
}

export default Product;
