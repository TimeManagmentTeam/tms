using System;
using Tms.Services.Test.Dto;

namespace Tms.Services.Test.Interfaces
{
    public interface ITestService
    {
        TestDto[] GetAll();
        Guid Add(string test);
    }
}
