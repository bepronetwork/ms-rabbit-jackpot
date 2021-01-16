# Ms-Jackpot API
This systems works like a wrapper for all the Jackpot computation, in each bet a message is sent from ms-master to this system to compute the possibility of the win in this bet case. All the messages are passed via WebSockets and are computed individually.

# Getting started

### Project Configuration
The first step is to fork the project onto your machine. After fork, enter the project and in its root folder create an `.env` file. In this file, you put all your sensitive and environment info.

The `.env` variables are in this link, section 3: https://www.notion.so/betprotocol/Ms-Jackpot-Jackpot-Microservice-a712c615339744c3ab88dd1bdf955a67

Note: In the link above is also the step by step of what is needed to create an online machine of the entire project in Heroku.

### Project Installation

After creating the `.env` file, we now open a terminal in the project's root folder and install all project dependencies with the command:

    npm install

Finally, we started the project with:

    npm start

### Docs

- Endpoint documentation: https://betprotocol.readme.io/reference
- NodeJS installation: https://nodejs.org/en/
- General documentation BEPRO.NETWORK operation: https://www.notion.so/betprotocol/BEPRO-NETWORK-c3d96d49ccc04f49b07ea9ea8fd5c149
- SendInBlue service: https://pt.sendinblue.com/
- GetStream service: https://getstream.io/
- GetMati service: https://www.getmati.com/
- Crisp service: https://crisp.chat/en/
- Pusher service: https://dashboard.pusher.com/

