import { useQueryState, parseAsString } from "nuqs";

/**
 * Hook to read and write a given search parameter key.
 *
 * When reading, returns the current value of the given search parameter key.
 * When writing, updates the search parameter key with the given value.
 *
 * If the key is not provided, defaults to "search".
 *
 * @param key - The search parameter key to read and write.
 * @returns A tuple containing the current value of the search parameter and a
 *   function to update the search parameter.
 */
export const useSearchParam = (key: string) => {
  return useQueryState(
    (key = "search"),
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
};
