let articles = {};

// Load data
fetch('data.json')
.then(res => res.json())
.then(data => articles = data);

// Search function
function searchArticle(value = null) {
    const input = value || document.getElementById("searchInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");

    let found = null;

    if (articles[input]) {
        found = { number: input, text: articles[input] };
    } else {
        for (let key in articles) {
            if (articles[key].toLowerCase().includes(input)) {
                found = { number: key, text: articles[key] };
                break;
            }
        }
    }

    if (found) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            <h2>Article ${found.number}</h2>
            <p>${found.text}</p>
        `;
    } else {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `<p>❌ No matching article found</p>`;
    }

    document.getElementById("suggestions").innerHTML = "";
}

// Suggestions while typing
function showSuggestions() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const suggestionBox = document.getElementById("suggestions");

    suggestionBox.innerHTML = "";

    if (input.length === 0) return;

    let count = 0;

    for (let key in articles) {
        if (key.includes(input) || articles[key].toLowerCase().includes(input)) {
            const div = document.createElement("div");
            div.innerText = `Article ${key}`;
            div.onclick = () => {
                document.getElementById("searchInput").value = key;
                searchArticle(key);
            };
            suggestionBox.appendChild(div);

            count++;
            if (count >= 5) break;
        }
    }
}

// Dark mode toggle
function toggleTheme() {
    document.body.classList.toggle("dark");
}
