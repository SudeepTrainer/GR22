/*
  Warnings:

  - You are about to drop the `_Followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED', 'BLOCKED');

-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_B_fkey";

-- DropTable
DROP TABLE "_Followers";

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "followerid" INTEGER NOT NULL,
    "followingid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusType" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerid_fkey" FOREIGN KEY ("followerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingid_fkey" FOREIGN KEY ("followingid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
