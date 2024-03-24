import React, { useState, useEffect } from 'react';

function HeroSection() {
    const sentences = ["EdutechForge", "out Limits"];
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [visibleLetters, setVisibleLetters] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, 2500); // Change sentence every 2.5 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    useEffect(() => {
        const currentSentence = sentences[currentSentenceIndex];
        let visibleLettersTemp = "";

        // Loop through each letter of the current sentence
        for (let i = 0; i < currentSentence.length; i++) {
            // Use setTimeout to delay the addition of each letter
            setTimeout(() => {
                visibleLettersTemp += currentSentence[i];
                setVisibleLetters(visibleLettersTemp);
            }, i * 200); // Delay each letter by 200 milliseconds
        }
    }, [currentSentenceIndex]);

    return (
        <section key="1" className="w-full pt-12 md:pt-24">
            <div className="container px-4 space-y-4 md:space-y-6">
                <div className="flex flex-col gap-4 min-h-[300px] justify-center text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Learn with-{visibleLetters}</h1>
                        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Access thousands of courses across various subjects. From programming to pottery, we've got you covered.
                        </p>
                    </div>
                    <div className="mx-auto space-x-4 animate-bounce">
                        <a
                            href="#"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        >
                            Sign Up
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                        >
                            Explore Courses
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
