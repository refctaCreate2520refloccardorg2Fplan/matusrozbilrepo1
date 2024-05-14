namespace AspNetCoreAPI.DTO
{
    public class CreateTaskDTO
    {
        public string taskName { get; set; } = default!;
        public string taskDescription { get; set; } = default!;
        public int taskPriority { get; set; } = default!;
        public DateTime taskDeadline { get; set; } = default!; 
        //komentik ich liebe deine Schwester
    }
}
