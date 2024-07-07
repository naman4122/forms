import React from "react";
import FormBuilder from "./FormBuilder";
import DisplayForm from "./DisplayForm";

const HomePage = () => {
  return (
    <div className="h-full">
      <span className="flex justify-center h-[10%] text-5xl py-4 font-medium text-white bg-black">
        Dynamic Form Builder
      </span>
      <div className="flex h-full">
        <FormBuilder />

        <DisplayForm />
      </div>
    </div>
  );
};

export default HomePage;
