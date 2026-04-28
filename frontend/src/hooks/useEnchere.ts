import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function useEnchereSocket(enchereId: number) {
  const [meilleureOffre, setMeilleureOffre] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/encheres/${enchereId}`, (message) => {
          try {
            const data = JSON.parse(message.body);
            if (data.montant !== undefined) {
              setMeilleureOffre(Number(data.montant));
            }
          } catch {
            // message non-JSON ignoré
          }
        });
      },
      onDisconnect: () => setConnected(false),
    });

    client.activate();
    return () => { client.deactivate(); };
  }, [enchereId]);

  return { meilleureOffre, connected };
}
