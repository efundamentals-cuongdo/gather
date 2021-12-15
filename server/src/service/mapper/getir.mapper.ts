import { Getir } from '../../domain/getir.entity';
import { GetirDTO } from '../dto/getir.dto';


/**
 * A Walmart mapper object.
 */
export class GetirMapper {

  static fromDTOtoEntity (entityDTO: GetirDTO): Getir {
    if (!entityDTO) {
      return;
    }
    let entity = new Getir();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Getir): GetirDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new GetirDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
