// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Task2Nft is ERC721URIStorage {
    uint256 public nextTokenId;
    address public admin;

    constructor() ERC721("Task 2", "T2N") {
        admin = msg.sender;
    }

    function mint(address to, string memory tokenURI) external returns (uint256) {
        require(msg.sender == admin, 'only admin can mint');
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, tokenURI);
        nextTokenId++;
        return (nextTokenId - 1);
    }


}