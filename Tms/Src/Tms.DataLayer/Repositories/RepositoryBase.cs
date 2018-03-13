using Microsoft.EntityFrameworkCore;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Repositories
{
    public abstract class RepositoryBase<TDbEntity> where TDbEntity : class, IDbEntity
    {
        protected RepositoryBase(TmsContext tmsContext)
        {
            TmsContext = tmsContext;
        }

        protected TmsContext TmsContext { get; }

        protected DbSet<TDbEntity> EntitiesSet => TmsContext.Set<TDbEntity>();
    }
}
