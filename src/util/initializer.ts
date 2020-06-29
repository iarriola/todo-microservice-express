import todoRepository from '../repository';
import { logger } from '../logger';

 /**
  * Initialize asynchronous dependencies.
  */
const initializeDependencies = async () => {
  logger.debug({
    message: 'Initializing dependencies...'
  });
  await todoRepository.init();
};

export default initializeDependencies;
