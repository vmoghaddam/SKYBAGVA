using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class CourseSession
    {
        public CourseSession()
        {
            CourseSessionPresenceDetails = new HashSet<CourseSessionPresenceDetail>();
            CourseSessionPresences = new HashSet<CourseSessionPresence>();
        }

        public int Id { get; set; }
        public int CourseId { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public bool Done { get; set; }
        public string Remark { get; set; }
        public string Key { get; set; }
        public DateTime? DateStartUtc { get; set; }
        public DateTime? DateEndUtc { get; set; }

        public virtual Course Course { get; set; }
        public virtual ICollection<CourseSessionPresenceDetail> CourseSessionPresenceDetails { get; set; }
        public virtual ICollection<CourseSessionPresence> CourseSessionPresences { get; set; }
    }
}
