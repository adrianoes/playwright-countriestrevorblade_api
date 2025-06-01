import { test, expect, request } from '@playwright/test';

const API_URL = 'https://countries.trevorblades.com/';

test.describe('Continents GraphQL API', () => {

  test('Should fetch continent name and code by code', async ({ request }) => {
    // Verify that a specific continent (EU) returns valid name and code
    const query = `
      query {
        continent(code: "EU") {
          code
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

    expect(json.data.continent.code).toBe('EU');
    expect(json.data.continent.name).toBe('Europe');
  });

  test('Should return all continents with code and name', async ({ request }) => {
    // Check that all continents are returned with valid name and code
    const query = `
      query {
        continents {
          code
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

    expect(json.data.continents.length).toBeGreaterThan(0);
    for (const continent of json.data.continents) {
      expect(typeof continent.code).toBe('string');
      expect(typeof continent.name).toBe('string');
    }
  });

  test('Should return countries for a given continent', async ({ request }) => {
    // Verify that countries are returned for continent EU
    const query = `
      query {
        continent(code: "EU") {
          countries {
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
    const countries = json.data.continent.countries;

    expect(countries.length).toBeGreaterThan(0);
    for (const country of countries) {
      expect(typeof country.code).toBe('string');
      expect(typeof country.name).toBe('string');
    }
  });

  test('Should return complete country data within a continent', async ({ request }) => {
    // Validate that full country fields inside continent EU are accessible
    const query = `
      query {
        continent(code: "EU") {
          countries {
            code
            name
            capital
            currency
            emoji
            languages {
              name
              code
            }
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
    const countries = json.data.continent.countries;

    for (const country of countries) {
      expect(typeof country.code).toBe('string');
      expect(typeof country.name).toBe('string');
      expect(
        typeof country.capital === 'string' || country.capital === null
      ).toBe(true);
      expect(
        typeof country.currency === 'string' || country.currency === null
      ).toBe(true);
      expect(typeof country.emoji).toBe('string');

      for (const language of country.languages) {
        expect(typeof language.name).toBe('string');
        expect(typeof language.code).toBe('string');
      }
    }
  });

  test('Should return null for invalid continent code', async ({ request }) => {
    // Ensure an invalid continent code returns null
    const query = `
      query {
        continent(code: "INVALID") {
          name
          countries {
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
    expect(json.data.continent).toBeNull();
  });

});
