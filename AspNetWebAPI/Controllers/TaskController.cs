using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTO;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System;
using System.Linq;
using System.Text.RegularExpressions;
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
            return _context.Tasks.Select(mapToTaskDto);
        }

        [HttpPut]
        [Route("/tasklist")]
        public TasksDTO createNewTask(CreateTaskDTO task)
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
            return mapToTaskDto(taskCreate);
        }

        private TasksDTO mapToTaskDto(ApplicationTask taskCreate)
        {
            return new TasksDTO { 
                Id = taskCreate.Id,
                Description = taskCreate.Description,
                Deadline= taskCreate.Deadline,
                IsDone = taskCreate.IsDone,
                Name = taskCreate.Name,
                Priority = taskCreate.Priority,
            };
        }

        [HttpDelete]
        [Route("/tasklist/{id:int}")]
        public TasksDTO deleteTask([FromRoute] int id)
        {
            var minus = _context.Tasks.Where(x => x.Id == id).Single();
            _context.Remove(minus);
            _context.SaveChanges();
            return null;
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
                    ImageUrl = task.imageUrl
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
            taskik.imageUrl = task.ImageUrl;
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
                ImageUrl = task.ImageUrl,
            };
            return editnuty; 
        }

        [HttpPost]
        [Route("/save-url/{id:int}")]
        public string imgUrl([FromRoute]int id, string url) {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id);
            task.imageUrl = url;
            _context.SaveChanges();
            return url;
                
                
        }             
    }    
}

