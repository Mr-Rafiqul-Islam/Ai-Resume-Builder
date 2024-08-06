import Header from "@/components/custom/Header";
import { UserButton } from "@clerk/clerk-react";
import React from "react";

function Home() {
  return (
    <>
      <Header />
      <section>
        <h1 className="text-3xl ">landing screen</h1>
      </section>
    </>
  );
}

export default Home;
