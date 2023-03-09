import React, { useCallback, useEffect, useState } from "react";

import Delete from "../assets/delete.svg";
import { notifyError } from "../services/notify";
import { displayTimeAgo, fetchTypicodeApi } from "../services/utilities";

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const orderedAllPosts = allPosts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const fetchAllPosts = useCallback(async () => {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts`;

      const result = await fetchTypicodeApi(url, "GET");

      result.forEach((obj) => {
        obj.date = new Date().toISOString();
      });
      console.log(result);
      setAllPosts(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      notifyError("error fetching posts");
    }
  }, []);

  useEffect(() => {
    if (loading) {
      fetchAllPosts();
    }
  }, []);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  // set Page Size
  const PageSize = 10;
  const totalPages = Math.ceil(allPosts.length / PageSize);
  const startItem = (currentPage - 1) * PageSize;
  const endItem = startItem + PageSize;

  const currentList = orderedAllPosts.slice(startItem, endItem);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {loading ? (
          <h1>Loading....</h1>
        ) : (
          currentList.map((item, index) => (
            <div
              key={index}
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
            >
              <article className="overflow-hidden rounded-lg shadow-lg">
                <p className="p-5">{item.body.substring(0, 100)}...</p>

                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                      ccnnc
                    </a>
                  </h1>
                  <p className="text-grey-darker text-sm">
                    {displayTimeAgo(item.date)}
                  </p>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <a
                    className="flex items-center no-underline hover:underline text-black"
                    href="#"
                  >
                    <img
                      alt="Placeholder"
                      className="block rounded-full"
                      src="https://picsum.photos/32/32/?random"
                    />
                    <p className="ml-2 text-sm">jjjjjj</p>
                  </a>
                  <span
                    className="no-underline text-grey-darker hover:text-red-dark cursor-pointer"
                    //   onClick={() => {
                    //     deletePost(item.id);
                    //   }}
                  >
                    <img src={Delete} />
                  </span>
                </footer>
              </article>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="container mx-auto px-4 py-5">
        <nav
          className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
          aria-label="Pagination"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              onClick={() => handleClick(page)}
              className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              href="#"
              title={`Page ${page}`}
            >
              {page}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AllPosts;