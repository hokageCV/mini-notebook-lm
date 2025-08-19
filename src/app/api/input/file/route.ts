import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const form_data = await req.formData();
    const file = form_data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 } )
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const loader = new PDFLoader(new Blob([buffer]));
    const docs = await loader.load();

    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-large',
    });

    const vector_store = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: process.env.DB_URL!,
      collectionName: process.env.DB_COLLECTION_NAME!,
    });
    await vector_store.addDocuments(docs);

    const response = NextResponse.json(
      { data: 'File processed successfully.' },
      { status: 200 }
    );

    return response
  } catch (err: any) {
    console.error("File processing error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
