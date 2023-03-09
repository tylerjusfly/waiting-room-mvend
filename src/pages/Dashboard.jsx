import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { notifyError, notifySuccess } from "../services/notify";
import {
  displayTimeAgo,
  fetchTypicodeApi,
  updateArray,
} from "../services/utilities";

import Delete from "../assets/delete.svg";

import ViewPost from "./ViewPost";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [post, setPost] = useState("");
  const [loading, setloading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [item, setItem] = useState();

  const [canView, setCanView] = useState(false);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const CreatePost = async (e) => {
    e.preventDefault();
    try {
      const values = {
        title: "foo",
        body: post,
        userId: user.id,
        date: new Date().toISOString(),
      };

      const postResult = await fetchTypicodeApi(
        "https://jsonplaceholder.typicode.com/posts",
        "POST",
        values
      );

      if (postResult) {
        notifySuccess("posted Successfully");
        setPosts([...posts, postResult]);
      }
    } catch (error) {
      console.log(error);
      notifyError("error posting data");
    }
  };

  const fetchAllPosts = useCallback(async () => {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`;

      const result = await fetchTypicodeApi(url, "GET");

      result.forEach((obj) => {
        obj.date = new Date().toISOString();
      });

      setPosts(result);
      // dispatch({ type: "ADD_ALL", payload: result });
      setloading(false);
    } catch (error) {
      notifyError("error fetching posts");
    }
  }, [user.id]);

  const deletePost = async (id) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      const result = await fetchTypicodeApi(url, "DELETE");

      const data_id = posts.findIndex((p) => p.id === id);
      console.log(data_id);

      let dataLeft = posts.slice(data_id + 1, posts.length);

      setPosts(dataLeft);

      console.log(result);
    } catch (error) {
      console.log(error);
      notifyError("error deleting post");
    }
  };

  const updatePostArray = (list, payload) => {
    const mutatedData = updateArray(list, payload);
    console.log("mutate", mutatedData);
    setPosts(mutatedData);
  };

  useEffect(() => {
    if (loading) {
      fetchAllPosts();
    }
  }, []);

  return (
    <>
      {!canView && (
        <div>
          <form className="m-8" onSubmit={CreatePost}>
            <h3>Hello {user?.user}</h3>
            <textarea
              className="w-full p-4 border-0 my-10"
              placeholder="What's on your mind..."
              rows="6"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
            <button className="button bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2  mx-10 rounded">
              Make a post
            </button>
          </form>

          <div className="container my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {loading ? (
                <h1>Loading....</h1>
              ) : (
                orderedPosts.map((item, index) => (
                  <div
                    key={index}
                    className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                  >
                    <article className="overflow-hidden rounded-lg shadow-lg">
                      <p className="p-5">{item.body.substring(0, 100)}...</p>

                      <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 className="text-lg">
                          <span
                            onClick={() => {
                              setCanView(true);
                              setItem(item);
                            }}
                            className="no-underline hover:underline text-black text-sm"
                          >
                            {item.title.substring(0, 17)}
                          </span>
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
                          <p className="ml-2 text-sm">{user.user}</p>
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
          </div>
        </div>
      )}
      {canView && (
        <ViewPost
          item={item}
          setcanView={setCanView}
          update={updatePostArray}
          posts={posts}
        />
      )}
    </>
  );
};

export default Dashboard;
