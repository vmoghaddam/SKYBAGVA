using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewMandatoryCourseEmployee
    {
        public string FirstName { get; set; }
        public int Id { get; set; }
        public string PID { get; set; }
        public string BaseAirport { get; set; }
        public int? BaseAirportId { get; set; }
        public bool IsActive { get; set; }
        public int? GroupId { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public string JobGroupRoot { get; set; }
        public string JobGroupMain { get; set; }
        public string JobGroupMainCode { get; set; }
        public string NID { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string CourseType { get; set; }
        public int CourseTypeId { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public string Instructor { get; set; }
        public int? Duration { get; set; }
        public int? DurationUnitId { get; set; }
        public string Location { get; set; }
        public int? StatusId { get; set; }
        public string Status { get; set; }
        public string TrainingDirector { get; set; }
        public string CourseTitle { get; set; }
        public bool? Recurrent { get; set; }
        public int? CalanderTypeId { get; set; }
        public string No { get; set; }
        public string DurationUnit { get; set; }
        public string CalendarType { get; set; }
        public string Organization { get; set; }
        public DateTime? DateStatus { get; set; }
        public int? CoursePeopleStatusId { get; set; }
        public DateTime? DateIssue { get; set; }
        public DateTime? DateExpire { get; set; }
        public string StatusRemark { get; set; }
        public string CoursePeopleStatus { get; set; }
        public string CertificateNo { get; set; }
        public int? CourseId { get; set; }
        public int HasCourse { get; set; }
        public int? Remains { get; set; }
        public int IsExpired { get; set; }
        public int IsExpiring { get; set; }
        public int ValidStatus { get; set; }
        public int? Mandatory { get; set; }
    }
}
