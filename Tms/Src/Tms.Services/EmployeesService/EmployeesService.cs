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
        }

        public void Create(DtoEmployee dtoEmployee)
        {
            EmployeesRepository.Add(Mapper.Map<DbEmployee>(dtoEmployee));
            _repositoryManager.SaveChanges();
        }

        public DtoEmployee Read(Guid id) => Mapper.Map<DtoEmployee>(EmployeesRepository.First(e => e.Id == id));

        public ICollection<DtoEmployee> GetSubordinates(Guid id)
        {
            return EmployeesRepository.Find(e => e.DepartmentDirectorId == id || e.DirectorId == id)
                .ProjectTo<DtoEmployee>().ToArray();
        }

        public void Update(Guid employeerId, DtoEmployee newDtoEmployee)
        {
            var employeer = EmployeesRepository.First(e => e.Id == employeerId);
            employeer.FirstName = newDtoEmployee.FirstName;
            employeer.MiddleName = newDtoEmployee.MiddleName;
            employeer.LastName = newDtoEmployee.LastName;
            employeer.Role = newDtoEmployee.Role;
            employeer.Blocked = newDtoEmployee.Blocked;
            employeer.DepartmentDirectorId = newDtoEmployee.DepartmentDirector.Id;
            employeer.DirectorId = newDtoEmployee.Director.Id;
            employeer.Email = newDtoEmployee.Email;
            employeer.PassHash = newDtoEmployee.PassHash;
            _repositoryManager.SaveChanges();
        }

        public bool Verify(string email, string passHash, out DtoEmployee outEmployee)
        {
            if (EmployeesRepository.Any(e=>e.Email==email))
            {
                var employee = Mapper.Map<DtoEmployee>(EmployeesRepository.First(e => e.Email == email));
                if (employee.PassHash == passHash)
                {
                    outEmployee = employee;
                    return true;
                }
            }
            outEmployee = null;
            return false;

        }

        public void Delete(Guid id)
        {
            var employeer = EmployeesRepository.First(e => e.Id == id);
            EmployeesRepository.Delete(employeer);
            _repositoryManager.SaveChanges();
        }

        public ICollection<DtoEmployee> GetAll()
        {
            return EmployeesRepository.Find().ProjectTo<DtoEmployee>().ToArray();
        }
    }
}
