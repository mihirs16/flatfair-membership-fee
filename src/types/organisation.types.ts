/**
 * @param has_fixed_membership_fee boolean
 * @param fixed_member_ship_fee_amount number
 */
export interface OrganisationUnitConfig {
    has_fixed_membership_fee: boolean,
    fixed_member_ship_fee_amount: number
}

/**
 * @param name string
 * @param config OrganisationUnitConfig
 * @param parent OrganisationUnit | null
 */
export interface OrganisationUnit {
    name: string,
    config: OrganisationUnitConfig | null,
    parent: OrganisationUnit | null
}
