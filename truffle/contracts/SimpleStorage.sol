// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract SimpleStorage {
  uint256 value;
  string greeter;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }

  function greet() external view returns (string memory) {
    return greeter;
  }

  function setGreet(string calldata _greeter) external {
    greeter = _greeter;
  }

}
