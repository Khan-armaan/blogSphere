import { Circle } from "./BlogCard"
export const Skeleton = () => {
    return(
        <div role="status" className="max-w-sm animate-pulse">
       <div className=" p-4 border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
     <div className="flex justify-center flex-col">  <div className="h-2.5 bg-gray-200 rounded-full 4"></div> 
       </div>  <div className="font-extraligt pl-2 text-sm flex justify-center flex-col"> <div className="h-2.5 bg-gray-200 rounded-full 4"></div> 
       </div>  <div className="flex justify-center flex-col font-bold pl-2 ">  <Circle />   </div> 
       <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col"> <div className="h-2.5 bg-gray-200 rounded-full 4"></div></div>
            </div>

            <div className="text-xl font-semibold pt-2">
            <div className="h-2.5 bg-gray-200 rounded-full 4"></div>
            </div>

            <div className="text-md font-thin">
            <div className="h-2.5 bg-gray-200 rounded-full 4"></div>
            </div>

            <div className=" text-slate-500 text-sm font-thin pt-4">
            <div className="h-2.5 bg-gray-200 rounded-full 4"></div>
            </div>

            <span className="sr-only">Loading...</span>

        </div>




        </div>
    )
}