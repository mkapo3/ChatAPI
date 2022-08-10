using Lib.AspNetCore.ServerSentEvents;

namespace ChatAPI.Events
{
    public class ServerEventsWorker: IHostedService
    {
        private readonly IServerSentEventsService client;

        public ServerEventsWorker(IServerSentEventsService client)
        {
            this.client = client;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                while (!cancellationToken.IsCancellationRequested)
                {
                    var clients = client.GetClients();
                    if (clients.Any())
                    {
                        await client.SendEventAsync(
                            new ServerSentEvent
                            {
                                Id = "number",
                                Type = "number",
                                Data = new List<string>
                                {
                                //Number.Value.ToString()
                                }
                            },
                            cancellationToken
                        );
                    }

                    await Task.Delay(TimeSpan.FromSeconds(1), cancellationToken);
                }
            }
            catch (TaskCanceledException)
            {
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
