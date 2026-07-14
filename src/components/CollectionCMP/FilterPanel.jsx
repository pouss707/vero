import PriceSlider from "./PriceSlider";

const CATEGORY_OPTIONS = ["T-Shirts", "Hoodies", "Jackets", "Pants"];
const COLOR_OPTIONS = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Pink", hex: "#ff9ecb" },
    { name: "Red", hex: "#ef4444" },
    { name: "Blue", hex: "#3b82f6" },
];
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];

function FilterPanel({
    brands,
    category,
    priceRange,
    gender,
    color,
    size,
    brandOptions,
    genderOptions,
    onBrandChange,
    onCategoryChange,
    onGenderChange,
    onColorChange,
    onSizeChange,
    onPriceChange,
    priceMin,
    priceMax,
}) {
    return (
        <div className="space-y-5">
            <label className="block">
                <h1 className="mb-3 block text-sm font-medium text-red-700">Category</h1>
                <div className="space-y-2">
                    {CATEGORY_OPTIONS.map((cat) => (
                        <label
                            key={cat}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={category.includes(cat)}
                                onChange={() => onCategoryChange(cat)}
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
                                onChange={() => onBrandChange(brand)}
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
                                onChange={() => onGenderChange(g)}
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
                    {COLOR_OPTIONS.map((c) => (
                        <label
                            key={c.name}
                            className="flex items-center gap-3 cursor-pointer ml-5"
                        >
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={color.includes(c.name)}
                                onChange={() => onColorChange(c.name)}
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
                                onClick={() => onSizeChange(s)}
                                className={
                                    "flex h-10 items-center justify-center border text-sm font-medium transition-all duration-200 cursor-pointer " +
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
                    min={priceMin}
                    max={priceMax}
                    value={priceRange}
                    onChange={onPriceChange}
                />
            </label>
        </div>
    );
}

export default FilterPanel;
