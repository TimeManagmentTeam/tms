using System;
using Tms.DataLayer.Entities;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.Services
{
    public class EmployeesService
    {
        private readonly IRepositoryManager _repositoryManager;
        private IRepository<Employee> EmployeesRepository => _repositoryManager.GetRepository<Employee>();

        public EmployeesService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }

        public void Create(Employee employee) => EmployeesRepository.Add(employee);

        public Employee Read(Guid id) => EmployeesRepository.First(e => e.Id == id);

        public Employee Read(string firstName, string lastName, string patronymic)
        {
            //TODO
            throw new NotImplementedException();
        }
        public void Update(Employee oldEmployee, Employee newEmployee)
        {
            EmployeesRepository.Delete(oldEmployee);
            EmployeesRepository.Add(newEmployee);
        }

        public void Delete(Employee employee) => EmployeesRepository.Delete(employee);

    }
}
