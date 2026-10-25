import assert from "node:assert/strict";
import test from "node:test";
import jwt from "jsonwebtoken";
import {
  blogVisibilityQuery,
  publicProjection,
  visibilityQuery,
} from "../src/auth.js";

const previousSecret = process.env.JWT_SECRET;
process.env.JWT_SECRET = "test-public-visibility";

test.after(() => {
  if (previousSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = previousSecret;
});

test("public reads include only published records and selected fields", () => {
  const request = { headers: {} };
  assert.deepEqual(visibilityQuery(request), { "cats.status": "public" });
  assert.deepEqual(blogVisibilityQuery(request), { status: "public" });
  assert.equal(publicProjection(request, "name status"), "name status");
});

test("authenticated hub reads retain full records", () => {
  const token = jwt.sign({ sub: "editor" }, process.env.JWT_SECRET);
  const request = { headers: { authorization: `Bearer ${token}` } };
  assert.deepEqual(visibilityQuery(request), {});
  assert.deepEqual(blogVisibilityQuery(request), {});
  assert.equal(publicProjection(request, "name status"), null);
});
