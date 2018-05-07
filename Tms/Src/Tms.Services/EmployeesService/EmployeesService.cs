using System;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Tms.DataLayer.Entities;
using Tms.DataLayer.Repositories.Interfaces;

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

        public IQueryable<DtoEmployee> GetSubordinates(Guid id)
        {
            return EmployeesRepository.Find(e => e.DepartmentDirectorId == id || e.DirectorId == id)
                .ProjectTo<DtoEmployee>();
        }

        public void Update(Guid employeeId, DtoEmployee newDtoEmployee)
        {
            var employee = EmployeesRepository.First(e => e.Id == employeeId);
            employee.FirstName = newDtoEmployee.FirstName;
            employee.MiddleName = newDtoEmployee.MiddleName;
            employee.LastName = newDtoEmployee.LastName;
            employee.Role = newDtoEmployee.Role;
            employee.Blocked = newDtoEmployee.Blocked;
            employee.DepartmentDirectorId = newDtoEmployee.DepartmentDirector.Id;
            employee.DirectorId = newDtoEmployee.Director.Id;
            employee.Email = newDtoEmployee.Email;
            employee.PassHash = newDtoEmployee.PassHash;
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
            var employee = EmployeesRepository.First(e => e.Id == id);
            EmployeesRepository.Delete(employee);
            _repositoryManager.SaveChanges();
        }

        public IQueryable<DtoEmployee> GetAll()
        {
            return EmployeesRepository.Find().ProjectTo<DtoEmployee>();
        }
    }
}
