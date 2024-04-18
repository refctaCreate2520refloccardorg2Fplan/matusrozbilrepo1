namespace AspNetCoreAPI.DTO
{
    public class TaskUpdateDTO
    {
        public int Id { get; set; }
        public string UpdName { get; set; }
        public string UpdDescription { get; set; }
        public int UpdPriority { get; set; }
        public DateTime UpdDeadline { get; set; }
    }
}
