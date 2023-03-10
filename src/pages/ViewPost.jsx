import React, { useEffect, useState } from "react";

import editPen from "../assets/edit.svg";
import cancelButton from "../assets/cancel.svg";

import { notifyError, notifySuccess } from "../services/notify";
import { displayTimeAgo, fetchTypicodeApi, hasAccess } from "../services/utilities";
import { useAuthContext } from "../hooks/useAuthContext";
import Comments from "./Comments";

import EditForm from "../components/forms/EditForm";

const ViewPost = ({ item, setcanView, update, posts }) => {
  const { user } = useAuthContext();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [content, setContent] = useState(item);
  const [loading, setLoading] = useState(true);
  const [displayComments, setDisplayComments] = useState([]);

  const editUserPost = async (e) => {
    e.preventDefault();
    const values = {
      id: item.id,
      title: title,
      body: body,
      userId: item.userId,
      date: new Date().toISOString(),
    };

    try {
      const result = await fetchTypicodeApi(`https://jsonplaceholder.typicode.com/posts/${item.id}`, "PUT", values);

      update(posts, result);
      setContent(result);

      console.log(result);
      notifySuccess("saved");
    } catch (error) {
      notifyError(error || "unable to edit post");
    }
  };

  const fetchComments = async () => {
    try {
      const comments = await fetchTypicodeApi(`https://jsonplaceholder.typicode.com/comments?postId=${content.id}`, "GET");

      comments.forEach((obj) => {
        obj.date = new Date().toISOString();
      });

      console.log("comments==> ", comments);

      setDisplayComments(comments);
      setLoading(false);
    } catch (error) {
      console.log(error);
      notifyError("unable to fetch comments");
    }
  };

  useEffect(() => {
    if (loading) {
      fetchComments();
    }
  }, []);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="space-y-5">
        {editing && (
          <EditForm title={title} body={body} setBody={setBody} setTitle={setTitle} editUserPost={editUserPost} setEditing={setEditing} />
        )}
        <div className="p-3 bg-white shadow rounded-lg">
          <div className="border-b flex flex-wrap justify-between">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">{content.title}</h3>
            <div className="flex flex-row">
              {/* IF User is the owner of Post */}
              {hasAccess(user, content) && (
                <span className="cursor-pointer" onClick={() => setEditing(true)}>
                  <img src={editPen} width={40} />
                </span>
              )}
              <span className="cursor-pointer" onClick={() => setcanView(false)}>
                <img src={cancelButton} width={40} />
              </span>
            </div>
          </div>
          <p className="pt-4">{content.body}</p>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 mt-4 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
            <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              ></path>
            </svg>
            {displayTimeAgo(content.date)}
          </span>
        </div>

        {/* Comments */}
        <div className="comment">
          {loading ? <h1>Loading....</h1> : displayComments.map((item, index) => <Comments key={index} data={item} />)}
        </div>
        {/* Comment Ends */}
      </div>
    </div>
  );
};

export default ViewPost;
