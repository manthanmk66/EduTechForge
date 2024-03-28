import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Herosectionvdobg from "../assets/homebg.mp4";

function HeroSection() {
    const sentences = ["EdutechForge", "out Limits"];
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [visibleLetters, setVisibleLetters] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const currentSentence = sentences[currentSentenceIndex];
        let visibleLettersTemp = "";

        for (let i = 0; i < currentSentence.length; i++) {
            setTimeout(() => {
                visibleLettersTemp += currentSentence[i];
                setVisibleLetters(visibleLettersTemp);
            }, i * 200);
        }
    }, [currentSentenceIndex]);

    return (
        <section key="1" className="relative overflow-hidden">
            <video src={Herosectionvdobg} autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0" />
            <div className="container px-4 space-y-4 md:space-y-6 relative z-10">
                <div className="flex flex-col gap-4 min-h-screen justify-center text-center text-white">
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-5xl font-bold tracking-tighter">Learn with - {visibleLetters}</h1>
                        <p className="mx-auto max-w-lg text-lg md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                            Access thousands of courses across various subjects. From programming to pottery, we've got you covered.
                        </p>
                    </div>
                    <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <NavLink
    to="/login"
    className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 rounded-md bg-gray-900 text-gray-50 text-sm font-medium shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
>
    Sign Up
</NavLink>
<NavLink
    to="/explore"
    className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 rounded-md bg-gray-900 text-gray-50 text-sm font-medium shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
>
    Explore Courses
</NavLink>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
