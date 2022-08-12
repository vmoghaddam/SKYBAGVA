using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewFDPKey
    {
        public int Id { get; set; }
        public int? CrewId { get; set; }
        public DateTime? ReportingTime { get; set; }
        public DateTime? DelayedReportingTime { get; set; }
        public DateTime? RevisedDelayedReportingTime { get; set; }
        public DateTime? FirstNotification { get; set; }
        public DateTime? NextNotification { get; set; }
        public int? DelayAmount { get; set; }
        public int? BoxId { get; set; }
        public int? JobGroupId { get; set; }
        public bool IsTemplate { get; set; }
        public int DutyType { get; set; }
        public DateTime? DateContact { get; set; }
        public int? FDPId { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public int? CityId { get; set; }
        public int? TemplateId { get; set; }
        public DateTime? FDPReportingTime { get; set; }
        public Guid? GUID { get; set; }
        public int? FirstFlightId { get; set; }
        public int? LastFlightId { get; set; }
        public int? UPD { get; set; }
        public bool? IsMain { get; set; }
        public string Key { get; set; }
        public bool? CP { get; set; }
        public int? CustomerId { get; set; }
        public string Remark { get; set; }
        public int? LocationId { get; set; }
        public DateTime? InitStart { get; set; }
        public DateTime? InitEnd { get; set; }
        public DateTime? InitRestTo { get; set; }
        public string InitFlts { get; set; }
        public string InitRoute { get; set; }
        public string InitFromIATA { get; set; }
        public string InitToIATA { get; set; }
        public string InitNo { get; set; }
        public string InitKey { get; set; }
        public int? InitHomeBase { get; set; }
        public string InitRank { get; set; }
        public int? InitIndex { get; set; }
        public string InitGroup { get; set; }
        public string InitScheduleName { get; set; }
        public string InitFlights { get; set; }
    }
}
