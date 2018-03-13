using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        public ICommonRepository<TDbEntity> GetCommonRepository<TDbEntity>() where TDbEntity : class, IDbEntity, new()
        {
            return new CommonRepository<TDbEntity>(_context);
        }

        private readonly TmsContext _context;

        public RepositoryManager(TmsContext context)
        {
            _context = context;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public ICommonReadonlyRepository<TDbEntity> GetCommonReadonlyRepository<TDbEntity>() where TDbEntity : class, IDbEntity
        {
            return new CommonReadonlyRepository<TDbEntity>(_context);
        }
    }
}
