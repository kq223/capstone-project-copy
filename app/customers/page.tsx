// app/customers/page.tsx

import { db } from "@/db";
import Link from "next/link";
import { PaginationControls } from "../../components/PaginationControls";

const PAGE_SIZE = 5; // Display 5 customers per page

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Determine current page, default to 1 if not present
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  // Fetch customers (policy holders) from the database
  const customers = await db.policyHolder.findMany({
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      policies: {
        include: {
          policy: true, // Include the related policy data
        },
      },
    },
  });

  // Get the total count for pagination
  const totalCustomers = await db.policyHolder.count();
  const totalPages = Math.ceil(totalCustomers / PAGE_SIZE);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Link href="/customers/add">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Add Customer
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Policies Bought</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="py-2 px-4 border-b">{customer.id}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.firstName}</td>
              <td className="py-2 px-4 border-b">{customer.lastName}</td>
              <td className="py-2 px-4 border-b">
                {customer.policies.length > 0 ? (
                  customer.policies
                    .map(
                      (policyHolderPolicy) =>
                        policyHolderPolicy.policy.insurancePolicyName
                    )
                    .join(", ")
                ) : (
                  <span>No policies</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
