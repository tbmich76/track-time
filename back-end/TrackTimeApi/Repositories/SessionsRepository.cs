using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Michsoft.TrackTimeApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Michsoft.TrackTimeApi.Repositories
{
    public interface ISessionsRepository
    {
        Task AddSession(Session session);
    }
    public class SessionsRepository : ISessionsRepository, IDisposable
    {
        private const string TABLE_NAME = "tracktime-sessions";
        private JsonSerializerSettings _settings;
        IAmazonDynamoDB _client;
        public SessionsRepository(IAmazonDynamoDB client)
        {
            _settings = new JsonSerializerSettings();
            _settings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
            _settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            _client = client;
        }

        public void Dispose()
        {
            _client.Dispose();
        }

        public async Task AddSession(Session session)
        {
            var table = Table.LoadTable(_client, TABLE_NAME);
            var doc = Document.FromJson(Serialise(session));

            var config = new PutItemOperationConfig();
            await table.PutItemAsync(doc);
        }

        private string Serialise<T>(T thingToSerialise)
        {
            return JsonConvert.SerializeObject(thingToSerialise, _settings);
        }

        private T Deserialise<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(json, _settings);
        }
    }
}