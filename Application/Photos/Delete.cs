using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        public DataContext Context { get; }
        public IPhotoAccessor PhotoAccessor { get; }
        public IUserAccessor UserAccessor { get; }
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
            UserAccessor = userAccessor;
            PhotoAccessor = photoAccessor;
            Context = context;
                
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
               var user = await Context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == UserAccessor.GetUsername());

                if(user == null)    return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if(photo == null)   return null;

                if(photo.IsMain)    return Result<Unit>.Failure("You cannot delete main Photo");

                var result = await PhotoAccessor.DeletePhoto(photo.Id);

                if(result == null)  return Result<Unit>.Failure("Problem deleting photo from Cloudinary");

                user.Photos.Remove(photo);

                var success = await Context.SaveChangesAsync() > 0;

                if(success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem deleting photo from API");
            }
        }
    }
}