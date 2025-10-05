import ChatWindow from "./ChatWindow";
import './App.css'
import { MyContext } from "./MyContext";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); // stores all chats of curr thread.
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]); // stores all threads

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats
    , allThreads, setAllThreads
  };
  return (
    <>
      <div className="app">
        <MyContext.Provider value={providerValues} >
          <Sidebar />
          <ChatWindow />
        </MyContext.Provider>
      </div>
    </>
  )
}

export default App
