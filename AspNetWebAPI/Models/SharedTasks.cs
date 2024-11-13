using System;

namespace AspNetCoreAPI.Models
{
    public class SharedTasks
    {
        public int Id { get; set; } = default!;
        public string? Name { get; set; } = default!;
        public string? Description { get; set; } = null;
        public int Priority { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsDone { get; set; } = false;
        public DateTime Deadline { get; set; }
        public string? CreatedBy { get; set; }
        public string? ImageUrl { get; set; }
        public ICollection<SharedTasks> SharedTasksInfo { get; } = new List<SharedTasks>();
    }
}
