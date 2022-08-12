using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewFlightDaily
    {
        public int ID { get; set; }
        public int FlightId { get; set; }
        public int? FlightPlanId { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public DateTime? STDLocal { get; set; }
        public DateTime? STALocal { get; set; }
        public DateTime? Date { get; set; }
        public int? FlightStatusID { get; set; }
        public int? RegisterID { get; set; }
        public int? FlightTypeID { get; set; }
        public string AircraftType { get; set; }
        public int? TypeId { get; set; }
        public string FlightNumber { get; set; }
        public int? FromAirport { get; set; }
        public string FromAirportICAO { get; set; }
        public int? ToAirport { get; set; }
        public string ToAirportICAO { get; set; }
        public int? CustomerId { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public string Register { get; set; }
        public string FlightStatus { get; set; }
        public string ArrivalRemark { get; set; }
        public string DepartureRemark { get; set; }
        public DateTime? STDDay { get; set; }
        public DateTime? STDDayLocal { get; set; }
        public DateTime? STADay { get; set; }
        public int? DelayOffBlock { get; set; }
        public int? DelayTakeoff { get; set; }
        public DateTime? OSTA { get; set; }
        public int? OToAirportId { get; set; }
        public string OToAirportIATA { get; set; }
        public int? FPFlightHH { get; set; }
        public int? FPFlightMM { get; set; }
        public DateTime? Departure { get; set; }
        public DateTime? Arrival { get; set; }
        public DateTime? BlockOff { get; set; }
        public DateTime? BlockOn { get; set; }
        public DateTime? TakeOff { get; set; }
        public DateTime? Landing { get; set; }
        public DateTime? BlockOffLocal { get; set; }
        public DateTime? BlockOnLocal { get; set; }
        public DateTime? TakeOffLocal { get; set; }
        public DateTime? LandingLocal { get; set; }
        public DateTime? DepartureLocal { get; set; }
        public DateTime? ArrivalLocal { get; set; }
        public int? BlockTime { get; set; }
        public int? ScheduledTime { get; set; }
        public int? FlightTime { get; set; }
        public int? status { get; set; }
        public DateTime? JLOffBlock { get; set; }
        public DateTime? JLOnBlock { get; set; }
        public DateTime? JLTakeOff { get; set; }
        public DateTime? JLLanding { get; set; }
        public int? PFLR { get; set; }
        public int PaxChild { get; set; }
        public int PaxInfant { get; set; }
        public int PaxAdult { get; set; }
        public int? RevPax { get; set; }
        public int? TotalPax { get; set; }
        public int? FuelUnitID { get; set; }
        public decimal? FuelArrival { get; set; }
        public decimal? FuelDeparture { get; set; }
        public decimal? UsedFuel { get; set; }
        public int? TotalSeat { get; set; }
        public int BaggageWeight { get; set; }
        public int CargoWeight { get; set; }
        public int? Freight { get; set; }
        public DateTime? FlightDate { get; set; }
        public int? CargoCount { get; set; }
        public int? BaggageCount { get; set; }
        public int? JLBlockTime { get; set; }
        public int? JLFlightTime { get; set; }
        public decimal? FPFuel { get; set; }
        public decimal? FPTripFuel { get; set; }
        public int? MaxWeightTO { get; set; }
        public int? MaxWeightLND { get; set; }
        public string MaxWeighUnit { get; set; }
        public string ChrCode { get; set; }
        public string ChrTitle { get; set; }
        public int? ChrCapacity { get; set; }
        public int? ChrAdult { get; set; }
        public int? ChrChild { get; set; }
        public int? ChrInfant { get; set; }
        public int? PMonth { get; set; }
        public string PMonthName { get; set; }
        public string PDayName { get; set; }
        public string PDate { get; set; }
        public string FlightType2 { get; set; }
        public string FlightIndex { get; set; }
        public int? AirlineSold { get; set; }
        public int? CherterSold { get; set; }
        public int? OverSeat { get; set; }
        public int? EmptySeat { get; set; }
        public string DelayReason { get; set; }
        public double? Distance { get; set; }
        public double? StationIncome { get; set; }
        public string TotalRemark { get; set; }
        public string Route { get; set; }
    }
}
