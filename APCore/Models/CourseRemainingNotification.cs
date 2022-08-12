using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class CourseRemainingNotification
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public int? CourseId { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public DateTime? DateIssue { get; set; }
        public DateTime? DateExpire { get; set; }
        public int? Remaining { get; set; }
        public string Mobile { get; set; }
        public DateTime? DateSent { get; set; }
        public string Message { get; set; }
        public long? RefId { get; set; }
        public string Status { get; set; }
    }
}
