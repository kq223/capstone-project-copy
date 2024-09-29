-- CreateTable
CREATE TABLE "PolicyHolder" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PolicyHolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "insurancePolicyName" TEXT NOT NULL,
    "basePriceSgd" DOUBLE PRECISION NOT NULL,
    "typeOfPolicy" TEXT NOT NULL,
    "policyHolderId" TEXT NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PolicyHolder_email_key" ON "PolicyHolder"("email");

-- CreateIndex
CREATE INDEX "Policy_policyHolderId_idx" ON "Policy"("policyHolderId");

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_policyHolderId_fkey" FOREIGN KEY ("policyHolderId") REFERENCES "PolicyHolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
