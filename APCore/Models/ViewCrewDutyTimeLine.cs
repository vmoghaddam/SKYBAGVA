using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewCrewDutyTimeLine
    {
        public int Id { get; set; }
        public int DutyType { get; set; }
        public string DutyTypeTitle { get; set; }
        public int? CrewId { get; set; }
        public string ScheduleName { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public int? JobGroupId { get; set; }
        public int IsCockpit { get; set; }
        public string JobGroup2 { get; set; }
        public int GroupOrder { get; set; }
        public string ValidTypes { get; set; }
        public int? BaseAirportId { get; set; }
        public string Mobile { get; set; }
        public int? RankId { get; set; }
        public string Rank { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public DateTime? StartLocal { get; set; }
        public DateTime? EndLocal { get; set; }
        public int? YearLocal { get; set; }
        public int? MonthLocal { get; set; }
        public DateTime? RestTo { get; set; }
        public DateTime? RestToLocal { get; set; }
        public int? TemplateId { get; set; }
        public string Key { get; set; }
        public DateTime? InitStart { get; set; }
        public DateTime? InitEnd { get; set; }
        public string InitFlts { get; set; }
        public string InitRoute { get; set; }
        public string InitFromIATA { get; set; }
        public string InitNo { get; set; }
        public string InitKey { get; set; }
        public int? InitHomeBase { get; set; }
        public string InitRank { get; set; }
        public int? InitIndex { get; set; }
        public string InitGroup { get; set; }
        public string InitFlights { get; set; }
        public int? Extension { get; set; }
        public double? Split { get; set; }
        public string Remark { get; set; }
        public string Remark2 { get; set; }
        public decimal? MaxFDP { get; set; }
        public int? DurationDuty { get; set; }
        public int? DurationFDP { get; set; }
        public int IsFDPOver { get; set; }
        public int? InteruptedId { get; set; }
    }
}
