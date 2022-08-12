using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewTeacherCourse
    {
        public int CourseId { get; set; }
        public int CourseTypeId { get; set; }
        public string CourseType { get; set; }
        public int? CertificateTypeId { get; set; }
        public string CertificateType { get; set; }
        public string JobGroups { get; set; }
        public string JobGroupsCode { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public string Location { get; set; }
        public string Department { get; set; }
        public int? OrganizationId { get; set; }
        public int? Duration { get; set; }
        public int? DurationUnitId { get; set; }
        public int? StatusId { get; set; }
        public string Status { get; set; }
        public string Remark { get; set; }
        public string TrainingDirector { get; set; }
        public string Title { get; set; }
        public bool Recurrent { get; set; }
        public int? Interval { get; set; }
        public int? CalanderTypeId { get; set; }
        public bool? IsInside { get; set; }
        public bool? IsGeneral { get; set; }
        public int? CustomerId { get; set; }
        public string No { get; set; }
        public bool? IsNotificationEnabled { get; set; }
        public string Sessions { get; set; }
        public int PeopleCount { get; set; }
        public string Organization { get; set; }
        public string DurationUnit { get; set; }
        public string CalendarType { get; set; }
        public int? Mandatory { get; set; }
        public int Id { get; set; }
        public string NID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
        public string IDNo { get; set; }
        public string UserId { get; set; }
        public string ImageUrl { get; set; }
        public string RemarkTeacher { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public int? EmployeeId { get; set; }
    }
}
