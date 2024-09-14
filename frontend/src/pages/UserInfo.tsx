import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { useUser } from "../hooks";

export const UserInfo = () => {
  const { user, loading } = useUser();
 

  if (loading) {
    return (
      <div className="flex justify-center flex-col h-screen " >
        <div className="flex justify-center"> <Spinner/></div>
    
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center mt-28">
        <p>No user information available.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-28">
      <div className="flex">
        <div className="space-y-7 px-11 py-12 rounded-lg border shadow-md">
          <div className="text-2xl font-extrabold">
            User Information
          </div>
          <div className="text-xl font-semibold space-y-3">
            <div>Name:  {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Posts: {user.posts.length}</div>
         <Link to={'/UserPosts'}> <button type="button" className="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
             focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
             dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Posts</button></Link>  
          </div>
        </div>
      </div>
    </div>
  );
};