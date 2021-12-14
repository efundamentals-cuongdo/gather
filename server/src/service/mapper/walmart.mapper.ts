import { Walmart } from '../../domain/walmart.entity';
import { WalmartDTO } from '../dto/walmart.dto';


/**
 * A Walmart mapper object.
 */
export class WalmartMapper {

  static fromDTOtoEntity (entityDTO: WalmartDTO): Walmart {
    if (!entityDTO) {
      return;
    }
    let entity = new Walmart();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Walmart): WalmartDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new WalmartDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
