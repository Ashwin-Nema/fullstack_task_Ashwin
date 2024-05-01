import useWebSocket from '../hooks/useWebSocket';
import './styles.css';
import React, { use, useEffect, useState } from 'react';

const NotesList: React.FC = () => {
  const [data, setData] = useState([]);
  const {socket, isConnected} = useWebSocket()
  const getData = async () => {
    try {
      const messageData = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_HOST}fetchAllTasks`
      );
      const results = await messageData.json();
      setData(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isConnected) {
      socket.on("new_message_list", (data:any) => {
        setData(data)
      })
    }
  }, [socket, isConnected])

  return (
    <div className="notes-list">
      <h1 className="text-2xl font-bold mt-12 mb-1">Notes</h1>

      <div className="border-t-2 overflow-y-scroll  max-h-96 scrollbar scrollbar-thumb-note-scroll break-all">
        {data.map((item:any, index) => {
          return (
            <p key={index} className="text-2xl border-b-2 py-4">
              {item.text}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default NotesList;
