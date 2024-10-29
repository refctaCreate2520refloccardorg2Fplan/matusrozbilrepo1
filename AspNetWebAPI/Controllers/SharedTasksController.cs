using AspNetCoreAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SharedTasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
    }
}
