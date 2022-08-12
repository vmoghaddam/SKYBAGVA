using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class _FMISDATE
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DangerousGoodsIssueDate { get; set; }
        public DateTime? DangerousGoodsExpireDate { get; set; }
        public DateTime? AviationSecurityIssueDate { get; set; }
        public DateTime? AviationSecurityExpireDate { get; set; }
        public DateTime? SEPTPIssueDate { get; set; }
        public DateTime? SEPTPExpireDate { get; set; }
        public DateTime? SEPTTIssueDate { get; set; }
        public DateTime? SEPTTExpireDate { get; set; }
        public DateTime? CRMIssueDate { get; set; }
        public DateTime? CRMExpireDate { get; set; }
        public DateTime? CCRMIssueDate { get; set; }
        public DateTime? CCRMExpireDate { get; set; }
        public DateTime? HOTWXIssueDate { get; set; }
        public DateTime? HOTWXExpireDate { get; set; }
        public DateTime? COLDWXIssueDate { get; set; }
        public DateTime? COLDWXExpireDate { get; set; }
        public DateTime? FIRSTAIDIssueDate { get; set; }
        public DateTime? FIRSTAIDExpireDate { get; set; }
        public DateTime? SMSIssueDate { get; set; }
        public DateTime? SMSExpireDate { get; set; }
        public DateTime? FMTIssueDate { get; set; }
        public DateTime? FMTExpireDate { get; set; }
        public DateTime? LPRDate { get; set; }
    }
}
