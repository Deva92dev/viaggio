import SearchContent from "@/components/search/SearchContent";
import { SearchPageSkeleton } from "@/components/search/SearchSkeleton";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
