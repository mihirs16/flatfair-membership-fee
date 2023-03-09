import { calculate_membership_fee } from "../../src/controllers/membership";
import { OrganisationUnit } from "../../src/types/organisation.types";
import { create_organisation } from "../../src/setup";

describe("membership fee", () => {
    var test_organisation: Map<string, OrganisationUnit>;

    beforeAll(() => {
        test_organisation = create_organisation();
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