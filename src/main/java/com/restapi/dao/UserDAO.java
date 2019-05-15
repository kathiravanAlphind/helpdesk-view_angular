package com.restapi.dao;

import java.util.List;

import com.restapi.model.Projects;
import com.restapi.model.Users;

public interface UserDAO {
	
	public List<Users> checkUser(String uname , String pass);
	
	public List<Projects> getProjects(int qa_id);
	
	public Projects getProId(long id);
	
	public void createUpdateTicket(int id, int submitted_by, int project_id, String number, String title, String category, String description, String status, String date);

}
