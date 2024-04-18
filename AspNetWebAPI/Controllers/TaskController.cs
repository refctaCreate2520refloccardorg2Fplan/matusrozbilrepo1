using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTO;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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
                Deadline = Tasks.Deadline,
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

        [HttpGet]
        [Route("/taskdetail/{id:int}")]

        public TaskDetailDTO GetTaskById(int id)
        {
            ApplicationTask task = _context.Tasks.Where(task => task.Id == id).FirstOrDefault();

            if (task != null)
            {
                return new TaskDetailDTO
                {
                    Id = task.Id,
                    Name = task.Name,
                    Description = task.Description,
                    Priority = task.Priority,
                    Deadline = task.Deadline,
                };
            }
            else
            {
                return null;
            }
        }
        [HttpPut]
        [Route("/editTask")]
        public TaskDetailDTO EditTask(TaskDetailDTO task)
        {
            var taskik = _context.Tasks.Where(x => x.Id == task.Id).Single();
            taskik.Name = task.Name;
            taskik.Description = task.Description;
            
            taskik.Deadline = task.Deadline;
            taskik.Priority = task.Priority;
            _context.SaveChanges();
           
            var editnuty = new TaskDetailDTO()
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                Priority = task.Priority,
                Deadline = task.Deadline,

            };
            return editnuty;
            
            
        }

    }
}
