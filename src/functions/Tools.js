/**
 * Fixes the minutes string by adding a leading zero if the minutes value is less than 10.
 * 
 * @param {number} minutes - The minutes value to be fixed.
 * @returns {string} - The fixed minutes string.
 */
export function fixMinutesString(minutes) {
  return minutes < 10 ? '0' + minutes : minutes
}