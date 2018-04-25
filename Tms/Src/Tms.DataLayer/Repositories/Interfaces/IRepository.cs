using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Tms.DataLayer.Repositories.Interfaces
{
    public interface IRepository<TDbEntity> : IReadonlyRepository<TDbEntity>  where TDbEntity : IDbEntity
    {
        void Add(TDbEntity dbEntity);
        void Add(IEnumerable<TDbEntity> dbEntities);
        bool Any(Expression<Func<TDbEntity, bool>> predicate);
        void Delete(TDbEntity dbEntity);
        void Delete(IEnumerable<TDbEntity> dbEntities);
        TDbEntity Create();
    }
}