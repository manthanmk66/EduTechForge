import React from "react";
import {Button } from "../../components/ui/button"; 
import { FaArrowRight } from "react-icons/fa"; 
import HighlightText from "./Highlighttext";


const FullCatalog = () => {
  return (
    <div>
      {/* Section 2 */}
      
      <div style={{ backgroundImage: '")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '333px' }}> className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Category Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/login"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCatalog;
