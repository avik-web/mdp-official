"use client";

export default function PrintButton() {
	function handlePrint() {
		// Print styles to preserve original colors
		const printStyles = `
      @media print {
        @page {
          size: A4;
          margin: 0;
          background: white;
        }
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          background: white !important;
          padding: 0;
          margin: 0;
        }
        .bg-gradient-to-r, .print\:force-bg, .print\:bg-orange-800 {
          background: linear-gradient(to right, #f97316, #fde047) !important;
          background-color: #f97316 !important;
          color: #fff !important;
        }
        .bg-orange-100, .print\:bg-orange-800 {
          background-color: #c2410c !important;
          color: #fff !important;
        }
        .print\:hidden, .print\:hidden * { display: none !important; }
      }
    `;
		if (typeof document !== "undefined") {
			const style = document.createElement("style");
			style.textContent = printStyles;
			document.head.appendChild(style);
		}
		window.print();
	}
	return (
		<button
			onClick={handlePrint}
			className="fixed top-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all print:hidden"
		>
			Print
		</button>
	);
}
