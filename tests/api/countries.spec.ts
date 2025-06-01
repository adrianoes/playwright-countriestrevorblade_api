import { test, expect, request } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('Countries GraphQL API - Positive Tests', () => {

  test('Should return all fields for a specific country by code', async ({ request }) => {
    // Validate all fields returned for country BR (Brazil)
    const query = `
      query {
        country(code: "BR") {
          code
          name
          native
          phone
          continent {
            code
            name
          }
          capital
          currency
          emoji
          languages {
            code
            name
            native
            rtl
          }
          states {
            code
            name
          }
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    const country = json.data.country;

    expect(country.code).toBe('BR');
    expect(typeof country.name).toBe('string');
    expect(typeof country.native).toBe('string');
    expect(typeof country.phone).toBe('string');
    expect(country.continent).toBeDefined();
    expect(typeof country.continent.code).toBe('string');
    expect(typeof country.continent.name).toBe('string');
    expect(typeof country.capital === 'string' || country.capital === null).toBe(true);
    expect(typeof country.currency === 'string' || country.currency === null).toBe(true);
    expect(typeof country.emoji).toBe('string');

    for (const lang of country.languages) {
      expect(typeof lang.code).toBe('string');
      expect(typeof lang.name).toBe('string');
      expect(typeof lang.native).toBe('string');
      expect(typeof lang.rtl).toBe('boolean');
    }

    for (const state of country.states) {
      expect(typeof state.name).toBe('string');
      expect(typeof state.code === 'string' || state.code === null).toBe(true);
    }
  });

});
