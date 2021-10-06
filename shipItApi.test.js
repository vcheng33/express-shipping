"use strict";

const AxiosMockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const axiosMock = new AxiosMockAdapter(axios);


const { shipProduct, SHIPIT_SHIP_URL } = require("./shipItApi");

describe("shipProduct", function () {
  test("valid - AXIOS MOCK", async function () {
    console.log('above axiosMock');
    axiosMock.onPost(SHIPIT_SHIP_URL).reply(200, {
      receipt:
      {
        itemId: 1000,
        name: 'Test Tester',
        addr: '100 Test St',
        zip: 91564,
        shipId: 7021
      }
    });

    const shipId = await shipProduct({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(shipId).toEqual(7021);
  });

  // test("shipProduct - no axios mock", async function () {
  //   const shipId = await shipProduct({
  //     productId: 1000,
  //     name: "Test Tester",
  //     addr: "100 Test St",
  //     zip: "12345-6789",
  //   });

  //   expect(shipId).toEqual(expect.any(Number));
  // })
});

