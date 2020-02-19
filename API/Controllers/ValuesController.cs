using System.Collections.Generic;
using System.Threading.Tasks;
using Data;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _Context;
        private readonly ILogger<ValuesController> _logger;

        public ValuesController(ILogger<ValuesController> logger, DataContext context)
        {
            _logger = logger;
            _Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Get()
        {
            var values = await _Context.Values.ToListAsync();

            return Ok(values);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Value>>> Get(int id)
        {
            var value = await _Context.Values.FindAsync(id);

            return Ok(value);

        }
    }
}
