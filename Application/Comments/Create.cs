
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDTO>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDTO>>
        {
        public DataContext Context { get; }
        public IUserAccessor UserAccessor { get; set; }
        public IMapper Mapper { get; }
            public  Handler(DataContext context,IUserAccessor userAccessor,IMapper mapper)
            {
            Mapper = mapper;
            UserAccessor = userAccessor;
            Context = context;

            }
            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await Context.Activities.FindAsync(request.ActivityId);

                if(activity == null)    return null;

                var user = await Context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == UserAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };

                activity.Comments.Add(comment);

                var success = await Context.SaveChangesAsync() > 0;

                if(success) return Result<CommentDTO>.Success(Mapper.Map<CommentDTO>(comment));

                return Result<CommentDTO>.Failure("Failed to add comment");
            }
        }
    }
}