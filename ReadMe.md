# Blizzard API Creature Data Fetcher

This repository provides a set of Node.js scripts to fetch creature data from the Blizzard API. The project handles OAuth token management, querying for creature data, and searching for specific creatures by name. In the future I would like to make it a data vizualization tool.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Get Creature Index](#get-creature-index)
  - [Get Creature by ID](#get-creature-by-id)
  - [Search Creature by Name](#search-creature-by-name)
- [Scripts Overview](#scripts-overview)
  - [tokenHandling.js](#tokenhandlingjs)
  - [index.js](#indexjs)
  - [Creature.js](#creaturejs)
  - [getCreatureIndex.js](#getcreatureindexjs)
  - [getCreature.js](#getcreaturejs)
  - [searchCreature.js](#searchcreaturejs)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sabshane/WoWCharts.git
    cd WoWCharts
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:
    ```plaintext
    CLIENT_ID=your_blizzard_client_id
    CLIENT_SECRET=your_blizzard_client_secret
    REGION=your_region
    ```
You'll need to get your client ID and Secret from here : https://develop.battle.net/documentation/guides/getting-started
## Configuration

Make sure to replace `your_blizzard_client_id`, `your_blizzard_client_secret`, and `your_region` with your actual Blizzard API client ID, client secret, and the desired region (e.g., `eu` or `us`).

## Usage

### Get Creature Index

To fetch and log the list of creature types:
```bash
node index.js
```

### Get Creature by ID

To fetch a specific creature by its ID, use the `getCreature` function from the `getCreature.js` file.

### Search Creature by Name

To search for creatures by name, use the `searchCreature` function from the `searchCreature.js` file.

## Scripts Overview

### tokenHandling.js

Handles OAuth token retrieval and management. Functions include:

- `updateEnv(newEnv)`: Updates the `.env` file with new environment variables.
- `requestNewToken()`: Requests a new OAuth token from the Blizzard API.
- `isTokenValid()`: Checks if the current token is still valid.
- `getToken()`: Retrieves the current valid token or requests a new one if expired.

### index.js

Main entry point for the application. Imports token handling and creature data fetching functions, and calls the `getCreatureIndex()` function to fetch and log the creature index.

### Creature.js

Exports the following functions for fetching creature data:

- `searchCreature`: Searches for creatures by name.
- `getCreature`: Fetches a creature by its ID.
- `getCreatureIndex`: Fetches the list of creature types.

### getCreatureIndex.js

Fetches and logs the list of creature types from the Blizzard API.

### getCreature.js

Fetches data for a specific creature by its ID from the Blizzard API.

### searchCreature.js

Searches for creatures by name using the Blizzard API.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.