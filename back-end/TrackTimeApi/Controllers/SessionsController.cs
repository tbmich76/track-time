using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TrackTime.Domain;

namespace TrackTime.Api.Controllers
{
	[Route("[controller]")]
	public class SessionsController :	Controller
	{
		public SessionsController()
		{

		}

		[HttpGet]
		public IActionResult Get()
		{
			var sessions = new List<Session>();
			return Ok(sessions);
		}

		[HttpPost]
		public IActionResult Post(Session session)
		{

		}
	}
}