import { OrganisationUnit } from "./types/organisation.types";
import test_organisation from "../test_organisation.json";


/**
 * 
 * @returns Map<string, OrganisationUnit> from test_organisation.json
 */
export const create_organisation = () => {
    var organisation = new Map<string, OrganisationUnit>();

    const create_node = (index: number, parent: string | null): OrganisationUnit => {
        return {
            name: test_organisation[index].name,
            config: test_organisation[index].config == null ? null : {
                has_fixed_membership_fee: test_organisation[index].config!.has_fixed_membership_fee,
                fixed_member_ship_fee_amount: test_organisation[index].config!.fixed_membership_fee_amount,
            },
            parent: parent == null ? parent : organisation.get(parent)!
        }
    };

    organisation.set("client",      create_node(0,  null));
    organisation.set("division_a",  create_node(1,  "client"));
    organisation.set("division_b",  create_node(2,  "client"));
    organisation.set("area_a",      create_node(3,  "division_a"));
    organisation.set("area_b",      create_node(4,  "division_a"));
    organisation.set("area_c",      create_node(5,  "division_b"));
    organisation.set("area_d",      create_node(6,  "division_b"));
    organisation.set("branch_a",    create_node(7,  "area_a"));
    organisation.set("branch_b",    create_node(8,  "area_a"));
    organisation.set("branch_c",    create_node(9,  "area_a"));
    organisation.set("branch_d",    create_node(10, "area_a"));
    organisation.set("branch_e",    create_node(11, "area_b"));
    organisation.set("branch_f",    create_node(12, "area_b"));
    organisation.set("branch_g",    create_node(13, "area_b"));
    organisation.set("branch_h",    create_node(14, "area_b"));
    organisation.set("branch_i",    create_node(15, "area_c"));
    organisation.set("branch_j",    create_node(16, "area_c"));
    organisation.set("branch_k",    create_node(17, "area_c"));
    organisation.set("branch_l",    create_node(18, "area_c"));
    organisation.set("branch_m",    create_node(19, "area_d"));
    organisation.set("branch_n",    create_node(20, "area_d"));
    organisation.set("branch_o",    create_node(21, "area_d"));
    organisation.set("branch_p",    create_node(22, "area_d"));

    return organisation;
};