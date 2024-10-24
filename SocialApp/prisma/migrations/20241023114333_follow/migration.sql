/*
  Warnings:

  - A unique constraint covering the columns `[followerid,followingid]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerid_followingid_key" ON "Follow"("followerid", "followingid");
