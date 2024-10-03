import logging
import numpy as np

from .entities import Entity


# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def interact(entity_a: Entity, entity_b: Entity) -> bool:
    """Check if two entities interact and log the interaction."""
    infection_occured = False
    
    if entity_a.is_infected and not entity_b.is_infected:
        if np.random.random() < entity_a.virus.contagion_probability:
            entity_b.infect(entity_a.virus)
            infection_occured = True
            logging.info(f'{entity_a.id} infected {entity_b.id} with {entity_a.virus.id}')
            
    elif entity_b.is_infected and not entity_a.is_infected:
        if np.random.random() < entity_b.virus.contagion_probability:
            entity_a.infect(entity_b.virus)
            infection_occured = True
            logging.info(f'{entity_b.id} infected {entity_a.id} with {entity_b.virus.id}')
    
    if infection_occured:
        logging.debug(f'No infection occurred between {entity_a.id} and {entity_b.id}.')
    
    return infection_occured
