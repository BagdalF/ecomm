const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-200 text-green-900";
        break;
      case ("error", "danger"):
        return "bg-red-200 text-red-900";
        break;
      default:
        return "bg-blue-200 text-blue-900";
        break;
    }
  };
  return (
    <div className={`p-4 my-2 rounded font-semibold ${getVariantClass()}`}>
      {children}
    </div>
  );
};

export default Message;
