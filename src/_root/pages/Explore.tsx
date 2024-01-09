import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetPosts } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import useIntersectionObserver from "@/lib/hooks/useIntersectionObserver";
import GridPostList from "@/components/shared/GridPostList";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetPosts();

  const loadMoreRef = useRef(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

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
          <div className="mt-8">
            {isSuccess && <GridPostList pages={data.pages} />}
          </div>

          <div ref={loadMoreRef} className={!hasNextPage ? "hidden" : ""}>
            {isFetchingNextPage ? <Loader /> : ""}
          </div>

          <div>{isPending && <Loader />}</div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
