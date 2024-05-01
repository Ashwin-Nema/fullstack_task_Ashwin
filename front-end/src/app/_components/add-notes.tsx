import useWebSocket from '../hooks/useWebSocket';
import React, { useState } from 'react';

const AddNotes: React.FC = () => {
  const { socket, isConnected } = useWebSocket();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!isConnected) {
      return;
    }
    socket.emit('add', message);
    setMessage('');
  };

  return (
    <div className="flex gap-5 mb-3">
      <input
        className="shadow w-full appearance-none border-input-border border-1.5 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="New Note..."
      />
      <button
        onClick={sendMessage}
        disabled={!message}
        className="flex gap-2 bg-note-app-btn text-white font-bold py-2 px-4 rounded-lg disabled:bg-note-scroll"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clipRule="evenodd"
          />
        </svg>
        Add
      </button>
    </div>
  );
};

export default AddNotes;
