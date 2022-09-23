using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewAssignGrid
    {
        public int Id { get; set; }
        public int DutyType { get; set; }
        public string DutyTypeTitle { get; set; }
        public DateTime? StartLocal { get; set; }
        public DateTime? EndLocal { get; set; }
        public int? CrewId { get; set; }
        public string ScheduleName { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public int? JobGroupId { get; set; }
        public int GroupOrder { get; set; }
        public int IsCockpit { get; set; }
        public string JobGroup2 { get; set; }
        public int? RankId { get; set; }
        public string Rank { get; set; }
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
    }
}
