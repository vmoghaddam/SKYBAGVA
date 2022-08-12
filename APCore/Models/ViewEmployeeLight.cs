﻿using System;
using System.Collections.Generic;

#nullable disable

namespace APCore.Models
{
    public partial class ViewEmployeeLight
    {
        public int Id { get; set; }
        public string PID { get; set; }
        public int? CurrentLocationAirport { get; set; }
        public DateTime? DateJoinCompany { get; set; }
        public int? ExpCompany { get; set; }
        public bool IsActive { get; set; }
        public DateTime? DateRegister { get; set; }
        public DateTime? DateConfirmed { get; set; }
        public bool IsDeleted { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int? CustomerId { get; set; }
        public int? GroupId { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public string JobGroupRoot { get; set; }
        public int MarriageId { get; set; }
        public string NID { get; set; }
        public int SexId { get; set; }
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
        public DateTime? DateCaoCardExpire { get; set; }
        public string CompetencyNo { get; set; }
        public int? CaoInterval { get; set; }
        public int? CaoIntervalCalanderTypeId { get; set; }
        public string Remark { get; set; }
        public string StampNumber { get; set; }
        public string StampUrl { get; set; }
        public string TechLogNo { get; set; }
        public DateTime? DateIssueNDT { get; set; }
        public int? IntervalNDT { get; set; }
        public string NDTNumber { get; set; }
        public int? NDTIntervalCalanderTypeId { get; set; }
        public string Nickname { get; set; }
        public int? CityId { get; set; }
        public string FatherName { get; set; }
        public string IDNo { get; set; }
        public string UserId { get; set; }
        public string ImageUrl { get; set; }
        public int? CustomerCreatorId { get; set; }
        public int? Age { get; set; }
        public int LocationId { get; set; }
        public int? OrgRoleId { get; set; }
        public string LocationPhone { get; set; }
        public bool IsMainLocation { get; set; }
        public string MaritalStatus { get; set; }
        public string Sex { get; set; }
        public string CaoIntervalCalanderType { get; set; }
        public string NDTIntervalCalanderType { get; set; }
        public string City { get; set; }
        public int? StateId { get; set; }
        public string State { get; set; }
        public int? CountryId { get; set; }
        public string Country { get; set; }
        public string CityFullName { get; set; }
        public string Customer { get; set; }
        public string Location { get; set; }
        public int? RootLocation { get; set; }
        public string LocationCode { get; set; }
        public int PersonId { get; set; }
        public int EmployeeLocationId { get; set; }
        public string Post { get; set; }
        public int? RemainNDT { get; set; }
        public int? RemainCAO { get; set; }
        public int? RemainMedical { get; set; }
        public int? RemainPassport { get; set; }
        public int IsNDTExpired { get; set; }
        public int IsNDTExpiring { get; set; }
        public int IsCAOExpired { get; set; }
        public int IsCAOExpiring { get; set; }
        public int IsMedicalExpired { get; set; }
        public int IsMedicalExpiring { get; set; }
        public int IsPassportExpired { get; set; }
        public int IsPassportExpiring { get; set; }
        public string ScheduleName { get; set; }
        public bool? InActive { get; set; }
        public int? BaseAirportId { get; set; }
    }
}
