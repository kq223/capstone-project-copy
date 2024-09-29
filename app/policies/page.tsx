import { db } from "@/db";
import { Policy } from "@prisma/client";
import { PaginationControls } from "../../components/PaginationControls";
import Link from "next/link"; // Import Link from next/link

const PAGE_SIZE = 5; // Display 5 policies per page

export default async function PoliciesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  // Determine current page, default to 1 if not present
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  // Fetch policies from the database
  const policies = await db.policy.findMany({
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPolicies = await db.policy.count();
  const totalPages = Math.ceil(totalPolicies / PAGE_SIZE);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Insurance Policies</h1>
        <Link href="/policies/add">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Add Policy
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Policy Name</th>
            <th className="py-2 px-4 border-b">Base Price (SGD)</th>
            <th className="py-2 px-4 border-b">Type of Policy</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy: Policy) => (
            <tr key={policy.id}>
              <td className="py-2 px-4 border-b">{policy.id}</td>
              <td className="py-2 px-4 border-b">
                {policy.insurancePolicyName}
              </td>
              <td className="py-2 px-4 border-b">
                {policy.basePriceSgd.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{policy.typeOfPolicy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PaginationControls handles the client-side navigation */}
      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
