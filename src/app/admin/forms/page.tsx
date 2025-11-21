"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookingFormValues } from "@/lib/validation/bookingFormSchema";

interface BookingForm extends BookingFormValues {
	id: number;
	createdAt: string;
	clientFullName: string;
}

export default function BookingFormsPage() {
	const [forms, setForms] = useState<BookingForm[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchForms() {
			try {
				const res = await fetch("/api/forms");
				if (!res.ok) {
					throw new Error("Failed to fetch forms");
				}
				const data: BookingForm[] = await res.json();
				setForms(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		}

		fetchForms();
	}, []);

	if (loading) {
		return <div className="text-center">Loading forms...</div>;
	}

	if (error) {
		return <div className="text-center text-red-600">Error: {error}</div>;
	}

	return (
		<div className="max-w-7xl mx-auto">
			<h2 className="text-2xl font-bold mb-6 text-black">
				Booking Form Submissions
			</h2>
			{forms.length === 0 ? (
				<p>No forms submitted yet.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Reference No.
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Client Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Date
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Created At
								</th>
								<th scope="col" className="relative px-6 py-3">
									<span className="sr-only">View</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{forms.map((form) => (
								<tr key={form.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{form.referenceNo || "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{form.clientFullName}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{form.date || "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{new Date(form.createdAt).toLocaleString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<Link
											href={`/admin/forms/${form.id}`}
											className="text-indigo-600 hover:text-indigo-900"
										>
											View
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
