import { EntityRepository, Repository } from 'typeorm';
import { Gorillas } from '../domain/gorillas.entity';

@EntityRepository(Gorillas)
export class GorillasRepository extends Repository<Gorillas> {}
