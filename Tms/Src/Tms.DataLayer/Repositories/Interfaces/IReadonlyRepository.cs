using System;
using System.Linq;
using System.Linq.Expressions;

namespace Tms.DataLayer.Repositories.Interfaces
{
    public interface IReadonlyRepository<TDbEntity> where TDbEntity : IDbEntity
    {
        TDbEntity Find(int id);
        IQueryable<TDbEntity> Find(Expression<Func<TDbEntity, bool>> filter = null);
        TDbEntity FirstOrDefault(Expression<Func<TDbEntity, bool>> filter = null);
        TDbEntity First(Expression<Func<TDbEntity, bool>> filter = null);
    }
}