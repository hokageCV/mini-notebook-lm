import set_up_store from '@/utils/vector-store';
import { Document } from '@langchain/core/documents';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const user_input = data.text

    const document = new Document({
      pageContent: user_input,
      metadata: {
        source: 'user_input',
        timestamp: new Date().toISOString(),
        type: 'small_text'
      }
    });

    const vector_store = set_up_store()
    await vector_store.addDocuments([document]);

    const response = NextResponse.json(
      { data: 'Text saved.' },
      { status: 200 }
    )

    return response
  } catch (err: any) {
    console.error('Error in POST handler:', err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
