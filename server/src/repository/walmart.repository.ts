import { EntityRepository, Repository } from 'typeorm';
import { Walmart } from '../domain/walmart.entity';

@EntityRepository(Walmart)
export class WalmartRepository extends Repository<Walmart> {}
