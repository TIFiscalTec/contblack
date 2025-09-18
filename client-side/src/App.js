import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Index';
import AboutUs from './pages/aboutUs/Index';
import Planos from './pages/plans/Index';
import Solutions from './pages/solutions/Index';
import Niches from './pages/niches/Index';
import Login from './pages/login/Index';
import Register from './pages/register/Index';
import Cart from './pages/cart/Index';
import Checkout from './pages/checkout/Index';
import Perfil from './pages/perfil/Index';
import Dashboard from './pages/dashboard/Index';
import FaturasPendentes from './pages/dashboard/components/FaturasPendentes';
import PerfilDashboard from './pages/dashboard/components/PerfilDashboard';
import FaturasPagas from './pages/dashboard/components/FaturasPagas';
import Assinatura from './pages/dashboard/components/Assinatura';
import AssinarContrato from './pages/assinarContrato/Index';
import DetalhesCobranca from './pages/dashboard/components/DetalhesCobranca';
import ResetarSenha from './pages/resetarSenha/Index';
import MudarPlano from './pages/dashboard/components/MudarPlano';
import CancelarAssinatura from './pages/dashboard/components/CancelarAssinatura';

import { UserProvider } from './contexts/UserContext';
import { DiscountProvider } from './contexts/DiscountContext';
import { LoginProvider } from './contexts/LoginContext';

function App() {
	return (
		<UserProvider>
			<DiscountProvider>
				<LoginProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/SobreNos" element={<AboutUs />} />
						<Route path="/Planos" element={<Planos />} />
						<Route path="/Solucoes" element={<Solutions />} />
						<Route path="/Nichos" element={<Niches />} />
						<Route path="/Login" element={<Login />} />
						<Route path="/Cadastro" element={<Register />} />
						<Route path="/Carrinho" element={<Cart />} />
						<Route path="/Checkout" element={<Checkout />} />
						<Route path="/Perfil" element={<Perfil />} />
						<Route path="/AssinarContrato" element={<AssinarContrato />} />
						<Route path="/Dashboard" element={<Dashboard />} />
						<Route path="/Dashboard/Faturas/Pendentes" element={<FaturasPendentes />} />
						<Route path="/Dashboard/Faturas/Pagas" element={<FaturasPagas />} />
						<Route path="/Dashboard/Perfil" element={<PerfilDashboard />} />
						<Route path="/Dashboard/Assinatura" element={<Assinatura />} />
						<Route path="/Dashboard/DetalhesCobranca" element={<DetalhesCobranca />} />
						<Route path="/Dashboard/MudarPlano" element={<MudarPlano />} />
						<Route path="/resetarSenha" element={<ResetarSenha />} />
						<Route path="/CancelarAssinatura" element={<CancelarAssinatura />} />
					</Routes>
				</LoginProvider>
			</DiscountProvider>
		</UserProvider>
	);
}

export default App;
