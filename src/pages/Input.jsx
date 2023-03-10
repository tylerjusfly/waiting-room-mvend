import React from "react";

const Input = ({ name, save, ...rest }) => {
  return (
    <div class="group w-72 md:w-80 lg:w-96">
      <label
        for="8"
        class="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
      >
        {name}
      </label>
      <div class="relative flex items-center">
        <input
          id="8"
          type="text"
          class="peer relative h-10 w-full rounded-md bg-gray-50 pl-4 pr-20 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
          {...rest}
        />
        <button
          class="absolute right-0 h-10 w-16 rounded-r-md bg-blue-200 text-xs font-semibold text-white transition-all duration-200 ease-in-out group-focus-within:bg-blue-400 group-focus-within:hover:bg-blue-600"
          onClick={save}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
