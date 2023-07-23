import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeWish31682161462011 implements MigrationInterface {
  name = 'changeWish31682161462011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wish" ADD "copied_from" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "copied_from"`);
  }
}
