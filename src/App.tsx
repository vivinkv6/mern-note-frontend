import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateNote from "./components/CreateNote";
import { useUpdateStore } from "./store/updateNoteStore";
function App() {

  const updateNote=useUpdateStore(state=>state.updateNote);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/create" element={<CreateNote />} />
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
