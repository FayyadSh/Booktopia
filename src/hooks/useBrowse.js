import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const useBrowse = (onParamsChange) => {
  
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const routesRequiringBrowse = [
    "/newbooks",
    "/categories/",
    "/authors/",
    "/search/",
  ];

  const isBrowseRoute = routesRequiringBrowse.some((route) =>
    location.pathname.startsWith(route)
  );

  const DEFAULT_PARAMS = {
    offset: "0",
    sortType: "rating",
    sortDirection: "asc",
    page: "1",
    part: "1",
  };

  // Initialize search parameters if missing
  useEffect(() => {
    if(isBrowseRoute){
      let updatedParams = {};
      let hasUpdates = false;
  
      Object.entries(DEFAULT_PARAMS).forEach(([key, defaultValue]) => {
        if (!searchParams.has(key)) {
          updatedParams[key] = defaultValue;
          hasUpdates = true;
        }
      });
  
      if (hasUpdates) {
        const updatedSearchParams = {
          ...Object.fromEntries(searchParams.entries()),
          ...updatedParams,
        };
        setSearchParams(updatedSearchParams);
        onParamsChange?.(updatedSearchParams);
      }
    }
  }, [searchParams, setSearchParams, onParamsChange]);

  return {
    offset: parseInt(searchParams.get("offset") || DEFAULT_PARAMS.offset, 10),
    sortType: searchParams.get("sortType") || DEFAULT_PARAMS.sortType,
    sortDirection: searchParams.get("sortDirection") || DEFAULT_PARAMS.sortDirection,
    page: parseInt(searchParams.get("page") || DEFAULT_PARAMS.page, 10),
    part: parseInt(searchParams.get("part") || DEFAULT_PARAMS.part, 10),
    setSearchParams,
    isBrowseRoute
  };
};

export default useBrowse;
