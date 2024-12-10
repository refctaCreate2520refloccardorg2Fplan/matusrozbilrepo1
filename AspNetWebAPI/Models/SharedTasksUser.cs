using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    [PrimaryKey(nameof(TasksId), nameof(UserID))]
    public class SharedTasksUser
    {
        public int TasksId { get; set; }
        public string UserID { get; set; }

    }
}
