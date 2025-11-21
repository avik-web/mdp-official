import { relations } from "drizzle-orm";
import {
	pgTable,
	serial,
	text,
	timestamp,
	date,
	boolean,
	jsonb,
} from "drizzle-orm/pg-core";

// Example table - modify according to your needs
export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
	id: serial("id").primaryKey(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const clientDetails = pgTable("client_details", {
	id: serial("id").primaryKey(),
	bookingFormId: serial("booking_form_id").references(() => bookingForms.id),
	fullName: text("full_name").notNull(),
	address: text("address").notNull(),
	city: text("city").notNull(),
	state: text("state").notNull(),
	pinCode: text("pin_code").notNull(),
	contactNumber: text("contact_number").notNull(),
	email: text("email"),
	panCardNo: text("pan_card_no").notNull(),
	aadhaarNo: text("aadhaar_no").notNull(),
	type: text("type", { enum: ["applicant", "co-applicant"] }).notNull(),
	relationship: text("relationship").notNull(),
	dateOfBirth: text("date_of_birth").notNull(),
	occupation: text("occupation").notNull(),
	company: text("company").notNull(),
	designation: text("designation").notNull(),
	workAddress: text("work_address").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bookingForms = pgTable("booking_forms", {
	id: serial("id").primaryKey(),
	customerId: text("customer_id"),
	referenceNo: text("reference_no"),
	date: date("date", { mode: "string" }),
	estimatedProjectValue: text("estimated_project_value"),
	selectedStructureType: text("selected_structure_type"),
	// ***** property details *****
	bookingAmount: text("booking_amount"),
	propertyCost: text("property_cost"),
	propertyType: text("property_type"),
	propertyArea: text("property_area"),
	propertylocation: text("property_location"),
	estimatedConstructionPeriod: text("estimated_construction_period"),
	// ***** plot details *****
	plotArea: text("plot_area"),
	plotNumber: text("plot_number"),
	blockName: text("block_name"),
	plotFacing: text("plot_facing"),
	// ***** land itentification details *****
	jl_no: text("jl_no"),
	mouza: text("mouza"),
	dag_no: text("dag_no"),
	khatian_no: text("khatian_no"),
	// ***** construction category *****

	paymentMethod: text("payment_method"),
	bankName: text("bank_name"),
	accountNumber: text("account_number"),
	ifscCode: text("ifsc_code"),
	accountHolderName: text("account_holder_name"),
	plotNo: text("plot_no"),
	projectName: text("project_name"),
	panchayat_municipality: text("panchayat_municipality"),
	propertyWebsiteDetails: text("property_website_details"),
	branchName: text("branch_name"),

	paymentDate: date("payment_date", { mode: "string" }),
	cheque_dd_no: text("cheque_dd_no"),
	transactionReferenceNo: text("transaction_reference_no"),

	referencsources: jsonb("referencsources"),

	brokerName: text("broker_name"),
	otherSource: text("other_source"),

	// Referral / Referred By fields - new and renamed for clarity
	referredBy: text("referred_by"),
	refererRelationship: text("referer_relationship"),
	refererContactNumber: text("referer_contact_number"),
	referenceCustomerId: text("reference_customer_id"),
	// Official Use Only
	// officialBookingId: text("official_booking_id"),
	// officialVerifiedBy: text("official_verified_by"),
	// officialApprovalDate: date("official_approval_date", { mode: "string" }),

	// Documents to be Submitted
	docPanCard: boolean("doc_pan_card").default(false),
	docAadharCard: boolean("doc_aadhar_card").default(false),
	docPropertyDocuments: boolean("doc_property_documents").default(false),
	docPassportPhotos: boolean("doc_passport_photos").default(false),

	// Signatures
	clientSignatureName: text("client_signature_name"),
	clientSignatureDate: date("client_signature_date", { mode: "string" }),
	clientSignature: text("client_signature"),
	contractorSignatureName: text("contractor_signature_name"),
	contractorSignatureDate: date("contractor_signature_date", {
		mode: "string",
	}),
	contractorSignature: text("contractor_signature"),
	mdbRepresentativeSignatureName: text("mdb_representative_signature_name"),
	mdbRepresentativeSignatureDate: date("mdb_representative_signature_date", {
		mode: "string",
	}),
	mdbRepresentativeSignature: text("mdb_representative_signature"),
	contractorName: text("contractor_name"),
	mdbRepresentativeName: text("mdb_representative_name"),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contact = pgTable("contact", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	subject: text("subject").notNull(),
	message: text("message").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const propertyVisit = pgTable("property_visit", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	phone: text("phone").notNull(),
	visitDate: date("visit_date").notNull(),
	visitTime: text("visit_time").notNull(),
	notes: text("notes"),
	propertyTitle: text("property_title").notNull(),
	status: text("status").default("pending").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const clientImages = pgTable("client_images", {
	id: serial("id").primaryKey(),
	bookingFormId: serial("booking_form_id").references(() => bookingForms.id),
	image: text("image"),
	type: text("type", { enum: ["applicant", "co-applicant"] }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const bookingFormsRelations = relations(bookingForms, ({ many }) => ({
	clients: many(clientDetails),
	clinetImages: many(clientImages),
}));
export const clientImagesRelations = relations(clientImages, ({ one }) => ({
	bookingForm: one(bookingForms, {
		fields: [clientImages.bookingFormId],
		references: [bookingForms.id],
	}),
}));
export const clientDetailsRelations = relations(clientDetails, ({ one }) => ({
	bookingForm: one(bookingForms, {
		fields: [clientDetails.bookingFormId],
		references: [bookingForms.id],
	}),
}));
