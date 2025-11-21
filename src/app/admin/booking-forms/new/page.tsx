"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function NewBookingFormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        clientFullName: formData.get("clientFullName"),
        clientAddress: formData.get("clientAddress"),
        clientCity: formData.get("clientCity"),
        clientState: formData.get("clientState"),
        clientPinCode: formData.get("clientPinCode"),
        clientContactNumber: formData.get("clientContactNumber"),
        clientEmail: formData.get("clientEmail"),
        clientPanCardNo: formData.get("clientPanCardNo"),
        clientAadhaarNo: formData.get("clientAadhaarNo"),
        projectLocation: formData.get("projectLocation"),
        plotNumber: formData.get("plotNumber"),
        blockName: formData.get("blockName"),
        plotArea: formData.get("plotArea"),
        plotFacing: formData.get("plotFacing"),
        houseType: formData.get("houseType"),
        houseArea: formData.get("houseArea"),
        estimatedProjectValue: formData.get("estimatedProjectValue"),
        estimatedConstructionPeriod: formData.get("estimatedConstructionPeriod"),
        selectedStructureType: formData.get("selectedStructureType"),
        bookingAmount: formData.get("bookingAmount"),
        paymentMethod: formData.get("paymentMethod"),
        bankName: formData.get("bankName"),
        accountNumber: formData.get("accountNumber"),
        ifscCode: formData.get("ifscCode"),
        accountHolderName: formData.get("accountHolderName"),
        transactionId: formData.get("transactionId"),
      };

      const response = await fetch("/api/admin/booking-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking form");
      }

      toast.success("Booking form created successfully");
      router.push("/admin/booking-forms");
    } catch (error) {
      console.error("Error creating booking form:", error);
      toast.error("Failed to create booking form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">New Booking Form</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Client Information */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Client Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="clientFullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="clientFullName"
                      id="clientFullName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="clientEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      id="clientEmail"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="clientContactNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="clientContactNumber"
                      id="clientContactNumber"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="clientPanCardNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PAN Card Number
                    </label>
                    <input
                      type="text"
                      name="clientPanCardNo"
                      id="clientPanCardNo"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="clientAadhaarNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Aadhaar Number
                    </label>
                    <input
                      type="text"
                      name="clientAadhaarNo"
                      id="clientAadhaarNo"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="clientAddress"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      name="clientAddress"
                      id="clientAddress"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="clientCity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="clientCity"
                      id="clientCity"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="clientState"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="clientState"
                      id="clientState"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="clientPinCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="clientPinCode"
                      id="clientPinCode"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Project Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="projectLocation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project Location
                    </label>
                    <input
                      type="text"
                      name="projectLocation"
                      id="projectLocation"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="plotNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Plot Number
                    </label>
                    <input
                      type="text"
                      name="plotNumber"
                      id="plotNumber"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="blockName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Block Name
                    </label>
                    <input
                      type="text"
                      name="blockName"
                      id="blockName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="plotArea"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Plot Area
                    </label>
                    <input
                      type="text"
                      name="plotArea"
                      id="plotArea"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="plotFacing"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Plot Facing
                    </label>
                    <input
                      type="text"
                      name="plotFacing"
                      id="plotFacing"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="houseType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      House Type
                    </label>
                    <input
                      type="text"
                      name="houseType"
                      id="houseType"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="houseArea"
                      className="block text-sm font-medium text-gray-700"
                    >
                      House Area
                    </label>
                    <input
                      type="text"
                      name="houseArea"
                      id="houseArea"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="estimatedProjectValue"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Estimated Project Value
                    </label>
                    <input
                      type="number"
                      name="estimatedProjectValue"
                      id="estimatedProjectValue"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="estimatedConstructionPeriod"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Estimated Construction Period
                    </label>
                    <input
                      type="text"
                      name="estimatedConstructionPeriod"
                      id="estimatedConstructionPeriod"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="selectedStructureType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Structure Type *
                    </label>
                    <select
                      name="selectedStructureType"
                      id="selectedStructureType"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Select a type</option>
                      <option value="RCC">RCC</option>
                      <option value="Steel">Steel</option>
                      <option value="Wooden">Wooden</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="bookingAmount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Booking Amount
                    </label>
                    <input
                      type="number"
                      name="bookingAmount"
                      id="bookingAmount"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="paymentMethod"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      id="paymentMethod"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Select a method</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="bankName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      id="bankName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="accountNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      id="accountNumber"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ifscCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      name="ifscCode"
                      id="ifscCode"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="accountHolderName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      name="accountHolderName"
                      id="accountHolderName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="transactionId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      id="transactionId"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Form"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 