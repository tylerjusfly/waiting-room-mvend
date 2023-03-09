import { formatDistanceToNow, parseISO } from "date-fns";

export const fetchTypicodeApi = async (url, method, data) => {
  const response = await fetch(`${url}`, {
    method: method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const displayTimeAgo = (timeStamp) => {
  const date = parseISO(timeStamp);
  const timePeriod = formatDistanceToNow(date);
  return `${timePeriod} ago`;
};
