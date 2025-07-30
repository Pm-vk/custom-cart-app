import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-indigo-100 py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div className="text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Create,
            <strong className="text-indigo-600"> Customize </strong>
            & Order
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-md">
            Customize at your fingertip. Bring your imagination to life with our easy-to-use design studio.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#"
              className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:-translate-y-1"
            >
              Start Designing
            </a>
            <a
              href="#"
              className="inline-block border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 hover:text-gray-900 transition-transform transform hover:-translate-y-1"
            >
              Explore Products
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <div className="p-4 bg-white border-4 border-indigo-600 rounded-2xl shadow-xl transform transition-transform hover:scale-105">
            <Image
              src="/hero.png"
              alt="hero"
              width={450}
              height={450}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
