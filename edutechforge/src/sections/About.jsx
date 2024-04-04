import react from "react";

import HighlightText from "../sections/Home/Highlighttext";
import banner1 from "../assets/Aboutpage/banner1.jpg";
import banner2 from "../assets/Aboutpage/banner2.jpg";
import banner3 from "../assets/Aboutpage/banner3.jpg";
import Quote from "../common/core/AboutPage/Quote";

const About = () => {
  return (
    <div>
      {/* section 1 */}
      <section>
        <header>
          Driving Innovation in Online Education for a
          <HighlightText text={"BrighterFuture"} />
          <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </header>

        <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
          <img src={banner1} alt="" />
          <img src={banner2} alt="" />
          <img src={banner3} alt="" />
        </div>
      </section>

      {/* Section2 */}

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>
    </div>
  );
};
export default About;
