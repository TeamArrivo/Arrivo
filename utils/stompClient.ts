import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://10.36.13.130:8765/ws-ride'; // Replace with real IP during testing

export const createStompClient = (tripId: string, onDriverLocation: (loc: any) => void) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000,
    debug: (str) => console.log('[STOMP]', str),
  });

  client.onConnect = () => {
    console.log('STOMP connected');
    client.subscribe(`/topic/ride-location/${tripId}`, (msg) => {
      const data = JSON.parse(msg.body);
      onDriverLocation(data);
    });
  };

  client.activate();
  return client;
};
