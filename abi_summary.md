# ABI Index

Here are the relevant methods and events you will need on the Just.game smart contract:

**1. purchaseTickets**
FUNCTION: The public facing function that a user is to invoke in order to exchange his/her TRX for JUST.GAME tokens, internally called "tickets".

**2. ticketPurchase**
EVENT: The event that fires off when a purchaseTicket invocation goes through successfully without reverts. Note: this event gets fired off both in the case of a plain buy order, but it also fires when a reinvest occurs.

Outputs: `roundNumber:int`, `account:address`, `fundsSpent:int`, `experienceSpent:int`, `ticketsGained:int`, `isUpgrade:bool`, `totalExperience:int`, `accountName:bytes32`

**3. playerMetadataOf**
FUNCTION: Public facing function returning computed/virtual player information (i.e. information that is not settled on-chain yet or only partially, and is instead calculated at run-time. Things such as aggregated earnings & winnings from previous rounds that have not been collected (see virtualDividends, virtualWinnings, etc), but also how many active tickets are owned by the active player (tickets can be "redeemed" and thus destroyed - see the whitepaper we released). You may incorporate these in your bot. **All that aside, the important data you will be needing from this is the backing return - it's how much dividends are backed to the tickets the user owns.

Inputs: `account:address`
Outputs: `virtualDividends:int`, `virtualWinnings:int`, `virtualLeaderBonus:int`, `ticketsOwned:int`, `myPosition:int`, `backing:int`

**4. toggleAutomaticallyUpgrade**
FUNCTION: A user can invoke this to emit a signal that he/she is allowing third party reinvests on his/her behalf.

**5. autoUpgradeToggled**
EVENT: As logic would predict, yes; this is the event that get's shot off when the function above is invoked.

Outputs: `account:address`, `enabled:bool`

**6. Players**
FUNCTION: Public facing function returning all of the on-chain stored data associated with queried user address by the parameter. What may be important here for you is the ability to manually check automaticallyUpgrade bool for a profile. 

Inputs: `account:address`
Outputs: `lastRound:int`, `squadEarnings:int`, `dividendEarnings:int`, `winnerEarnings:int`, `experienceTotal:int`, `experienceNextRound:int`, `experienceToSpend:int`, `automaticallyUpgrade:int`, `lastInteraction:int`

**7. upgradeTickets**
FUNCTION: This is your holy grail. You supply an address and invoke the thing, and voila, as long as your user has enough dividends to receive 1 whole "ticket" on reinvesting (about 0.20$) - you will be credited 1% of that reinvest.

Inputs: `activeAccount:address`
