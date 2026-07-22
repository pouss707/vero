import { useEffect, useMemo, useState } from "react";
import FilterPanel from "../components/CollectionCMP/FilterPanel";
import ProductGrid from "../components/CollectionCMP/ProductGrid";
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
const INITIAL_VISIBLE = 12;

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
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

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
            const matchesBrand = brands.length === 0 || brands.includes(item.brand);
            const matchesCategory =
                category.length === 0 || category.includes(item.category);
            const matchesPrice =
                item.price >= priceRange[0] && item.price <= priceRange[1];
            const matchesGender = gender.length === 0 || gender.includes(item.gender);
            const matchesColor = color.length === 0 || color.includes(item.color);
            const matchesSize = size.length === 0 || size.includes(item.size);

            return (
                matchesBrand &&
                matchesCategory &&
                matchesPrice &&
                matchesGender &&
                matchesColor &&
                matchesSize
            );
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

    // Clamp the visible end to the current result set so changing filters
    // naturally shrinks the view (no setState-in-effect needed).
    const visibleEnd = Math.min(visibleCount, filteredProducts.length);
    const visibleProducts = filteredProducts.slice(0, visibleEnd);
    const hasMore = visibleEnd < filteredProducts.length;

    const addToCart = (product) => {
        setCart((prevCart) => {
            const lineId = `${product.id}-${product.size}`;
            const existingItem = prevCart.find((item) => item.lineId === lineId);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.lineId === lineId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, lineId, quantity: 1 }];
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

    const filterPanelProps = {
        brands,
        category,
        priceRange,
        gender,
        color,
        size,
        brandOptions,
        genderOptions,
        onBrandChange: handleBrandChange,
        onCategoryChange: handleCategoryChange,
        onGenderChange: handleGenderChange,
        onColorChange: handleColorChange,
        onSizeChange: handleSizeChange,
        onPriceChange: setPriceRange,
        priceMin: PRICE_MIN,
        priceMax: PRICE_MAX,
    };

    return (
        <section className="min-h-screen bg-black py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="hidden lg:block bg-black ml-0">
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

                    <FilterPanel {...filterPanelProps} />
                </aside>

                <div className="mt-21">
                    <div className="mb-8 flex flex-wrap justify-between items-center gap-3 bg-black">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 border border-white/40 px-4 py-2 text-sm text-white cursor-pointer"
                            >
                                Filters
                            </button>
                            <h1 className="text-sm font-semibold text-white">
                                {filteredProducts.length} styles available
                            </h1>
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

                    <ProductGrid
                        products={visibleProducts}
                        totalCount={filteredProducts.length}
                        hasMore={hasMore}
                        onLoadMore={() => setVisibleCount((count) => count + INITIAL_VISIBLE)}
                        onAddToCart={addToCart}
                    />
                </div>
            </div>

            {/* Mobile / tablet filter drawer */}
            {filtersOpen && (
                <div className="fixed inset-0 z-60 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setFiltersOpen(false)}
                    />
                    <div className="absolute top-0 left-0 h-full w-80 max-w-[85%] bg-black overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-red-700">Filters</h2>
                            <button
                                type="button"
                                onClick={() => setFiltersOpen(false)}
                                className="text-sm text-white underline cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                        <FilterPanel {...filterPanelProps} />
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mt-6 w-full border border-white/40 px-4 py-2 text-sm text-white cursor-pointer"
                        >
                            Reset all
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Collection;
