import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

const App = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", receiveMessage);

        return () => {
            socket.off("message", receiveMessage);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            body: message,
            from: "me",
        }
        setMessages([...messages, newMessage]);
        socket.emit("message", message);
    };

    const receiveMessage = (msg) => {
        setMessages((prev) => [msg, ...prev]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write your message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button type="submit">Send</button>
            </form>

            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                      {msg.from}:{msg.body}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
