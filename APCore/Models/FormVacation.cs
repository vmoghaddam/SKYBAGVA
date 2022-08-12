using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class FormVacation
    {
        public int Id { get; set; }
        public int Reason { get; set; }
        public string ReasonStr { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string Remark { get; set; }
        public int? UserId { get; set; }
        public DateTime? DateCreate { get; set; }
        public string OperationRemak { get; set; }
        public string SchedulingRemark { get; set; }
    }
}
