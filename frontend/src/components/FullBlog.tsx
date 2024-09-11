import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Appbar />
      <div className="flex justify-center border">
        <div className="grid grid-cols-1 md:grid-cols-12 px-4 md:px-10 w-full pt-8 md:pt-16 pb-8 md:pb-12 max-w-screen-xl md:space-x-16">
          <div className="md:col-span-8">
            <div className="text-3xl md:text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2 text-sm md:text-base">
              Posted on {formattedDate}
            </div>
            <div className="pt-4 text-sm md:text-base">{blog.content}</div>
          </div>
          <div className="md:col-span-4 mt-8 md:mt-0">
            <div className="text-slate-600 text-base md:text-lg">Author</div>

            <div className="flex">
              <div className="pr-2 flex flex-col justify-center mr-3">
                <Avatar size={"big"} name={blog.author.name} />
              </div>
              <div>
                <div className="text-lg md:text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500 text-sm md:text-base">
                  Sharing insights and experiences that captivate and inspire
                  readers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
