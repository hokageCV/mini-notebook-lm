
import set_up_store from '@/utils/vector-store';
import OpenAI from 'openai';

export async function corrective_rag(user_query: string) {
  let MIN_SCORE = 0.7;

  let vector_store = set_up_store()
  let results = await vector_store.similaritySearchWithScore(user_query, 3);

  let good_results = results.filter(([doc, score]) => score >= MIN_SCORE);

  let relevant_chunk;

  if (good_results.length > 0) {
    relevant_chunk = good_results.map(([doc]) => doc);
    return relevant_chunk;
  }

  let client = new OpenAI
  let alternate_rewrite = await client.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      { role: 'system', content: 'Rephrase this query differently for better retrieval.' },
      { role: 'user', content: user_query }
    ]
  });

  let alt_query = alternate_rewrite.choices[0]?.message?.content ?? user_query;
  let retry_results = await vector_store.similaritySearchWithScore(alt_query, 3);
  relevant_chunk = retry_results.map(([doc]) => doc);

  return relevant_chunk
}
