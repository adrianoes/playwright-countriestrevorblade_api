import { test, expect } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('GraphQL API Health - Negative Checks', () => {

  test('Should return 400 or error when using malformed GraphQL query', async ({ request }) => {
    // Check server response to bad GraphQL syntax
    const malformedQuery = `
      query {
        country(code: "BR" {
          name
        }
    `;

    const response = await request.post(API_URL, {
      data: { query: malformedQuery },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();

    // Ajusta para aceitar 200 ou 400
    expect([200, 400]).toContain(response.status());

    // Para o erro, verifica se o erro existe e a mensagem contém indicativo de problema
    expect(json.errors).toBeDefined();

    // A mensagem pode não ser exatamente 'Syntax Error', então vamos verificar se menciona 'Syntax' ou similar
    const errorMessage = json.errors[0].message.toLowerCase();
    expect(errorMessage).toMatch(/syntax|valid graphQL|did not contain a valid/);
  });

  test('Should return error for query to unknown field', async ({ request }) => {
    // Simulate call with invalid field to test API error handling
    const query = `
      query {
        country(code: "BR") {
          invalidField
        }
      }
    `;

    const response = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();
    expect(response.status()).toBe(200);
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('Cannot query field "invalidField"');
  });

  test('Should return error for missing query in request body', async ({ request }) => {
    // Send empty body to simulate broken client
    const response = await request.post(API_URL, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();
    expect(json.errors).toBeDefined();

    // Ajusta para a mensagem real da API
    expect(json.errors[0].message).toContain('did not contain a valid GraphQL request');
  });

});
