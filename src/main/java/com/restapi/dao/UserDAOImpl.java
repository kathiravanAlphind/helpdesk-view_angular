package com.restapi.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.restapi.model.Users;

@Transactional(propagation=Propagation.REQUIRED,readOnly = false)
@Repository
public class UserDAOImpl implements UserDAO{
	
	@Autowired
	private SessionFactory sessionfactory;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Users> checkUser(String uname, String pass) {
		Query query = sessionfactory.getCurrentSession().createQuery("from Users u where u.uname = :uname and u.pass = :pass");

		query.setString("uname", uname);
		query.setString("pass", pass);
		List result = query.list();

		System.out.println("result");
		System.out.println(result.toString());

		return result;
	}
	
	
	
	
	

}
