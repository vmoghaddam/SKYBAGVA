using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class EmployeeDocument
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
    }
}
