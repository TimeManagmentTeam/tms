using System;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Entities
{
    public class DbTest : IDbEntity
    {
        public Guid Id { get; set; }
        public string Test { get; set; }
        public string StringForAutoMapperTest { get; set; }
    }
}
