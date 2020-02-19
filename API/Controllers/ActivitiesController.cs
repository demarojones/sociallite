using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly ILogger<ValuesController> _logger;
        private readonly IMediator _mediator;

        public ActivitiesController(ILogger<ValuesController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> Get() => await _mediator.Send(new ActivityList.Query());

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Get(Guid id) => await _mediator.Send(new ActivityDetail.Query() { Id = id });

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(CreateActivity.Command command) => await _mediator.Send(command);

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, EditActivity.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) => await _mediator.Send(new DeleteActivity.Command { Id = id });
    }
}
