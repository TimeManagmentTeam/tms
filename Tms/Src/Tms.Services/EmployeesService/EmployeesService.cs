using System;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Tms.DataLayer.Entities;
using Tms.DataLayer.Repositories.Interfaces;
using System.Collections.Generic;

namespace Tms.Services.EmployeesService
{
    public class EmployeesService
    {
        private readonly IRepositoryManager _repositoryManager;
        private IRepository<DbEmployee> EmployeesRepository => _repositoryManager.GetRepository<DbEmployee>();

        public EmployeesService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;

            Mapper.Initialize(cfg => cfg.CreateMap<DtoEmployee, DbEmployee>()
                    .ForMember("Role", opt => opt.MapFrom(c => (int)c.Role)));
            Mapper.Initialize(cfg => cfg.CreateMap<DbEmployee, DtoEmployee>()
                    .ForMember("Role", opt => opt.MapFrom(c => (DtoEmployee.TmsRole)c.Role)));
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

        public void Update(Guid employeerId, DtoEmployee newDtoEmployee)
        {
            var employeer = EmployeesRepository.First(e => e.Id == employeerId);
            employeer.FirstName = newDtoEmployee.FirstName;
            employeer.MidlleName = newDtoEmployee.MidlleName;
            employeer.LastName = newDtoEmployee.LastName;
            employeer.Role = (int) newDtoEmployee.Role;
            employeer.PassHash = newDtoEmployee.PassHash;
            _repositoryManager.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var dbEmployee = Read(id);
            EmployeesRepository.Delete(Mapper.Map<DbEmployee>(dbEmployee));
            _repositoryManager.SaveChanges();
        }

        public ICollection<DtoEmployee> GetAll()
        {
            return EmployeesRepository.Find().ProjectTo<DtoEmployee>().ToArray();
        }
    }
}
