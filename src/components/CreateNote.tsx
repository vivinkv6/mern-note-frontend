import React, { useState, useRef } from "react";
import {
  FiUpload,
  FiBold,
  FiItalic,
  FiUnderline,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

type UpdateProp = {
  id?: string;
  image?: string;
  title?: string;
  content?: string;
};

const CreateNote: React.FC<UpdateProp> = (props: UpdateProp) => {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(3);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const applyStyle = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleBold = () => {
    setBold(!bold);
    applyStyle("bold");
  };

  const handleItalic = () => {
    setItalic(!italic);
    applyStyle("italic");
  };

  const handleUnderline = () => {
    setUnderline(!underline);
    applyStyle("underline");
  };

  const increaseFontSize = () => {
    if (fontSize < 7) {
      const newSize = fontSize + 1;
      setFontSize(newSize);
      applyStyle("fontSize", newSize.toString());
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 1) {
      const newSize = fontSize - 1;
      setFontSize(newSize);
      applyStyle("fontSize", newSize.toString());
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Note</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="banner" className="block mb-2 text-gray-400 font-semibold">
              Upload Banner
            </label>
            <div className="h-48 border border-gray-300 rounded-lg relative p-4 flex flex-col items-center justify-center">
              <input
                type="file"
                id="banner"
                className="opacity-0 h-5 w-10 absolute top-[45%]"
                accept="image/*"
              />
              <FiUpload size={24} className="text-gray-400" />
            </div>
          </div>
          {props?.image
          &&
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-gray-400 font-semibold">
              Banner
            </label>
            <input
              type="image"
              src={props?.image}
              id="title"
              value={props?.title}
              className="w-full border border-gray-300 rounded-lg p-2 h-96"
            />
          </div>
          }
          
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-gray-400 font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={props?.title}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-gray-400 font-semibold">
              Description
            </label>
            <div className="border border-gray-300 rounded-lg p-2">
              <div className="flex mb-2 space-x-2">
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
              </div>
              <div
                ref={descriptionRef}
                contentEditable
                className="w-full border-none focus:ring-0 p-2"
                style={{
                  minHeight: "200px",
                  fontSize: `${fontSize * 4}px`,
                  outline: "none",
                }}
              >{props?.content}</div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
