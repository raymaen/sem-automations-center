"use client";

import React from "react";
import { FaClock, FaCheckCircle, FaBug } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <section className="bg-blue-600 text-white p-8 text-center rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Welcome to the RSA Builder App</h1>
      <p className="text-lg mb-8">
        Streamline your ad creation process with our intuitive interface and powerful tools.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <FaClock className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Faster Development Time</h3>
          <p className="text-sm mt-2">Build responsive search ads quickly with our streamlined workflow.</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Follow Best Practices</h3>
          <p className="text-sm mt-2">Ensure your ads adhere to industry standards and guidelines.</p>
        </div>
        <div className="flex flex-col items-center">
          <FaBug className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold">Fewer Mistakes</h3>
          <p className="text-sm mt-2">Reduce errors with built-in validation and smart suggestions.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
