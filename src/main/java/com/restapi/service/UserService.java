package com.restapi.service;

import java.util.List;

import com.restapi.model.Users;

public interface UserService {
	
	public List<Users> checkUser(String uname , String pass);

}
