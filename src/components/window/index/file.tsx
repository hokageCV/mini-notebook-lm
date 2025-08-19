import { useState, useRef } from 'react';

export default function File() {
  const [is_uploading, set_is_uploading] = useState(false);
  const file_input_ref = useRef<HTMLInputElement>(null);

  const handle_change = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    set_is_uploading(true);

    const form_data = new FormData();
    form_data.append('file', file);

    try {
      const response = await fetch('/api/input/file', {
        method: 'POST',
        body: form_data,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      if (file_input_ref.current) {
        file_input_ref.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      set_is_uploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <input
        ref={file_input_ref}
        type='file'
        accept='.pdf'
        onChange={handle_change}
        disabled={is_uploading}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
      />
      {is_uploading && (
        <div className="mt-2 text-sm text-gray-600">Uploading...</div>
      )}
    </div>
  );
}
