"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface Props {
  title: string;
  body: string;
  href: string;
}

const ConfettiCard: React.FC<Props> = ({ href, title, body }) => {
  const confettiAnchor = useRef<HTMLAnchorElement>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    const currentAnchor = confettiAnchor.current;
    if (currentAnchor) {
      currentAnchor.addEventListener("click", triggerConfetti);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (currentAnchor) {
        currentAnchor.removeEventListener("click", triggerConfetti);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <li className="list-none flex p-0.5 bg-[#23262d] rounded-lg transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
      {/* Using ref attribute to attach the ref to the DOM element */}
      <a
        ref={confettiAnchor}
        className="w-full no-underline text-white bg-[#23262d] opacity-80 rounded-lg p-[calc(1.5rem-1px)] cursor-pointer"
      >
        <h2 className="m-0 text-1.25rem transition-colors duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {title}
          <span>&rarr;</span>
        </h2>
        <p className="mt-2 mb-0">{body}</p>
      </a>
    </li>
  );
};

export default ConfettiCard;
