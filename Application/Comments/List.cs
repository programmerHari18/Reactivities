
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDTO>>>
        {
            public Guid ActivityId {get; set;}
        }
        public class Handler : IRequestHandler<Query, Result<List<CommentDTO>>>
        {
        public DataContext Context { get; }
        public IMapper Mapper { get; set; }
            public Handler(DataContext context, IMapper mapper)
            {
            Mapper = mapper;
            Context = context;

            }
            public async Task<Result<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
               var comment = await Context.Comments 
                .Where(x => x.Activity.Id == request.ActivityId)
                .OrderBy(x => x.CreatedAt)
                .ProjectTo<CommentDTO>(Mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<CommentDTO>>.Success(comment);
            }
        }
    }
}