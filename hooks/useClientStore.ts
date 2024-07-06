const useClientStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  return store(callback) as F;
};

export default useClientStore;
