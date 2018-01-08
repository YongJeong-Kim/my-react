package com.kyj.component;

import java.io.File;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.kyj.entity.Roles;
import com.kyj.entity.User;
import com.kyj.repository.RoleRepository;
import com.kyj.repository.UserRepository;

@Component
public class InitUser {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository rolesRepository;
	
	@Autowired
	private EncodeDecode encodeDecode;
	
	@PostConstruct
	public void initUser() throws URISyntaxException {
		if (userRepository.findAll().size() == 0) {
			User u = new User();
			u.setEmail("aaa@email.com");
			u.setUsername("aaa");
			u.setIsAccountNonExpired(true);
			u.setIsAccountNonLocked(true);
			u.setIsCredentialsNonExpired(true);
			u.setIsEnabled(true);
			
			PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode("1234");
			
			u.setPassword(hashedPassword);
			Roles r = new Roles();
			r.setRole("ROLE_ADMIN");
			
			List<Roles> rs = new ArrayList<>();
			rs.add(r);
			u.setRoles(rs);
			
//			UserImage image = new UserImage();
			ClassLoader classLoader = getClass().getClassLoader();
			File file = new File(classLoader.getResource("static/images/9k=.jpg").toURI());
			
			String filename = FilenameUtils.removeExtension(file.getName());
			String extension = FilenameUtils.getExtension(file.getName());
			String path = FilenameUtils.getFullPath(file.getPath());
			String base64Image = encodeDecode.encodeImage(path + filename + "." + extension);
			
/*			image.setEncodeImage("data:image/" + extension + ";base64," + base64Image);
			image.setExtension(extension);
			image.setFilename(filename);
			image.setPath(path);*/
			
			File file2 = new File(classLoader.getResource("static/images/ggobu2.png").toURI());
			
			String avatarFilename = FilenameUtils.removeExtension(file2.getName());
			String avatarExtension = FilenameUtils.getExtension(file2.getName());
			String avatarPath = FilenameUtils.getFullPath(file2.getPath());
			String avatarBase64Image = encodeDecode.encodeImage(avatarPath + avatarFilename + "." + avatarExtension);
			
			/*image.setAvatarEncodeImage("data:image/" + avatarExtension + ";base64," + avatarBase64Image);
			image.setAvatarExtension(avatarExtension);
			image.setAvatarFilename(avatarFilename);
			image.setAvatarPath(avatarPath);
			
			image.setUser(u);*/
			u.setAvatarEncodeImage("data:image/" + avatarExtension + ";base64," + avatarBase64Image);
			u.setAvatarExtension(avatarExtension);
			u.setEncodeImage("data:image/" + extension + ";base64," + base64Image);
			u.setExtension(extension);
			
//			u.setUserImage(image);
			
			rolesRepository.save(r);
			userRepository.save(u);
		}
	}
}
