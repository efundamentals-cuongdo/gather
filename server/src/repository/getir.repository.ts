import { EntityRepository, Repository } from 'typeorm';
import { Getir } from '../domain/getir.entity';

@EntityRepository(Getir)
export class GetirRepository extends Repository<Getir> {}
