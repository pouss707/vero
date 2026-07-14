function ProductCard({ product, onAddToCart }) {
    return (
        <article className="overflow-hidden h-80 sm:h-110 bg-white shadow-sm">
            <img
                src={product.image}
                alt={product.name}
                className="h-[80%] w-full object-cover"
            />
            <div className="space-y-4 py-1 bg-black">
                <div className="flex items-center justify-between px-3 gap-3 mt-2">
                    <h1 className="text-sm font-semibold text-white">{product.name}</h1>
                    <h1 className="text-sm font-semibold text-white">${product.price}</h1>
                </div>
                <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-white px-4 py-3 text-sm font-medium flex justify-center items-center text-black transition hover:bg-red-700"
                >
                    Add to cart
                </button>
            </div>
        </article>
    );
}

export default ProductCard;
