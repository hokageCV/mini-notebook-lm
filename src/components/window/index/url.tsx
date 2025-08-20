import { useState } from 'react';

export default function Url() {
  const [url, set_url] = useState('');
  const [is_adding, set_is_adding] = useState(false);

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || is_adding) return;

    set_is_adding(true);

    try {
      const response = await fetch('/api/input/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });
      if (!response.ok) throw new Error('Failed to add URL');

      set_url('');
    } catch (error) {
      console.error('Error adding URL:', error);
    } finally {
      set_is_adding(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handle_submit} className="flex items-center">
        <input
          type="url"
          value={url}
          onChange={(e) => set_url(e.target.value)}
          disabled={is_adding}
          placeholder="https://example.com"
          className="flex-1 border border-border rounded-l-lg py-2 px-4 focus:ring-2 focus:ring-card focus:border-transparent disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={!url.trim() || is_adding}
          className="bg-accent hover:bg-accent-hover text-text font-medium py-2 px-4 border border-border rounded-r-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {is_adding ? 'Adding...' : 'Add URL'}
        </button>
      </form>
    </div>
  );
}
