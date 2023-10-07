import { CloseVectorEmbeddings } from "closevector-common";

export class FakeEmbeddings implements CloseVectorEmbeddings {
  
    /**
     * Generates fixed embeddings for a list of documents.
     * @param documents List of documents to generate embeddings for.
     * @returns A promise that resolves with a list of fixed embeddings for each document.
     */
    embedDocuments(documents: string[]): Promise<number[][]> {
      return Promise.resolve(documents.map(() => [0.1, 0.2, 0.3, 0.4]));
    }
  
    /**
     * Generates a fixed embedding for a query.
     * @param _ The query to generate an embedding for.
     * @returns A promise that resolves with a fixed embedding for the query.
     */
    embedQuery(_: string): Promise<number[]> {
      return Promise.resolve([0.1, 0.2, 0.3, 0.4]);
    }
  }