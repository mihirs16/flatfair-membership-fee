import { create_organisation } from "./utils/setup";
import { calculate_membership_fee } from "./controllers/membership";

// import test organisation from sample json (test_organisation.json)
const test_organisation = create_organisation();

// cmd line arguments
const rent_amount = parseInt(process.argv[2]);
const rent_period = process.argv[3] == "week" ? "week": "month";
const organisation_unit = test_organisation.get(process.argv[4])!;

// calculate membership_fee (in pence)
const membership_fee = calculate_membership_fee(rent_amount, rent_period, organisation_unit);
console.log(membership_fee);