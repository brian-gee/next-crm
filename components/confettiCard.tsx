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

    return () => {
      if (currentAnchor) {
        currentAnchor.removeEventListener("click", triggerConfetti);
      }
    };
  }, []);

  return (
    <li className="flex list-none rounded-lg bg-gray-800 p-0.5 shadow-inner">
      {/* Using ref attribute to attach the ref to the DOM element */}
      <a
        ref={confettiAnchor}
        className="opaity-80 w-full cursor-pointer rounded-lg bg-gray-800 p-6 text-white hover:opacity-100 focus:opacity-100"
      >
        <h2 className="text-1.25rem m-0">
          {title}
          <span>&rarr;</span>
        </h2>
        <p className="mb-0 mt-2">{body}</p>
      </a>
    </li>
  );
};

export default ConfettiCard;
