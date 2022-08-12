using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class CateringItem
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public int? AmountLoaded { get; set; }
        public int? AmountOffLoaded { get; set; }
        public int? StationId { get; set; }
        public string Remark { get; set; }
        public int? FlightId { get; set; }

        public virtual FlightInformation Flight { get; set; }
        public virtual Airport Station { get; set; }
        public virtual CateringItemCode Type { get; set; }
    }
}
