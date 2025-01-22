using Microsoft.AspNetCore.Identity;

namespace AspNetCoreAPI.Models
{
    public class User : IdentityUser
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public List<ApplicationTask> ApplicationTasks { get; } = [];
    }
}