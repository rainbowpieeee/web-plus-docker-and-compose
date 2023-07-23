import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMigration1681048409651 implements MigrationInterface {
  name = 'initMigration1681048409651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "description" character varying(1500) NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "wish" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "link" character varying NOT NULL, "image" character varying NOT NULL, "price" numeric NOT NULL, "raised" numeric NOT NULL DEFAULT '0', "description" character varying(1024) NOT NULL, "copied" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, "wischlistId" integer, CONSTRAINT "PK_e338d8f62014703650439326d3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(30), "about" character varying(200) NOT NULL DEFAULT 'Пока ничего не рассказал о себе', "avatar" character varying NOT NULL DEFAULT 'https://i.pravatar.cc/300', "email" character varying NOT NULL, "password" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "offer" ("id" SERIAL NOT NULL, "amount" numeric(2) NOT NULL, "hidden" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "itemId" integer, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD CONSTRAINT "FK_acf92a9b67b36657847695751ba" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ADD CONSTRAINT "FK_d976be560c304e5396c50bd72c4" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ADD CONSTRAINT "FK_d0deb4fb450f298e8d180092fda" FOREIGN KEY ("wischlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "offer" ADD CONSTRAINT "FK_e8100751be1076656606ae045e3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "offer" ADD CONSTRAINT "FK_40199af67b763fc3ecc5a0d44e0" FOREIGN KEY ("itemId") REFERENCES "wish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" DROP CONSTRAINT "FK_40199af67b763fc3ecc5a0d44e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "offer" DROP CONSTRAINT "FK_e8100751be1076656606ae045e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" DROP CONSTRAINT "FK_d0deb4fb450f298e8d180092fda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" DROP CONSTRAINT "FK_d976be560c304e5396c50bd72c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist" DROP CONSTRAINT "FK_acf92a9b67b36657847695751ba"`,
    );
    await queryRunner.query(`DROP TABLE "offer"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "wish"`);
    await queryRunner.query(`DROP TABLE "wishlist"`);
  }
}
