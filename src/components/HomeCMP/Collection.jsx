import { Link } from "react-router-dom";


import tshirt from "../../assets/tshirt.jpg"
import hoodie from "../../assets/hoodie.png"
import pants from "../../assets/pants.png"
import jacket from "../../assets/jacket.png"
import { FaArrowRight } from "react-icons/fa";


function Collection() {
    return (
        <section className="w-screen h-screen bg-black flex flex-col justify-center">
            <div className="w-screen h-10 ml-10 text-[#F5F5F5]">
                <h1>OUR COLLECTION</h1>
            </div>
            <div className="w-screen ml-11 text-red-700">
                <h2 className="text-7xl">TIMELESS STYLE.</h2>
                <h2 className="text-7xl">MODERN ESSENTIALS.</h2>
            </div>
            <div className="grid grid-cols-4 gap-2 w-screen h-120 px-10 place-items-center mt-10">
                <div className="h-120 flex justify-center items-end ">
                    <img src={tshirt} alt="" className="h-120 w-85" />
                    <div className="absolute flex flex-col justify-center items-start w-77 gap-2 text-white pb-5">
                        <h1 className="text-xl ">T-shirts</h1>
                        <Link to="/collection">
                            <button className="w-30 h-7 border-b text-left flex justify-between items-center cursor-pointer">
                                SHOP NOW <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="h-120 flex justify-center items-end ">
                    <img src={hoodie} alt="" className="h-120 w-85" />
                    <div className="absolute flex flex-col justify-center items-start w-77 gap-2 text-white pb-5">
                        <h1 className="text-xl ">Hoodies</h1>
                        <Link to="/collection">
                            <button className="w-30 h-7 border-b text-left flex justify-between items-center cursor-pointer">
                                SHOP NOW <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="h-120 flex justify-center items-end ">
                    <img src={pants} alt="" className="h-120 w-85" />
                    <div className="absolute flex flex-col justify-center items-start w-77 gap-2 text-white pb-5">
                        <h1 className="text-xl ">Pants</h1>
                        <Link to="/collection">
                            <button className="w-30 h-7 border-b text-left flex justify-between items-center cursor-pointer">
                                SHOP NOW <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="h-120 flex justify-center items-end ">
                    <img src={jacket} alt="" className="h-120 w-85" />
                    <div className="absolute flex flex-col justify-center items-start w-77 gap-2 text-white pb-5">
                        <h1 className="text-xl ">Jackets</h1>
                        <Link to="/collection">
                            <button className="w-30 h-7 border-b text-left flex justify-between items-center cursor-pointer">
                                SHOP NOW <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Collection