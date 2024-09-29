/*
  Warnings:

  - You are about to drop the column `policyHolderId` on the `Policy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_policyHolderId_fkey";

-- DropIndex
DROP INDEX "Policy_policyHolderId_idx";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "policyHolderId";

-- CreateTable
CREATE TABLE "PolicyHolderPolicy" (
    "id" SERIAL NOT NULL,
    "policyHolderId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,

    CONSTRAINT "PolicyHolderPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PolicyHolderPolicy_policyHolderId_policyId_key" ON "PolicyHolderPolicy"("policyHolderId", "policyId");

-- AddForeignKey
ALTER TABLE "PolicyHolderPolicy" ADD CONSTRAINT "PolicyHolderPolicy_policyHolderId_fkey" FOREIGN KEY ("policyHolderId") REFERENCES "PolicyHolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyHolderPolicy" ADD CONSTRAINT "PolicyHolderPolicy_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
