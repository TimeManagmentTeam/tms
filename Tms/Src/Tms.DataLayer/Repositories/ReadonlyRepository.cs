using System;
using System.Linq;
using System.Linq.Expressions;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Repositories
{
    internal class ReadonlyRepository<TDbEntity>: RepositoryBase<TDbEntity>, IReadonlyRepository<TDbEntity> where TDbEntity : class, IDbEntity
    {
        public ReadonlyRepository(TmsContext tmsContext) : base(tmsContext)
        {
        }

        public TDbEntity FirstOrDefault(Expression<Func<TDbEntity, bool>> filter)
        {
            return Find(filter).FirstOrDefault();
        }

        public TDbEntity First(Expression<Func<TDbEntity, bool>> filter)
        {
            return Find(filter).First();
        }

        public TDbEntity Find(int id)
        {
            return EntitiesSet.Find(id);
        }

        public IQueryable<TDbEntity> Find(Expression<Func<TDbEntity, bool>> filter = null)
        {
            return filter == null ? EntitiesSet : EntitiesSet.Where(filter);
        }
    }
}
