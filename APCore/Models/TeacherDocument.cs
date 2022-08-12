using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class TeacherDocument
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public int? TypeId { get; set; }
        public string Remark { get; set; }
        public string FileUrl { get; set; }

        public virtual Teacher Teacher { get; set; }
    }
}
