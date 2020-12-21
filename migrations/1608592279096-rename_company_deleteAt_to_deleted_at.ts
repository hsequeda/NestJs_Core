import {MigrationInterface, QueryRunner} from "typeorm";

export class renameCompanyDeleteAtToDeletedAt1608592279096 implements MigrationInterface {
    name = 'renameCompanyDeleteAtToDeletedAt1608592279096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d1aa6ab05f06e9a81050442e1a"`);
        await queryRunner.query(`DROP INDEX "IDX_e4472363f45821d269686998bd"`);
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "deletedAt" TO "deleted_at"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_063bd39a261c1f0b040e8ed768" ON "company" ("name", "deleted_at")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c3fb85388e0311a9ca4f330487" ON "company" ("code", "deleted_at")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_c3fb85388e0311a9ca4f330487"`);
        await queryRunner.query(`DROP INDEX "IDX_063bd39a261c1f0b040e8ed768"`);
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "deleted_at" TO "deletedAt"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e4472363f45821d269686998bd" ON "company" ("deletedAt", "name")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d1aa6ab05f06e9a81050442e1a" ON "company" ("code", "deletedAt")`);
    }

}
