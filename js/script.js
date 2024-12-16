const pokemon1 = createLegPokemon("Arceus");
const pokemon2 = createLegPokemon("Giratina");


stage.start(
    pokemon1,
    pokemon2,
    document.querySelector(".char"),
    document.querySelector(".monster")
)