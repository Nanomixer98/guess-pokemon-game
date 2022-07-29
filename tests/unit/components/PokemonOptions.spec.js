import { shallowMount } from '@vue/test-utils';
import PokemonOptions from '@/components/PokemonOptions';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonOptions', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons
            }
        })
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar las 4 opciones correctamente', () => {
        const liTags = wrapper.findAll('li');
        expect(liTags.length).toBe(4);

        expect(liTags[0].text()).toBe('bulbasaur');
        expect(liTags[1].text()).toBe('ivysaur');
        expect(liTags[2].text()).toBe('mew');
        expect(liTags[3].text()).toBe('charmander');
    })

    test('debe de emitir "selection" con sus respectivos parametros al hacer click', () => {
        const [li1, li2, li3, li4] = wrapper.findAll('li');

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')
        console.log(wrapper.emitted('selectedPokemon'));
        expect(wrapper.emitted('selectedPokemon').length).toBe(4)
        expect(wrapper.emitted('selectedPokemon')[0]).toEqual([4])
        expect(wrapper.emitted('selectedPokemon')[1]).toEqual([5])
        expect(wrapper.emitted('selectedPokemon')[2]).toEqual([7])
        expect(wrapper.emitted('selectedPokemon')[3]).toEqual([12])
    })

})