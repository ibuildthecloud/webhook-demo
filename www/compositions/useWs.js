import { useEffect } from 'react';

const onopen = (event) => {
  console.log("onopen");
  console.log(event);
};

const onerror = (event) => {
  console.log("onerror");
  console.log(event);
};

export default function useWs({ onMessages }) {
  const onmessage = (event) => {
    // New incoming message from server
    console.log("onmessage")
    console.log(event)

    // Extract data from event received
    const { data } = event;
    console.log(data)

    // Handle webhook related messages (needed ???)
    if (data.substr(0, 7) === "webhook") {
      console.log("subscribed to webhook named: " + data.substr(8));
      return
    }

    // Handle error related messages
    if (data.substr(0, 5) === "error") {
      console.log(data.substr(6));
      return
    }

    const newMessage = JSON.parse(JSON.parse(data));

    onMessages?.([newMessage]);
  };

  useEffect(() => {
    const { host, protocol } = window.location;

    const token = window.localStorage.getItem('wh_token');

    const ws = new WebSocket(`${protocol === 'https:' ? 'wss' : 'ws'}://${host}/ws?token=${token}`)

    ws.addEventListener('open', onopen);
    ws.addEventListener('error', onerror);
    ws.addEventListener('message', onmessage);

    return () => {
      ws.removeEventListener('open', onopen);
      ws.removeEventListener('error', onerror);
      ws.removeEventListener('message', onmessage);

      ws.close();
    };
  }, []);
}
