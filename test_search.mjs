const BASE_URL = "http://localhost:3003/search";

async function searchValidRequest(body) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })

    const data = await response.json();
    console.log(JSON.stringify(data, null, 1));
}

async function searchInvalidRequest(body) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })

    const data = await response.json();
    console.log(data);
    console.log("status: ", response.status);
}

const test1 = {
    "keyword": "San Juan",
    "items": {
        "London": {
            "notes": "Walk around downtown"
        },
        "California": {
            "toDoList": ["pack suitcases", "buy airline tickets"],
            "notes": "Visit Newport Beach"
        },
        "San Juan" : {
            "toDoList": ["Get rental car", "look at hotels"],
            "notes": "Explore Old San Juan"
        }
    }
}

const test2 = {
        "keyword": "Run",
        "items": {
            "Run 4 miles": {},
            "spend 30 minutes on the elliptical": {}
        }
}

const test3 = {
    "keyword": "", 
    "items": { 
        "Run 4 miles": {}, 
        "spend 30 minutes on the elliptical": {}
    }
}

const test4 = {
    "keyword": "jog", 
    "items": { 
        "Run 4 miles": {}, 
        "spend 30 minutes on the elliptical": {}
    }
}

const test5 = {
    "keyword": "run"
}

async function runTests() {
    console.log("-------------Test 1 (Details included)-------------");
    await searchValidRequest(test1);

    console.log("\n");
    console.log("-------------Test 2 (One-word search with no details)-------------");
    await searchValidRequest(test2);

    console.log("\n");
    console.log("-------------Test 3 (Empty search term)-------------");
    await searchInvalidRequest(test3);

    console.log("\n");
    console.log("-------------Test 4 (No terms match)-------------");
    await searchInvalidRequest(test4);

    console.log("\n");
    console.log("-------------Test 5 (No items)-------------");
    await searchInvalidRequest(test5);
}

runTests();