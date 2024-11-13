using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class SharedTasksUser
    {
        [Key] public int Id { get; set; }
        public int TasksId { get; set; }
        public string UserId { get; set; }

        public SharedTasks SharedTasks { get; set; }
        public User User { get; set; }

    }
}
