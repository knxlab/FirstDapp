import { EthProvider } from "./contexts/EthContext";

import Erc20Test from './components/Erc20Test';
import "./App.css";

// 0x71F05995aBB62c9DCb6005987F849e5fed00aBBF

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Erc20Test />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
