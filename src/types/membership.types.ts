// rent_period param
export type RentPeriod = "month" | "week";

// to handle error or result of calculate_membership_fee
export type MembershipResult = 
    | { success: true, membership_fee: number }
    | { success: false, error: Error };