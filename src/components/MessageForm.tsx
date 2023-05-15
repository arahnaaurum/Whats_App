import { Dispatch, SetStateAction, useState } from "react"
import { sendMessage } from "../api";
import { Message } from "../types";

type MessageFormProps = {
    idInstance: string;
    apiTokenInstance: string;
    chatId: string;
    setMessageList: Dispatch<SetStateAction<Message[]>>;
}

function MessageForm({ idInstance, apiTokenInstance, chatId, setMessageList }: MessageFormProps) {
    const [index, setIndex] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(e.target.value);
        setIndex((prev) => ++prev);
    }
    
    function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key==='Enter') {
            handleSend();
        }
    }

    function handleSend() {
        sendMessage(
            idInstance,
            apiTokenInstance,
            message,
            chatId,
        );

        let messageWithMetadata: Message = {
            id: chatId + index,
            text: message,
            my: true,
            timestamp: new Date().getTime(),
        };
        setMessageList((prev) => [...prev, messageWithMetadata]);
        setMessage('');
    }

    return (
        <label className="message__form-group">
            <textarea value={message} onChange={handleChange} onKeyUp={handleEnter} className="message__input" />
            <button onClick={handleSend} className='btn'>
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path className="btn_svg" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
            </button>
        </label>
    )
}

export default MessageForm;