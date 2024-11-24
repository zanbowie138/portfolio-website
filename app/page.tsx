import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-row text-black place-content-center p-7">
        <div className="basis-2/3">
          <h1 className="text-3xl text-center">Alexander Bui</h1>
          <p className="I'm "></p>
        </div>
        <div className="flex basis-1/3 mr-5">
          <Image
            src="/profile.jpg"
            alt="logo"
            width="200"
            height="200"
            className="rounded-full h-min bg-black p-1 m-auto"
            priority={true}
          />
        </div>
      </div>
      <div className="flex my-3">
        <div className="basis-1/2">
          <h2 className="text-3xl text-center">Projects</h2>
        </div>
        <div className="basis-1/2">
          <h2 className="text-3xl text-center">Blog</h2>
        </div>
      </div>
    </>
  );
}
