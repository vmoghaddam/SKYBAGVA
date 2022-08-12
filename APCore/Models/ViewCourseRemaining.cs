using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewCourseRemaining
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public int CourseId { get; set; }
        public int CourseTypeId { get; set; }
        public int? CertificateTypeId { get; set; }
        public string CourseType { get; set; }
        public string CertificateType { get; set; }
        public string Title { get; set; }
        public string No { get; set; }
        public string PID { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NID { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public DateTime? DateIssue { get; set; }
        public DateTime? DateExpire { get; set; }
        public int? Remaining { get; set; }
    }
}
