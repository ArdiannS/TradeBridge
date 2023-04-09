import React from "react";

import { PhoneIcon, ArrowSmRightIcon } from "@heroicons/react/outline";
import { ChipIcon, SupportIcon } from "@heroicons/react/solid";

const Support = () => {
  return (
    <div name="support" className="w-full mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-1   text-black">
        <div className="bg-white rounded-xl shadow-2xl">
          <div className="p-8">
            <PhoneIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
            <h3 className="font-bold text-2xl my-6">Sales</h3>
            <p className="text-gray-600 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              provident iure placeat blanditiis ea sint earum hic iste quibusdam
              exercitationem.
            </p>
          </div>
          <div className="bg-slate-100 pl-8 py-4 ">
            <p className="flex items-center text-indigo-600 ">
              <ArrowSmRightIcon className="w-5 ml-2 " />
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-2xl">
          <div className="p-8">
            <SupportIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem] " />
            <h3 className="font-bold text-2xl my-6">Technical Support</h3>
            <p className="text-gray-600 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              provident iure placeat blanditiis ea sint earum hic iste quibusdam
              exercitationem.
            </p>
          </div>
          <div className="bg-slate-100 pl-8 py-4">
            <p className="flex items-center text-indigo-600">
              <ArrowSmRightIcon className="w-5 ml-2" />
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-2xl">
          <div className="p-8">
            <ChipIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
            <h3 className="font-bold text-2xl my-6">Media Inquiries</h3>
            <p className="text-gray-600 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              provident iure placeat blanditiis ea sint earum hic iste quibusdam
              exercitationem.
            </p>
          </div>
          <div className="bg-slate-100 pl-8 py-4">
            <p className="flex items-center text-indigo-600">
              <ArrowSmRightIcon className="w-5 ml-2" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
