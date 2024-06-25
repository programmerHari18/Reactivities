using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        public DataContext Context { get; }
        public IUserAccessor UserAccessor { get; set; }
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            UserAccessor = userAccessor;
            Context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await Context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == UserAccessor.GetUsername());

                if (user == null)   return null;
                var photos = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

                if(currentMain != null) currentMain.IsMain = false;
                photos.IsMain = true;
                var result = await Context.SaveChangesAsync() > 0;

                if(result)  return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem setting main photo");
            }
        }
    }
}