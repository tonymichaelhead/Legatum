pragma solidity ^0.4.4;

contract will {
  address ownerAddress;
  bytes willData;
  function will() {
    // constructor
  }

  function setWillContents(address owner, bytes uploadedText) {
    ownerAddress = owner;
    willData = uploadedText;
  }

  function getWillData() returns (bytes) {
    return willData;
  }

}
