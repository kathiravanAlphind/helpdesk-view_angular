package com.restapi.dao;

import java.util.ArrayList;
import java.util.List;


import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.restapi.model.Projects;
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

	@SuppressWarnings("unchecked")
	@Override
	public List<Projects> getProjects(int qa_id) {

		SQLQuery query;

		String sql = "select projects.id, projects.pname, projects.tl_id from projects inner join users on users.id = projects.tl_id where projects.tl_id = :tlid";

		query = sessionfactory.getCurrentSession().createSQLQuery(sql);

		query.setParameter("tlid", qa_id);

		List<Object[]> result = query.list();

		List<Integer> plist = new ArrayList<Integer>();

		Projects project;

		List<Projects> projects = new ArrayList<Projects>();

		for(Object[] row : result)
		{
			int pid = (Integer) row[0];

			if(!plist.contains(pid))
			{
				project = new Projects();

				project.setId(pid);
				project.setPname((String) row[1]);
				project.setTl_id((Integer) row[2]);
				projects.add(project);
				plist.add(pid);

			}
		}

		return projects;

	}

	@Override
	public Projects getProId(long id) {
		return (Projects) sessionfactory.getCurrentSession().get(Projects.class, id);
	}

	@Override
	public void createUpdateTicket(int id, int submitted_by, int project_id, String number, String title,
			String category, String description, String status, String date) {

		Query query = sessionfactory.getCurrentSession().createSQLQuery("CALL sp_iu_tickets(:id, :submitted_by, :project_id, :number, :title, :category, :description, :status, :date)");//.addEntity(Tickets.class);

		query.setInteger("id", id);
		query.setInteger("submitted_by", submitted_by);
		query.setInteger("project_id", project_id);
		query.setString("number", number);
		query.setString("title", title);
		query.setString("category", category);
		query.setString("description", description);
		query.setString("status", status);
		query.setString("date", date);

		int result = query.executeUpdate();


		System.out.println(result);
	}

}
