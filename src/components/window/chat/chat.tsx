import { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chat() {
  const [messages, set_messages] = useState<Message[]>([]);
  const [input_text, set_input_text] = useState('');
  const [is_loading, set_is_loading] = useState(false);

  const messages_end_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messages_end_ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input_text.trim() || is_loading) return;

    const user_message: Message = {
      text: input_text,
      isUser: true,
      timestamp: new Date()
    };

    set_messages(prev => [...prev, user_message]);
    set_input_text('');
    set_is_loading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input_text }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error('API request failed');

      set_messages(prev => [...prev, {
        text: data.data,
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      set_messages(prev => [...prev, {
        text: "Sorry, I'm having trouble responding. Please try again.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      set_is_loading(false);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-3/5 bg-card border border-border h-[500px]">
      <div className="bg-header p-3">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-card">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg py-2 px-4 max-w-xs shadow-sm ${
                message.isUser ? 'bg-accent-card-2' : 'bg-accent-card'
              }`}>
                <p className="text-gray-800">{message.text}</p>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {is_loading && (
            <div className="flex justify-start">
              <div className="bg-accent-card rounded-lg py-2 px-4 max-w-xs shadow-sm">
                <p className="text-gray-800">Thinking...</p>
              </div>
            </div>
          )}

          {/* Invisible element for auto-scrolling */}
          <div ref={messages_end_ref} />
        </div>
      </div>

      <form onSubmit={handle_submit} className="p-3 border-t border-border bg-neutral flex items-center">
        <input
          type="text"
          value={input_text}
          onChange={(e) => set_input_text(e.target.value)}
          disabled={is_loading}
          className="flex-1 border border-canvas rounded-l-lg py-2 px-4 focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={!input_text.trim() || is_loading}
          className="bg-accent hover:bg-accent-hover text-accent-text font-medium py-2 px-4 rounded-r-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
