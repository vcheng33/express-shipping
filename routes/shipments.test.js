"use strict";

const shipItApi = require('../shipItApi');
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid - shipProduct Function Mock", async function () {
    console.log('above shipProductMock');
    shipItApi.shipProduct.mockReturnValue(7021);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 7021 });
  });

  test("invalid - missing zipcode and inputted invalid number types", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 500,
      name: 123,
      addr: 456,
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(    [
      'instance.productId must be greater than or equal to 1000',
      'instance.name is not of a type(s) string',
      'instance.addr is not of a type(s) string',
      'instance requires property "zipcode"'
    ])
  });
});