import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeOffer11681233144859 implements MigrationInterface {
  name = 'changeOffer11681233144859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "amount" TYPE numeric(2,0)`,
    );
  }
}
