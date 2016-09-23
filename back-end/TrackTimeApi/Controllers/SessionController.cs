using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Michsoft.TrackTimeApi.Models;
using Michsoft.TrackTimeApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Michsoft.TrackTimeApi.Controllers
{
    [Route("/sessions")]
    public class SessionController
    {
        private ISessionsRepository _sessionRepository;
        public SessionController (ISessionsRepository sessionRepository)
        {
          _sessionRepository = sessionRepository;
        }

        // public async Task<IEnumerable<Session>> Get()
        // {
        //     // return await _sessionRepository.GetMostRecent();
        //     return Task.FromResult(new List<Session>());
        // }

        [HttpGet("{id}")]
        // public IActionResult Get(int id)
        // {
        //     return new OkObjectResult(null);
        // }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Session session)
        {
            session.Id = Guid.NewGuid();
            await _sessionRepository.AddSession(session);
            return new CreatedResult($"/sessions/{session.Id}", session);
        }


    }
}