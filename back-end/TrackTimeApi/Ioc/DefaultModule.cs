using Amazon.DynamoDBv2;
using Autofac;
using Michsoft.TrackTimeApi.Repositories;

public class DefaultModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        var config = new AmazonDynamoDBConfig();
        config.RegionEndpoint = Amazon.RegionEndpoint.APSoutheast2;
        var client = new AmazonDynamoDBClient(config);

        builder.Register(c => client).As<IAmazonDynamoDB>();

        builder.RegisterType<SessionsRepository>().As<ISessionsRepository>();
    }
}