import todoRepository from '../repository';

 /**
  * Initialize asynchronous dependencies.
  */
const initializeDependencies = async () => {
  await todoRepository.init();
};

export default initializeDependencies;
