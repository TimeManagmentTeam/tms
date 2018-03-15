using Microsoft.EntityFrameworkCore;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Repositories
{
    internal abstract class RepositoryBase<TDbEntity> where TDbEntity : class, IDbEntity
    {
        protected TmsContext TmsContext { get; }
        protected DbSet<TDbEntity> EntitiesSet => TmsContext.Set<TDbEntity>();

        protected RepositoryBase(TmsContext tmsContext)
        {
            TmsContext = tmsContext;
        }
    }
}