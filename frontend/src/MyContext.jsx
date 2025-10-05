import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [prevChats, setPrevChats] = useState([]);
    const [reply, setReply] = useState("");
    const [newChat, setNewChat] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [currThreadId, setCurrThreadId] = useState(null);

    // ✅ Example logout placeholder (for now)
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <MyContext.Provider value={{
            prevChats, setPrevChats,
            reply, setReply,
            newChat, setNewChat,
            prompt, setPrompt,
            currThreadId, setCurrThreadId,
            logout
        }}>
            {children}
        </MyContext.Provider>
    );
};
