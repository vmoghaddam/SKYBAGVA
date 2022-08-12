using APCore.Models;
using APCore.Objects;
using APCore.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Text;

namespace APCore.Services
{
    public interface ICertificateService
    {

        Task<DataResponse> GetCrewCertificates(int crewId);
        Task<DataResponse> GetExpiringCertificates();
        Task<DataResponse> GetCrewGroupedCertificates(int crewId);
        Task<DataResponse> GetCrewProfile(int crewId);

    }
    public class CertificateService : ICertificateService
    {
        private readonly ppa_cspnContext _context;
        private IConfiguration _configuration;
        public CertificateService(ppa_cspnContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<DataResponse> GetCrewGroupedCertificates(int crewId)
        {
            var query= await _context.AppCertificates.Where(q =>
                     q.CrewId == crewId

            ).ToListAsync();
            var certs = (from x in query

                         group x by new { x.CrewId, x.FirstName, x.LastName, x.Name, x.PersonId, x.JobGroup, x.JobGroupCode, x.IsCockpit } into grp
                         select new
                         {
                             grp.Key.CrewId,
                             grp.Key.FirstName,
                             grp.Key.LastName,
                             grp.Key.Name,
                             grp.Key.JobGroup,
                             grp.Key.JobGroupCode,
                             grp.Key.IsCockpit,
                             Items = grp.OrderBy(q => q.StatusId).ThenBy(q => q.Remain).Select(q=>new { 
                              q.TypeId,
                              q.Title,
                              q.StatusId,
                              q.Status,
                              q.Remark,
                              q.Remain,
                              q.IssueDate,
                              q.ExpireDate,
                              q.EXPYear,
                              q.EXPMonth,
                              q.EXPDay,
                             

                             }).ToList()

                         }).FirstOrDefault();
             
            return new DataResponse
            {
                Data = certs,
                Errors = null,
                IsSuccess = true
            };
        }
        public async Task<DataResponse> GetCrewCertificates(int crewId)
        {

            var certs = await _context.AppCertificates.Where(q =>
                    q.CrewId == crewId

            ).OrderBy(q => q.StatusId).ThenBy(q => q.Remain).ToListAsync();
            return new DataResponse
            {
                Data = certs,
                Errors = null,
                IsSuccess = true
            };
        }
        public async Task<DataResponse> GetExpiringCertificates()
        {
            var query = from x in _context.AppCertificates
                        where x.StatusId != 200
                        select x;
            var ds = await query.ToListAsync();
            var grps = (from x in ds
                        where x.StatusId != 200
                        group x by new { x.CrewId, x.FirstName, x.LastName, x.Name, x.JobGroup, x.JobGroupCode, x.IsCockpit } into grp
                        select new
                        {
                            grp.Key.CrewId,
                            grp.Key.FirstName,
                            grp.Key.LastName,
                            grp.Key.Name,
                            grp.Key.JobGroup,
                            grp.Key.JobGroupCode,
                            grp.Key.IsCockpit,
                            Items = grp.OrderBy(q => q.StatusId).ToList()

                        }).ToList();

            //var certs = await _context.AppCertificates.Where(q =>
            //        q.CrewId == crewId

            //).OrderBy(q => q.StatusId).ThenBy(q => q.Remain).ToListAsync();
            return new DataResponse
            {
                 Data = grps,
                Errors = null,
                IsSuccess = true
            };
        }
        public async Task<DataResponse> GetCrewProfile(int crewId)
        {

            var profile = await _context.AppCrews.Where(q =>
                    q.Id == crewId

            ).FirstOrDefaultAsync();
            return new DataResponse
            {
                Data = profile,
                Errors = null,
                IsSuccess = true
            };
        }

    }
}
