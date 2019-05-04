import * as joi from "@hapi/joi";

export const transportationValidator = joi
  .array()
  .items(joi.string().only("trains", "busses"))
  .default(["trains", "busses"]);
