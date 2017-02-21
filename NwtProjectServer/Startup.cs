using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NwtProjectServer.Startup))]
namespace NwtProjectServer
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
