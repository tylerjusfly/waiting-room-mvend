import React from "react";
import share from "../assets/share.svg";
import { displayTimeAgo } from "../services/utilities";

const Comments = ({ data }) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-3">
        <img
          className="rounded-full"
          src="https://randomuser.me/api/portraits/men/32.jpg"
          width={40}
        />
        <h5>{data?.name.substring(0, 13)}</h5>
        <span className="is-mute">{displayTimeAgo(data?.date)}</span>
      </div>
      <p>{data?.body.substring(0, 140)}</p>
      <div className="content-footer">
        <button className="btn btn-outline">
          <img src={share} width={30} />
          Reply
        </button>
      </div>
    </div>
  );
};

export default Comments;
