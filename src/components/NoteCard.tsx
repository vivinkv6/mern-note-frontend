import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../base/interceptor";
import { AxiosError } from "axios";
import { useUpdateStore } from "../store/updateNoteStore";

interface NoteCardProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  refetch: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  description,
  image,
  _id,
  refetch,
}) => {
  const navigation = useNavigate();
  const addNote = useUpdateStore((state) => state.addNote);

  const deleteNote = (id: string) => {
    console.log(id);
    instance
      .delete(`/api/notes/${id}`)
      .then((res) => {
        console.log(res);

        if (res.data) {
          refetch();
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);

        console.log(err.response?.data);
      });
  };

  const getUpdateNote = (
    id: string,
    content: string,
    image: string,
    title: string
  ) => {
    addNote({ id: id, content: content, image: image, title: title });
    navigation(`/dashboard/${id}/update`);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <Link to={`/dashboard/${_id}`} key={_id}>
        {" "}
        {image && (
          <img src={image} alt="Banner" className="w-full h-32 object-cover" />
        )}
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">
          {description.length > 30
            ? description.slice(0, 30) + "..."
            : description}
        </p>
      </div>
      <div className="flex justify-center gap-5 items-center m-3">
        <button
          onClick={() => deleteNote(_id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
        >
          DELETE
        </button>
        <button
          onClick={() => getUpdateNote(_id, description, image, title)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
