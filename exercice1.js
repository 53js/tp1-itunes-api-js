function envoyerRequete(location) {
    return new Promise((resolve, reject) => {
        console.log(`making request to ${location}`);
        if (location === "Google") {
            resolve("Google dit hello !");
        } else {
            reject({ message: "On ne peut parler qu'à Google" });
        }
    });
}

function traiterReponse(response) {
    return new Promise((resolve, reject) => {
        console.log("Traitement de la réponse");
        resolve(`Réponse traitée... ${response}`);
    });
}

console.log('1');
envoyerRequete('Google').then(traiterReponse).then(console.log);

// ou 
console.log('2');
envoyerRequete('Google').then((resp) => traiterReponse(resp))
    .then((resp => console.log(resp)));


async function envoyerRequete2(location) {
    console.log(`making request to ${location}`);
    if (location === "Google") {
       return "Google dit hello !";
    } else {
       throw new Error({ message: "On ne peut parler qu'à Google" });
    }
}

async function traiterReponse2(response) {
    console.log("Traitement de la réponse");
    return `Réponse traitée... ${response}`;
};

console.log('3');
envoyerRequete2('Google').then(traiterReponse2);
//si je veux utiliser await il faut que je wrap le code dans une fonction 
console.log('4');

async function testing () {
    try {
        const resp = await envoyerRequete2('Google');
        await traiterReponse2(resp);
    } catch(e) {
        console.log(e);
    }
}
testing();

// ou 

console.log('5');
( async () => {
    const resp = await envoyerRequete2('Google');
    await traiterReponse2(resp);
})();


