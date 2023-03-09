import { formatDistanceToNow, parseISO } from "date-fns";
import { Users } from "./dummydata";

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

export const updateArray = (list, payload) => {
  const data = list.find((d) => d.id === payload.id);
  if (data) {
    const index = list.findIndex((d) => d.id === payload.id);

    return [
      ...list.slice(0, index),
      { ...data, ...payload },
      ...list.slice(index + 1),
    ];
  }

  return list;
};

export const findUsername = (userid) => {
  let userObj = Users.find((user) => user.id === userid);

  return userObj ? userObj.username : "guest";
};

export const canEdit = (user, post) => user.id === post.userId;
