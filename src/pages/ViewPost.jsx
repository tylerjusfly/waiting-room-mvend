import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import editPen from "../assets/edit.svg";
import { notifyError } from "../services/notify";
import { fetchTypicodeApi } from "../services/utilities";

const ViewPost = () => {
  const location = useLocation();
  const data = location.state;

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);

  // const editUserPost = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await fetchTypicodeApi(
  //       "https://jsonplaceholder.typicode.com/posts/1",
  //       "PUT"
  //     );
  //   } catch (error) {
  //     notifyError(error || "unable to edit post");
  //   }
  // };

  console.log(data);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="space-y-5">
        {/* Transition Starts */}
        <transition
          enter-active-class="transition duration-300 ease-out transform"
          enter-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          {editing && (
            <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <form class="px-8 py-6 space-y-6 overflow-hidden bg-white rounded-md shadow-lg transition duration-300 ease-in-out transform">
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
        </transition>

        <div className="p-3 bg-white shadow rounded-lg">
          <div className="border-b flex flex-wrap justify-between">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">
              {data.title}
            </h3>
            <span className="cursor-pointer" onClick={() => setEditing(true)}>
              <img src={editPen} width={40} />
            </span>
          </div>
          <p className="pt-4">{data.body}</p>
          <p>Date Posted</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
