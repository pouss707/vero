import ProductCard from "./ProductCard";

function ProductGrid({ products, totalCount, hasMore, onLoadMore, onAddToCart }) {
    if (totalCount === 0) {
        return (
            <div className="p-8 text-center text-sm text-white">
                No pieces match those filters yet. Try a broader combination.
            </div>
        );
    }

    return (
        <>
            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="mt-10 flex justify-center">
                    <button
                        type="button"
                        onClick={onLoadMore}
                        className="w-full sm:w-auto border border-white/40 px-8 py-3 text-sm font-medium text-white transition-colors duration-200 cursor-pointer hover:border-white hover:bg-red-700"
                    >
                        Load more
                    </button>
                </div>
            )}
        </>
    );
}

export default ProductGrid;
