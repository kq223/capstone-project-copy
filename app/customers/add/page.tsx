// app/customers/add/page.tsx

import { redirect } from "next/navigation";
import { db } from "@/db";

export default async function AddPolicyHolderPage() {
  // Fetch existing policies from the database
  const policies = await db.policy.findMany({
    select: {
      id: true,
      insurancePolicyName: true,
    },
  });

  // Server action to handle form submission
  async function addPolicyHolder(formData: FormData) {
    "use server";

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const selectedPolicies = formData.getAll("policies") as string[];

    // Validate inputs
    if (!firstName || !lastName || !email) {
      console.error("First name, last name, and email are required.");
      return;
    }

    // Create a new policy holder in the database
    const newPolicyHolder = await db.policyHolder.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });

    // Associate selected policies
    if (selectedPolicies.length > 0) {
      const policyHolderPoliciesData = selectedPolicies.map((policyId) => ({
        policyId,
        policyHolderId: newPolicyHolder.id,
      }));

      await db.policyHolderPolicy.createMany({
        data: policyHolderPoliciesData,
      });
    }

    // Redirect back to the customers page after successful creation
    redirect("/customers");
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Policy Holder</h1>
      <form action={addPolicyHolder}>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Policies Field */}
        <div className="mb-4">
          <label htmlFor="policies" className="block mb-2">
            Policies:
          </label>
          <select
            id="policies"
            name="policies"
            multiple
            className="border border-gray-300 p-2 w-full"
          >
            {policies.length > 0 ? (
              policies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.insurancePolicyName}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No policies available
              </option>
            )}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
