namespace Tms.DataLayer.Repositories.Interfaces
{
    public interface IRepositoryManager
    {
        ICommonRepository<TDbEntity> GetCommonRepository<TDbEntity>() where TDbEntity : class, IDbEntity, new();
        ICommonReadonlyRepository<TDbEntity> GetCommonReadonlyRepository<TDbEntity>() where TDbEntity : class, IDbEntity;
        void SaveChanges();
    }
}
