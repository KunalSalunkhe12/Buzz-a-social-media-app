import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import PaginatedPostList from "@/components/shared/PaginatedPostList";
import Loader from "@/components/shared/Loader";
import useDebounce from "@/lib/hooks/useDebounce";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  const {
    data: postData,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isLoadingPosts,
    error: getPostsError,
  } = useGetPosts();

  const {
    data: searchData,
    isSuccess: isSearchSuccess,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
    isPending: isLoadingSearchPosts,
    error: searchPostsError,
  } = useSearchPosts(debouncedValue);

  if (getPostsError || searchPostsError) {
    if (getPostsError) throw Error(getPostsError.message);
    else throw Error(searchPostsError?.message);
  }

  return (
    <>
      <h2 className="text-sm md:text-xl font-semibold">Search Posts</h2>
      <div className="flex gap-1 items-center bg-slate-800 rounded-md">
        <img src="assets/icons/search.svg" alt="search" className="ml-2 h-4" />
        <Input
          type="text"
          className="bg-slate-800 border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="mt-2 md:mt-5">
        <p>Popular today</p>
        {/* Check if search value exists, based on it render search posts or all posts */}
        {debouncedValue
          ? isSearchSuccess && (
              <PaginatedPostList
                fetchNextPage={fetchNextSearchPage}
                hasNextPage={hasNextSearchPage}
                isFetchingNextPage={isFetchingNextSearchPage}
                isLoading={isLoadingSearchPosts}
                pages={searchData.pages}
              />
            )
          : isSuccess && (
              <PaginatedPostList
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isLoading={isLoadingPosts}
                pages={postData.pages}
              />
            )}
        {(isLoadingPosts || isLoadingSearchPosts) && <Loader />}
      </div>
    </>
  );
};

export default Explore;
