import {useState} from "react";
import {MessageInput} from "@vaadin/react-components";
import {nanoid} from "nanoid";
import {MessageItem} from "./Message";
// @ts-ignore
import MessageList from "./MessageList.tsx";
import ApiService from "../../service/ApiService";

const SupportAgent= (props)=> {
  const [chatId, setChatId] = useState(nanoid());
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([{
    role: 'agent',
    content: 'Welcome to Roel Hotel! How can I help you?'
  }]);

  function addMessage(message: MessageItem) {
    setMessages(messages => [...messages, message]);
  }

  function appendToLatestMessage(chunk: string) {
    setMessages(messages => {
      const latestMessage = messages[messages.length - 1];
      latestMessage.content += chunk;
      return [...messages.slice(0, -1), latestMessage];
    });
  }

  async function sendMessage(message: string) {
    setWorking(true);
    addMessage({
      role: 'user',
      content: message
    });
    let first = true;

    try {
      // Call API to send message to backend's model
      const chatResponse = await ApiService.agentChat(chatId, message);
      if (first && chatResponse) {
        addMessage({
          role: 'agent',
          content: chatResponse
        });

        first = false;
      } else {
        appendToLatestMessage(chatResponse);
      }

      setError(null); // Clear error if successful
      setWorking(false);
      props.setChangeByAgent(props.changeByAgent+1);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setWorking(false);
      setTimeout(() => setError(''), 5000);
    }
  }


  if(props.isAuthenticated) {
    return (
        <div className="chat" style={{maxHeight: '900px', maxWidth: '500px'}}>
          <h3>Roel Hotel Support Agent</h3><br/>
          <MessageList messages={messages} className="messages"/>
          <MessageInput onSubmit={e => sendMessage(e.detail.value)} className="messageInput verticalAlignment"/>
        </div>
    );
  }
  else
    return null;
}

export default SupportAgent;
