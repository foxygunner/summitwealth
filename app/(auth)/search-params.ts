import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsParsers = {
  ref: parseAsString,
  token: parseAsString,
  error: parseAsString,
  callbackURL: parseAsString,
};

export const verifParamsParser = {
  email: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);

export const verifParamsCache = createSearchParamsCache(verifParamsParser);
