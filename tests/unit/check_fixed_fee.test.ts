import { check_fixed_membership_fee } from "../../src/controllers/membership";
import { OrganisationUnit } from "../../src/types/organisation.types";
import { create_organisation } from "../../src/utils/setup";

describe("membership fee", () => {
    var test_organisation: Map<string, OrganisationUnit>;

    beforeAll(() => {
        test_organisation = create_organisation();
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


});