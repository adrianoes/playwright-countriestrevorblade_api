import { test, expect } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('Languages GraphQL API - Positive Tests', () => {

  test('Should return all languages with expected fields', async ({ request }) => {
    // Validate the structure of all languages
    const query = `
      query {
        languages {
          code
          name
          native
          rtl
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    const languages = json.data.languages;

    expect(Array.isArray(languages)).toBe(true);
    for (const lang of languages) {
      expect(typeof lang.code).toBe('string');
      expect(typeof lang.name).toBe('string');
      expect(typeof lang.native).toBe('string');
      expect(typeof lang.rtl).toBe('boolean');
    }
  });

  test('Should return a specific language by code', async ({ request }) => {
    // Validate fields for a specific language (e.g., Portuguese - "pt")
    const query = `
      query {
        language(code: "pt") {
          code
          name
          native
          rtl
        }
      }
    `;

    const res = await request.post(API_URL, {
      data: { query },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    const lang = json.data.language;

    expect(lang.code).toBe('pt');
    expect(typeof lang.name).toBe('string');
    expect(typeof lang.native).toBe('string');
    expect(typeof lang.rtl).toBe('boolean');
  });

});
