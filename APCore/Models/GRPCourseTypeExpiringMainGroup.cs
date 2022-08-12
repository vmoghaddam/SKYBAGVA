using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class GRPCourseTypeExpiringMainGroup
    {
        public int TypeId { get; set; }
        public string Title { get; set; }
        public int? Mandatory { get; set; }
        public string JobGroupMain { get; set; }
        public string JobGroupMainCode { get; set; }
        public int? EmployeesCount { get; set; }
        public int? ValidCount { get; set; }
        public int? ExpiredCount { get; set; }
        public int? ExpiringCount { get; set; }
        public int? UnknownCount { get; set; }
    }
}
