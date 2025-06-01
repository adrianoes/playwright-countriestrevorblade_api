import { test, expect, request } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('Continents GraphQL API - Negative Tests', () => {

  test('Should return null for non-existent continent code', async ({ request }) => {
    const query = `
      query {
        continent(code: "ZZ") {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.data.continent).toBeNull();
  });

  test('Should return error when using incorrect field name in query', async ({ request }) => {
    const query = `
      query {
        continent(code: "EU") {
          wrongField
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('Cannot query field "wrongField"');
  });

  test('Should return error for missing required argument (code)', async ({ request }) => {
    const query = `
      query {
        continent {
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
    expect(json.errors[0].message).toContain('Field "continent" argument "code" of type "ID!" is required');
  });

  test('Should return error when argument is null', async ({ request }) => {
    const query = `
      query {
        continent(code: null) {
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

  test('Should return error when argument is empty string', async ({ request }) => {
    const query = `
      query {
        continent(code: "") {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.data.continent).toBeNull();
  });

  test('Should return error for malformed GraphQL query', async ({ request }) => {
    const query = `
      query {
        continent(code: "EU") {
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

  test('Should return null when code argument is a number instead of string', async ({ request }) => {
    // GraphQL faz coerção automática de tipos (int → string), então o código 123 vira "123"
    const query = `
      query {
        continent(code: 123) {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    // A API simplesmente retorna null em vez de erro
    expect(json.data.continent).toBeNull();
  });

});
