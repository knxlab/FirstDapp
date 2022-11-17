// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20Test is ERC20 {

    constructor() ERC20("KenexToken", "KNX") {}

    function mint() public {
        _mint(msg.sender, 10000);
    }
}