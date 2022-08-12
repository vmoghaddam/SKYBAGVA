using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class HelperCertFIRSTAID
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpireDate { get; set; }
        public int? Remain { get; set; }
    }
}
