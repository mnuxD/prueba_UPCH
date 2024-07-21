import { useState, useEffect } from "react";

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  initialFilterState?: Partial<Record<string, any>>
) {
  const [data, setData] = useState(initialData);

  /*
   * Handle pagination
   */
  const [currentPage, setCurrentPage] = useState(1);
  function paginatedData(data: T[] = initialData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if (data.length > start) return data.slice(start, end);
    return data;
  }

  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  /*
   * Handle Filters and searching
   */
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );

  function updateFilter(filters: Record<string, any>) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filters
    }));
  }

  function applyFilters() {
    const searchTermLower = searchText.toLowerCase().trim();

    return (
      data
        .filter((item) => {
          const isMatchingItem = Object.entries(filters).every(
            ([columnId, filterValue]) => {
              const itemValue = item[columnId]?.toString().toLowerCase();
              if (itemValue !== filterValue.toString().toLowerCase()) {
                return false;
              }
              return true;
            }
          );
          return isMatchingItem;
        })
        // global search after running filters
        .filter((item) =>
          Object.values(item).some(
            (value) =>
              value && String(value).toLowerCase().includes(searchTermLower)
          )
        )
    );
  }

  /*
   * Handle searching
   */
  function handleSearch(searchValue: string) {
    setSearchText(searchValue);
  }

  /*
   * Reset search and filters
   */

  const handleResetSearch = () => {
    handleSearch("");
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState || {});
  };

  /*
   * Set  final filtered data
   */

  const filteredAndSearchedData = applyFilters();

  const totalItems = filteredAndSearchedData.length;

  const tableData = paginatedData(filteredAndSearchedData);

  /*
   * Go to first page when data is filtered and searched
   */
  useEffect(() => {
    handlePaginate(1);
  }, [totalItems, searchText]);

  // useTable returns
  return {
    tableData,
    // pagination
    currentPage,
    handlePaginate,
    totalItems,
    // searching
    searchText,
    handleSearch,
    handleResetSearch,
    // filters
    filters,
    updateFilter,
    applyFilters,
    handleResetFilters
  };
}
