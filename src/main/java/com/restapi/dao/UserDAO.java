package com.restapi.dao;

import java.util.List;

import com.restapi.model.Projects;
import com.restapi.model.Users;

public interface UserDAO {
	
	public List<Users> checkUser(String uname , String pass);
	
	public List<Projects> getProjects(int qa_id);
	
	public Projects getProId(long id);

}
