import { createContext, useContext, ReactNode, JSX } from "react";

type CreateProviderReturnType<T> = [() => NonNullable<T>, ({ children }: { children: ReactNode }) => JSX.Element];

function createProvider<T>(ClassType: new () => T): CreateProviderReturnType<T> {
  const ProviderContext = createContext<T | null>(null);

  const hook = () => {
    const providerStore = useContext(ProviderContext);
    if (!providerStore) throw new Error("Only use this hook under the respective provider!");
    return providerStore;
  };

  const Provider = ({ children }: { children: ReactNode }) => {
    const providerStore = new ClassType();
    return <ProviderContext.Provider value={providerStore}>{children}</ProviderContext.Provider>;
  };

  return [hook, Provider];
}

export default createProvider;
