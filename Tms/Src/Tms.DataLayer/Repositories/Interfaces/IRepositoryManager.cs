namespace Tms.DataLayer.Repositories.Interfaces
{
    public interface IRepositoryManager
    {
        IRepository<TDbEntity> GetRepository<TDbEntity>() where TDbEntity : class, IDbEntity, new();
        IReadonlyRepository<TDbEntity> GetReadonlyRepository<TDbEntity>() where TDbEntity : class, IDbEntity;
        void SaveChanges();
    }
}
