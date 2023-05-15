import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import PhoneForm from "../components/PhoneForm";
import MessageForm from "../components/MessageForm";
import { getMessage } from "../api";
import { Message } from "../types";
import '../index.css';


function Main(): JSX.Element {
    const [idInstance, setIdInstance] = useState<string>('');
    const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
    const [chatId, setChatId] = useState<string>('');
    const [messageList, setMessageList] = useState<Message[]>([]);

    useEffect(() => {
        // запускаем проверку наличия новых входящих сообщений при каждом входе в конкретный чат
        const interval = setInterval(() => {
            if (idInstance !== '' && apiTokenInstance !== '') {
                getMessage(idInstance, apiTokenInstance, chatId, setMessageList)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [chatId])

    function renderMessages() {
        return messageList.map((message) => (
            <div key={message.id} className={message.my ? 'author' : 'not-author'}>
                <p className="message_text">{message.text}</p>
                <p className="message_time">
                    {new Date(message.timestamp).getHours()}.{new Date(message.timestamp).getMinutes()}
                </p>
            </div>
        ))
    }

    return (<main className="main">
        {idInstance && apiTokenInstance ?
            <>
                {!chatId ?
                    <PhoneForm setChatId={setChatId} />
                    :
                    <div className="messages__container">
                        <div className="messages__list">
                            {renderMessages()}
                        </div>
                        <MessageForm
                            idInstance={idInstance}
                            apiTokenInstance={apiTokenInstance}
                            chatId={chatId}
                            setMessageList={setMessageList}
                        />
                    </div>
                }
            </>
            :
            <LoginForm
                setIdInstance={setIdInstance}
                setApiTokenInstance={setApiTokenInstance}
            />
        }
    </main>
    )
}

export default Main;