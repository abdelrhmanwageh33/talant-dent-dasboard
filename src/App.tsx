import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes';
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

function App() {
  return (

    <BrowserRouter>
        <QueryClientProvider client={queryClient}>

      <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
