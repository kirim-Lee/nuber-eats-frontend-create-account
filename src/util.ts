export const getTimeAgo = (date: string) => {
  const now = new Date().getTime();
  const from = new Date(date).getTime();
  const diff = (now - from) / 1000;
  const day = 24 * 60 * 60;
  const hour = 60 * 60;
  const minute = 60;

  if (diff > day) {
    const days = Math.ceil(diff / day);
    return days > 7 ? 'more 7 days ago' : Math.ceil(diff / day) + 'days ago';
  } else if (diff > hour) {
    return Math.ceil(diff / hour) + ' hours ago';
  } else if (diff > minute) {
    return Math.ceil(diff / minute) + ' minutes ago';
  } else {
    return 'few second ago';
  }
};
