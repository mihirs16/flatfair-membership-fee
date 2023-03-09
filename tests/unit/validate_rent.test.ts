import { validate_rent_amount } from "../../src/controllers/membership";
import * as constants from "../../src/utils/constants";

describe("validate rent amount", () => {
    test("weekly constraints", () => {
        // minimum weekly rent
        expect(validate_rent_amount(constants.MIN_WEEK_RENT + 1000, "week")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_WEEK_RENT,        "week")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_WEEK_RENT - 1000, "week")).toEqual(false);

        // minimum monthly rent
        expect(validate_rent_amount(constants.MIN_MONTH_RENT + 10000, "month")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_MONTH_RENT,         "month")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_MONTH_RENT - 10000, "month")).toEqual(false);
    }); 

    test("weekly constraints", () => {
        // maximum weekly rent
        expect(validate_rent_amount(constants.MAX_WEEK_RENT + 1000, "week")).toEqual(false);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT,        "week")).toEqual(true);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT - 1000, "week")).toEqual(true);

        // maximum monthly rent
        expect(validate_rent_amount(constants.MAX_WEEK_RENT + 1000, "week")).toEqual(false);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT,        "week")).toEqual(true);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT - 1000, "week")).toEqual(true);
    });

});

