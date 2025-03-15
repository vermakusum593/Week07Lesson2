

const flipCoin =  () => {
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
};


const getJoke = async () => {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart");
        if (!response.ok) {
            throw new Error("Failed to fetch joke.");
        }
        const data = await response.json();
        return `${data.setup} 🤔 ${data.delivery} 😂`;
    } catch (error) {
        return "Couldn't fetch a joke.";
    }
};


const getPokemon = async () => {
    try {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon.");
        }
        const data = await response.json();
        return `You got a Pokémon! 🏆 ${data.name.toUpperCase()}!`;
    } catch (error) {
        return "Couldn't fetch a Pokémon.";
    }
};



const playGame = async () => {
    let resultElement = document.getElementById("result");
    
    try {
        const coinResult = await flipCoin();
        resultElement.innerText = coinResult;
        
        const joke = await getJoke();
        resultElement.innerText += `\n🤣 Joke: ${joke}`;
    } catch (error) {
        resultElement.innerText = error;
        
        const pokemon = await getPokemon();
        resultElement.innerText += `\n🐉 ${pokemon}`;
    }
};


document.getElementById("playButton").addEventListener("click", playGame);
