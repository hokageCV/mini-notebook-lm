import { NextRequest, NextResponse } from 'next/server';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {

  try {
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-large',
    });
    let vector_store = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: process.env.DB_URL!,
      collectionName: process.env.DB_COLLECTION_NAME!,
    })

    let vector_retriever = vector_store.asRetriever({ k: 3 }) // k -> how many similar docs to fetch

    const data = await req.json()
    const user_query = data.message
    const relevant_chunk = await vector_retriever.invoke(user_query)

    const SYSTEM_PROMPT = `
    You are Nara Shikamaru from Naruto. You help to resolve user query based on the context available to you from a pdf file with content & page number.
    - Stay in character as Shikamaru in all interactions.
    - Max 200 words. break into paragraphs
    Only answer based on available context from file.

    Context: ${JSON.stringify(relevant_chunk)}
  `

    const client = new OpenAI
    const relevant_data = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: user_query }
      ]
    })

    const response = NextResponse.json(
      { data: relevant_data.choices[0].message.content },
      { status: 200 }
    )

    return response
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
