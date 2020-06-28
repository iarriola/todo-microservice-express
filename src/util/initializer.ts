import todoRepository from '../repository';

const initializeDependencies = async () => {
  await todoRepository.init();
};

export default initializeDependencies;
//export { initializeDependencies };
