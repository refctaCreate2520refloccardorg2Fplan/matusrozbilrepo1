namespace AspNetCoreAPI.DTO
{
    public class SharedTasksDTO
    {
        public int Id { get; set; } = default!;
        public string? Name { get; set; } = default!;
        public string? Description { get; set; } = null;
        public int Priority { get; set; }
        public bool IsDone { get; set; }
        public DateTime Deadline { get; set; }
    }
}
