using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class GRPGroupsExpiring
    {
        public string JobGroupMain { get; set; }
        public string JobGroupMainCode { get; set; }
        public string JobGroupCode2 { get; set; }
        public string JobGroup { get; set; }
        public int JobGroupId { get; set; }
        public int? EmployeesCount { get; set; }
        public int? ValidCount { get; set; }
        public int? ExpiredCount { get; set; }
        public int? ExpiringCount { get; set; }
        public int? UnknownCount { get; set; }
    }
}
