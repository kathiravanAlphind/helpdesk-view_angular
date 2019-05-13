package com.restapi.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.model.Projects;
import com.restapi.model.Users;
import com.restapi.service.UserService;


@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	private List<Projects> listProject;
		
	@CrossOrigin("*")
	@GetMapping(value = "/login")
	public ResponseEntity<List<Users>> loginUser(@RequestParam("uname") String uname, @RequestParam("pass") String pass, HttpSession session) {
		List<Users> user = userService.checkUser(uname, pass);
		if(!user.isEmpty() || user.get(0).isQuality_assurance() == true || user.get(0).isDeveloper() == false)
		{
			session.setAttribute("username", user.get(0).getUname());
			session.setAttribute("userID", user.get(0).getId());
			//return ResponseEntity.ok().body(user);
			
			return new ResponseEntity<List<Users>>(user, HttpStatus.OK);
					
		}
		
		return new ResponseEntity<List<Users>>(user, HttpStatus.METHOD_NOT_ALLOWED);
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping(value = "/dashboard")
	public ResponseEntity<List<Projects>> listProjects(HttpServletRequest request, HttpServletResponse response, HttpSession session, @RequestParam("tl_id") int tl_id)
	{
		//int qa_id = (Integer) session.getAttribute("userID");
		//String name = (String) session.getAttribute("username");
		this.listProject = userService.getProjects(tl_id);
		if(this.listProject == null)
		{
			return (ResponseEntity<List<Projects>>) ResponseEntity.noContent();
		}
		return ResponseEntity.ok().body(this.listProject);
	}
	
	@GetMapping("/dashboard/{id}")
	public ResponseEntity<Projects> get(@PathVariable("id") long id)
	{
		Projects p = userService.getProId(id);
		return ResponseEntity.ok().body(p);
	}
	

}
