using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Repositories
{
    internal class RepositoryManager : IRepositoryManager
    {
        private readonly TmsContext _context;

        public RepositoryManager(TmsContext context)
        {
            _context = context;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IRepository<TDbEntity> GetRepository<TDbEntity>() where TDbEntity : class, IDbEntity, new()
        {
            return new Repository<TDbEntity>(_context);
        }

        public IReadonlyRepository<TDbEntity> GetReadonlyRepository<TDbEntity>() where TDbEntity : class, IDbEntity
        {
            return new ReadonlyRepository<TDbEntity>(_context);
        }
    }
}
