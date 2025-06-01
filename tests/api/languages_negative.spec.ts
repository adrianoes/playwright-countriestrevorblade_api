import { test, expect } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('Languages GraphQL API - Negative Tests', () => {

  test('Should return null for a non-existent language code', async ({ request }) => {
    const query = `
      query {
        language(code: "zz") {
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
    expect(json.data.language).toBeNull();
  });

  test('Should return error for invalid field in language query', async ({ request }) => {
    const query = `
      query {
        language(code: "pt") {
          invalidField
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('Cannot query field "invalidField"');
  });

  test('Should return error when omitting required argument in language query', async ({ request }) => {
    const query = `
      query {
        language {
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
    // Ajustar para mensagem que a API retorna quando argumento obrigatório falta
    expect(json.errors[0].message).toMatch(/Field "language" argument "code" of type "ID!" is required/);
  });

  test('Should return error when passing number as language code', async ({ request }) => {
    const query = `
      query {
        language(code: 123) {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    if (json.errors) {
      // Se existir errors, testar mensagens possíveis
      expect(json.errors.length).toBeGreaterThan(0);
      const msg = json.errors[0].message;
      expect(
        msg.includes('Expected value of type "ID!"') ||
        msg.includes('The request did not contain a valid GraphQL request') ||
        msg.includes('Int cannot represent non-integer value')
      ).toBeTruthy();
    } else {
      // Caso não tenha errors, aceitar language null
      expect(json.data.language).toBeNull();
    }
  });

  test('Should return null when passing empty string as language code', async ({ request }) => {
    const query = `
      query {
        language(code: "") {
          name
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.data.language).toBeNull();
  });

  test('Should return error for malformed GraphQL syntax in language query', async ({ request }) => {
    const query = `
      query {
        language(code: "pt") {
          name
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    expect(json.errors).toBeDefined();

    // A API pode retornar uma mensagem diferente ao invés de "Syntax Error"
    const msg = json.errors[0].message;
    expect(
      msg.includes('Syntax Error') ||
      msg.includes('The request did not contain a valid GraphQL request')
    ).toBeTruthy();
  });

});
