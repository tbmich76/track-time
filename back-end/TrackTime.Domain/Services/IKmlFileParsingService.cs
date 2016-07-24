using System.Collections.Generic;

namespace TrackTime.Domain.Services
{
	public interface IKmlFileParsingService
	{
		List<Session> ParseFile(byte[] file);
	}
}