import React from "react";

const Note: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-2xl  rounded-lg shadow-lg">
        <div className="h-48 bg-green-500 flex items-center justify-center rounded-t-lg">
          <img
            src="https://via.placeholder.com/300x150"
            className="w-full h-full rounded-t-md"
            alt=""
          />
        </div>
        <div className="p-4 ">
          <h1 className="text-black text-4xl font-semibold mb-4">Title</h1>
          <ul className="space-y-2 text-gray-700">
            <li className=" h-4 rounded">Hello World</li>
            <li className="bg-gray-700 h-4 rounded"></li>
            <li className="bg-gray-700 h-4 rounded"></li>
            <li className="bg-gray-700 h-4 rounded"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Note;
