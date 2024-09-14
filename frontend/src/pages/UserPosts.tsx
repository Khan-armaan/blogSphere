import { useState } from 'react';
import { useFetchUserPosts } from '../hooks';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const UserPostsComponent = () => {
  const token = localStorage.getItem("token");
  const { data, loading, error } = useFetchUserPosts(token);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Handle loading state for delete

  if (loading) return <p>Loading...</p>;
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
    <div className="flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <h1 className="text-3xl font-bold mt-16 mb-10">User Posts</h1>
          {data.posts.map((post) => (
            <div key={post.id} className="flex items-center text-xl font-semibold">
              <p> * {post.title}</p>
              <button
                className={`ml-4 px-2 py-1 text-sm text-white ${
                  isDeleting === post.id ? "bg-gray-400" : "bg-red-500"
                } rounded`}
                onClick={() => deletePost(post.id)} // Corrected to use post.id
                disabled={isDeleting === post.id} // Disable button while deleting
              >
                {isDeleting === post.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPostsComponent;

