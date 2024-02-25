"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const SuccessPage = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    // Set the hash value once the component has mounted and window is available
    setHash(window.location.hash);
  }, []);

  // Determine the type of success message to display based on the URL hash
  const getMessageAndLink = () => {
    switch (hash) {
      case "#clients":
        return {
          message: "Success! You created a new client.",
          link: "/clients",
          linkText: "View Clients",
        };
      case "#orders":
        return {
          message: "Success! You created a new order.",
          link: "/orders",
          linkText: "View Orders",
        };
      default:
        return {
          message: "Action was successful.",
          link: "/",
          linkText: "Home",
        };
    }
  };

  const { message, link, linkText } = getMessageAndLink();

  return (
    <div>
      <h1>{message}</h1>
      <Link href={link}>{linkText}</Link>
    </div>
  );
};

export default SuccessPage;
