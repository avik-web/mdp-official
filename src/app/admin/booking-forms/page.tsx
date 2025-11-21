"use client";

import { BookingFormValues } from "@/lib/validation/bookingFormSchema";
import { format, parseISO } from "date-fns";
import {
	ArrowRight,
	Calendar,
	FileText,
	Plus,
	Search,
	User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BookingForm extends BookingFormValues {
	id: number;
	createdAt: string;
	clientFullName: string;
}

export default function BookingFormsPage() {
	const [forms, setForms] = useState<BookingForm[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedForm, setSelectedForm] = useState<BookingForm | null>(null);

	useEffect(() => {
		async function fetchForms() {
			try {
				const res = await fetch("/api/admin/booking-forms");
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

	const filteredForms = forms.filter((form) => {
		const searchLower = searchQuery.toLowerCase();
		return (
			form.clientFullName?.toLowerCase().includes(searchLower) ||
			(form.referenceNo &&
				form.referenceNo.toLowerCase().includes(searchLower)) ||
			(form.date && form.date.toLowerCase().includes(searchLower))
		);
	});

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse space-y-8">
						<div className="h-8 bg-gray-200 rounded w-1/4"></div>
						<div className="h-12 bg-gray-200 rounded"></div>
						<div className="space-y-4">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
				<div className="max-w-7xl mx-auto">
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
						{error}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
					<div className="flex items-center">
						<div className="bg-indigo-100 p-2 rounded-lg mr-3">
							<FileText className="h-8 w-8 text-indigo-600" />
						</div>
						<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
							Booking Forms
						</h1>
					</div>
					<div className="mt-4 sm:mt-0">
						<Link
							href="/admin/forms/new"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 shadow-sm"
						>
							<Plus className="h-5 w-5 mr-2" />
							Create New Form
						</Link>
					</div>
				</div>

				{/* Search Bar */}
				<div className="mb-6">
					<div className="relative max-w-xl">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
							placeholder="Search forms by name, reference number, or date..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				{forms.length === 0 ? (
					<div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
						<div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
							<FileText className="h-8 w-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No Forms Found
						</h3>
						<p className="text-gray-500 mb-6">
							No booking forms have been submitted yet.
						</p>
						<Link
							href="/admin/forms/new"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 shadow-sm"
						>
							<Plus className="h-5 w-5 mr-2" />
							Create New Form
						</Link>
					</div>
				) : (
					<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Reference No.
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Client Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Date
										</th>
										<th className="relative px-6 py-3">
											<span className="sr-only">View</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{filteredForms.map((form) => (
										<tr
											key={form.id}
											className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
											onClick={() => setSelectedForm(form)}
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												{form.referenceNo || "N/A"}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
														<User className="h-4 w-4 text-indigo-600" />
													</div>
													<div className="ml-3">
														<p className="text-sm font-medium text-gray-900">
															{form.clientFullName}
														</p>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
														<Calendar className="h-4 w-4 text-green-600" />
													</div>
													<div className="ml-3">
														{form.date
															? format(parseISO(form.date), "do MMM yyyy")
															: "N/A"}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<Link
													href={`/admin/forms/${form.id}`}
													className="text-indigo-600 hover:text-indigo-900 inline-flex items-center mr-8"
													onClick={(e) => e.stopPropagation()}
												>
													View
													<ArrowRight className="h-4 w-4 ml-1" />
												</Link>
												<Link
													href={`/admin/booking-forms1/${form.id}`}
													className="ml-4 text-green-600 hover:text-green-900 inline-flex items-center"
													onClick={(e) => e.stopPropagation()}
												>
													View Money Receipt
													<ArrowRight className="h-4 w-4 ml-1" />
												</Link>
												<Link
													href={`/admin/edit-form/${form.id}`}
													className="ml-4 text-blue-600 hover:text-blue-900 inline-flex items-center font-medium"
													onClick={(e) => e.stopPropagation()}
												>
													Edit
													<ArrowRight className="h-4 w-4 ml-1" />
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* Form Detail Modal */}
				{selectedForm && (
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
							<div className="px-6 py-4 border-b border-gray-200">
								<div className="flex justify-between items-center">
									<h3 className="text-lg font-medium text-gray-900">
										Form Details
									</h3>
									<button
										onClick={() => setSelectedForm(null)}
										className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1"
									>
										<span className="sr-only">Close</span>
										<svg
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
							<div className="px-6 py-4">
								<dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
									<div className="bg-gray-50 p-4 rounded-lg">
										<dt className="text-sm font-medium text-gray-500">
											Reference Number
										</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{selectedForm.referenceNo || "N/A"}
										</dd>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg">
										<dt className="text-sm font-medium text-gray-500">
											Client Name
										</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{selectedForm.clientFullName}
										</dd>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg">
										<dt className="text-sm font-medium text-gray-500">Date</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{selectedForm.date
												? format(parseISO(selectedForm.date), "do MMM yyyy")
												: "N/A"}
										</dd>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg">
										<dt className="text-sm font-medium text-gray-500">
											Created At
										</dt>
										<dd className="mt-1 text-sm text-gray-900">
											{format(
												new Date(selectedForm.createdAt),
												"MMM d, yyyy h:mm a"
											)}
										</dd>
									</div>
								</dl>
							</div>
							<div className="px-6 py-4 border-t border-gray-200">
								<div className="flex justify-end space-x-3">
									<button
										onClick={() => setSelectedForm(null)}
										className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
									>
										Close
									</button>
									<Link
										href={`/admin/forms/${selectedForm.id}`}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
									>
										View Full Details
										<ArrowRight className="h-4 w-4 ml-2" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
