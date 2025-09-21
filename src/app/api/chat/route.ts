import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { corrective_rag } from './corrective-rag';
import { rewrite } from './query-rewrite';

export async function POST(req: NextRequest) {

  try {
    const data = await req.json()
    const raw_query = data.message
    const user_query = await rewrite(raw_query)
    let relevant_chunk = await corrective_rag(user_query)

    const SYSTEM_PROMPT = `
      ${process.env.SYSTEM_INSTRUCTIONS}

      Context: ${JSON.stringify(relevant_chunk)}
    `

    const client = new OpenAI
    const relevant_data = await client.chat.completions.create({
      model: 'gpt-5-nano',
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
