function flipCoin() {
    return new Promise((resolve, reject) => {
        let result = Math.random() > 0.5;
        setTimeout(() => {
            if (result) {
                resolve("🎉 Heads! Fetching a joke...");
            } else {
                reject("😢 Tails! Fetching a Pokémon...");
            }
        }, 1000);
    });
}

function getJoke() {
    return fetch("https://v2.jokeapi.dev/joke/Any?type=twopart")
        .then(response => response.json())
        .then(data => `${data.setup} 🤔 ${data.delivery} 😂`)
        .catch(() => "Couldn't fetch a joke.");
}

function getPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(data => `You got a Pokémon! 🏆 ${data.name.toUpperCase()}!`)
        .catch(() => "Couldn't fetch a Pokémon.");
}

function playGame() {
    let resultElement = document.getElementById("result");
    flipCoin()
        .then(message => {
            resultElement.innerText = message;
            return getJoke();
        })
        .then(joke => resultElement.innerText += `\n🤣 Joke: ${joke}`)
        .catch(error => {
            resultElement.innerText = error;
            return getPokemon();
        })
        .then(pokemon => resultElement.innerText += `\n🐉 ${pokemon}`);
}