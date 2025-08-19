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
		<div className="flex flex-col w-full md:w-2/5 border border-border p-4 bg-card">
			<h2 className="text-lg font-semibold mb-3 text-foreground">
				Compose Message
			</h2>
			<textarea
				className="w-full h-60 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
				placeholder="Type your message here..."
			/>
			<button className="mt-4 bg-accent hover:bg-accent-hover text-accent-text font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer">
				Submit Message
			</button>
		</div>
	);
}

function RightSection() {
	return (
		<div className="flex flex-col w-full md:w-3/5 bg-card border border-border">
			<div className="bg-header  p-3">
				<h2 className="text-lg font-semibold">Chat</h2>
			</div>

			<div className="flex-1 p-4 overflow-y-auto bg-card">
				<div className="space-y-3">
					<div className="flex justify-start">
						<div className="bg-accent-card rounded-lg py-2 px-4 max-w-xs shadow-sm">
							<p className="text-gray-800">Hello! How can I help you today?</p>
						</div>
					</div>

					<div className="flex justify-end">
						<div className="bg-accent-card-2 rounded-lg py-2 px-4 max-w-xs shadow-sm">
							<p className="text-gray-800">
								I have a question about my account
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="p-3 border-t border-border bg-neutral flex items-center">
				<input
					type="text"
					className="flex-1 border border-canvas rounded-l-lg py-2 px-4 focus:ring-2 focus:ring-accent focus:border-transparent"
				/>
				<button className="bg-accent hover:bg-accent-hover text-accent-text font-medium py-2 px-4 rounded-r-lg transition-colors cursor-pointer">
					Send
				</button>
			</div>
		</div>
	);
}
