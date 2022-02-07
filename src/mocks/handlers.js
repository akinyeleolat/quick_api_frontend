import {rest} from "msw";

export const handlers = [
  rest.get("https://us-central1-haud-test-api.cloudfunctions.net/app/api/getuser", (req, res, ctx) => {
    return res(
      ctx.json({
        users: [
          {
            firstName: "Firstname",
            lastName: "Lastname",
            address1: "Address1",
            address2: "Address2",
            town: "Town",
            region: "Region",
            postcode: "Postcode",
            contactNumber: "ContactNumber",
          },
        ],
        info: {
          seed: "1eefa7d651be03bf",
          results: 1,
          page: 1,
          version: "1.3",
        },
      })
    );
  }),
  rest.get("https://us-central1-haud-test-api.cloudfunctions.net/app/api/getuser/test_id", (req, res, ctx) => {
    return res(
      ctx.json({
        user:{
            firstName: "Firstname",
            lastName: "Lastname",
            address1: "Address1",
            address2: "Address2",
            town: "Town",
            region: "Region",
            postcode: "Postcode",
            contactNumber: "ContactNumber",
          },
        info: {
          seed: "1eefa7d651be03bf",
          results: 1,
          page: 1,
          version: "1.3",
        },
      })
    );
  }),
];
