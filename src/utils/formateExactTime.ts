  export function formateExactTime(createdAt: string): string {
    const postDate = new Date(createdAt);
    const now = new Date();

    // Convert the Date objects to numbers (milliseconds)
    const diffMs: number = now.getTime() - postDate.getTime();
    const diffSec: number = Math.floor(diffMs / 1000);
    const diffMin: number = Math.floor(diffSec / 60);
    const diffHour: number = Math.floor(diffMin / 60);
    const diffDay: number = Math.floor(diffHour / 24);

    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const timeString = postDate.toLocaleTimeString(undefined, options);
    const day: number = postDate.getDate();
    const month: string = postDate.toLocaleString(undefined, { month: 'long' });
    const year: number = postDate.getFullYear();
    const currentYear: number = now.getFullYear();

    
    if (diffSec < 60) {
      return 'Just now';
    } else if (diffMin < 60) {
      return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffDay === 1) {
      return `Yesterday at ${timeString}`;
    } else if (year === currentYear) {
      return `${day} ${month} at ${timeString}`;
    } else {
      return `${day} ${month} ${year} at ${timeString}`;
    }
  }// Example date
  