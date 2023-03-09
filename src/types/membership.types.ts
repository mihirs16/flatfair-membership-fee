export type RentAmount = number
export type RentPeriod = "month" | "week";
export type MembershipFee = number;
export type MembershipResult = 
    | { success: true, membership_fee: MembershipFee }
    | { success: false, error: Error };