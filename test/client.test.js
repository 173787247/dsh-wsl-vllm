import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createVllmClient } from "../lib/client.js";

describe("vllm client", () => {
  it("status unreachable", async () => {
    const c = createVllmClient({
      baseUrl: "http://127.0.0.1:1",
      timeoutMs: 300,
      fetchImpl: async () => {
        throw new Error("down");
      },
    });
    assert.equal((await c.status()).reachable, false);
  });
});
