using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class AppCrew
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string PID { get; set; }
        public int PersonId { get; set; }
        public DateTime? DateJoinCompany { get; set; }
        public int? ExpCompany { get; set; }
        public int? CustomerId { get; set; }
        public int? GroupId { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public string NID { get; set; }
        public int SexId { get; set; }
        public string Sex { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public DateTime? DateBirth { get; set; }
        public string Email { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Mobile { get; set; }
        public string FaxTelNumber { get; set; }
        public string PassportNumber { get; set; }
        public DateTime? DatePassportIssue { get; set; }
        public DateTime? DatePassportExpire { get; set; }
        public string Address { get; set; }
        public DateTime? DateJoinAvation { get; set; }
        public int? Exp { get; set; }
        public DateTime? DateLastCheckUP { get; set; }
        public DateTime? DateNextCheckUP { get; set; }
        public DateTime? DateYearOfExperience { get; set; }
        public string CaoCardNumber { get; set; }
        public DateTime? DateCaoCardIssue { get; set; }
        public string CompetencyNo { get; set; }
        public int? CaoInterval { get; set; }
        public DateTime? DateCaoCardExpire { get; set; }
        public int IsMedicalExpired { get; set; }
        public int? BaseAirportId { get; set; }
        public string BaseAirport { get; set; }
        public int IsPassportExpired { get; set; }
        public string ScheduleName { get; set; }
        public string Code { get; set; }
        public bool? InActive { get; set; }
        public DateTime DateInactiveBegin { get; set; }
        public DateTime DateInactiveEnd { get; set; }
        public int IsCockpit { get; set; }
        public int IsCabin { get; set; }
        public int? AircraftTypeId { get; set; }
        public DateTime? DateTypeIssue { get; set; }
        public DateTime? DateTypeExpire { get; set; }
        public string ValidTypes { get; set; }
        public int? ICAOLPRLevel { get; set; }
        public int? CityId { get; set; }
        public string City { get; set; }
        public int? StateId { get; set; }
        public string State { get; set; }
        public int? CountryId { get; set; }
        public string Country { get; set; }
        public string CityFullName { get; set; }
        public string Types { get; set; }
        public DateTime? LicenceIRExpireDate { get; set; }
        public string LicenceTitle { get; set; }
        public DateTime? LicenceInitialIssue { get; set; }
        public string RaitingCertificates { get; set; }
        public DateTime? LicenceIssueDate { get; set; }
        public string LicenceDescription { get; set; }
        public DateTime? ICAOLPRValidUntil { get; set; }
        public int? MedicalClass { get; set; }
        public string PostalCode { get; set; }
        public string MedicalLimitation { get; set; }
        public string ProficiencyDescription { get; set; }
        public DateTime? VisaExpireDate { get; set; }
        public string NDTNumber { get; set; }
        public string CMCEmployedBy { get; set; }
        public string CMCOccupation { get; set; }
        public DateTime? CrewMemberCertificateExpireDate { get; set; }
    }
}
