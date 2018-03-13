using System.Collections.Generic;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Repositories
{
    public class CommonRepository<TDbEntity> : CommonReadonlyRepository<TDbEntity>, ICommonRepository<TDbEntity> where TDbEntity : class, IDbEntity, new()
    {
        public CommonRepository(TmsContext tmsContext) : base(tmsContext)
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
