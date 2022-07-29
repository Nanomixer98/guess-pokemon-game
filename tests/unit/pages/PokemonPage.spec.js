import { shallowMount, mount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import { pokemons } from '../mocks/pokemons.mock';

describe('Pokemon Page Component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de llamar mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        wrapper = shallowMount(PokemonPage)

        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = mount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })

        let pokPicComp = wrapper.find('pokemon-picture-stub');
        let pokOptComp = wrapper.find('pokemon-options-stub');

        expect(pokPicComp.exists()).toBeTruthy()
        expect(pokOptComp.exists()).toBeTruthy()

        expect(pokPicComp.attributes('pokemonid')).toBe('4')
        expect(pokOptComp.attributes('pokemons')).toBeTruthy()

    })

    test('pruebas con checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[1],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })

        await wrapper.vm.checkAnswer(5)
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto! ${pokemons[1].name}`)
        
        await wrapper.vm.checkAnswer(10)
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[1].name}`)
    })

})