import { test, expect } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('GraphQL API Health - Positive Checks', () => {

  test('Should respond 200 and return basic data from API', async ({ request }) => {
    // Healthcheck by requesting minimal valid query (country name by code)
    const query = `
      query {
        country(code: "BR") {
          name
        }
      }
    `;

    const response = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(200);
    const json = await response.json();

    expect(json.data).toBeDefined();
    expect(json.data.country.name).toBe('Brazil');
  });

  test('Should respond quickly (performance threshold < 1000ms)', async ({ request }) => {
    // Basic latency check to ensure good performance
    const query = `
      query {
        country(code: "BR") {
          name
        }
      }
    `;

    const start = Date.now();
    const response = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });
    const end = Date.now();

    const duration = end - start;
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(1000);
  });

});
