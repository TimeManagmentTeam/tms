using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Repositories
{
    internal class Repository<TDbEntity> : ReadonlyRepository<TDbEntity>, IRepository<TDbEntity> where TDbEntity : class, IDbEntity, new()
    {
        public Repository(TmsContext tmsContext) : base(tmsContext)
        {
        }

        public void Add(TDbEntity dbEntity)
        {
            EntitiesSet.Add(dbEntity);
        }

        public void Add(IEnumerable<TDbEntity> dbEntities)
        {
            EntitiesSet.AddRange(dbEntities);
        }

        public bool Any(Expression<Func<TDbEntity, bool>> predicate)
        {
            return EntitiesSet.Any(predicate);
        }

        public void Delete(TDbEntity dbEntity)
        {
            EntitiesSet.Remove(dbEntity);
        }

        public void Delete(IEnumerable<TDbEntity> dbEntities)
        {
            EntitiesSet.RemoveRange(dbEntities);
        }

        public TDbEntity Create()
        {
            return new TDbEntity();
        }
    }
}
