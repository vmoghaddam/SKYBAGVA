using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewMandatoryCourseAll
    {
        public int TypeId { get; set; }
        public string Title { get; set; }
        public int JobGroupId { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public string JobGroupCode2 { get; set; }
        public string JobGroupMain { get; set; }
        public string JobGroupMainCode { get; set; }
        public int? Mandatory { get; set; }
    }
}
