pragma solidity =0.4.19;

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
    require(c / _a == _b);
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
    require(_b < _a);
    return _a - _b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
    c = _a + _b;
    require(c > _a);
    return c;
  }
}


contract bottoken is SafeMath{

  string public name;
  string public icon;
  uint8 public decimals;
  uint256 totalSupply;
  bool public locked;

//map any address to a balance
  mapping (bytes32 => uint256) public balances;
  mapping (address => bool) public owners;

/*
 * events
 */
  event Transfers(bytes32 from, bytes32 to, uint value);
  event newMint(uint value, bytes32 account);
  event burnNotice(bytes32 account,uint _input, uint _output,address _addr);
  event newAddr(bytes32 account, address newAddress);
// only operate if the command comes from bridigette
  modifier onlyOwner(){
    require(owners[msg.sender]);
    _;
  }
 modifier notLocked(){
    require(locked != true);
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

 function bottoken(string _name, string _icon, uint8 _decimals, bytes32 _owner, uint256 _initialSupply) public {
      balances[_owner] = _initialSupply;
      totalSupply = _initialSupply;
      name = _name;
      icon = _icon;
      decimals = _decimals;
      owners[msg.sender] = true;
      locked = true;
  }

/*
   * Function that is called to mint new tokens
   * @param value: how many coins to make
   * @dev can only be called by the owner, sends minted tokens to the owner address
   */

function unlock() public onlyOwner returns(bool success){
    locked = false;
    return true;
}

function lock() public onlyOwner returns(bool success){
    locked = true;
    return true;
}

function addOwner(address _newOwner) public onlyOwner returns(bool success){
  owners[_newOwner] = true;
  return true;
}

function rmOwner(address _newOwner) public onlyOwner returns(bool success){
  owners[_newOwner] = false;
  return true;
}
/*
   * Function that is called to mint new tokens
   * @param value: how many coins to make
   * @dev can only be called by the owner, sends minted tokens to the owner address
   */
function deposit(bytes32 account) external payable notLocked returns(bool success){
    uint n = 1000000000000000000;
    uint v = msg.value;
    //take a payment convert it by modulo 100, return change, mint tokens
    require(account != 0x00000000000000000000000000000000000000000000000000000000000000000);
    require(account.length == 32);
    require(mul(div(v,n) , 100) >= 0);
    require(msg.value % n == 0);
    uint tokens = mul(div(v,n) , 100);
    totalSupply = add(totalSupply, tokens);
    balances[account] = add(balanceOf(account), tokens);
    newMint(tokens, account);
    return true;
}


/*
 * function called to burn tokens
 * @param value : how many to burnNotice
 * @param data : a byte string if a user wants to add some kind of hex message
 */

   function withdraw(bytes32 account, uint _value, address _addr) onlyOwner notLocked public returns (bool success){
    require(balanceOf(account) > _value);
    balances[account] = sub(balanceOf(account), _value);
    totalSupply = sub(totalSupply, _value);

    uint n = 1000000000000000000;
    _value = mul(_value,n);
    uint e = div(_value,100);
    require(_addr.send(e));
    burnNotice(account, _value, e, _addr);
    return true;
}


  /* Function that is called when a user or another contract wants to transfer funds
   * @param to : address to transfer a balance to
   * @param value : how many units to send
   * @dev only happens if msg sender has a balance and the entitlement is not expired
   */
  function transfer(bytes32 _from, bytes32 _to, uint _value) public onlyOwner notLocked  returns (bool success) {
    require(balanceOf(_from) > _value);
    balances[_from] = balanceOf(_from) - _value;
    balances[_to] = balanceOf(_to) + _value;
    Transfers(_from, _to, _value);
    return true;
    }

  /*
   * getter: returns balance of an addresses
   * @param owner: address that we want to know a balance of
   */
  function balanceOf(bytes32 _owner) public view returns (uint balance) {
    return balances[_owner];
  }

  function newDeposit(bytes32 _account) public returns (bool success){
    Deposit genAddr = new Deposit(this, _account);
    newAddr(_account, genAddr);
    return true;
  }
}

contract Deposit{

    address parent;
    bytes32 account;

    event newContract(address parent, bytes32 account);
    event sending(uint amount);
 function Deposit(address _contract, bytes32 _account)public {
     parent = _contract;
     account = _account;
     newContract(parent, account);
    }

 function() public payable {
    //take a payment and forward it
    bottoken b = bottoken(parent);
    b.deposit.value(msg.value)(account);
    sending(msg.value);
    }

}
