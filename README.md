# Search Microservice

## Overview

The **Search Microservice** provides a simple REST-based service that allows client applications to search for items by keyword and retrieve detailed information about matching items.

The microservice accepts a keyword and an object containing item titles and associated details. It searches the titles for matches and returns the matching items with their details.

This service is designed to integrate easily with other applications through **HTTP POST requests**, allowing programs written in any language to perform keyword-based searches.

---

## Features

- Keyword-based search for item titles
- Returns detailed item information
- JSON API responses
- Input validation for search terms and items
- Clear error responses
- Lightweight REST interface
- Easy integration with other microservices

---

## Technologies Used

- **Node.js**
- **Express**
- **Fetch API** (for test client)

---

## File Structure

```text
Search-Microservice/
│
├── server.mjs
│   Express server and search API logic
│
├── test_search.mjs
│   Test client for validating API requests
│
└── README.md
```

---

# How to Run the Microservice

### 1. Start the server

```bash
node server.mjs
```

### 2. Expected startup message

```text
Search Microservice listening on port 3003...
```

The microservice runs at:

```text
http://localhost:3003
```

---

# How to Run the Test Program

A test client is included to demonstrate valid and invalid requests.

```bash
node test_search.mjs
```

The test program sends several requests to the microservice and prints the responses.

---

# API Endpoint

## POST `/search`

Searches an items object for titles that contain the specified keyword.

---

## Request Body

```json
{
  "keyword": "San Juan",
  "items": {
    "London": {
      "notes": "Walk around downtown"
    },
    "California": {
      "toDoList": ["pack suitcases", "buy airline tickets"],
      "notes": "Visit Newport Beach"
    },
    "San Juan": {
      "toDoList": ["Get rental car", "look at hotels"],
      "notes": "Explore Old San Juan"
    }
  }
}
```

---

## Example Request (Simple Search)

```json
{
  "keyword": "Run",
  "items": {
    "Run 4 miles": {},
    "spend 30 minutes on the elliptical": {}
  }
}
```

---

## Successful Response

```json
{
  "results": [
    {
      "itemTitle": "San Juan",
      "itemDetails": {
        "toDoList": [
          "Get rental car",
          "look at hotels"
        ],
        "notes": "Explore Old San Juan"
      }
    }
  ]
}
```

---

# Error Responses

The microservice validates both the search term and the items object.

---

## Missing or Invalid Search Term

```json
{
  "error": "Missing or invalid search term."
}
```

---

## No Matching Results

```json
{
  "error": "Sorry, no results were found for 'jog'."
}
```

---

## Missing or Invalid Items Object

```json
{
  "error": "Missing or invalid items (must be of type object)."
}
```

---

# Example Request Flow

1. A client program sends a POST request containing a keyword and an items object.
2. The server validates the input.
3. The server searches the item titles for matches.
4. Matching titles are returned along with their details.

---

# Example Client Usage (JavaScript)

```javascript
const response = await fetch("http://localhost:3003/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    keyword: "Run",
    items: {
      "Run 4 miles": {},
      "spend 30 minutes on the elliptical": {}
    }
  })
});

const data = await response.json();
console.log(data);
```

---

# Example Client Usage (Python)

```python
import requests

response = requests.post(
    "http://localhost:3003/search",
    json={
        "keyword": "Run",
        "items": {
            "Run 4 miles": {},
            "spend 30 minutes on the elliptical": {}
        }
    }
)

print(response.json())
```

---

# Example Test Cases

The included test client sends several test requests:

| Test | Description |
|-----|-------------|
| Test 1 | Valid search with item details |
| Test 2 | Valid one-word search |
| Test 3 | Empty search term |
| Test 4 | Search term with no matches |
| Test 5 | Missing items object |

---

# Example Test Request Object

```json
{
  "keyword": "San Juan",
  "items": {
    "London": {
      "notes": "Walk around downtown"
    },
    "California": {
      "toDoList": ["pack suitcases", "buy airline tickets"],
      "notes": "Visit Newport Beach"
    },
    "San Juan": {
      "toDoList": ["Get rental car", "look at hotels"],
      "notes": "Explore Old San Juan"
    }
  }
}
```

---

# Communication Contract

## How to REQUEST Data

Clients send an HTTP POST request to the `/search` endpoint.

```http
POST /search
Content-Type: application/json
```

Request body:

```json
{
  "keyword": "Run",
  "items": {
    "Run 4 miles": {},
    "spend 30 minutes on the elliptical": {}
  }
}
```

---

## How to RECEIVE Data

The server returns JSON responses.

Example successful response:

```json
{
  "results": [
    {
      "itemTitle": "Run 4 miles",
      "itemDetails": {}
    }
  ]
}
```

Example error response:

```json
{
  "error": "Missing or invalid search term."
}
```

---

# Example Use Cases

This microservice can be used for:

- Searching workout lists
- Searching travel destinations
- Searching inventory items
- Finding tasks in a to-do list
- Searching project data structures

---

# UML Architecture

```mermaid
flowchart LR
    A[Client Program] -->|POST /search| B[server.mjs]

    B --> C[validateInput()]
    B --> D[searchForItem()]

    D --> E[Object.keys(items)]
    E --> F[Filter titles containing keyword]

    F --> G[Matched Titles]

    G --> H[Map titles to result objects]
    H --> I[JSON Response Returned]
```

---

# Author

Search Microservice Implementation  
CS 361 Microservices Project
