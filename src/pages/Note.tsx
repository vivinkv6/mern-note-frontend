import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
const Note: React.FC = () => {
  const { id } = useParams();
  console.log(id);

  const {
    data: note,
    error,
    isLoading,
    failureReason,
  } = useFetch(`/api/notes/${id}`, "note");
  console.log({ note, error, isLoading, failureReason });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-2xl  rounded-lg shadow-lg">
        <div className="h-48 flex items-center justify-center rounded-t-lg">
          <img
            src={note?.image}
            className="w-full h-full rounded-t-md"
            alt=""
          />
        </div>
        <div className="p-4 ">
          <h1 className="text-black text-4xl font-semibold mb-4">
            {note?.title}
          </h1>
          <ul className="space-y-2 text-gray-700">
            <li className=" h-4 rounded">{note?.description}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Note;
