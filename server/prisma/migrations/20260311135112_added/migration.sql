-- AlterTable
ALTER TABLE `user` ADD COLUMN `saccoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `SACCO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `supervisorId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SACCO_name_key`(`name`),
    UNIQUE INDEX `SACCO_supervisorId_key`(`supervisorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produce` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `farmerId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `variety` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL DEFAULT 'KG',
    `price` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'VERIFIED', 'SOLD', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `image` VARCHAR(191) NULL,
    `harvestDate` DATETIME(3) NULL,
    `verifiedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoanRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `farmerId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'DISBURSED', 'REPAID', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `approvedById` INTEGER NULL,
    `repaidAmount` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produceId` INTEGER NOT NULL,
    `farmerId` INTEGER NOT NULL,
    `buyerId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'NEGOTIATING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DemandListing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorId` INTEGER NOT NULL,
    `crop` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `targetPrice` DOUBLE NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MarketPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commodity` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `trend` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'INFO',
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_saccoId_fkey` FOREIGN KEY (`saccoId`) REFERENCES `SACCO`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SACCO` ADD CONSTRAINT `SACCO_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produce` ADD CONSTRAINT `Produce_farmerId_fkey` FOREIGN KEY (`farmerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoanRequest` ADD CONSTRAINT `LoanRequest_farmerId_fkey` FOREIGN KEY (`farmerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoanRequest` ADD CONSTRAINT `LoanRequest_approvedById_fkey` FOREIGN KEY (`approvedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_produceId_fkey` FOREIGN KEY (`produceId`) REFERENCES `Produce`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_farmerId_fkey` FOREIGN KEY (`farmerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DemandListing` ADD CONSTRAINT `DemandListing_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
