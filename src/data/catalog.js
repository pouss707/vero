import rawProducts from "./products.json";

import tshirt from "../assets/tshirt.jpg";
import hoodie from "../assets/hoodie.png";
import jacket from "../assets/jacket.png";
import pants from "../assets/pants.png";

const imageMap = { tshirt, hoodie, jacket, pants };
const imagePool = [tshirt, hoodie, jacket, pants];

// Each product only ships with a single hero image in JSON. Build a small
// gallery per product (own hero + the 3 other assets) so the product page has
// "other views" to slide through. Swap these for real per-product photos later
// by adding a `gallery` array to products.json (e.g. ["hoodie","hoodie2",...]).
function buildGallery(ownImage) {
    return [ownImage, ...imagePool.filter((img) => img !== ownImage)];
}

// Resolve the raw JSON into runtime products with imported image URLs.
// Centralized here so the Collection grid, Product page, Cart, and
// Checkout all render exactly the same images.
export const products = rawProducts.map((p) => {
    const image = imageMap[p.image] || tshirt;
    return {
        ...p,
        image,
        gallery: buildGallery(image),
    };
});

export function getProductById(id) {
    const numericId = Number(id);
    return products.find((p) => p.id === numericId);
}

// A handful of related pieces (everything except the current one) used on
// the product detail "You may also like" rail.
export function getRelatedProducts(id, limit = 4) {
    const numericId = Number(id);
    return products.filter((p) => p.id !== numericId).slice(0, limit);
}
