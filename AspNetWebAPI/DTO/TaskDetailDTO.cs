﻿namespace AspNetCoreAPI.DTO
{
    public class TaskDetailDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public bool IsDone { get; set; }
        public DateTime Deadline { get; set; }
        public string? ImageUrl { get; set; }
    }
}
