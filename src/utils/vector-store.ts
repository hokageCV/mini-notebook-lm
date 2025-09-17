import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
// import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { QdrantClient } from "@qdrant/js-client-rest";


export default function set_up_store() {
  // OPENAI_API_KEY in env
  // const embeddings = new OpenAIEmbeddings({
  //   model: 'text-embedding-3-large',
  // });

  const embeddings = new GoogleGenerativeAIEmbeddings({
    model:'gemini-embedding-exp-03-07',
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const client = new QdrantClient({
    url: process.env.DB_URL,
    checkCompatibility: false,
    apiKey: process.env.DB_API_KEY,
  });

  const vector_store = new QdrantVectorStore(embeddings, {
    client,
    collectionName: process.env.DB_COLLECTION_NAME!,
  });

  return vector_store
}
