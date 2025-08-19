"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { UsePaginationURLProps, UsePaginationURLReturn } from "../types";

/**
 * Hook for managing pagination state in URL parameters
 * Automatically syncs pagination state with URL query params
 */
export const usePaginationURL = ({
  defaultPage = 1,
  defaultPageSize = 20,
  paramNames = {
    page: "page",
    pageSize: "pageSize",
  },
}: UsePaginationURLProps = {}): UsePaginationURLReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get(paramNames.page!);
    return page ? Math.max(1, parseInt(page, 10)) : defaultPage;
  });

  const [pageSize, setPageSizeState] = useState(() => {
    const size = searchParams.get(paramNames.pageSize!);
    return size ? Math.max(1, parseInt(size, 10)) : defaultPageSize;
  });

  // Update URL with new pagination parameters
  const updateURL = useCallback(
    (page: number, size: number) => {
      const params = new URLSearchParams(searchParams);
      params.set(paramNames.page!, page.toString());
      params.set(paramNames.pageSize!, size.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, paramNames]
  );

  const setPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, page);
      setCurrentPage(validPage);
      updateURL(validPage, pageSize);
    },
    [pageSize, updateURL]
  );

  const setPageSize = useCallback(
    (size: number) => {
      const validSize = Math.max(1, size);
      setPageSizeState(validSize);
      setCurrentPage(1); // Reset to first page when page size changes
      updateURL(1, validSize);
    },
    [updateURL]
  );

  const setPageAndSize = useCallback(
    (page: number, size: number) => {
      const validPage = Math.max(1, page);
      const validSize = Math.max(1, size);
      setCurrentPage(validPage);
      setPageSizeState(validSize);
      updateURL(validPage, validSize);
    },
    [updateURL]
  );

  return {
    currentPage,
    pageSize,
    setPage,
    setPageSize,
    setPageAndSize,
  };
};
