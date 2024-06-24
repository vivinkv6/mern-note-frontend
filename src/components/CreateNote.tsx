import React, { useState } from "react";
import {  useForm } from "react-hook-form";
import {
  FiUpload,
  // FiBold,
  // FiItalic,
  // FiUnderline,
  // FiPlus,
  // FiMinus,
} from "react-icons/fi";
import { instance } from "../base/interceptor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UpdateProp = {
  id?: string;
  image?: string;
  title?: string;
  content?: string;
};

const CreateNote: React.FC<UpdateProp> = (props: UpdateProp) => {
  // const [bold, setBold] = useState(false);
  // const [italic, setItalic] = useState(false);
  // const [underline, setUnderline] = useState(false);
  // const [fontSize, setFontSize] = useState(3);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  const { handleSubmit } = useForm();
  const navigation = useNavigate();

  const [title, setTitle] = useState<string | undefined>(props?.title);
  const [description, setDescription] = useState<string | undefined>(
    props?.content
  );

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ce4jucsz");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      console.log(res);

      return res.data;
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const image = await uploadImage();

      const noteData = {
        image: image.secure_url,
        title: title,
        description: description,
      };

      await instance.post("/api/notes", noteData).then((res) => {
        console.log(res);
        if (res.data) {
          navigation("/dashboard");
        }
      });

      setLoading(false);

      // mutation.mutate(noteData);
    } catch (error) {
      console.error("Error creating note:", error);
      setLoading(false);
    }
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      const image = await uploadImage();

      const noteData = {
        image: image?.secure_url ? image.secure_url : props.image,
        title: title,
        description: description,
      };

      await instance.put(`/api/notes/${props.id}`, noteData).then((res) => {
        console.log(res);
        if (res.data) {
          navigation("/dashboard");
        }
      });
      setLoading(false);
    } catch (error) {
      console.error("Error creating note:", error);
      setLoading(false);
    }
  };

  // const applyStyle = (command: string, value?: string) => {
  //   console.log(value);
  //   console.log(command);

  //   document.execCommand(command, false, value);
  // };

  // const handleBold = () => {
  //   setBold(!bold);
  //   applyStyle("bold");
  // };

  // const handleItalic = () => {
  //   setItalic(!italic);
  //   applyStyle("italic");
  // };

  // const handleUnderline = () => {
  //   setUnderline(!underline);
  //   applyStyle("underline");
  // };

  // const increaseFontSize = () => {
  //   if (fontSize < 7) {
  //     const newSize = fontSize + 1;
  //     setFontSize(newSize);
  //     applyStyle("fontSize", newSize.toString());
  //   }
  // };

  // const decreaseFontSize = () => {
  //   if (fontSize > 1) {
  //     const newSize = fontSize - 1;
  //     setFontSize(newSize);
  //     applyStyle("fontSize", newSize.toString());
  //   }
  // };

  return (
    <div className="min-h-screen  bg-gray-100 md:mx-32 my-10 shadow-2xl">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full">
        <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">
          {props?.id ? "Update Note" : "Create Note"}
        </h2>
        <form onSubmit={handleSubmit(props.id ? onUpdate : onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="banner"
              className="block mb-2 text-gray-400 font-semibold"
            >
              Upload Banner
            </label>
            <div className="h-48 border border-gray-300 rounded-lg relative p-4 flex flex-col items-center justify-center">
              <input
                type="file"
                id="banner"
                onChange={(e) => setFile(e.target.files[0])}
                className="opacity-0 h-5 w-10 absolute top-[45%]"
                accept="image/*"
              />
              <FiUpload size={24} className="text-gray-400" />
            </div>
          </div>
          <div className="lg:flex md:flex-row md:justify-between md:gap-5 sm:flex-col ">
            {props?.image && (
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block mb-2 text-gray-400 font-semibold"
                >
                  Banner
                </label>

                <img
                  src={props?.image}
                  className="w-96 h-72 border border-gray-300 rounded-lg p-2 "
                  alt=""
                />
              </div>
            )}
            <div className="w-full">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block mb-2 text-gray-400 font-semibold"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  // {...register("title", { required: true })}
                />
                {/* {mutation.data?.message&& <p className="text-red-500 text-xs italic">Title is required</p>} */}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-gray-400 font-semibold"
                >
                  Description
                </label>
                <div className="border border-gray-300 rounded-lg p-2">
                  {/* <div className="flex mb-2 space-x-2">
                <button
                  type="button"
                  className={`p-2 ${
                    bold ? "text-blue-500" : "text-gray-500"
                  } hover:text-gray-700`}
                  onClick={handleBold}
                >
                  <FiBold />
                </button>
                <button
                  type="button"
                  className={`p-2 ${
                    italic ? "text-blue-500" : "text-gray-500"
                  } hover:text-gray-700`}
                  onClick={handleItalic}
                >
                  <FiItalic />
                </button>
                <button
                  type="button"
                  className={`p-2 ${
                    underline ? "text-blue-500" : "text-gray-500"
                  } hover:text-gray-700`}
                  onClick={handleUnderline}
                >
                  <FiUnderline />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={decreaseFontSize}
                >
                  <FiMinus />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={increaseFontSize}
                >
                  <FiPlus />
                </button>
                <span className="p-2 text-gray-500">{fontSize * 4}px</span>
              </div> */}
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-none focus:ring-0 p-2 sm:text-md md:text-xl"
                    style={{
                      minHeight: "200px",
                      outline: "none",
                    }}
                    // {...register("description", { required: true })}
                  >
                    {description}
                  </textarea>
                  {/* {mutation.data?.message && <p className="text-red-500 text-xs italic">Description is required</p>} */}
                </div>
              </div>
            </div>
          </div>
          {props?.id ? (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg text-xl font-semibold hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "UPDATE"}
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg text-xl font-semibold hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Creating..." : "CREATE"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
