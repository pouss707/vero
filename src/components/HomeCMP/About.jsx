import { Link } from "react-router-dom";

import pic1 from "../../assets/pic1.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";

import { FaArrowRight } from "react-icons/fa";
import LazyImage from "../LazyImage";


function About() {

    return (
        <section className="min-h-screen w-full bg-[#F5F5F5] flex flex-col justify-center py-16">
            <div className="ml-4 sm:ml-10">
                <h1>ABOUT US</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:h-[80%] w-full">
                <div className="w-full lg:w-1/2 flex flex-col justify-center ml-4 sm:ml-11 gap-5 px-2">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl text-red-700 leading-tight">WE ARE MORE <br className="hidden sm:block" />THAN FASHION </h2>
                    <p className="text-base sm:text-lg">VERO is a modern fashion destination built for the new generation. we blend timeless style with style with contemporary culture to create pieces that speak confidence, individuality, and quality. </p>
                    <p className="text-base sm:text-lg">From every essentials to bold statements, we curate and design with purpose- so you can express who you are, without saying a word.</p>
                    <Link to="/about">
                        <button
                            type="button"
                            className="flex justify-center gap-5 items-center bg-[#F5F5F5] border-2 border-black px-5 py-3 cursor-pointer hover:text-[#F5F5F5] hover:bg-black w-full sm:w-45 h-13"
                        >
                            <h1 className="text-xl text-left">BROWSE</h1>
                            <FaArrowRight className='mx-auto' />
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mr-0 sm:mr-11 mt-8 lg:mt-0">
                    <LazyImage src={pic1} alt="" className="w-full sm:w-90 h-64 sm:h-155 object-cover" />
                    <div className="flex flex-col justify-between items-center gap-2 w-full sm:w-auto">
                        <LazyImage src={pic2} alt="" className="w-full sm:w-80 h-48 sm:h-113 object-cover" />
                        <LazyImage src={pic3} alt="" className="w-full sm:w-80 h-40 object-cover" />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default About