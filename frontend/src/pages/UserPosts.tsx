import { useState } from 'react';
import { useFetchUserPosts } from '../hooks';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Spinner } from '../components/Spinner';
import { Appbar } from '../components/Appbar';

const UserPostsComponent = () => {
  const token = localStorage.getItem("token");
  const { data, loading, error } = useFetchUserPosts(token);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Handle loading state for delete

  if (loading)
    return (
      <div className="flex justify-center h-screen flex-col">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  // Check if data is available and is an object with posts array
  if (!data || !Array.isArray(data.posts)) return <p>No posts available</p>;

  // Function to handle delete request
  const deletePost = async (postId: string) => {
    setIsDeleting(postId); // Show loading for the specific post being deleted

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${postId}`, {
        headers: {
          Authorization: `${token}`, // Use Bearer token for authorization
        },
      });

      // Optionally, refetch posts after deletion or update the local state to remove the post
      window.location.reload(); // Quick reload to fetch updated posts after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
    } finally {
      setIsDeleting(null); // Reset the loading state
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center flex-col">
        <div className="flex justify-center">
          <div className="border-2 shadow-md rounded-lg mt-8 px-6">
            <h1 className="text-3xl font-bold mt-5 pb-6 text-center">User Posts</h1>

            {data.posts.map((post) => (
              <div key={post.id} className="grid grid-cols-12 gap-4 items-center text-xl font-semibold pb-4">
                <div className="col-span-10">
                  <p>* {post.title}</p>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    className={`px-4 py-2 text-sm text-white ${
                      isDeleting === post.id ? "bg-gray-400" : "bg-red-500"
                    } rounded`}
                    onClick={() => deletePost(post.id)}
                    disabled={isDeleting === post.id}
                  >
                    {isDeleting === post.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostsComponent;

