import { useEffect } from "react";
import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";


function UserAddress() {
    const { state: { accounts } } = useEth();
    if (!accounts || !accounts[0]) {
        return null;
    }
    return (
        <div>{accounts[0]}</div>
    )
}

function Button() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const [balance, setBalance] = useState();

  const refreshBalance = async () => {
    const value = await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
    setBalance(value);
  }

  useEffect(() => {
    console.log("contract.methods", contract);
    if (contract?.methods) {
        refreshBalance();
    }
  }, [contract]);

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleAddressChange = e => {
    setInputAddress(e.target.value);
  };

  const transfer = async () => {
    if (!web3.utils.isAddress(inputAddress)) {
      alert("invalid address")
      return;
    }
    await contract.methods.transfer(inputAddress, web3.utils.toBN(parseInt(inputValue))).send({ from: accounts[0] });
  };

  const mint10K = async() => {
    const result = await contract.methods.mint().send({ from: accounts[0] });
    console.log(result);
    await refreshBalance();
  }



  return (
    <div>
        <UserAddress />
        <button onClick={mint10K}>MINT 10 000</button>
        <button onClick={refreshBalance}>Refresh balance</button>

        {balance && balance >0 && (
            <pre>{balance}</pre>
        )}

        <div className="btns">

        <input
            type="text"
            placeholder="address"
            value={inputAddress}
            onChange={handleAddressChange}
        />
        <input
            type="text"
            placeholder="amount"
            value={inputValue}
            onChange={handleInputChange}
        />
        <button onClick={transfer} className="input-btn">
            transfer
        </button>

        </div>

    </div>
  );
}

export default Button;