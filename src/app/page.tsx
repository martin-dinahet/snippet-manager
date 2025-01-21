"use client";

import { useEffect, useState } from "react";

const Page: React.FC = (): React.JSX.Element => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/hello");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error(`Error fetching message: ${error}`);
        setMessage("Error fetching message");
      }
    };
    fetchMessage();
  }, []);

  return (
    <>
      <main className="w-screen min-h-screen grid place-items-center">
        <h1 className="text-2xl font-bold">{message}</h1>
      </main>
    </>
  );
};

export default Page;
