using System;
using System.Linq;
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

        public void Create(Employee employee)
        {
            EmployeesRepository.Add(employee.ToDbEmployee());
            _repositoryManager.SaveChanges();
        }

        public Employee Read(Guid id) => Employee.FromDbEmployee(EmployeesRepository.First(e => e.Id == id));

        public Employee Read(string firstName, string lastName, string midlleName)
        {
            //TODO
            throw new NotImplementedException();
        }

        public void Update(Employee oldEmployee, Employee newEmployee)
        {
            EmployeesRepository.Delete(oldEmployee.ToDbEmployee());
            EmployeesRepository.Add(newEmployee.ToDbEmployee());
            _repositoryManager.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var dbemployee = Read(id);
            EmployeesRepository.Delete(dbemployee.ToDbEmployee());
            _repositoryManager.SaveChanges();
        }

        public Employee[] GetAll()
        {
            return EmployeesRepository.Find().Select(db=>Employee.FromDbEmployee(db)).ToArray();
        }
    }
}
