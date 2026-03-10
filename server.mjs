import express from "express";

const app = express()
const PORT = process.env.PORT || 3003;

app.use(express.json());

function validateInput(word, items) {
    if (typeof word !== "string" || !word.trim()) {
        return "Missing or invalid search term.";
    } 
    if (!items|| typeof items !== "object" || Array.isArray(items)) {
        return "Missing or invalid items (must be of type object).";
    }
    return null;
}

function searchForItem(word, items) {
    // Search for given word in items object
    return Object.keys(items).filter(itemTitle =>
        itemTitle.toLowerCase().includes(word)
    );
}

app.post("/search", (req, res) => {
    const {keyword, items } = req.body;

    // Check for missing or invalid inputs
    const validationError = validateInput(keyword, items);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const searchTerm = keyword.trim().toLowerCase();
    const matchedTitles = searchForItem(searchTerm, items);
    
    // Word is not in the items object
    if (matchedTitles.length === 0) {
        return res.status(404).json({
            error: `Sorry, no results were found for '${keyword}'.`
        });
    }

    const result = matchedTitles.map(title => ({
        itemTitle: title,
        itemDetails: items[title] || {}
    }));

    return res.json({ results: result });
});

app.listen(PORT, () => {
    console.log(`Search Microservice listening on port ${PORT}...`);
});