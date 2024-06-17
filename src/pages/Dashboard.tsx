import React from "react";
import NoteCard from "../components/NoteCard";
import { FiLogOut, FiPlus } from "react-icons/fi";
import Logo from "../assets/logo.png";
import { Link,useNavigate } from "react-router-dom";
const notes = new Array(9).fill({
  title: "Title",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: "https://via.placeholder.com/300x150",
});

const Dashboard: React.FC = () => {

  const navigation=useNavigate();
 
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white h-20 shadow p-4 flex justify-between items-center">
        <img src={Logo} className="h-48" alt="" />
        <div className="flex items-center space-x-4">
          <span>hello12@gmail.com</span>
          <button onClick={()=>navigation('/',{
            replace:true
          })} className="p-2 bg-red-500 text-white rounded-full">
            <FiLogOut />
          </button>
        </div>
      </header>
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            title={note.title}
            content={note.content}
            image={note.image}
          />
        ))}
        <Link to='/dashboard/create' className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg">
          <FiPlus size={24} />
        </Link>
      </main>
    </div>
  );
};

export default Dashboard;
