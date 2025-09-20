import OpenAI from 'openai';

export async function rewrite(original_query: string): Promise<string> {
  let client = new OpenAI

  let modified_query = await client.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      { role: 'system', content: process.env.REWRITE_QUERY_SYSTEM_PROMPT! },
      { role: 'user', content: original_query }
    ]
  })

  let result = modified_query.choices[0]?.message?.content ?? '';
  return result;
}
