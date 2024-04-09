import React, { useState } from "react";
import { HomePageExplore } from "../../../src/data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./Highlighttext";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
        {/* "Unlock the Power of Code" Section */}
        <div className="text-center my-10">
        <div className="text-4xl font-semibold">
          Unlock the <HighlightText text={"Power of Code"} />
        </div>
        <p className="text-lg font-semibold mt-1">
          Learn to Build Anything You Can Imagine
        </p>
      </div>




      {/* Tabs Section */}
      <div className="flex justify-center gap-5 mb-7">
        {tabsName.map((ele, index) => (
          <div
            className={`text-lg font-medium py-2 px-4 rounded-full cursor-pointer transition-colors duration-200 ${
              currentTab === ele
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            key={index}
            onClick={() => setMyCards(ele)}
          >
            {ele}
          </div>
        ))}
      </div>

    

      {/* Cards Group */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6  pl-16 ">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
