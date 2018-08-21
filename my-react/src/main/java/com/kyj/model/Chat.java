package com.kyj.model;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class Chat {
	private String to;
	private String from;
	private String fromAvatarImage;
	private String message;
	private Date date;
}
