import { Document } from '@langchain/core/documents';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const user_input = data.text

    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-large',
    });

    const vector_store = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: process.env.DB_URL,
      collectionName: process.env.DB_COLLECTION_NAME,
    })

    const document = new Document({
      pageContent: user_input,
      metadata: {
        source: 'user_input',
        timestamp: new Date().toISOString(),
        type: 'small_text'
      }
    });
    await vector_store.addDocuments([document]);

    const response = NextResponse.json(
      { data: 'Text saved.' },
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
