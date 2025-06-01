import { test, expect, request } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('Countries GraphQL API - Negative Tests', () => {

  test('Should return null for non-existent country code', async ({ request }) => {
    const query = `
      query {
        country(code: "ZZ") {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(res.status()).toBe(200);
    expect(json.data.country).toBeNull();
  });

  test('Should return error for invalid field in country query', async ({ request }) => {
    const query = `
      query {
        country(code: "BR") {
          unknownField
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('Cannot query field "unknownField"');
  });

  test('Should return error when omitting required argument (code)', async ({ request }) => {
    const query = `
      query {
        country {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('Field "country" argument "code" of type "ID!" is required');
  });

  test('Should return error when passing null as country code', async ({ request }) => {
    const query = `
      query {
        country(code: null) {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('Expected value of type "ID!", found null');
  });

  test('Should return null when passing empty string as code', async ({ request }) => {
    const query = `
      query {
        country(code: "") {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.data.country).toBeNull();
  });

  test('Should return informative error for malformed query', async ({ request }) => {
    const query = `
      query {
        country(code: "BR") {
          name
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('The request did not contain a valid GraphQL request');
  });

  test('Should return null when passing number as code', async ({ request }) => {
    const query = `
      query {
        country(code: 123) {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    // A API faz coerção de número para string, então apenas retorna null
    expect(json.data.country).toBeNull();
  });

});
