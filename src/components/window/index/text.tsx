import { useState } from 'react';

export default function Text() {
  const [text, set_text] = useState('')
  const [is_submitting, set_is_submitting] = useState(false)

  const handle_submit = async () => {
    if (!text.trim()) return;

    set_is_submitting(true);

    try {
      const response = await fetch('/api/input/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) return;

      set_text('');
    } catch (error) {
    } finally {
      set_is_submitting(false);
    }
  };

  return (
    <>
			<textarea
				className="w-full h-50 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
				placeholder="Type your message here..."
        value= {text}
        onChange={(e) => set_text(e.target.value)}
        disabled={is_submitting}
			/>
      <button
        className="mt-4 bg-accent hover:bg-accent-hover text-accent-text font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
        onClick={handle_submit}
        disabled={is_submitting || !text.trim()}
      >
        {is_submitting ? 'Submitting...' : 'Submit Message'}
			</button>
    </>
  )
}
