/*
  Warnings:

  - You are about to drop the `form` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `form`;

-- CreateTable
CREATE TABLE `DEMO_TELECOM` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(8) NOT NULL,
    `num_telefono` VARCHAR(9) NOT NULL,
    `num_contacto` VARCHAR(9) NOT NULL,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `verificado` BOOLEAN NOT NULL DEFAULT false,
    `direccion_ip` VARCHAR(255) NULL,
    `fecha_consentimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DEMO_TELECOM_dni_key`(`dni`),
    UNIQUE INDEX `DEMO_TELECOM_num_telefono_key`(`num_telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ENERGIA_GLOBAL_SPAIN` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(8) NOT NULL,
    `num_telefono` VARCHAR(9) NOT NULL,
    `num_contacto` VARCHAR(9) NOT NULL,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `verificado` BOOLEAN NOT NULL DEFAULT false,
    `direccion_ip` VARCHAR(255) NULL,
    `fecha_consentimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ENERGIA_GLOBAL_SPAIN_dni_key`(`dni`),
    UNIQUE INDEX `ENERGIA_GLOBAL_SPAIN_num_telefono_key`(`num_telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
