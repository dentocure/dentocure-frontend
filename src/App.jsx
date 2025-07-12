import { useEffect, useState } from 'react';
import { TenantProvider } from './context/TenantContext';
import { getTenantFromURL } from './utils/getTenantFromURL';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './Routes';

function App() {
  const queryClient = new QueryClient();
  const [tenant, setTenant] = useState(null);


    useEffect(() => {
  const tenantId = getTenantFromURL(window.location.hostname);
  console.log('tenantId',tenantId);
  fetch(`/tenants/${tenantId}/config.json`)
    .then(res => {
      if (!res.ok) throw new Error("Tenant config not found");
      return res.json();
    })
    .then(data => {
      console.log("Loaded tenant config:", data);  // 👈 optional debug
      setTenant(data);
    })
    .catch(() => {
      // Fallback to default tenant
      fetch(`/tenants/default/config.json`)
        .then(res => res.json())
        .then(data => {
          console.log("Loaded default tenant config:", data);  // 👈 optional debug
          setTenant(data);
        });
    });
}, []);

console.log('tenant',tenant);
  if (!tenant) return <div>Loading...</div>;

  return (
     <QueryClientProvider client={queryClient}>
    <TenantProvider tenant={tenant}>
      <AppRoutes />
    </TenantProvider>
    </QueryClientProvider>
  );
}

export default App;
