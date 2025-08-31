import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="text-white p-12 text-center shadow-md"
      style={{
        paddingTop: 100,
        paddingBottom: 100,
        background: "linear-gradient(to right, #fc4a1a, #f7b733)",
      }}
    >
      <h1 className="font-bold mb-4" style={{ fontSize: "4.3em" }}>
        Build Winning RSAs, Faster
      </h1>
      <p className="text-xl">Best Practices • Template Generation • Smarter Search Ad Workflow</p>
    </section>
  );
};

export default Hero;
