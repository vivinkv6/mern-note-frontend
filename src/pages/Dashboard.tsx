import React from "react";
import NoteCard from "../components/NoteCard";
import { FiLogOut, FiPlus } from "react-icons/fi";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Cookies from "js-cookie";
import { useFetch } from "../hooks/useFetch";
import Empty from "../assets/empty.jpg";

// const notes = new Array(9).fill({
//   title: "Title",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   image: "https://via.placeholder.com/300x150",
// });

type NoteType = {
  _id: string;
  user: string;
  title: string;
  description: string;
  image: string;
};

const Dashboard: React.FC = () => {
  const clearToken = useAuthStore((state) => state.clearToken);
  const user = useAuthStore((state) => state.user);

  const navigation = useNavigate();

  const { data: notes, status, refetch } = useFetch("/api/notes", "notes");
  console.log(status);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white h-20 shadow p-4 flex justify-between items-center">
        <img src={Logo} className="h-48" alt="" />
        <div className="flex items-center space-x-4">
          <span>{user}</span>
          <button
            onClick={() => {
              Cookies.remove("token");
              clearToken();
              navigation("/login", {
                replace: true,
              });
            }}
            className="p-2 bg-red-500 text-white rounded-full"
          >
            <FiLogOut />
          </button>
        </div>
      </header>
      {notes?.length < 1 && (
          <div className="w-[100%] h-[100dvh]  flex flex-col justify-center items-center gap-5">
            <img
              src={Empty}
              className=" h-52 w-52 lg:h-96 lg:w-96 md:h-60 md:w-60 rounded-lg"
              alt=""
            />
            <h1 className="text-2xl font-medium">No Notes Available</h1>
          </div>
        )}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
       

        {notes?.map((note: NoteType) => (
          <NoteCard
            _id={note._id}
            title={note.title}
            description={note.description}
            image={note.image}
            refetch={refetch}
          />
        ))}
        <Link
          to="/dashboard/create"
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
        >
          <FiPlus size={24} />
        </Link>
      </main>
    </div>
  );
};

export default Dashboard;
