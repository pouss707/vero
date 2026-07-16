import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <Link to="/product">
            <article className="overflow-hidden h-100 w-65  bg-white shadow-sm flex flex-col justify-between">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-[95%] w-full object-cover"
                />
                <div className="space-y-4 py-1 bg-black ">
                    <div className="flex items-center justify-between px-3 gap-3 mt-2">
                        <h1 className="text-sm font-semibold text-white">{product.name}</h1>
                        <h1 className="text-sm font-semibold text-white">${product.price}</h1>
                    </div>
                </div>
            </article>
        </Link>
    );
}


export default ProductCard;
