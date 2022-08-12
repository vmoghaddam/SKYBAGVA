using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewCateringItem
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public int? AmountLoaded { get; set; }
        public int? AmountOffLoaded { get; set; }
        public int? StationId { get; set; }
        public string Remark { get; set; }
        public int? FlightId { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public string IATA { get; set; }
        public string ICAO { get; set; }
        public string Register { get; set; }
        public int? RegisterId { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public int? FromAirport { get; set; }
        public int? ToAirport { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public DateTime? STDLocal { get; set; }
        public DateTime? STALocal { get; set; }
        public DateTime? STDDay { get; set; }
    }
}
