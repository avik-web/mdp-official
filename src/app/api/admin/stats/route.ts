import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contact, propertyVisit } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { format, subMonths } from "date-fns";

export async function GET() {
	try {
		// Get total counts
		const [totalContacts, totalPropertyVisits] = await Promise.all([
			db.select({ count: sql<number>`count(*)` }).from(contact),
			db.select({ count: sql<number>`count(*)` }).from(propertyVisit),
		]);

		// Get recent contacts and property visits
		const [recentContacts, recentPropertyVisits] = await Promise.all([
			db.select().from(contact).orderBy(desc(contact.createdAt)).limit(5),
			db
				.select()
				.from(propertyVisit)
				.orderBy(desc(propertyVisit.createdAt))
				.limit(5),
		]);

		// Get monthly statistics for the last 6 months
		const monthlyStats = await Promise.all(
			Array.from({ length: 6 }, (_, i) => {
				const date = subMonths(new Date(), i);
				const month = format(date, "MMM yyyy");
				const startOfMonth = format(
					new Date(date.getFullYear(), date.getMonth(), 1),
					"yyyy-MM-dd"
				);
				const endOfMonth = format(
					new Date(date.getFullYear(), date.getMonth() + 1, 0),
					"yyyy-MM-dd"
				);

				return Promise.all([
					db
						.select({ count: sql<number>`count(*)` })
						.from(contact)
						.where(
							sql`${contact.createdAt} >= ${startOfMonth} AND ${contact.createdAt} <= ${endOfMonth}`
						),
					db
						.select({ count: sql<number>`count(*)` })
						.from(propertyVisit)
						.where(
							sql`${propertyVisit.createdAt} >= ${startOfMonth} AND ${propertyVisit.createdAt} <= ${endOfMonth}`
						),
				]).then(([[contacts], [visits]]) => ({
					month,
					contacts: contacts.count,
					propertyVisits: visits.count,
					bookingForms: 0, // Add this when booking forms are implemented
				}));
			})
		);

		// Get status distribution for property visits
		const statusDistribution = await db
			.select({
				status: propertyVisit.status,
				count: sql<number>`count(*)`,
			})
			.from(propertyVisit)
			.groupBy(propertyVisit.status);

		const statusCounts = {
			pending: 0,
			confirmed: 0,
			completed: 0,
			cancelled: 0,
		};

		statusDistribution.forEach(({ status, count }) => {
			if (status) {
				statusCounts[status as keyof typeof statusCounts] = count;
			}
		});

		const response = {
			totalContacts: totalContacts[0].count,
			totalPropertyVisits: totalPropertyVisits[0].count,
			totalBookingForms: 0, // Add this when booking forms are implemented
			recentContacts,
			recentPropertyVisits,
			monthlyStats: monthlyStats.reverse(), // Reverse to show oldest to newest
			statusDistribution: statusCounts,
		};

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to fetch dashboard statistics",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
