using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewFlightGroupItem
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public int FLTGroupId { get; set; }
        public string FlightNumber { get; set; }
        public string Register { get; set; }
        public int? RegisterId { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public DateTime? STDLocal { get; set; }
        public DateTime? STALocal { get; set; }
        public DateTime? STDDay { get; set; }
        public long? Rank { get; set; }
        public long? RankDesc { get; set; }
    }
}
