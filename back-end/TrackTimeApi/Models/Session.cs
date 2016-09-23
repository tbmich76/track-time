
using System;
using System.Collections.Generic;

namespace Michsoft.TrackTimeApi.Models
{
    public class Session
    {
        public Session()
        {
        }

        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Track { get; set; }

        public string BestTime { get; set; }
    }
}