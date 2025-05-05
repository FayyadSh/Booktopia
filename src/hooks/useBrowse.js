import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

/**
 * Custom hook for managing browse-related functionality and URL parameters
 * @param {Function} onParamsChange - Callback function to be called when parameters change
 * @returns {Object} - Object containing browse-related parameters and functions
 */
const useBrowse = (onParamsChange) => {
  // Get search parameters and setter function from react-router
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current location to determine if we're on a browse route
  const location = useLocation();

  // Define routes that require browse functionality
  const routesRequiringBrowse = [
    "/newbooks",
    "/categories/",
    "/authors/",
    "/search/",
  ];

  // Check if current route is a browse route
  const isBrowseRoute = routesRequiringBrowse.some((route) =>
    location.pathname.startsWith(route)
  );

  // Default parameter values for browse functionality
  const DEFAULT_PARAMS = {
    offset: "0",          // Pagination offset
    sortType: "rating",   // Default sort field
    sortDirection: "asc", // Default sort direction
    page: "1",           // Current page number
    part: "1",           // Current part/section
  };

  /**
   * Effect to initialize missing search parameters with default values
   * Only runs on browse routes and when parameters change
   */
  useEffect(() => {
    if (isBrowseRoute) {
      let updatedParams = {};
      let hasUpdates = false;

      // Check each default parameter and add if missing
      Object.entries(DEFAULT_PARAMS).forEach(([key, defaultValue]) => {
        if (!searchParams.has(key)) {
          updatedParams[key] = defaultValue;
          hasUpdates = true;
        }
      });

      // Update parameters if any were missing
      if (hasUpdates) {
        const updatedSearchParams = {
          ...Object.fromEntries(searchParams.entries()),
          ...updatedParams,
        };
        setSearchParams(updatedSearchParams);
        onParamsChange?.(updatedSearchParams);
      }
    }
  }, [searchParams, setSearchParams, onParamsChange, isBrowseRoute]);

  // Return current parameter values and utility functions
  return {
    offset: parseInt(searchParams.get("offset") || DEFAULT_PARAMS.offset, 10),       // Current offset as number
    sortType: searchParams.get("sortType") || DEFAULT_PARAMS.sortType,               // Current sort type
    sortDirection: searchParams.get("sortDirection") || DEFAULT_PARAMS.sortDirection, // Current sort direction
    page: parseInt(searchParams.get("page") || DEFAULT_PARAMS.page, 10),             // Current page as number
    part: parseInt(searchParams.get("part") || DEFAULT_PARAMS.part, 10),             // Current part as number
    setSearchParams,                                                                 // Function to update search params
    isBrowseRoute                                                                    // Boolean indicating if current route is a browse route
  };
};

export default useBrowse;