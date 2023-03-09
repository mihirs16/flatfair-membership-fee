import { OrganisationUnit, OrganisationUnitConfig } from "../types/organisation.types";
import { MembershipResult, RentPeriod } from "../types/membership.types";
import * as constants from "../utils/constants";

/**
 * 
 * @param rent_amount 
 * @param rent_period 
 * @param organisation_unit 
 */
export const calculate_membership_fee = (
    rent_amount: number, 
    rent_period: RentPeriod, 
    organisation_unit: OrganisationUnit
): MembershipResult => {
    var membership_fee = 0;

    try {
        // validate rent amount
        if (validate_rent_amount(rent_amount, rent_period) == false) {
            return {
                success: false,
                error: new Error("Rent amount out of bounds.")
            };
        }

        // check org config recursively for fixed_membership_fee
        const fixed_fee_config = check_fixed_membership_fee(organisation_unit);
        if (fixed_fee_config.has_fixed_membership_fee) {
            membership_fee = fixed_fee_config.fixed_member_ship_fee_amount
        } else {
            if (rent_period == "week")
                membership_fee = rent_amount;
            else
                membership_fee = rent_amount / 4;

            // wrap one week of rent in [120,]
            if (membership_fee < 12000) {
                membership_fee = 12000 + (constants.VAT * 12000); 
            } else {
                membership_fee += membership_fee * constants.VAT
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error
            };
        }
    }

    return {
        success: true,
        membership_fee: membership_fee
    };
};


/**
 * 
 * @param rent_amount 
 * @param rent_period 
 * @returns 
 */
export const validate_rent_amount = (rent_amount: number, rent_period: RentPeriod): boolean => {
    if (rent_period == "week") {
        if (rent_amount < constants.MIN_WEEK_RENT || rent_amount > constants.MAX_WEEK_RENT) {
            return false;
        }
    } else {
        if (rent_amount < constants.MIN_MONTH_RENT || rent_amount > constants.MAX_MONTH_RENT) {
            return false;
        }
    }

    return true;
};


/**
 * @param organisation_unit 
 * @returns OrganisationUnitConfig for self or parent with fixed fee defined
 */
export const check_fixed_membership_fee = (organisation_unit: OrganisationUnit): OrganisationUnitConfig => {
    if (organisation_unit.config && organisation_unit.config.has_fixed_membership_fee) {
        return organisation_unit.config;
    }
    
    if (organisation_unit.parent == null) {
        return organisation_unit.config ? organisation_unit.config : {
            has_fixed_membership_fee: false, 
            fixed_member_ship_fee_amount: 0
        };
    }

    const fixed_member_fee_config = check_fixed_membership_fee(organisation_unit.parent);
    return fixed_member_fee_config ? fixed_member_fee_config : {
        has_fixed_membership_fee: false, 
        fixed_member_ship_fee_amount: 0
    };
};
