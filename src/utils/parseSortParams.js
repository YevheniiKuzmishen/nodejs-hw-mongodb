import { SORT_ORDER } from '../constans/index.js';

export const parseSortParams = ({ sortBy, sortFields, sortOrder }) => {
  const parsedSortOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];
  const parsedSortBy = sortFields.includes(sortBy) ? sortBy : '_id';
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
