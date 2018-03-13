using System.Collections.Generic;

namespace Tms.DataLayer.Repositories.Interfaces
{
    public interface ICommonRepository<TDbEntity> : ICommonReadonlyRepository<TDbEntity>  where TDbEntity : IDbEntity
    {
        void Add(TDbEntity dbEntity);
        void Add(IEnumerable<TDbEntity> dbEntities);
        void Delete(TDbEntity dbEntity);
        void Delete(IEnumerable<TDbEntity> dbEntities);
        TDbEntity Create();
    }
}