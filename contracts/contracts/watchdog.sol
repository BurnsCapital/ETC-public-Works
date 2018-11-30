pragma solidity =0.4.20;

contract watchdog{

    address owner;

    event newEvent(string pushed);

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function watchdog(){
        owner = msg.sender;
    }

    function addEvent(string _event)
        public
        onlyOwner
        returns(bool){
            newEvent(_event);
        }

}
