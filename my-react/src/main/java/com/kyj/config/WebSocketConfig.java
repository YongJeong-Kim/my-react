package com.kyj.config;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	@Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/queue", "/topic");
    config.setUserDestinationPrefix("/user");
    config.setApplicationDestinationPrefixes("/app");
  }

	/**
   * Register Stomp endpoints: the url to open the WebSocket connection.
   */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {

    // Register the "/ws" endpoint, enabling the SockJS protocol.
    // SockJS is used (both client and server side) to allow alternative
    // messaging options if WebSocket is not available.
    registry.addEndpoint("/handler").setAllowedOrigins("*").addInterceptors(new HttpSessionIdHandshakeInterceptor()).withSockJS();

    return;
  }

//  /**
//   * Configure the message broker.
//   */
//  @Override
//  public void configureMessageBroker(MessageBrokerRegistry config) {
//
//    // Enable a simple memory-based message broker to send messages to the
//    // client on destinations prefixed with "/queue".
//    // Simple message broker handles subscription requests from clients, stores
//    // them in memory, and broadcasts messages to connected clients with
//    // matching destinations.
//    config.enableSimpleBroker("/queue");
//
//    return;
//  }

} // class WebSocketConfig

class HttpSessionIdHandshakeInterceptor extends HttpSessionHandshakeInterceptor {
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wshandler, Map<String, Object> attributes) throws Exception {
		if(request instanceof ServletServerHttpRequest) {
			ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
			HttpSession session = servletRequest.getServletRequest().getSession(false);

			if(session != null) {
				attributes.put("SESSION_ID", session.getId());
			}
		}
		return super.beforeHandshake(request, response, wshandler, attributes);
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception ex) {
		super.afterHandshake(request, response, wsHandler, ex);
	}
}
