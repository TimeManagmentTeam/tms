﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Tms.DataLayer.Enums;
using Tms.Services.TimeStampsService;

namespace Tms.Services.EmployeesService
{
    public class DtoEmployee
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

        public DtoEmployee Director { get; set; }

        public DtoEmployee DepartmentDirector { get; set; }

        public virtual ICollection<DtoTimeStamp> TimeStamps { get; set; }

        public string FullName => FirstName + " " + MiddleName + " " + LastName;
    }
}
