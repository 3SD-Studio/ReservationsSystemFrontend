import React from "react"
import { useLocation } from "react-router-dom"

/**
 * Fixes the minutes string by adding a leading zero if the minutes value is less than 10.
 * 
 * @param {number} minutes - The minutes value to be fixed.
 * @returns {string} - The fixed minutes string.
 */
export function fixMinutesString(minutes) {
  return minutes < 10 ? '0' + minutes : minutes
}
/**
 * Function maps index of month to its name.
 *
 * @param {number} month - Month number (0-indexed).
 * @returns {string} Month name.
 */

export const getMonthString = (month) => {
  let array = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December']

  return array[month >= 0 ? month % 12 : 12 + (month % 12)]
}
/**
 * Custom hook that parses the query parameters from the current URL.
 *
 * @returns {URLSearchParams} The parsed query parameters.
 */
export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
