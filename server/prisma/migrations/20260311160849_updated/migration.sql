-- AlterTable
ALTER TABLE `loanrequest` ADD COLUMN `guarantorName` VARCHAR(191) NULL,
    ADD COLUMN `guarantorPhone` VARCHAR(191) NULL,
    ADD COLUMN `idCardUrl` VARCHAR(191) NULL,
    ADD COLUMN `kraCertUrl` VARCHAR(191) NULL,
    ADD COLUMN `landOwnershipUrl` VARCHAR(191) NULL,
    ADD COLUMN `repaymentDuration` INTEGER NOT NULL DEFAULT 6;

-- AlterTable
ALTER TABLE `marketprice` ADD COLUMN `unit` VARCHAR(191) NULL;
