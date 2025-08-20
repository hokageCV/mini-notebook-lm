import set_up_store from '@/app/utils/vector-store';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {

  try {

    const vector_store = set_up_store()
    let vector_retriever = vector_store.asRetriever({ k: 3 }) // k -> how many similar docs to fetch

    const data = await req.json()
    const user_query = data.message
    const relevant_chunk = await vector_retriever.invoke(user_query)

    const SYSTEM_PROMPT = `
      ${process.env.SYSTEM_INSTRUCTIONS}

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
