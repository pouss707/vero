import { Link } from "react-router-dom";

import pic1 from "../../assets/pic1.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";

import { FaArrowRight } from "react-icons/fa";


function About() {

    return (
        <section className="h-screen w-screen bg-[#F5F5F5] flex flex-col justify-center">
            <div className="w-screen h-10 ml-10">
                <h1>ABOUT US</h1>
            </div>
            <div className="h-[80%] w-screen  flex ">
                <div className="w-1/2 h-full flex flex-col justify-center ml-11 gap-5">
                    <h2 className="text-7xl text-red-700">WE ARE MORE <br />THAN FASHION </h2>
                    <p className="text-lg">VERO is a modern fashion destination built for the <br />new generation. we blend timeless style with style with <br />contemporary culture to create pieces that speak <br />confidence, individuality, and quality. </p>
                    <p className="text-lg">From every essentials to bold statements, <br />we curate and design with purpose- <br />so you can express who you are, <br />without saying a word.</p>
                    <Link to="/about">
                        <button
                            type="button"
                            className=" flex justify-center gap-5 items-center bg-[#F5F5F5] border-2 border-black px-5 py-3 cursor-pointer hover:text-[#F5F5F5] hover:bg-black w-45 h-13"
                        >
                            <h1 className="text-xl text-left ">BROWSE</h1>
                            <FaArrowRight className='mx-auto' />
                        </button>
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-2 mr-11">
                    <img src={pic1} alt="" className="h-155 w-90" />
                    <div className="flex flex-col justify-between items-center gap-2">
                        <img src={pic2} alt="" className="h-113 w-80" />
                        <img src={pic3} alt="" className="h-40 w-80" />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default About