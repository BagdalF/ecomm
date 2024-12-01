import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
              <button
                onClick={onClose}
                className="text-black font-semibold hover:text-gray-500 focus:outline-none mr-2"
              >
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
