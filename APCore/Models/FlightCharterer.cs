using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FlightCharterer
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public int ChartererId { get; set; }
        public int? Book { get; set; }
        public int? Capacity { get; set; }
        public string Remark { get; set; }
        public int? Adult { get; set; }
        public int? Child { get; set; }
        public int? Infanct { get; set; }

        public virtual Charterer Charterer { get; set; }
        public virtual FlightInformation Flight { get; set; }
    }
}
