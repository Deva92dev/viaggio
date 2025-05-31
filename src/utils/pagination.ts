import { PaginationType } from "./types";

export const getValidatedPage = (
  pageParams: string,
  totalItems: number,
  limit: number
): PaginationType => {
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  let page = parseInt(pageParams || "1", 10);

  if (isNaN(page) || page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const offset = (page - 1) * limit;

  return {
    page,
    offset,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
  };
};
