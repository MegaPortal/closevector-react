import "fake-indexeddb/auto";
import { expect, it, describe } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCloseVectorManager } from "../src/index";
import { FakeEmbeddings } from "./fake";

describe("useCloseVectorManager", () => {
    it("should able to run", () => {
        const { result } = renderHook(() =>
            useCloseVectorManager({
                accessKey: "hello",
            })
        );
        expect(!!result.current.manager).toBe(true);
        expect(result.current.getInstance()).toBe(null);
    });

    it("Test HNSWLib.fromTexts + addVectors", async () => {
        const { result } = renderHook(() =>
            useCloseVectorManager({
                customEmbeddings: new FakeEmbeddings(),
            })
        );

        expect(!!result.current.manager).toBe(true);

        await result.current.manager?.fromTexts(["Hello world"], [{ id: 2 }]);

        expect(!!result.current.manager?.lib).toBe(true);

        expect(result.current.getInstance()?.index.getMaxElements()).toBe(1);
        expect(result.current.getInstance()?.index.getCurrentCount()).toBe(1);

        await result.current.getInstance()?.addVectors(
            [
                [0, 1, 0, 0],
                [1, 0, 0, 0],
                [0.5, 0.5, 0.5, 0.5],
            ],
            [
                {
                    pageContent: "hello bye",
                    metadata: { id: 5 },
                },
                {
                    pageContent: "hello worlddwkldnsk",
                    metadata: { id: 4 },
                },
                {
                    pageContent: "hello you",
                    metadata: { id: 6 },
                },
            ]
        );

        expect(result.current.getInstance()?.index.getMaxElements()).toBe(4);

        const resultTwo = await result.current
            .getInstance()
            ?.similaritySearchVectorWithScore([1, 0, 0, 0], 3);

        const resultTwoMetadatas = resultTwo?.map(([{ metadata }]) => metadata);
        expect(resultTwoMetadatas).toEqual([{ id: 4 }, { id: 6 }, { id: 2 }]);
    });

    it("Test HNSWLib metadata filtering", async () => {
        const { result } = renderHook(() =>
            useCloseVectorManager({
                customEmbeddings: new FakeEmbeddings(),
            })
        );

        expect(!!result.current.manager).toBe(true);

        const pageContent = "Hello world";

        await result.current.manager?.fromTexts(
            [pageContent, pageContent, pageContent],
            [{ id: 2 }, { id: 3 }, { id: 4 }]
        );

        // If the filter wasn't working, we'd get all 3 documents back
        const results = await result.current
            .getInstance()
            ?.similaritySearch(
                pageContent,
                3,
                (document: any) => document.metadata.id === 3
            );

        expect(results).toEqual([{ metadata: { id: 3 }, pageContent }]);
    });
});
