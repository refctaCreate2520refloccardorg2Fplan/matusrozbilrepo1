using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTO;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HorizonTask.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<TasksDTO> GetTasksList()
        {
            IEnumerable<ApplicationTask> Tasks = _context.Tasks;
            return Tasks.Select(Tasks => new TasksDTO
            {
                Id = Tasks.Id,
                Name = Tasks.Name,
                Description = Tasks.Description,
                Priority = Tasks.Priority,
                IsDone = Tasks.IsDone,
            }
            );
        }

        [HttpPut]
        [Route("/tasklist")]

        public CreateTaskDTO createNewTask(CreateTaskDTO task)
        {
            var taskCreate = new ApplicationTask()
            {
                Name = task.taskName,
                Description = task.taskDescription,
                Priority = task.taskPriority,
                Deadline = task.taskDeadline,
            };
            _context.Add(taskCreate);
            _context.SaveChanges();
            return task;
        }

    }
}
