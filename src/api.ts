import { Message } from "./types";

export async function sendMessage(idInstance: string, apiTokenInstance: string, message: string, chatId: string) {
    const data = {
        chatId: chatId,
        message: message
    }
    let response = await fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        console.log(response);
    }
}

export async function getMessage(
    idInstance: string,
    apiTokenInstance: string,
    chatId: string,
    setMessageList: React.Dispatch<React.SetStateAction<Message[]>>
) {
    let response = await fetch(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`);
    if (response.ok) {
        let result = await response.json();
        if (result?.body?.messageData?.textMessageData && result?.body?.senderData) {
            // проверка на то, что полученные сообщения относятся к конкретному чату
            if (result.body.senderData.chatId === chatId) {
                let message: Message = {
                    id: result.receiptId,
                    text: result.body.messageData.textMessageData.textMessage,
                    my: false,
                    timestamp: (result.body.timestamp * 1000),
                }
                setMessageList((prev) => {
                    // дополнительная проверка на уникальность
                    let nonUnique = prev.find((msg) => msg.id === message.id);
                    if (!nonUnique) {
                        return [...prev, message]
                    }
                    return [...prev]
                });
            }
        }
        //удаляем полученное сообщение
        if (result?.receiptId) {
            await fetch(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${result.receiptId}`, {
                method: 'DELETE',
            });
        }
    } else {
        console.log(response);
    }
}