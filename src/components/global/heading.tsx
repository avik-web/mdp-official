const Heading = ({ title, subtitle }: { title: string; subtitle?: string }) => {
	return (
		<div className="mb-5 text-center">
			<h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
			{subtitle && (
				<p className="text-sm text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
			)}
		</div>
	);
};

export default Heading;
