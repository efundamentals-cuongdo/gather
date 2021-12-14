/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';




/**
 * A Walmart.
 */
@Entity('walmart')
export class Walmart extends BaseEntity  {

    @Column({name: "product_no", nullable: true})
    productNo: string;

    @Column({name: "name", nullable: true})
    name: string;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
