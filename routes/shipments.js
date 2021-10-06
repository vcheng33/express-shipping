"use strict";

const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");


const { shipProduct } = require("../shipItApi");
const shippingSchema = require("../schemas/shippingSchema.json");
const { BadRequestError } = require("../expressError");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 * Validates incoming data according to shippingSchema. If invalid,
 * throws a BadRequestError (400)
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const result = jsonschema.validate(req.body, shippingSchema);

  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    console.log(errs);
    throw new BadRequestError(errs);
  }

  const { productId, name, addr, zipcode } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zipcode });
  return res.json({ shipped: shipId });
});


module.exports = router;