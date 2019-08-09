import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableUserAndCredential1565319585511
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user_credentials" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "userId" integer, CONSTRAINT "REL_07e09814aad35a2da5ef5a73e1" UNIQUE ("userId"), CONSTRAINT "PK_5cadc04d03e2d9fe76e1b44eb34" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "user_gender_enum" AS ENUM('0', '1', '2')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "fist_name" text NOT NULL, "last_name" text NOT NULL, "gender" "user_gender_enum" NOT NULL, "img_name" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_credentials" ADD CONSTRAINT "FK_07e09814aad35a2da5ef5a73e14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_credentials" DROP CONSTRAINT "FK_07e09814aad35a2da5ef5a73e14"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_gender_enum"`);
    await queryRunner.query(`DROP TABLE "user_credentials"`);
  }
}
