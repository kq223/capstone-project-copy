// app/policies/add/page.tsx

import { redirect } from "next/navigation";
import { db } from "@/db";

export default async function AddPolicyPage() {
  // Fetch existing types from the database
  const types = await db.policy.findMany({
    distinct: ["typeOfPolicy"],
    select: {
      typeOfPolicy: true,
    },
  });

  // Server action to handle form submission
  async function addPolicy(formData: FormData) {
    "use server";

    const insurancePolicyName = formData.get("insurancePolicyName") as string;
    const basePriceSgdString = formData.get("basePriceSgd") as string;
    const typeOfPolicy = formData.get("typeOfPolicy") as string;

    // Validate inputs
    if (!insurancePolicyName || !basePriceSgdString || !typeOfPolicy) {
      console.error("All fields are required.");
      return;
    }

    const basePriceSgd = parseFloat(basePriceSgdString);
    if (isNaN(basePriceSgd)) {
      console.error("Base Price must be a valid number.");
      return;
    }

    // Create a new policy in the database
    await db.policy.create({
      data: {
        insurancePolicyName,
        basePriceSgd,
        typeOfPolicy,
      },
    });

    // Redirect back to the policies page after successful creation
    redirect("/policies");
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Policy</h1>
      <form action={addPolicy}>
        {/* Policy Name */}
        <div className="mb-4">
          <label htmlFor="insurancePolicyName" className="block mb-2">
            Policy Name:
          </label>
          <input
            type="text"
            id="insurancePolicyName"
            name="insurancePolicyName"
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Base Price */}
        <div className="mb-4">
          <label htmlFor="basePriceSgd" className="block mb-2">
            Base Price (SGD):
          </label>
          <input
            type="number"
            id="basePriceSgd"
            name="basePriceSgd"
            step="0.01"
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Type of Policy */}
        <div className="mb-4">
          <label htmlFor="typeOfPolicy" className="block mb-2">
            Type of Policy:
          </label>
          <select
            id="typeOfPolicy"
            name="typeOfPolicy"
            className="border border-gray-300 p-2 w-full"
            required
          >
            {types.length > 0 ? (
              types.map((type, index) => (
                <option key={index} value={type.typeOfPolicy}>
                  {type.typeOfPolicy}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No types available
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
