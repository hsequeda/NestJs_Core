import {MigrationInterface, QueryRunner} from "typeorm";

export class addCompanyUniqueIndex1608592120237 implements MigrationInterface {
    name = 'addCompanyUniqueIndex1608592120237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e4472363f45821d269686998bd" ON "company" ("name", "deletedAt")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d1aa6ab05f06e9a81050442e1a" ON "company" ("code", "deletedAt")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d1aa6ab05f06e9a81050442e1a"`);
        await queryRunner.query(`DROP INDEX "IDX_e4472363f45821d269686998bd"`);
    }

}
