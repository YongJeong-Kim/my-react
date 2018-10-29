package com.kyj.security;

import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

//@Configuration
public class WebSocketSecurityConfiguration extends AbstractSecurityWebSocketMessageBrokerConfigurer {

  @Override
  protected void configureInbound(MessageSecurityMetadataSourceRegistry message) {
  	message
			.nullDestMatcher().permitAll()
			.simpDestMatchers("/app/**").authenticated()
			.simpDestMatchers("/topic/**").authenticated()
			.anyMessage().hasAnyAuthority("ROLE_ADMIN", "ROLE_USER");
  }

	@Override
	protected boolean sameOriginDisabled() {
		return true;
	}
}
