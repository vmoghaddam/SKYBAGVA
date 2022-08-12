using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FLTGroup
    {
        public FLTGroup()
        {
            FLTGroupItems = new HashSet<FLTGroupItem>();
        }

        public int Id { get; set; }
        public DateTime CDate { get; set; }
        public string Remark { get; set; }
        public int? FirstFlightId { get; set; }
        public int? LastFlightId { get; set; }

        public virtual ICollection<FLTGroupItem> FLTGroupItems { get; set; }
    }
}
