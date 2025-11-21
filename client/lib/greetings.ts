/**
 * Get time-based greeting based on current hour
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

/**
 * Get personalized greeting message
 * @param name - User's name
 * @returns Personalized greeting string
 */
export function getPersonalizedGreeting(name: string): string {
  const greeting = getTimeBasedGreeting();
  return name ? `${greeting}, ${name}` : greeting;
}

/**
 * Get greeting emoji based on time of day
 */
export function getGreetingEmoji(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "☀️";
  } else if (hour >= 12 && hour < 17) {
    return "🌤️";
  } else if (hour >= 17 && hour < 22) {
    return "🌆";
  } else {
    return "🌙";
  }
}
