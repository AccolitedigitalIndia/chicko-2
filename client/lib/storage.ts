/**
 * Safe localStorage utilities with error handling
 */

export const storage = {
  /**
   * Get item from localStorage with fallback
   */
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage with error handling
   */
  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing from localStorage key "${key}":`, error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  },
};
