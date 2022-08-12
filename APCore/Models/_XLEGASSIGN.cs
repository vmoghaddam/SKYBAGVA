using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class _XLEGASSIGN
    {
        public string Route { get; set; }
        public string Crew { get; set; }
        public string Pos { get; set; }
        public string Rank { get; set; }
        public string TurnType { get; set; }
        public string ScheduleGroup { get; set; }
        public string Scheduler { get; set; }
        public string DateUTC { get; set; }
        public string FltNo { get; set; }
        public string DepStn { get; set; }
        public string ArrStn { get; set; }
        public string DepTime { get; set; }
        public string ArrTime { get; set; }
        public string ACType { get; set; }
        public string ACReg { get; set; }
        public string Flt { get; set; }
        public string RouteType { get; set; }
        public string JobType { get; set; }
        public string DepTimeLCL { get; set; }
        public string ArrTimeLCL { get; set; }
        public string Change { get; set; }
        public string StandardTime { get; set; }
        public string Status { get; set; }
        public string Expr1 { get; set; }
        public string OffBlock { get; set; }
        public string OnBlock { get; set; }
        public int? CrewId { get; set; }
        public string ScheduleName { get; set; }
        public string InitGroup { get; set; }
        public string InitRank { get; set; }
        public int? HomeBase { get; set; }
        public int? JobGroupId { get; set; }
        public int? InitIndex { get; set; }
        public int? FlightId { get; set; }
        public string Key { get; set; }
    }
}
