import React, { useState } from "react";

import editPen from "../assets/edit.svg";
import cancelButton from "../assets/cancel.svg";

import { notifyError, notifySuccess } from "../services/notify";
import {
  canEdit,
  displayTimeAgo,
  fetchTypicodeApi,
} from "../services/utilities";
import { useAuthContext } from "../hooks/useAuthContext";

const ViewPost = ({ item, setcanView, update, posts }) => {
  const { user } = useAuthContext();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [content, setContent] = useState(item);

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
      const result = await fetchTypicodeApi(
        `https://jsonplaceholder.typicode.com/posts/${item.id}`,
        "PUT",
        values
      );

      update(posts, result);
      setContent(result);

      console.log(result);
      notifySuccess("saved");
    } catch (error) {
      notifyError(error || "unable to edit post");
    }
  };

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="space-y-5">
        {editing && (
          <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <form
              class="px-8 py-6 space-y-6 overflow-hidden bg-white rounded-md shadow-lg transition duration-300 ease-in-out transform"
              onSubmit={editUserPost}
            >
              <div>
                <button
                  onClick={() => setEditing(false)}
                  type="button"
                  class="flex flex-col items-center text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg
                    class="w-7 h-7"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span class="text-xs font-semibold text-center leading-3 uppercase">
                    Esc
                  </span>
                </button>
              </div>
              <div class="mb-5">
                <label for="name" class="block mb-2 font-bold text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={title}
                  placeholder="Provide a title for Post."
                  className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div class="mb-5">
                <label for="body" class="block mb-2 font-bold text-gray-600">
                  Body
                </label>
                <input
                  type="text"
                  id="body"
                  name="body"
                  value={body}
                  placeholder="Provide a Body."
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={(e) => setBody(e.target.value)}
                />
                <p class="text-sm text-red-400 mt-2">Post Body is Required</p>
              </div>
              <button class="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        )}

        <div className="p-3 bg-white shadow rounded-lg">
          <div className="border-b flex flex-wrap justify-between">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">
              {content.title}
            </h3>
            <div className="flex flex-row">
              {/* IF User is the owner of Post */}
              {canEdit(user, content) && (
                <span
                  className="cursor-pointer"
                  onClick={() => setEditing(true)}
                >
                  <img src={editPen} width={40} />
                </span>
              )}
              <span
                className="cursor-pointer"
                onClick={() => setcanView(false)}
              >
                <img src={cancelButton} width={40} />
              </span>
            </div>
          </div>
          <p className="pt-4">{content.body}</p>
          <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 mt-4 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
            <svg
              aria-hidden="true"
              class="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {displayTimeAgo(content.date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
