/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';




/**
 * A Getir.
 */
@Entity('getir')
export class Getir extends BaseEntity  {

    @Column({name: "url", nullable: true})
    url: string;

    @Column({name: "product_no", nullable: true})
    productNo: string;

    @Column({name: "name", nullable: true})
    name: string;

    // @Column({name: "image_urls", nullable: true})
    imageUrls: string[];


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
