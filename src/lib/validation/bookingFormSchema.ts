import { z } from "zod";

const clientDetailSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Full Name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pinCode: z.string().optional(),
  contactNumber: z.string().optional(),
  relationship: z.string().optional(),
  dateOfBirth: z.string().optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
  designation: z.string().optional(),
  workAddress: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  panCardNo: z.string().optional(),
  aadhaarNo: z.string().optional(),
  type: z.enum(["applicant", "co-applicant"]),
});

export const bookingFormSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  referenceNo: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  clients: z
    .array(clientDetailSchema)
    .min(1, "At least one client detail is required"),
  plotNo: z.string().optional(),
  plotNumber: z.string().optional(),
  projectName: z.string().optional(),
  blockName: z.string().optional(),
  plotArea: z.string().optional(),
  plotFacing: z.string().optional(),
  propertyType: z.string().optional(),
  propertyArea: z.string().optional(),
  propertyCost: z.string().min(1, "Property cost is required"),
  propertylocation: z.string().optional(),
  jl_no: z.string().optional(),
  mouza: z.string().optional(),
  khatian_no: z.string().optional(),
  dag_no: z.string().optional(),
  panchayat_municipality: z.string().optional(),
  branchName: z.string().optional(),
  paymentDate: z.string().optional(),
  cheque_dd_no: z.string().optional(),
  transactionReferenceNo: z.string().optional(),
  referencsources: z.array(z.string()).optional(),
  propertyWebsiteDetails: z.string().optional(),
  brokerName: z.string().optional(),
  otherSource: z.string().optional(),
  referredBy: z.string().optional(),
  refererRelationship: z.string().optional(),
  refererContactNumber: z.string().optional(),
  referenceCustomerId: z.string().optional(),
  estimatedProjectValue: z.string().optional(),
  estimatedConstructionPeriod: z.string().optional(),
  selectedStructureType: z.string().min(1, "Structure type is required"),
  bookingAmount: z.string().min(1, "Booking amount is required"),
  paymentMethod: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  accountHolderName: z.string().optional(),
  // New fields for Official Use Only
  officialBookingId: z.string().optional(),
  officialVerifiedBy: z.string().optional(),
  officialApprovalDate: z.string().optional(), // Using string for simplicity

  // New fields for Documents to be Submitted
  docPanCard: z.boolean().optional().default(false),
  docAadharCard: z.boolean().optional().default(false),
  docPropertyDocuments: z.boolean().optional().default(false),
  docPassportPhotos: z.boolean().optional().default(false),

  // New fields for Signatures (Names and Dates)
  clientSignatureName: z.string().optional(),
  clientSignatureDate: z.string().optional(),
  clientSignature: z.string().optional(),
  contractorSignatureName: z.string().optional(),
  contractorSignatureDate: z.string().optional(),
  contractorSignature: z.string().optional(),
  mdbRepresentativeSignatureName: z.string().optional(),
  mdbRepresentativeSignatureDate: z.string().optional(),
  mdbRepresentativeSignature: z.string().optional(),
  contractorName: z.string().optional(),
  mdbRepresentativeName: z.string().optional(),

  //images
  applicantImage: z.string().url().optional().or(z.literal("")),
  coApplicantImage: z.string().url().optional().or(z.literal("")),
  // Co-Applicant toggle
  hasCoApplicant: z.boolean().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
export type ClientDetail = z.infer<typeof clientDetailSchema>;
