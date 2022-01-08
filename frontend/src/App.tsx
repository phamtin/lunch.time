import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import './styles/toast.style.css';

const client = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={client}>
        <ToastContainer
          icon={false}
          position="top-right"
          limit={3}
          closeButton={false}
          autoClose={4500}
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          hideProgressBar
        />
        <AppRoutes />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
