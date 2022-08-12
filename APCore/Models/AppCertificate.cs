using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class AppCertificate
    {
        public int CrewId { get; set; }
        public int PersonId { get; set; }
        public int TypeId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpireDate { get; set; }
        public int? EXPDay { get; set; }
        public int? EXPMonth { get; set; }
        public int? EXPYear { get; set; }
        public int? Remain { get; set; }
        public string Title { get; set; }
        public string Remark { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public int IsCockpit { get; set; }
        public int IsCabin { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
    }
}
