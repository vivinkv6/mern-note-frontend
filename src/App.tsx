import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateNote from "./components/CreateNote";
import { useUpdateStore } from "./store/updateNoteStore";
import Note from "./pages/Note";
import useAuthStore from "./store/authStore";
function App() {
  const updateNote = useUpdateStore((state) => state.updateNote);
  const getToken = useAuthStore((state) => state.getToken);
  const token = useAuthStore((state) => state.token);
  getToken();
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={token ? <Dashboard /> : <Login />} />
        <Route
          path="dashboard/create"
          element={token ? <CreateNote /> : <Login />}
        />
        <Route path="dashboard/:id" element={token ? <Note /> : <Login />} />
        <Route
          path="dashboard/:id/update"
          element={
            <CreateNote
              id={updateNote?.id}
              title={updateNote?.title}
              image={updateNote?.image}
              content={updateNote?.content}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
