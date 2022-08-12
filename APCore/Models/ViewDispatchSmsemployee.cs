﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewDispatchSMSEmployee
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string PID { get; set; }
        public int PersonId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? CustomerId { get; set; }
        public int? GroupId { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public string NID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Mobile { get; set; }
        public string FaxTelNumber { get; set; }
        public string Address { get; set; }
        public string ScheduleName { get; set; }
        public string Code { get; set; }
        public int GroupOrder { get; set; }
        public bool? InActive { get; set; }
        public DateTime DateInactiveBegin { get; set; }
        public DateTime DateInactiveEnd { get; set; }
        public int IsCockpit { get; set; }
        public int IsCabin { get; set; }
    }
}
