
type AlertProp = {
  msg: string;
  status: string;
  color: string;
};
const Alert = ({ msg, status, color }: AlertProp) => {
  // Determine the border color based on the status or color prop
  const borderColor = color ? color : "border-red-700";

  return (
    <div
      className={`flex items-center justify-center bg-${color}-700 text-white py-2 px-4 rounded-lg shadow-md`}
    >
      <div
        className={`border border-solid ${borderColor} flex items-center justify-center h-8 w-8 mr-3`}
      >
        <span className="text-lg font-bold">!</span>
      </div>
      <span>{msg}</span>
    </div>
  );
};

export default Alert;
