import set_up_store from '@/utils/vector-store';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const loader = new CheerioWebBaseLoader(url)
    const docs = await loader.load();

    const text_splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 50,
    });
    const split_docs = await text_splitter.splitDocuments(docs);

    const vector_store = set_up_store()

    const batch_size = 5;
    let processed_count = 0;
    let saved_count = 0;
    for (let i = 0; i < split_docs.length; i += batch_size) {
      const batch = split_docs.slice(i, i + batch_size);

      try {
        const timeout_promise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Batch processing timeout')), 10000)
        );

        await Promise.race([
          vector_store.addDocuments(batch),
          timeout_promise
        ]);
        processed_count += batch.length;
        saved_count += batch.length;

      } catch (batchError: any) {
        console.warn(`Failed to process batch ${i / batch_size + 1}:`, batchError.message);
        processed_count += batch.length;
      }
    }

    const response = NextResponse.json(
      { data: 'URL processed successfully.' },
      { status: 200 }
    );

    return response
  } catch (err: any) {
    console.error("URL processing error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
