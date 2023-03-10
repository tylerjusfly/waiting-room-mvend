import React from "react";

const EditForm = ({ title, body, editUserPost, setEditing, setBody, setTitle }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        className="px-8 py-6 space-y-6 overflow-hidden bg-white rounded-md shadow-lg transition duration-300 ease-in-out transform"
        onSubmit={editUserPost}
      >
        <div>
          <button
            onClick={() => setEditing(false)}
            type="button"
            className="flex flex-col items-center text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span className="text-xs font-semibold text-center leading-3 uppercase">Esc</span>
          </button>
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 font-bold text-gray-600">
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

        <div className="mb-5">
          <label htmlFor="body" className="block mb-2 font-bold text-gray-600">
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
          <p className="text-sm text-red-400 mt-2">Post Body is Required</p>
        </div>
        <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
