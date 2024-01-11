import { useRef } from "react";
import { TPage } from "@/types";
import GridPostList from "./GridPostList";
import Loader from "./Loader";
import useIntersectionObserver from "@/lib/hooks/useIntersectionObserver";

type PaginatedPostListProps = {
  pages: TPage[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
};

const PaginatedPostList = ({
  pages,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  fetchNextPage,
}: PaginatedPostListProps) => {
  const loadMoreRef = useRef(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  console.log(pages);

  return (
    <div className="mt-5">
      <div>{isLoading && <Loader />}</div>
      <GridPostList pages={pages} />
      <div ref={loadMoreRef} className={!hasNextPage ? "hidden" : ""}>
        {isFetchingNextPage ? <Loader /> : ""}
      </div>
    </div>
  );
};

export default PaginatedPostList;
