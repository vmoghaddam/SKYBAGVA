using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewFlightCharterer
    {
        public DateTime? ChocksIn { get; set; }
        public DateTime? Landing { get; set; }
        public DateTime? Takeoff { get; set; }
        public DateTime? ChocksOut { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public DateTime? STDLocal { get; set; }
        public DateTime? STALocal { get; set; }
        public DateTime? Date { get; set; }
        public int? RegisterID { get; set; }
        public int? FlightStatusID { get; set; }
        public int? FlightTypeID { get; set; }
        public string AircraftType { get; set; }
        public int? TypeId { get; set; }
        public string FlightNumber { get; set; }
        public int? FromAirport { get; set; }
        public string FromAirportICAO { get; set; }
        public int? ToAirport { get; set; }
        public string ToAirportICAO { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public string Register { get; set; }
        public string FlightStatus { get; set; }
        public DateTime? STDDay { get; set; }
        public DateTime? STADay { get; set; }
        public DateTime? DepartureLocal { get; set; }
        public DateTime? ArrivalLocal { get; set; }
        public int? BlockTime { get; set; }
        public int? FlightTime { get; set; }
        public int? PaxChild { get; set; }
        public int? PaxInfant { get; set; }
        public int? PaxAdult { get; set; }
        public int? TotalSeat { get; set; }
        public DateTime? FlightDate { get; set; }
        public int? Freight { get; set; }
        public int BaggageWeight { get; set; }
        public int CargoWeight { get; set; }
        public int? CargoCount { get; set; }
        public int? BaggageCount { get; set; }
        public int? TotalPaxRev { get; set; }
        public int? TotalPax { get; set; }
        public string Code { get; set; }
        public string Title1 { get; set; }
        public string NiraCode { get; set; }
        public string Title2 { get; set; }
        public int? Book { get; set; }
        public int? Capacity { get; set; }
        public int? Adult { get; set; }
        public int? Child { get; set; }
        public int? Infant { get; set; }
        public int? Total { get; set; }
        public int? TotalRev { get; set; }
        public decimal? RevPercent { get; set; }
        public string Remark { get; set; }
        public int FlightId { get; set; }
        public int ChartererId { get; set; }
        public int Id { get; set; }
        public string PDate { get; set; }
    }
}
