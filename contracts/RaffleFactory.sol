// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Raffle.sol";

contract RaffleFactory {
    address public entropyAddress;
    address public defaultProvider;
    address public pyusdToken;
    address[] public raffles;

    event RaffleCreated(address raffleAddress, string prizeDescription);

    constructor(address _entropyAddress, address _defaultProvider, address _pyusdToken) {
        entropyAddress = _entropyAddress;
        defaultProvider = _defaultProvider;
        pyusdToken = _pyusdToken;
    }

    function createRaffle(
        Raffle.PrizeType _prizeType,
        uint256 _prizeAmount,
        string memory _prizeDescription,
        uint256 _ticketPrice,
        uint256 _maxTickets,
        uint256 _maxTicketsPerUser,
        uint256 _endTime,
        uint256 _houseFeePercentage
    ) external returns (address) {
        Raffle newRaffle = new Raffle(
            entropyAddress,
            defaultProvider,
            pyusdToken,
            _prizeType,
            _prizeAmount,
            _prizeDescription,
            _ticketPrice,
            _maxTickets,
            _maxTicketsPerUser,
            _endTime,
            _houseFeePercentage,
            msg.sender // Admin is creator
        );
        raffles.push(address(newRaffle));
        emit RaffleCreated(address(newRaffle), _prizeDescription);
        return address(newRaffle);
    }

    function getRaffles() external view returns (address[] memory) {
        return raffles;
    }
}