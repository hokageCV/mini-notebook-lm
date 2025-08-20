'use client'

import Chat from './window/chat/chat';
import Index from './window/index';

export function Window() {
	return (
		<div className="flex flex-col md:flex-row w-full max-w-5xl h-[500px] overflow-hidden">
			<Index />
			<Chat />
		</div>
	);
}

