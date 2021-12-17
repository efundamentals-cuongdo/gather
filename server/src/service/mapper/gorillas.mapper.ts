import { Gorillas } from '../../domain/gorillas.entity';
import { GorillasDTO } from '../dto/gorillas.dto';


/**
 * A Walmart mapper object.
 */
export class GorillasMapper {

  static fromDTOtoEntity (entityDTO: GorillasDTO): Gorillas {
    if (!entityDTO) {
      return;
    }
    let entity = new Gorillas();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Gorillas): GorillasDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new GorillasDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
