// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract dAppContract is ERC721URIStorage {
    address[] private _owners;
    uint256 private _tokenId;

    constructor(
        string memory name,
        string memory symbol,
        address[] memory initialOwners
    ) ERC721(name, symbol) {
        for (uint256 i = 0; i < initialOwners.length; i++) {
            _owners.push(initialOwners[i]);
        }
    }

    // ** Auth Functions ** //
    function addOwner(address owner) external {
        require(verifyOwner(msg.sender), "El remitente no esta autorizado");

        // Check param owner not in _owners array
        require(!verifyOwner(owner), "La nueva direccion ya existe");
        _owners.push(owner);
    }

    function verifyOwner(address sender) private view returns (bool) {
        for (uint256 i = 0; i < _owners.length; i++) {
            if (_owners[i] == sender) {
                return true;
            }
        }
        return false;
    }
    // ** ** //

    // ** mint function ** //
    function safeMint(address account, string memory tokenURI) public {
        require(verifyOwner(msg.sender), "El remitente no esta autorizado");
        _tokenId = _tokenId + 1;
        _safeMint(account, _tokenId);
        _setTokenURI(_tokenId, tokenURI);
    }
    // ** ** //
}
