import { Link } from "react-router-dom";


import tshirt from "../../assets/tshirt.jpg"
import hoodie from "../../assets/hoodie.png"
import pants from "../../assets/pants.png"
import jacket from "../../assets/jacket.png"
import { FaArrowRight } from "react-icons/fa";
import LazyImage from "../LazyImage";

const items = [
    { name: "T-shirts", img: tshirt },
    { name: "Hoodies", img: hoodie },
    { name: "Pants", img: pants },
    { name: "Jackets", img: jacket },
];

function Collection() {
    return (
        <section className="w-full min-h-screen bg-black flex flex-col justify-center py-16">
            <div className="ml-4 sm:ml-10 text-[#F5F5F5]">
                <h1>OUR COLLECTION</h1>
            </div>
            <div className="ml-4 sm:ml-11 text-red-700">
                <h2 className="text-4xl sm:text-6xl md:text-7xl">TIMELESS STYLE.</h2>
                <h2 className="text-4xl sm:text-6xl md:text-7xl">MODERN ESSENTIALS.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 sm:px-10 mt-10 place-items-center">
                {items.map((item) => (
                    <div key={item.name} className="relative w-full h-80 sm:h-110 flex justify-center items-end overflow-hidden rounded-lg">
                        <LazyImage src={item.img} alt={item.name} className="h-full w-full object-contain" />
                        <div className="absolute flex flex-col justify-center items-start gap-2 text-white pb-5 px-4">
                            <h1 className="text-xl">{item.name}</h1>
                            <Link to="/collection">
                                <button className="border-b text-left flex justify-between items-center gap-2 cursor-pointer">
                                    SHOP NOW <FaArrowRight />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Collection
