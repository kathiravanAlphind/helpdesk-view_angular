package com.restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.restapi.model.Users;
import com.restapi.service.UserService;


@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@SuppressWarnings("unchecked")
	@CrossOrigin(origins="http://localhost:4200") 
	@RequestMapping(value = "/login" ,method = {RequestMethod.POST},  produces="application/json", consumes="application/json")
	public ResponseEntity<List<Users>> loginUser(@RequestParam("uname") String uname, @RequestParam("pass") String pass) {
		List<Users> user = userService.checkUser(uname, pass);
		if(!user.isEmpty())
		{
			return ResponseEntity.ok().body(user);
		}
		
		else
		{
			return (ResponseEntity<List<Users>>) ResponseEntity.noContent();
		}
	}
	

}
