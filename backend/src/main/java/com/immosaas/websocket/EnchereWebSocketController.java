package com.immosaas.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

// Ce controller sert de point d'entrée STOMP si le client envoie un message via /app/encheres/{id}
// Les offres sont broadcastées depuis EnchereServiceImpl via SimpMessagingTemplate
@Controller
public class EnchereWebSocketController {

    @MessageMapping("/encheres/{id}/ping")
    @SendTo("/topic/encheres/{id}")
    public String ping(@DestinationVariable Long id) {
        return "pong:" + id;
    }
}
