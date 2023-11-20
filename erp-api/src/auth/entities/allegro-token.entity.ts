import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AllegroToken extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() access_token: string;

  @Column() token_type: string;

  @Column() refresh_token: string;

  @Column() expires_in: number;

  @Column() scope: string;

  @Column() allegro_api: boolean;

  @Column() iss: string;

  @Column() jti: string;
}
