pragma solidity ^0.4.20;


contract SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (_a == 0) {
      return 0;
    }

    c = _a * _b;
    assert(c / _a == _b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
    // assert(_b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = _a / _b;
    // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold
    return _a / _b;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
    if(_b > _a)throw;
    return _a - _b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
    c = _a + _b;
    if(c < _a)throw;
    return c;
  }

}


contract btoken is SafeMath{

  string public name;
  string public icon;
  uint8 public decimals;
  uint256 totalSupply;
  address owner;

//map any address to a balance
  mapping (bytes32 => uint256) public balances;

/*
 * events
 */
  event Transfer(bytes32 from, bytes32 to, uint value);
  event newMint(uint value);

// only operate if the command comes from bridigette
  modifier onlyOwner(){
    if(msg.sender != owner)throw;
    _;
  }


/*
 * Constructor function
 * @dev this is called by a software licensor who then becomes the owner
 * @param name: the name of the product
 * @param icon : icon url
 * @param decimals : not used for bool tokens can be used for consumption
 * @param initial supply : tokens at start, stored at owners addresses
 * @param experation_date : date after which the entitlement will stop functioning.
*/

 function btoken(string _name, string _icon, uint8 _decimals, uint256 _initialSupply) public {
      balances[sha256("@DontPanicBurns#7712")] = _initialSupply;
      totalSupply = _initialSupply;
      name = _name;
      icon = _icon;
      decimals = _decimals;
      owner = msg.sender;
  }

  /*
   * Function that is called to mint new tokens
   * @param value: how many coins to make
   * @dev can only be called by the owner, sends minted tokens to the owner address
   */

  function mint(uint value) public onlyOwner returns (bool success){
    totalSupply = add(totalSupply, value);
    balances[sha256("DontPanicBurns#7712")] = add(balances[sha256("DontPanicBurns#7712")], value);
    newMint(value);
    return true;
  }

/*
 * function called to burn tokens
 * @param value : how many to burnNotice
 * @param data : a byte string if a user wants to add some kind of hex message

   function burns(uint _value, bytes _data) public returns (bool success){
    if (balanceOf(msg.sender) < _value) revert();
    balances[msg.sender] = sub(balanceOf(msg.sender), _value);
    totalSupply = sub(totalSupply, _value);
    emit burnNotice(msg.sender, _value, _data);
    return true;
}
  */

  /* Function that is called when a user or another contract wants to transfer funds
   * @param to : address to transfer a balance to
   * @param value : how many units to send
   * @dev only happens if msg sender has a balance and the entitlement is not expired
   */
  function transfer(bytes32 _from, bytes32 _to, uint _value) public onlyOwner returns (bool success) {
    return transferToAddress(_from, _to, _value);
}

  /* function that is called when transaction target is an address
   *
   * @dev internal function
   */
  function transferToAddress(bytes32 _from, bytes32 _to, uint _value) private returns (bool success) {
    if (balanceOf(_from) < _value) throw;
    balances[_from] = sub(balanceOf(_from), _value);
    balances[_to] = add(balanceOf(_to), _value);
    Transfer(_from, _to, _value);
    return true;
  }


  /*
   * getter: returns balance of an addresses
   * @param owner: address that we want to know a balance of
   */
  function balanceOf(bytes32 _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}
