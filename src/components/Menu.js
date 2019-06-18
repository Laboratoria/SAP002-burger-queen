import AmericanCoffee from '../image/coffee1.jpg'
import CoffeeWithMilk from '../image/coffee2.jpg'
import Sandwhich from '../image/sandwhich.jpg'
import Juice from '../image/juice.jpg'
import SimpleMeatHamburger from '../image/meatham.jpg'
import SimpleChickenHamburger from '../image/chickenham.jpg'
import SimpleVeggieHamburger from '../image/veggieham.jpg'
import DoubleMeatHamburger from '../image/doublemeatham.jpg'
import DoubleChickenHamburger from '../image/doublechickenham.jpg'
import DoubleVeggieHamburger from '../image/doubleveggieham.jpg'
import FrenchFries from '../image/frenchfries.jpg'
import OnionRings from '../image/onionrings.jpg'
import WaterMedium from '../image/water.jpg'
import WaterBig from '../image/water2.jpg'
import SodaMedium from '../image/soda1.jpg'
import SodaBig from '../image/soda2.jpg'


const menuData = [
    {
        waiter: '',
        client: '',
        category: '',
        isBreakfastChecked: true,
        isRestOfTheDayChecked: true,
        isEggChecked: true,
        isCheeseChecked: true
    },
    {
        id: 1,
        item: 'Sanduíche de presunto e queijo',
        img: {Sandwhich},
        price: 'R$ 10.00',
        isOrderReady: true
    },
    {
        id: 2,
        item: 'Hamburger simples com carne bovina',
        img: {SimpleMeatHamburger},
        price: 'R$ 10.00',
        isOrderReady: true
    },
    {
        id: 3,
        item: 'Hamburger simples com frango',
        img: {SimpleChickenHamburger},
        price: 'R$ 10.00',
        isOrderReady: true
    },
    {
        id: 4,
        item: 'Hamburger simples vegetariano',
        img: {SimpleVeggieHamburger},
        price: 'R$ 10.00',
        isOrderReady: true
    },
    {
        id: 5,
        item: 'Hamburger duplo com carne bovina',
        img: {DoubleMeatHamburger},
        price: 'R$ 15.00',
        isOrderReady: true
    },
    {
        id: 6,
        item: 'Hamburger duplo com frango',
        img: {DoubleChickenHamburger},
        price: 'R$ 15.00',
        isOrderReady: true
    },
    {
        id: 7,
        item: 'Hamburger duplo vegetariano',
        img: {DoubleVeggieHamburger},
        price: 'R$ 15.00',
        isOrderReady: true
    },
    {
        id: 8,
        item: 'Café americano',
        img: {AmericanCoffee},
        price: 'R$ 5.00',
        isOrderReady: true
    },
    {
        id: 9,
        item: 'Café com leite',
        img: {CoffeeWithMilk},
        price: 'R$ 7.00',
        isOrderReady: true
    },
    {
        id: 10,
        item: 'Água 500ml',
        img: {WaterMedium},
        price: 'R$ 5.00',
        isOrderReady: true
    },
    {
        id: 11,
        item: 'Água 750ml',
        img: {WaterBig},
        price: 'R$ 7.00',
        isOrderReady: true
    },
    {
        id: 12,
        item: 'Bebida com gás 500ml',
        img: {SodaMedium},
        price: 'R$ 7.00',
        isOrderReady: true
    },
    {
        id: 13,
        item: 'Bebida com gás 750ml',
        img: {SodaBig},
        price: 'R$ 10.00',
        isOrderReady: true
    },
    {
        id: 14,
        item: 'Suco de fruta natural',
        img: {Juice},
        price: 'R$ 7.00',
        isOrderReady: true
    },
    {
        id: 15,
        item: 'Batata frita',
        img: {FrenchFries},
        price: 'R$ 5.00',
        isOrderReady: true
    },
    {
        id: 16,
        item: 'Anéis de cebola',
        img: {OnionRings},
        price: 'R$ 5.00',
        isOrderReady: true
    },
    {
        id: 17,
        item: 'Queijo',
        price: 'R$ 1.00',
        isOrderReady: true
    },
    {
        id: 18,
        item: 'Ovo',
        price: 'R$ 1.00',
        isOrderReady: true
    }
]

export default menuData