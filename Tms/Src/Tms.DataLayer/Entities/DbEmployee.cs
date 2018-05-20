using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Tms.DataLayer.Enums;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Entities
{
    public class DbEmployee : IDbEntity
    {
        public Guid Id { get; set; }

        public string XrmId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }

        [DataType(DataType.EmailAddress, ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        public string PassHash { get; set; }

        public TmsRole Role { get; set; }

        public bool Blocked { get; set; }
        
        public Guid? DirectorId { get; set; }

        [ForeignKey("DirectorId")]
        public virtual DbEmployee Director { get; set; }

        public Guid? DepartmentDirectorId { get; set; }

        [ForeignKey("DepartmentDirectorId")]
        public virtual DbEmployee DepartmentDirector { get; set; }

        public virtual ICollection<DbTimeStamp> TimeStamps { get; set; }
    }
}
