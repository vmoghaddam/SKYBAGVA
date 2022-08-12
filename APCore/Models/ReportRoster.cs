﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ReportRoster
    {
        public int ID { get; set; }
        public string DayName { get; set; }
        public DateTime? STDDay { get; set; }
        public string PDATE { get; set; }
        public string FlightNumber { get; set; }
        public string Register { get; set; }
        public string Route { get; set; }
        public string STD { get; set; }
        public string STA { get; set; }
        public string STDLOC { get; set; }
        public string STALOC { get; set; }
        public DateTime? STDLocal { get; set; }
        public DateTime? STALocal { get; set; }
        public DateTime? STDx { get; set; }
        public DateTime? STAx { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public string IP { get; set; }
        public string CPT { get; set; }
        public string FO { get; set; }
        public string SAFETY { get; set; }
        public string CHECK { get; set; }
        public string OBS { get; set; }
        public string ISCCM { get; set; }
        public string SCCM { get; set; }
        public string CCM { get; set; }
        public string CHECKC { get; set; }
        public string OBSC { get; set; }
        public string FM { get; set; }
        public string POSITIONING { get; set; }
        public string POSITIONINGCOCKPIT { get; set; }
        public string POSITIONINGCABIN { get; set; }
    }
}
