import pic2 from "../assets/pic2.png"
import pic4 from "../assets/pic4.png"
import { AiOutlineRuby } from "react-icons/ai";
import { PiCoatHangerBold } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
function About() {
    return (
        <div>
            <section className="h-screen w-screen bg-black flex items-center">
                <div className="flex flex-col justify-center items-start gap-5 w-[50%] h-full pl-10 text-white">
                    <h1 >ABOUT US</h1>
                    <h6 className="text-7xl font-extrabold">CLOTHING <br />MADE FOR <br />EVERY VERSION <br />OF YOU</h6>
                    <p>At VERO, we believe style is more than what you wear- <br />it's how you carry yourself. Our pieces are designed to <br />empower confidence, express individuality, and <br />elevate everyday moments.</p>
                </div>
                <div className="h-[30%] w-[50%] flex justify-center items-center">
                    <img src={pic2} alt="" className="w-full h-screen" />
                </div>
            </section>
            <section className="h-screen w-screen bg-white flex items-center">
                <div className="h-[30%] w-[50%] flex justify-center items-center">
                    <img src={pic4} alt="" className="w-full h-screen" />
                </div>
                <div className="flex flex-col justify-center items-start gap-5 w-[50%] h-full pl-10 text-black">
                    <h1 >OUR STORY</h1>
                    <h6 className="text-7xl font-extrabold text-red-700">SIMPLE IDEAS. <br />MEANINGFUL DESIGNS.</h6>
                    <p>VERO was founded with a simple idea: create timpless <br />clothing that fits real life.</p>
                    <p>From the perfect fit to the finest fabrics, every detail <br />is carefully considered so you can focus on what <br />matters most being yourself</p>
                </div>
            </section>
            <div className="w-screen h-35 flex justify-center items-center bg-white">
                <div className="w-screen h-35 flex justify-center items-center my-5">
                    <div className="w-80 h-35 flex  justify-center items-center ">
                        <AiOutlineRuby className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50 h-full">
                            <h1 className="text-1xl text-left mb-1 text-red-700">EXCLUSIVE DESIGNS</h1>
                            <h1 className="text-1xl text-left text-black">Unique styles crafted <br /> with elegance.</h1>
                        </div>
                    </div>
                    <div className="w-px h-30 bg-black"></div>
                    <div className="w-80 h-35 flex  justify-center items-center ">
                        <PiCoatHangerBold className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50 h-full">
                            <h1 className="text-1xl text-left mb-1 text-red-700">PREMIUM QUALITY</h1>
                            <h1 className="text-1xl text-left text-black">Finest fabrics for comfort <br /> and luxury.</h1>
                        </div>
                    </div>
                    <div className="w-px h-30 bg-black"></div>
                    <div className="w-80 h-35 flex  justify-center items-center">
                        <TbWorld className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50 h-full">
                            <h1 className="text-1xl text-left mb-1 text-red-700">EXPERT CRAFTSMANSHIP</h1>
                            <h1 className="text-1xl text-left text-black">Atention to detail <br /> in every stitch.</h1>
                        </div>
                    </div>
                    <div className="w-px h-30 bg-black"></div>
                    <div className="w-80 h-35 flex  justify-center items-center">
                        <IoIosPeople className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50 h-full">
                            <h1 className="text-1xl  mb-1 text-red-700">TIMELESS BEAUTY</h1>
                            <h1 className="text-1xl  text-black">Designed to be cherished <br /> for years.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About