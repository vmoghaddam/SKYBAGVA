using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class Teacher
    {
        public Teacher()
        {
            Courses = new HashSet<Course>();
            TeacherDocuments = new HashSet<TeacherDocument>();
        }

        public int PersonId { get; set; }
        public string Remark { get; set; }

        public virtual Person Person { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<TeacherDocument> TeacherDocuments { get; set; }
    }
}
