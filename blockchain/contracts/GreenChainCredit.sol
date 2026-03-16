// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract GreenChainCredit is 
    ERC1155, 
    AccessControl, 
    ReentrancyGuard, 
    Pausable 
{

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory baseURI) ERC1155(baseURI) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    struct Credit {
        string creditId;
        bytes32 dataHash;
        bool retired;
        uint256 timestamp;
    }

    mapping(uint256 => Credit) private credits;
    mapping(string => bool) private issuedCreditIds;

    event CreditMinted(
        uint256 indexed tokenId,
        string creditId,
        address indexed owner,
        bytes32 dataHash
    );

    event CreditRetired(
        uint256 indexed tokenId,
        address indexed owner
    );

    event CreditTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );

    modifier creditExists(uint256 tokenId) {
        require(bytes(credits[tokenId].creditId).length > 0, "Credit not found");
        _;
    }

    function mintCredit(
        address to,
        uint256 tokenId,
        string memory creditId,
        bytes32 dataHash
    )
        external
        onlyRole(MINTER_ROLE)
        whenNotPaused
        nonReentrant
    {
        require(to != address(0), "Invalid address");
        require(!issuedCreditIds[creditId], "Credit already issued");
        require(bytes(creditId).length > 0, "Invalid credit ID");

        _mint(to, tokenId, 1, "");

        credits[tokenId] = Credit({
            creditId: creditId,
            dataHash: dataHash,
            retired: false,
            timestamp: block.timestamp
        });

        issuedCreditIds[creditId] = true;

        emit CreditMinted(
            tokenId,
            creditId,
            to,
            dataHash
        );
    }

    function retireCredit(uint256 tokenId)
        external
        whenNotPaused
        nonReentrant
        creditExists(tokenId)
    {
        require(balanceOf(msg.sender, tokenId) > 0, "Not credit owner");
        require(!credits[tokenId].retired, "Already retired");

        credits[tokenId].retired = true;

        emit CreditRetired(tokenId, msg.sender);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        public
        override
        whenNotPaused
    {
        require(!credits[id].retired, "Credit retired");

        super.safeTransferFrom(from, to, id, amount, data);

        emit CreditTransferred(id, from, to);
    }

    function verifyCredit(
        uint256 tokenId,
        bytes32 hash
    )
        external
        view
        creditExists(tokenId)
        returns (bool)
    {
        return credits[tokenId].dataHash == hash;
    }

    function getCredit(uint256 tokenId)
        external
        view
        creditExists(tokenId)
        returns (
            string memory creditId,
            bytes32 dataHash,
            bool retired,
            uint256 timestamp
        )
    {
        Credit memory c = credits[tokenId];

        return (
            c.creditId,
            c.dataHash,
            c.retired,
            c.timestamp
        );
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function grantMinterRole(address account)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _grantRole(MINTER_ROLE, account);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}