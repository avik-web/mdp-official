export interface ClientDetail {
  id: string;
  fullName: string;
  relationship: string;
  dateOfBirth: string;
  occupation: string;
  company: string;
  designation:string;
  workAddress: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  contactNumber: string;
  email: string;
  panCardNo: string;
  aadhaarNo: string;
  type: "applicant" | "co-applicant";
}