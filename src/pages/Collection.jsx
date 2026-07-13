
import { useEffect, useMemo, useState } from "react";
import PriceSlider from "../components/CollectionCMP/PriceSlider";
import rawProducts from "../data/products.json";

import tshirt from "../assets/tshirt.jpg";
import hoodie from "../assets/hoodie.png";
import jacket from "../assets/jacket.png";
import pants from "../assets/pants.png";

const imageMap = { tshirt, hoodie, jacket, pants };
const products = rawProducts.map((p) => ({
    ...p,
    image: imageMap[p.image] || tshirt,
}));

const PRICE_MIN = 0;
const PRICE_MAX = 200;
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];


function Collection() {
    const [cart, setCart] = useState(() => {
        if (typeof window === "undefined") {
            return [];
        }

        const savedCart = window.localStorage.getItem("vero-cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState([]);
    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
    const [gender, setGender] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {
        window.localStorage.setItem("vero-cart", JSON.stringify(cart));
    }, [cart]);

    const handleBrandChange = (brand) => {
        setBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((item) => item !== brand)
                : [...prev, brand]
        );
    };
    const brandOptions = useMemo(
        () => [...new Set(products.map((product) => product.brand))],
        []
    );
    const categoryOptions = ["T-Shirts", "Hoodies", "Jackets", "Pants"];
    const colorOptions = useMemo(
        () => [
            { name: "Black", hex: "#000000" },
            { name: "White", hex: "#ffffff" },
            { name: "Pink", hex: "#ff9ecb" },
            { name: "Red", hex: "#ef4444" },
            { name: "Blue", hex: "#3b82f6" },
        ],
        []
    );
    const genderOptions = useMemo(
        () => [...new Set(products.map((product) => product.gender))],
        []
    );

    const toggleInArray = (setter) => (value) => {
        setter((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };
    const handleColorChange = toggleInArray(setColor);
    const handleGenderChange = toggleInArray(setGender);
    const handleSizeChange = toggleInArray(setSize);
    const handleCategoryChange = toggleInArray(setCategory);
    const filteredProducts = useMemo(() => {
        const result = products.filter((item) => {
            const matchesBrand =
                brands.length === 0 || brands.includes(item.brand);
            const matchesCategory =
                category.length === 0 || category.includes(item.category);
            const matchesPrice =
                item.price >= priceRange[0] && item.price <= priceRange[1];
            const matchesGender = gender.length === 0 || gender.includes(item.gender);
            const matchesColor = color.length === 0 || color.includes(item.color);
            const matchesSize = size.length === 0 || size.includes(item.size);

            return matchesBrand && matchesCategory && matchesPrice && matchesGender && matchesColor && matchesSize;
        });

        const sorted = [...result];
        sorted.sort((a, b) => {
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === "price-low") {
                return a.price - b.price;
            }
            if (sortBy === "price-high") {
                return b.price - a.price;
            }
            return 0;
        });

        return sorted;
    }, [brands, category, color, gender, priceRange, size, sortBy]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const resetFilters = () => {
        setBrands([]);
        setCategory([]);
        setPriceRange([PRICE_MIN, PRICE_MAX]);
        setGender([]);
        setColor([]);
        setSize([]);
        setSortBy("featured");
    };

    return (
        <section className="min-h-screen bg-black  py-10 text-black pr-10 pl-10">


            <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className=" bg-black  ml-0">
                    <div className="mb-8 space-y-3">
                        <p className="text-xs uppercase tracking-[0.35em] text-white">collection</p>
                        <h2 className="text-4xl font-semibold sm:text-5xl text-red-700">SHOP ALL</h2>
                        <p className="max-w-2xl text-sm text-white sm:text-base">
                            Elevated essentials. Timless style.
                        </p>
                    </div>
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-lg text-white">Filters</h1>
                        <button
                            type="button"
                            className="text-sm text-white cursor-pointer"
                            onClick={resetFilters}
                        >
                            Reset
                        </button>
                    </div>

                    <div className="space-y-5">
                        <label className="block">
                            <h1 className="mb-3 block text-sm font-medium text-red-700">Category</h1>
                            <div className="space-y-2">
                                {categoryOptions.map((cat) => (
                                    <label
                                        key={cat}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={category.includes(cat)}
                                            onChange={() => handleCategoryChange(cat)}
                                        />
                                        <span className="w-4 h-4 ml-5 border border-white bg-black transition-all duration-200 peer-checked:bg-red-700"></span>
                                        <span className="text-white">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </label>

                        <label className="block">
                            <h1 className="mb-3 block text-sm font-medium text-red-700">Brands</h1>
                            <div className="space-y-2">
                                {brandOptions.map((brand) => (
                                    <label
                                        key={brand}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={brands.includes(brand)}
                                            onChange={() => handleBrandChange(brand)}
                                        />
                                        <span className="w-4 h-4 ml-5 border border-white bg-black transition-all duration-200 peer-checked:bg-red-700"></span>
                                        <span className="text-white">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </label>
                        <label className="block">
                            <h1 className="mb-3 block text-sm font-medium text-red-700">Gender</h1>
                            <div className="space-y-2">
                                {genderOptions.map((g) => (
                                    <label
                                        key={g}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={gender.includes(g)}
                                            onChange={() => handleGenderChange(g)}
                                        />
                                        <span className="w-4 h-4 ml-5 border border-white bg-black transition-all duration-200 peer-checked:bg-red-700"></span>
                                        <span className="text-white">{g}</span>
                                    </label>
                                ))}
                            </div>
                        </label>
                        <label className="block">
                            <h1 className="mb-3 block text-sm font-medium text-red-700">Color</h1>
                            <div className="space-y-2">
                                {colorOptions.map((c) => (
                                    <label
                                        key={c.name}
                                        className="flex items-center gap-3 cursor-pointer ml-5"
                                    >
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={color.includes(c.name)}
                                            onChange={() => handleColorChange(c.name)}
                                        />
                                        <span
                                            className="w-5 h-5 border border-gray-50 transition-all duration-200 peer-checked:ring-2 peer-checked:ring-red-700 peer-checked:ring-offset-2 peer-checked:ring-offset-black"
                                            style={{ backgroundColor: c.hex }}
                                        ></span>
                                        <h1 className="text-white text-sm">{c.name}</h1>
                                    </label>
                                ))}
                            </div>
                        </label>
                        <label className="block">
                            <h1 className="mb-3 block text-sm font-medium text-red-700">Size</h1>
                            <div className="grid grid-cols-3 gap-2 w-48 ml-5">
                                {SIZE_ORDER.map((s) => {
                                    const active = size.includes(s);
                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => handleSizeChange(s)}
                                            className={
                                                "flex h-10 items-center justify-center  border text-sm font-medium transition-all duration-200 cursor-pointer " +
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
                        </label>
                        <label className="block">
                            <h1 className="mb-3 block text-sm font-medium text-red-700">Price</h1>
                            <PriceSlider
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                value={priceRange}
                                onChange={setPriceRange}
                            />
                        </label>

                    </div>
                </aside>

                <div className="mt-21 mx-5">
                    <div className="mb-8 flex justify-between items-center gap-3  bg-black  ">
                        <div>
                            <h1 className="text-sm font-semibold text-white">{filteredProducts.length} styles available</h1>
                        </div>
                        <label className="text-sm font-medium text-white">
                            Sort by:
                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                className="ml-2 w-25 bg-black px-3 py-2 text-sm text-white outline-none"
                            >
                                <option value="featured">Featured</option>
                                <option value="name">A-Z</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </label>
                    </div>

                    <div className="grid gap-6 grid-cols-3 ">
                        {filteredProducts.map((product) => (
                            <article key={product.id} className="overflow-hidden h-110 bg-white shadow-sm">
                                <img src={product.image} alt={product.name} className="h-[80%] w-full object-cover" />
                                <div className="space-y-4 py-1  bg-black">
                                    <div className="flex items-center justify-between px-3 gap-3 mt-2">
                                        <h1 className="text-sm font-semibold text-white">{product.name}</h1>
                                        <h1 className="text-sm font-semibold text-white">${product.price}</h1>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => addToCart(product)}
                                        className="w-full bg-white px-4 py-3 text-sm font-medium flex justify-center items-center text-black transition hover:bg-red-700"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="p-8 text-center text-sm text-white">
                            No pieces match those filters yet. Try a broader combination.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Collection;