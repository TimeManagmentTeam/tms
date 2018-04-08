using System;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Tms.DataLayer.Entities;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.Services
{
    public class EmployeesService
    {
        private readonly IRepositoryManager _repositoryManager;
        private IRepository<DbEmployee> EmployeesRepository => _repositoryManager.GetRepository<DbEmployee>();

        public EmployeesService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }

        public void Create(DtoEmployee dtoEmployee)
        {
            EmployeesRepository.Add(Mapper.Map<DbEmployee>(dtoEmployee));
            _repositoryManager.SaveChanges();
        }

        public DtoEmployee Read(Guid id) => Mapper.Map<DtoEmployee>(EmployeesRepository.First(e => e.Id == id));

        public DtoEmployee Read(string firstName, string lastName, string midlleName)
        {
            //TODO
            throw new NotImplementedException();
        }

        public void Update(DtoEmployee oldDtoEmployee, DtoEmployee newDtoEmployee)
        {
            EmployeesRepository.Delete(Mapper.Map<DbEmployee>(oldDtoEmployee));
            EmployeesRepository.Add(Mapper.Map<DbEmployee>(newDtoEmployee));
            _repositoryManager.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var dbemployee = Read(id);
            EmployeesRepository.Delete(Mapper.Map<DbEmployee>(dbemployee));
            _repositoryManager.SaveChanges();
        }

        public DtoEmployee[] GetAll()
        {
            return EmployeesRepository.Find().ProjectTo<DtoEmployee>().ToArray();
        }
    }
}
