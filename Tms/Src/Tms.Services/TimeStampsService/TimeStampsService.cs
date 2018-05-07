﻿
using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Tms.DataLayer.Entities;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.Services.TimeStampsService
{
    public class TimeStampsService
    {
        private readonly IRepositoryManager _repositoryManager;
        private IRepository<DbTimeStamp> TimeStampsRepository => _repositoryManager.GetRepository<DbTimeStamp>();

        public TimeStampsService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }

        public DtoTimeStamp Read(Guid id)
        {
            return Mapper.Map<DtoTimeStamp>(TimeStampsRepository.First(t => t.Id == id));
        }

        public IQueryable<DtoTimeStamp> Read(Guid employeeId, DateTime from, DateTime to)
        {
            return TimeStampsRepository.Find(t => t.Date >= from && t.Date < to).ProjectTo<DtoTimeStamp>();
        }

        public void Create(DtoTimeStamp dtoTimeStamp)
        {
            TimeStampsRepository.Add(Mapper.Map<DbTimeStamp>(dtoTimeStamp));
            _repositoryManager.SaveChanges();
        }

        public void Update(Guid timeStampId, DtoTimeStamp newDtoTimeStamp)
        {
            var timeStamp = TimeStampsRepository.First(e => e.Id == timeStampId);
            timeStamp.Date = newDtoTimeStamp.Date;
            timeStamp.WorkedTime = newDtoTimeStamp.WorkedTime;
            _repositoryManager.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var dbTimeStamp = Read(id);
            TimeStampsRepository.Delete(Mapper.Map<DbTimeStamp>(dbTimeStamp));
            _repositoryManager.SaveChanges();
        }
    }
}
