"use client";

import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from "chart.js";
import { format } from "date-fns";
import { Calendar, Clock, Home, Mail, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

interface Contact {
	id: number;
	name: string;
	email: string;
	subject: string;
	createdAt: string;
}

interface PropertyVisit {
	id: number;
	name: string;
	propertyTitle: string;
	visitDate: string;
	status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface DashboardStats {
	totalContacts: number;
	totalPropertyVisits: number;
	totalBookingForms: number;
	recentContacts: Contact[];
	recentPropertyVisits: PropertyVisit[];
	monthlyStats: {
		month: string;
		contacts: number;
		propertyVisits: number;
		bookingForms: number;
	}[];
	statusDistribution: {
		pending: number;
		confirmed: number;
		completed: number;
		cancelled: number;
	};
}

export default function AdminDashboard() {
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch("/api/admin/stats");
				if (!response.ok) {
					throw new Error("Failed to fetch dashboard statistics");
				}
				const data = await response.json();
				setStats(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse space-y-8">
						<div className="h-8 bg-gray-200 rounded w-1/4"></div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
							))}
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
							{[...Array(2)].map((_, i) => (
								<div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
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

	if (!stats) return null;

	// Prepare data for charts
	const monthlyData = {
		labels: stats.monthlyStats.map((stat) => stat.month),
		datasets: [
			{
				label: "Contact Forms",
				data: stats.monthlyStats.map((stat) => stat.contacts),
				borderColor: "rgb(59, 130, 246)",
				backgroundColor: "rgba(59, 130, 246, 0.5)",
				tension: 0.4,
			},
			{
				label: "Property Visits",
				data: stats.monthlyStats.map((stat) => stat.propertyVisits),
				borderColor: "rgb(16, 185, 129)",
				backgroundColor: "rgba(16, 185, 129, 0.5)",
				tension: 0.4,
			},
			{
				label: "Booking Forms",
				data: stats.monthlyStats.map((stat) => stat.bookingForms),
				borderColor: "rgb(245, 158, 11)",
				backgroundColor: "rgba(245, 158, 11, 0.5)",
				tension: 0.4,
			},
		],
	};

	const statusData = {
		labels: ["Pending", "Confirmed", "Completed", "Cancelled"],
		datasets: [
			{
				data: [
					stats.statusDistribution.pending,
					stats.statusDistribution.confirmed,
					stats.statusDistribution.completed,
					stats.statusDistribution.cancelled,
				],
				backgroundColor: [
					"rgba(245, 158, 11, 0.8)",
					"rgba(59, 130, 246, 0.8)",
					"rgba(16, 185, 129, 0.8)",
					"rgba(239, 68, 68, 0.8)",
				],
				borderWidth: 2,
				borderColor: "#ffffff",
			},
		],
	};

	return (
		<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
					<div className="mt-4 sm:mt-0 text-sm text-gray-500">
						Last updated: {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
					<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Total Contacts</p>
								<p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalContacts}</p>
							</div>
							<div className="p-3 bg-blue-50 rounded-full">
								<Users className="h-6 w-6 text-blue-600" />
							</div>
						</div>
						<div className="mt-4">
							<div className="flex items-center text-sm text-gray-500">
								<TrendingUp className="h-4 w-4 mr-1" />
								<span>Active inquiries</span>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Property Visits</p>
								<p className="text-3xl font-bold text-green-600 mt-2">{stats.totalPropertyVisits}</p>
							</div>
							<div className="p-3 bg-green-50 rounded-full">
								<Home className="h-6 w-6 text-green-600" />
							</div>
						</div>
						<div className="mt-4">
							<div className="flex items-center text-sm text-gray-500">
								<Calendar className="h-4 w-4 mr-1" />
								<span>Scheduled visits</span>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Booking Forms</p>
								<p className="text-3xl font-bold text-yellow-600 mt-2">{stats.totalBookingForms}</p>
							</div>
							<div className="p-3 bg-yellow-50 rounded-full">
								<Mail className="h-6 w-6 text-yellow-600" />
							</div>
						</div>
						<div className="mt-4">
							<div className="flex items-center text-sm text-gray-500">
								<Clock className="h-4 w-4 mr-1" />
								<span>Recent bookings</span>
							</div>
						</div>
					</div>
				</div>

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
					<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Activity</h3>
						<div className="h-[300px] sm:h-[400px]">
							<Line
								data={monthlyData}
								options={{
									responsive: true,
									maintainAspectRatio: false,
									plugins: {
										legend: {
											position: "top",
											labels: {
												padding: 20,
												usePointStyle: true,
											},
										},
									},
									scales: {
										y: {
											beginAtZero: true,
											grid: {
												display: true,
											},
										},
										x: {
											grid: {
												display: false,
											},
										},
									},
								}}
							/>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Property Visit Status</h3>
						<div className="h-[300px] sm:h-[400px]">
							<Doughnut
								data={statusData}
								options={{
									responsive: true,
									maintainAspectRatio: false,
									plugins: {
										legend: {
											position: "top",
											labels: {
												padding: 20,
												usePointStyle: true,
											},
										},
									},
									cutout: "70%",
								}}
							/>
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
					<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Recent Contact Forms</h3>
						<div className="space-y-4">
							{stats.recentContacts.map((contact) => (
								<div key={contact.id} className="border-b border-gray-100 pb-4 last:border-0">
									<div className="flex justify-between items-start">
										<div>
											<p className="font-medium text-gray-900">{contact.name}</p>
											<p className="text-sm text-gray-500">{contact.email}</p>
										</div>
										<span className="text-sm text-gray-500 whitespace-nowrap ml-4">
											{format(new Date(contact.createdAt), "MMM d, yyyy")}
										</span>
									</div>
									<p className="mt-2 text-sm text-gray-600 line-clamp-2">{contact.subject}</p>
								</div>
							))}
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Recent Property Visits</h3>
						<div className="space-y-4">
							{stats.recentPropertyVisits.map((visit) => (
								<div key={visit.id} className="border-b border-gray-100 pb-4 last:border-0">
									<div className="flex justify-between items-start">
										<div>
											<p className="font-medium text-gray-900">{visit.name}</p>
											<p className="text-sm text-gray-500">{visit.propertyTitle}</p>
										</div>
										<span className="text-sm text-gray-500 whitespace-nowrap ml-4">
											{format(new Date(visit.visitDate), "MMM d, yyyy")}
										</span>
									</div>
									<div className="mt-2 flex items-center text-sm">
										<span className={`px-2 py-1 rounded-full text-xs font-medium ${
											visit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
											visit.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
											visit.status === 'completed' ? 'bg-green-100 text-green-800' :
											'bg-red-100 text-red-800'
										}`}>
											{visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
