import React from 'react'
import {Button} from "../../components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../assets/LearningCards/Instructor.jpg";
import HighlightText from '../Home/Highlighttext';

const InstructorSection = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-12  items-center">
          <div className="lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-blue-500/5 shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
            />
          </div>
          <div className="lg:w-[50%] flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl font-semibold ">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              EduTechForge. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection