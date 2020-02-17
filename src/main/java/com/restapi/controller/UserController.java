package com.restapi.controller;


import java.time.LocalDate;
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
import com.restapi.model.Tickets;
import com.restapi.model.Users;
import com.restapi.service.UserService;


@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private List<Projects> listProject;

	private List<Users> user;

	@CrossOrigin("*")
	@GetMapping(value = "/login")
	public ResponseEntity<List<Users>> loginUser(@RequestParam("uname") String uname, @RequestParam("pass") String pass, HttpSession session) {
		this.user = userService.checkUser(uname, pass);
		if(!this.user.isEmpty() || this.user.get(0).isQuality_assurance() == true || this.user.get(0).isDeveloper() == false)
		{
			session.setAttribute("username", user.get(0).getUname());
			session.setAttribute("userID", user.get(0).getId());
			//return ResponseEntity.ok().body(user);

			return new ResponseEntity<List<Users>>(this.user, HttpStatus.OK);

		}

		return new ResponseEntity<List<Users>>(this.user, HttpStatus.METHOD_NOT_ALLOWED);
	}

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/dashboard")
	public ResponseEntity<List<Projects>> listProjects(HttpServletRequest request, HttpServletResponse response, HttpSession session, @RequestParam("tl_id") int tl_id)
	{

		this.listProject = userService.getProjects(tl_id);
		if(this.listProject == null)
		{
			return (ResponseEntity<List<Projects>>) ResponseEntity.noContent();
		}
		return ResponseEntity.ok().body(this.listProject);
	}

	@GetMapping(value = "/dashboard/{id}")
	public ResponseEntity<Projects> get(@PathVariable("id") long id)
	{
		Projects p = userService.getProId(id);
		return ResponseEntity.ok().body(p);
	}

	@GetMapping(value = "/create")
	public ResponseEntity<Tickets> createTicket(HttpServletRequest request)
	{
		//System.out.println(ticket.getId());
		int id = 0;
		
		//int user_id = Integer.parseInt(request.getParameter("user_id"));
		
		//int proid = Integer.parseInt(request.getParameter("proid"));

		String number = "0";

		String title = request.getParameter("title");

		String category = request.getParameter("category");

		String description = request.getParameter("description");

		String status = "created";

		String date = LocalDate.now().toString();

		//System.out.println("user"+this.user.get(0).getId());
		//System.out.println("project"+this.listProject.get(0).getId());
		
		userService.createUpdateTicket(id,  this.user.get(0).getId(), this.user.get(0).getId(), number, title, category , description, status, date);
		
		// this.user.get(0).getId(), this.user.get(0).getId(), number, title, category , description, status, date


		return new ResponseEntity<Tickets>(HttpStatus.OK);

	}

}

