import getPokemonOptions, { getPokemons, getPokemonNames } from '@/helpers/getPokemonOptions';

describe('getPokemonOptions helpers', () => {

    test('debe de regresar un arrreglo de numeros', () => {

        const pokemons = getPokemons()

        expect(pokemons.length).toBe(649)
        expect(pokemons[0]).toBe(1)
        expect(pokemons[500]).toBe(501)
        expect(pokemons[648]).toBe(649)
    })

    test('debe de retornar un arreglo de 4 elementos con nombres de pokemons', async () => {

        const expectedPokes = [
            { name: 'bulbasaur', id: 1 },
            { name: 'ivysaur', id: 2 },
            { name: 'venusaur', id: 3 },
            { name: 'charmander', id: 4 }
        ]
        const pokemons = await getPokemonNames([1, 2, 3, 4])
        expect(pokemons).toStrictEqual(expectedPokes)
    })

    test('getPokemonOptions debe de retornar un arreglo mezclado', async () => {

        const pokemons = await getPokemonOptions()
        
        expect(pokemons.length).toBe(4)
        expect(pokemons).toEqual([
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            }
        ])
    })

})