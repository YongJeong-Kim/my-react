package com.kyj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kyj.model.Chat;

@Controller
public class TestController {
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public String greeting(String msg) {
		System.out.println(msg);
    return "dddddddddd";
  }
	
	@MessageMapping("/helloUser")
//	@SendToUser("/topic/hhh")
	public void dd(String username) {
		System.out.println(username);
		messagingTemplate.convertAndSendToUser(username, "/topic/hhh", "by helloUser");
	}
	
	@MessageMapping("/chat")
	public void chat(Chat chat) {
		messagingTemplate.convertAndSendToUser(chat.getTo(), "/topic/chat", chat);
//		messageTemplate.convertAndSendToUser("ccc", "/topic/chat", chat);
	}
	
	@MessageMapping("/fff")
	public void fff(Chat chat) {
		messagingTemplate.convertAndSendToUser(chat.getTo(), "/topic/fff", chat);
	}
	
	 @RequestMapping(value = "/some-action/{target}", method = RequestMethod.POST)
   @ResponseBody
   public ResponseEntity<?> someAction(@PathVariable String target) {
       messagingTemplate.convertAndSendToUser(
               target,
               "/queue/notify",
               "hi"
       );

       // Return an http 200 status code
       return new ResponseEntity<>("hi", HttpStatus.OK);
   }
}
