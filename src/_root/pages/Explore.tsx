import { useState } from "react";
import { Input } from "@/components/ui/input";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <h2 className="text-sm md:text-xl font-semibold">Search Posts</h2>
        <div className="flex gap-1 items-center bg-slate-800 rounded-md">
          <img
            src="assets/icons/search.svg"
            alt="search"
            className="ml-2 h-4"
          />
          <Input
            type="text"
            className="bg-slate-800 border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="mt-2 md:mt-5">
          <p>Popular today</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
