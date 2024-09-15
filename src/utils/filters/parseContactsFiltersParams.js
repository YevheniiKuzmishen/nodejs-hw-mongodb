export const parseContactsFiltersParams = (query) => {
  const { type, isFavourite } = query;

  const filter = {};

  if (type && ['work', 'home', 'personal'].includes(type)) {
    filter.contactType = type;
  }

  if (typeof isFavourite !== 'undefined') {
    filter.isFavourite = isFavourite === 'true';
  }

  return filter;
};
