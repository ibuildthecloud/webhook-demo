import { useState, useMemo } from 'react';
import useWs from '../compositions/useWs';
import useApi from '../compositions/useApi';

export default function RealtimeMessages ({ token }) {
  const [_messageList, setMessages] = useState([]);

    // Handle data related messages considering it is in JSON
  const onMessages = (newMessageList) => setMessages((currMessageList) => [
    ...newMessageList,
    ...currMessageList,
  ]);

  // fix display of `created_at` and `content`
  const messageList = useMemo(
    () => _messageList.map((msg) => ({
      ...msg,
      created_at: msg.created_at.substr(0, 19).replace("T", " "),
      content: JSON.stringify(msg.content, null, 2),
    })),
    [_messageList],
  );

  useWs({
    onMessages,
  });

  useApi({
    onMessages,
    token,
  });

  return (
    <div className="bg-white border-b py-8">
      <div className="container mx-auto m-8">
        <div className="container text-center font-semibold pl-2 uppercase max-w-5xl mx-auto m-8 pl-2 uppercase text-indigo-600 font-semibold">
            Webhooks history (#{_messageList.length} payload received)
        </div>
        <ul>
          {messageList.map((msg) => (
            <li>
              <div className="divContainer bg-white mt-2 mb-8">
                <div className="divTimestamp pl-2 uppercase text-indigo-500 font-semibold">
                  {msg.created_at}
                </div>

                <div className="divContent pl-2 text-black border">
                  <pre className="preContent overflow-auto">
                    {msg.content}
                  </pre>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
