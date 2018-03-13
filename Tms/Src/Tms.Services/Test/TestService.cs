using System;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Tms.DataLayer.Entities;
using Tms.DataLayer.Repositories.Interfaces;
using Tms.Services.Test.Dto;
using Tms.Services.Test.Interfaces;

namespace Tms.Services.Test
{
    public class TestService : ITestService
    {
        private readonly IRepositoryManager _repositoryManager;
        private ICommonRepository<DbTest> TestRepository => _repositoryManager.GetCommonRepository<DbTest>();

        public TestService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }

        public TestDto[] GetAll()
        {
            return TestRepository.Find().ProjectTo<TestDto>().ToArray();
        }

        public Guid Add(string test)
        {
            var entity = new DbTest
            {
                Test = test,
                StringForAutoMapperTest = "i random string"
            };
            TestRepository.Add(entity);
            _repositoryManager.SaveChanges();
            return entity.Id;
        }
    }
}
