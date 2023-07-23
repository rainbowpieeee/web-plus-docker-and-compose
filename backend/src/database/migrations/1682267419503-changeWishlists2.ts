import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeWishlists21682267419503 implements MigrationInterface {
  name = 'changeWishlists21682267419503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" DROP CONSTRAINT "FK_d0deb4fb450f298e8d180092fda"`,
    );
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "wischlistId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wish" ADD "wischlistId" integer`);
    await queryRunner.query(
      `ALTER TABLE "wish" ADD CONSTRAINT "FK_d0deb4fb450f298e8d180092fda" FOREIGN KEY ("wischlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
