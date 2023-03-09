import { 
    calculate_membership_fee,
    validate_rent_amount, 
    check_fixed_membership_fee
} from "../src/controllers/membership";
import { OrganisationUnit } from "../src/types/organisation.types";
import * as constants from "../src/utils/constants";
import { create_organisation } from "../src/setup";

describe("membership fee", () => {
    var test_organisation: Map<string, OrganisationUnit>;

    beforeAll(() => {
        test_organisation = create_organisation();
    });

    test("validate rent amount as per constants", () => {
        // minimum weekly rent
        expect(validate_rent_amount(constants.MIN_WEEK_RENT + 1000, "week")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_WEEK_RENT,        "week")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_WEEK_RENT - 1000, "week")).toEqual(false);

        // minimum monthly rent
        expect(validate_rent_amount(constants.MIN_MONTH_RENT + 10000, "month")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_MONTH_RENT,         "month")).toEqual(true);
        expect(validate_rent_amount(constants.MIN_MONTH_RENT - 10000, "month")).toEqual(false);

        // maximum weekly rent
        expect(validate_rent_amount(constants.MAX_WEEK_RENT + 1000, "week")).toEqual(false);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT,        "week")).toEqual(true);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT - 1000, "week")).toEqual(true);

        // maximum monthly rent
        expect(validate_rent_amount(constants.MAX_WEEK_RENT + 1000, "week")).toEqual(false);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT,        "week")).toEqual(true);
        expect(validate_rent_amount(constants.MAX_WEEK_RENT - 1000, "week")).toEqual(true);
    });

    test("check for fixed member fee in self and parents recursively", () => {
        // base case for recursion
        expect(check_fixed_membership_fee(test_organisation.get("client")!)).toEqual({
            has_fixed_membership_fee: false,
            fixed_member_ship_fee_amount: 0
        });

        // when fixed member fee defined for self
        expect(check_fixed_membership_fee(test_organisation.get("area_a")!)).toEqual({
            has_fixed_membership_fee: true,
            fixed_member_ship_fee_amount: 45000
        });

        // when fixed member fee defined for parent
        expect(check_fixed_membership_fee(test_organisation.get("branch_b")!)).toEqual({
            has_fixed_membership_fee: true,
            fixed_member_ship_fee_amount: 45000
        });

    });

    test("calculate membership fee", () => {
        // rent in-bounds, weekly, no fixed-fee
        expect(calculate_membership_fee(15000, "week", test_organisation.get("client")!)).toEqual({
            success: true,
            membership_fee: 18000
        });

        // rent out-of-bounds, weekly, no fixed-fee
        expect(calculate_membership_fee(250000, "week", test_organisation.get("client")!).success).toEqual(false);

        // rent in-bounds, weekly, self fixed-fee overrite
        expect(calculate_membership_fee(150000, "week", test_organisation.get("area_a")!)).toEqual({
            success: true,
            membership_fee: 45000
        });

        // rent in-bounds, weekly, parent fixed-fee overrite
        expect(calculate_membership_fee(150000, "week", test_organisation.get("branch_b")!)).toEqual({
            success: true,
            membership_fee: 45000
        });

        // rent in-bounds, monthly, no fixed-fee
        expect(calculate_membership_fee(500000, "month", test_organisation.get("client")!)).toEqual({
            success: true,
            membership_fee: 150000
        });

        // rent in-bounds, monthly, parent fixed-fee overrite
        expect(calculate_membership_fee(500000, "month", test_organisation.get("branch_b")!)).toEqual({
            success: true,
            membership_fee: 45000
        });

        // rent out-of-bounds, monthly, no fixed-fee
        expect(calculate_membership_fee(900000, "month", test_organisation.get("client")!).success).toEqual(false);

        // rent in-bounds, monthly, parent fixed-fee overrite (self null)
        expect(calculate_membership_fee(500000, "month", test_organisation.get("branch_a")!)).toEqual({
            success: true,
            membership_fee: 45000
        });

    });
});