using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    [PrimaryKey(nameof(TasksId), nameof(UserId))]
    public class SharedTasksUser
    {
        public int TasksId { get; set; }
        public string UserId { get; set; }

    }
}
