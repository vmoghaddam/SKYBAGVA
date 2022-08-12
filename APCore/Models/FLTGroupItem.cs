using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FLTGroupItem
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public int FLTGroupId { get; set; }

        public virtual FLTGroup FLTGroup { get; set; }
        public virtual FlightInformation Flight { get; set; }
    }
}
