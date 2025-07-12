import { createContext, useContext } from 'react';

const TenantContext = createContext();

export const useTenant = () => useContext(TenantContext);

export const TenantProvider = ({ tenant, children }) => (
  <TenantContext.Provider value={tenant}>
    {children}
  </TenantContext.Provider>
);
