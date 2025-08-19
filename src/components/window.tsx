export function Window() {
	return (
		<div className="flex flex-col md:flex-row w-full max-w-5xl h-[500px] overflow-hidden">
			<LeftSection />
			<RightSection />
		</div>
	);
}

function LeftSection() {
	return (
		<div className="flex flex-col w-full md:w-2/5 border-r border-gray-200 p-4 bg-gray-50">
			<h2 className="text-lg font-semibold mb-3 text-gray-700">
				Compose Message
			</h2>
			<textarea
				className="w-full h-60 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
				placeholder="Type your message here..."
			/>
			<button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
				Submit Message
			</button>
		</div>
	);
}

function RightSection() {
	return (
		<div className="flex flex-col w-full md:w-3/5 bg-white">
			<div className="bg-blue-500 text-white p-3">
				<h2 className="text-lg font-semibold">Chat</h2>
			</div>

			<div className="flex-1 p-4 overflow-y-auto bg-gray-100">
				<div className="space-y-3">
					<div className="flex justify-start">
						<div className="bg-white rounded-lg py-2 px-4 max-w-xs shadow-sm">
							<p className="text-gray-800">Hello! How can I help you today?</p>
							<span className="text-xs text-gray-500">10:15 AM</span>
						</div>
					</div>

					<div className="flex justify-end">
						<div className="bg-blue-100 rounded-lg py-2 px-4 max-w-xs shadow-sm">
							<p className="text-gray-800">
								I have a question about my account
							</p>
							<span className="text-xs text-gray-500">10:16 AM</span>
						</div>
					</div>
				</div>
			</div>

			<div className="p-3 border-t border-gray-200 bg-white flex items-center">
				<input
					type="text"
					className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="Type a message..."
				/>
				<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-r-lg transition-colors">
					Send
				</button>
			</div>
		</div>
	);
}
