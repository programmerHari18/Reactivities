

using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDTO>>>
        {
            public string Username {get; set;}
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDTO>>>
        {
            public IUserAccessor UserAccessor { get; }
            public IMapper Mapper { get; set; }
            public DataContext Context { get; }
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                Context = context;
                Mapper = mapper;
                UserAccessor = userAccessor;

            }
            public async Task<Result<List<UserActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
               var query = Context.ActivityAttendees
                .Where(u => u.AppUser.UserName == request.Username)
                .OrderBy(a => a.Activity.Date)
                .ProjectTo<UserActivityDTO>(Mapper.ConfigurationProvider)
                .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now)
                };

                var activities = await query.ToListAsync();

                return Result<List<UserActivityDTO>>.Success(activities);
            }
        }
    }
}