using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
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

        public DtoEmployee Read(Guid id) => Mapper.Map<DtoEmployee>(EmployeesRepository
            .Find(e => e.Id == id)
            .Include("Director")
            .Include("DepartmentDirector")
            .First());

        public ICollection<DtoEmployee> GetSubordinates(Guid id)
        {
            return EmployeesRepository
                .Find(e => e.DepartmentDirectorId == id || e.DirectorId == id)
                .Include("Director")
                .Include("DepartmentDirector")
                .Select(x => Mapper.Map<DtoEmployee>(x))
                .ToArray();
        }

        public void Update(Guid employeeId, DtoEmployee newDtoEmployee)
        {
            var employeer = EmployeesRepository.First(e => e.Id == employeeId);
            employeer.FirstName = newDtoEmployee.FirstName;
            employeer.MiddleName = newDtoEmployee.MiddleName;
            employeer.LastName = newDtoEmployee.LastName;
            employeer.Email = newDtoEmployee.Email;
            if (newDtoEmployee.PassHash != null)
            {
                employeer.PassHash = newDtoEmployee.PassHash;
            }
            employeer.Role = newDtoEmployee.Role;
            employeer.Blocked = newDtoEmployee.Blocked;

            if (newDtoEmployee.DepartmentDirector != null)
            {
                employeer.DepartmentDirectorId = newDtoEmployee.DepartmentDirector.Id;
            }

            if (newDtoEmployee.Director != null)
            {
                employeer.DirectorId = newDtoEmployee.Director.Id;
            }

            _repositoryManager.SaveChanges();
        }

        public bool Verify(string email, string passHash, out DtoEmployee outEmployee)
        {
            if (EmployeesRepository.Any(e => e.Email == email))
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

        public ICollection<DtoEmployee> GetAll()
        {
            return EmployeesRepository.Find().ProjectTo<DtoEmployee>().ToArray();
        }
    }
}
