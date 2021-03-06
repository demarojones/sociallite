using System;
using System.Threading;
using System.Threading.Tasks;
using Data;
using Domain;
using MediatR;

namespace Application.Activities
{
    public class ActivityDetail
    {

        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext dataContext)
            {
                _context = dataContext;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                return activity;
            }
        }
    }
}