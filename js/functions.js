const arceusAudio = new Audio()
const giratinaAudio = new Audio()
const battleTheme = new Audio()
giratinaAudio.src = "./audio/giratinacries.mp3"
arceusAudio.src =  "./audio/arceuscries.mp3"
battleTheme.src = "./audio/pokemontheme.mp3"


const defaultPokemon = {
    name: "",
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0,
}

const createLegPokemon = (name) => {
    return {
        ...defaultPokemon,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 10
    }
}

const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        // Adiciona os event listeners apenas uma vez
        this.fighter1El.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter1, this.fighter2, this.fighter1El.querySelector(".charsprite img")));
        this.fighter2El.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter2, this.fighter1, this.fighter2El.querySelector(".charsprite img")));

        this.update();
    },

    update() {
        // Atualiza as informações dos lutadores
        this.fighter1El.querySelector(".char-info strong").innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector(".bar").style.width = `${f1Pct}%`;

        this.fighter2El.querySelector(".monster-info strong").innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector(".bar").style.width = `${f2Pct}%`;
    },

    doAttack(attacking, attacked, animAttack) {
        if (attacked.life <= 0 || attacking.life <= 0) {
            log.addMessage("Algum Pokémon já está morto!");
            return;
        }

        // Animação de ataque
        animAttack.classList.add(`${attacking.name.toLowerCase()}-attack`);
        setTimeout(() => animAttack.classList.remove(`${attacking.name.toLowerCase()}-attack`), 1000);


        battleTheme.play();


        // Áudio de ataque
        if (attacking.name === "Arceus") {
            arceusAudio.play();
        } else if (attacking.name === "Giratina") {
            giratinaAudio.play();
        }

        // Cálculo de dano
        const attackFactor = Math.random() * 2;  // Fator de aleatoriedade
        const defenseFactor = Math.random() * 2;  // Fator de aleatoriedade

        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            attacked.life = Math.max(0, attacked.life);  // Garante que a vida não fique negativa
            log.addMessage(`${attacking.name} atacou e causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        } else {
            log.addMessage(`${attacked.name} defendeu o ataque`);
        }

        this.update();
    }
}

const log = {
    list:[],
    addMessage(msg){
        this.list.push(msg)
        this.render()
    },

    render(){
        const logEl = document.querySelector(".log")
        logEl.innerHTML = "";

        for(let i in this.list){
            logEl.innerHTML += `<li>${this.list[i]}</li>`
        }

        
    }

    
}