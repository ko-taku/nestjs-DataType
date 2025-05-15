// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataType {
    uint256 public positiveNumber = 100;
    int256 public negativeNumber = -50;
    address public recipient;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    function setPositiveNumber(uint256 _positiveNumber) public {
        positiveNumber = _positiveNumber;
    }

    function setNegativeNumber(int256 _negativeNumber) public {
        negativeNumber = _negativeNumber;
    }

    bool public isActive = true;

    function toggleActive() public {
        isActive = !isActive;
    }

    address public wallet = address(0);
    function setWallet(address newWallet) public {
        wallet = newWallet;
        recipient = newWallet;
    }

    bytes32 public fixedData = "0xabcdef123456";
    bytes public dynamicData = "";

    function setFixedData(bytes32 _fixedData) public {
        fixedData = _fixedData;
    }

    function setDynamicData(bytes memory _dynamicData) public {
        dynamicData = _dynamicData;
    }

    function getDynamicDataLength() public view returns (uint) {
        return dynamicData.length;
    }

    enum State {
        Created,
        Active,
        Inactive
    }

    State public currentState = State.Active;

    function setState(uint256 _state) public {
        require(_state <= uint(State.Inactive), "out of bound");
        currentState = State(_state);
    }

    function getDetails()
        public
        view
        returns (uint, int, bool, address, address, bytes32, bytes memory, uint)
    {
        return (
            positiveNumber,
            negativeNumber,
            isActive,
            wallet,
            recipient,
            fixedData,
            dynamicData,
            uint(currentState)
        );
    }
}
