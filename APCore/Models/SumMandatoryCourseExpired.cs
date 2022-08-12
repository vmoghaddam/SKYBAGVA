using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class SumMandatoryCourseExpired
    {
        public string JobGroupRoot { get; set; }
        public string JobGroup { get; set; }
        public string CourseType { get; set; }
        public int CourseTypeId { get; set; }
        public int? CNT { get; set; }
    }
}
