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
            Transform your wardrobe with personalized designs! Our platform helps you create aesthetic clothing, bags, and accessories by adding your favorite designs to fabric items. Express your unique style with our easy-to-use customization tools.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="text-6xl animate-bounce">
              🎨
            </div>
            <div className="text-4xl animate-pulse">
              ✨
            </div>
            <div className="text-5xl animate-spin" style={{ animationDuration: '3s' }}>
              🌟
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <div className="p-4 bg-white border-4 border-indigo-600 rounded-2xl shadow-xl transform transition-transform hover:scale-105">
            <Image
              src="/hero.png"
              alt=""
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
