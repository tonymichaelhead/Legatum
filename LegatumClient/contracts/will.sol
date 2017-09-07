pragma solidity ^0.4.4;

contract will {
  address contractor;
  address ownerAddress;
  bytes willData;

  function will() {
    contractor = msg.sender;
  }

  modifier ownerOnly {
    require(contractor == msg.sender || ownerAddress == msg.sender);
    _;
  }

  // event WillUpdate (
  //   address indexed _from,
  //   bytes indexed uploadedText
  // );

  function setWillContents(address owner, bytes uploadedText) ownerOnly {
    ownerAddress = owner;
    willData = uploadedText;
    // WillUpdate(msg.sender, uploadedText);
  }
  
  function getWillData() constant ownerOnly returns (bytes) {
    return willData;
  }

}
