import React from "react";
import { ClipboardList, Palette, CreditCard } from "lucide-react";

const ThreeStepProcess = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-black mb-6 leading-tight">
          3 Simple Steps To Process
        </h2>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
          At MyDearCity Builders Private Limited, we streamline your construction journey with our efficient three-step 
          process—making it simple, clear, and effective. Here&apos;s how we bring your vision to life:
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Step 1: Planning */}
        <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="absolute -top-4 left-8 bg-gradient-to-br from-red-500 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold">
            STEP 01
          </div>
          <div className="w-20 h-20 bg-white border-2 border-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <ClipboardList className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-4 text-center">Planning</h3>
          <p className="text-gray-700 leading-relaxed text-center">
            We create a detailed roadmap, handle permits, and ensure your project starts with a strong foundation for success.
          </p>
        </div>

        {/* Step 2: Design */}
        <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="absolute -top-4 left-8 bg-gradient-to-br from-red-500 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold">
            STEP 02
          </div>
          <div className="w-20 h-20 bg-white border-2 border-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Palette className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-4 text-center">Design</h3>
          <p className="text-gray-700 leading-relaxed text-center">
            Our experts craft innovative designs tailored to your vision using advanced tools and cutting-edge technology.
          </p>
        </div>

        {/* Step 3: Get Paid */}
        <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="absolute -top-4 left-8 bg-gradient-to-br from-red-500 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold">
            STEP 03
          </div>
          <div className="w-20 h-20 bg-white border-2 border-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <CreditCard className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-4 text-center">Get Paid</h3>
          <p className="text-gray-700 leading-relaxed text-center">
            We deliver exceptional results with transparent invoicing and flexible payment options for your convenience.
          </p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Your Construction Journey Simplified
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
          With Planning, Design, and Get Paid, MyDearCity Builders Private Limited simplifies the complexities of construction, ensuring a smooth, efficient, and rewarding experience for every client.
        </p>
      </div>
    </section>
  );
};

export default ThreeStepProcess;