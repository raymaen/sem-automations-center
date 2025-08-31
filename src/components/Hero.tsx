import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tools for faster Google Ads creation and automate workflows
        </h1>
        <p className="text-lg text-gray-600 mb-8">Streamline your advertising process with our powerful tools.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/rsa" className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600">
            Go to RSA
          </Link>
          <Link href="/keywords" className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600">
            Go to Keywords
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
