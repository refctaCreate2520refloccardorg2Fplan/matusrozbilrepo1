using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTO;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AspNetCoreAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SharedTasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SharedTasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        protected User? GetCurrentUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            return _context.Users.SingleOrDefault(user => user.UserName == userName);
        }

        [HttpGet]
        public IEnumerable<SharedTasksDTO> GetSharedTasksList()
        {
            IEnumerable<SharedTasks> sharedTasks = _context.SharedTask;
            return sharedTasks.Select(sharedTasks => new SharedTasksDTO
            {
                Name = sharedTasks.Name,
                Priority = sharedTasks.Priority,
                Deadline = sharedTasks.Deadline,
                IsDone = sharedTasks.IsDone,
            });
        }

        [HttpPut]
        [Route("/sharedtasklist")]
        public SharedTasksDTO createNewSharedTask(CreateSharedTaskDTO task)
        {
            var sharedTaskCreate = new SharedTasks()
            {
                Name = task.taskName,
                Description = task.taskDescription,
                Priority = task.taskPriority,
                Deadline = task.taskDeadline,
                CreatedBy = GetCurrentUser().Id
            };
            _context.Add(sharedTaskCreate);
            _context.SaveChanges();
            return mapToSharedTaskDto(sharedTaskCreate);
        }

        private SharedTasksDTO mapToSharedTaskDto(SharedTasks sharedTaskCreate)
        {
            return new SharedTasksDTO
            {
                Id = sharedTaskCreate.Id,
                Description = sharedTaskCreate.Description,
                Deadline = sharedTaskCreate.Deadline,
                IsDone = sharedTaskCreate.IsDone,
                Name = sharedTaskCreate.Name,
                Priority = sharedTaskCreate.Priority,
            };
        }
    }
}
