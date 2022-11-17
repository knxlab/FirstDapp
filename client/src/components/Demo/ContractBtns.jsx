import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setGreetValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [greetInputValue, setGreetInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).call();
    const result = await contract.methods.write(newValue).send({ from: accounts[0] });
    console.log(result);
  };

  const getGreet = async () => {
    const value = await contract.methods.greet().call({ from: accounts[0] });
    setGreetValue(value);
  }
  const setGreet = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (greetInputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    await contract.methods.setGreet(greetInputValue).call();
    const result = await contract.methods.setGreet(greetInputValue).send({ from: accounts[0] });
    console.log(result);
  }

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

      <button onClick={getGreet}>
        greet()
      </button>

      <div onClick={setGreet} className="input-btn">
        setGreet(<input
          type="text"
          placeholder="string"
          value={greetInputValue}
          onChange={(e) => setGreetInputValue(e.target.value)}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
