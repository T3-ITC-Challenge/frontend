import BankCard from '../models/BankCard.js';
import User from '../models/User.js';

import CardRequest from "../models/CardRequest.js"; // Import the CardRequest model

// ✅ Function to get all card requests
export const getCardRequests = async (req, res) => {
  try {
    const cardRequests = await CardRequest.find(); // Fetch all card requests from DB
    return res.status(200).json(cardRequests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error while fetching card requests" });
  }
};

// Request a new bank card
// ✅ Function to handle card request and save it to the database
export const requestCard = async (req, res) => {
    try {
      const { email, accountNumber } = req.body;
  
      if (!email || !accountNumber) {
        return res.status(400).json({ msg: "Email and Account Number are required" });
      }
  
      // ✅ Create a new card request in the database
      const newRequest = new CardRequest({ email, accountNumber });
      await newRequest.save();
  
      console.log("Card Request Saved:", newRequest);
  
      return res.status(201).json({ msg: "Card request submitted successfully", request: newRequest });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error while processing card request" });
    }
};

// Activate a bank card
export const activateCard = async (req, res) => {
    try {
        const { cardID } = req.body;

        const card = await BankCard.findById(cardID);
        if (!card) return res.status(404).json({ msg: "Card not found" });

        card.status = 'ACTIVE';
        await card.save();

        res.json({ msg: "Card activated successfully", card });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Deactivate a bank card
export const deactivateCard = async (req, res) => {
    try {
        const { cardID } = req.body;

        const card = await BankCard.findById(cardID);
        if (!card) return res.status(404).json({ msg: "Card not found" });

        card.status = 'INACTIVE';
        await card.save();

        res.json({ msg: "Card deactivated successfully", card });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Get all bank cards for a user
export const getUserCards = async (req, res) => {
    try {
        const { userID } = req.params;
        const cards = await BankCard.find({ userID });

        if (!cards.length) return res.status(404).json({ msg: "No cards found" });

        res.json(cards);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};
