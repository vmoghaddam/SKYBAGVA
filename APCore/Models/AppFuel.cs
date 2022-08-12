using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class AppFuel
    {
        public int FlightId { get; set; }
        public decimal? UpLift { get; set; }
        public decimal? Remaining { get; set; }
        public decimal? UsedFuel { get; set; }
        public int Taxi { get; set; }
        public decimal? AVGFuelBurned { get; set; }
        public decimal? AVGFuelBurnedReg { get; set; }
        public decimal? AvgVar { get; set; }
        public decimal? AvgVarReg { get; set; }
        public decimal? FPFuel { get; set; }
        public decimal? FPTripFuel { get; set; }
        public decimal? FuelVariance { get; set; }
        public decimal? FPVar { get; set; }
        public int? TotalPax { get; set; }
        public int FuelUnitID { get; set; }
        public string FuelUnit { get; set; }
        public int BaggageWeight { get; set; }
        public int CargoWeight { get; set; }
        public int? Freight { get; set; }
        public DateTime? STD { get; set; }
        public DateTime? STA { get; set; }
        public DateTime? BlockOn { get; set; }
        public DateTime? BlockOff { get; set; }
        public DateTime? TakeOff { get; set; }
        public DateTime? Landing { get; set; }
        public DateTime? FlightDate { get; set; }
        public string FlightNumber { get; set; }
        public int? RegisterID { get; set; }
        public string Register { get; set; }
        public int? TypeId { get; set; }
        public string AircraftType { get; set; }
        public int? FromAirportId { get; set; }
        public int? ToAirportId { get; set; }
        public string FromAirport { get; set; }
        public string ToAirport { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public string FlightStatus { get; set; }
        public int? FlightStatusID { get; set; }
        public DateTime? STDDay { get; set; }
        public DateTime? STADay { get; set; }
        public int? DelayBlockOff { get; set; }
        public int? BlockTime { get; set; }
        public int? FlightTime { get; set; }
        public decimal? FuelDensity { get; set; }
        public decimal? CARGO { get; set; }
        public string PF { get; set; }
        public string PIC { get; set; }
        public int? PICId { get; set; }
        public string SIC { get; set; }
        public int? SICId { get; set; }
        public string ALT1 { get; set; }
        public string ALT2 { get; set; }
        public string ALT3 { get; set; }
        public string IPName { get; set; }
        public int? IPId { get; set; }
        public string IPScheduleName { get; set; }
        public string P1Name { get; set; }
        public int? P1Id { get; set; }
        public string P1ScheduleName { get; set; }
        public string P2Name { get; set; }
        public int? P2Id { get; set; }
        public string P2ScheduleName { get; set; }
    }
}
