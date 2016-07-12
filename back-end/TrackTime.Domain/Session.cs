using System;

namespace TrackTime.Domain
{
	public class Session
	{
		public string Name { get; set; }
		public string Track { get; set; }
		public DateTime CreatedDate { get; set; }
		public string BestLap { get; set; }
		public byte[] KmlFile { get; set; }
	}
}