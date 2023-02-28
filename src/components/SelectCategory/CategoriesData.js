import antiques from './antyki-i-kolekcje-4042-1x.png'
import children from './dla-dzieci-88-1x.png'
import house from './dom-ogrod-628-1x.png'
import electronics from './elektronika-99-1x.png'
import fashion from './moda-87-1x.png'
import automotive from './motoryzacja-5-1x.png'
import education from './muzyka-edukacja-751-1x.png'
import realEstate from './nieruchomosci-3-1x.png'
import job from './praca-4-1x.png'
import agriculture from './rolnictwo-757-1x.png'
import sport from './sport-hobby-767-1x.png'
import services from './uslugi-firmy-619-1x.png'
import animals from './zwierzeta-103-1x.png'


const categories = [
    {
        name: 'motoryzacja',
        picture: automotive,
        subcategories: [
            {
                name: 'samochody osobowe',
                subsubcategories: [
                    'Aixam', 'Alfa Romeo', 'Audi', 'BMW', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen', 'Dacia', 'Daewoo', 'Daihatsu', 'Dodge', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lancia', 'Land Rover', 'Lexus', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Polonez', 'Porsche', 'Renault', 'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'Pozostałe']
            },
            {
                name: 'motocykle i skutery',
                subsubcategories: ['Chopper', 'Enduro-Funbike', 'Cross', 'Motorower', 'Quad', 'Skuter', 'Sportowy', 'Szosowo-Turystyczny', 'Pozostałe']
            },
            {
                name: 'dostawcze',
                subsubcategories: ['Autolaweta', 'Chłodnia i izoterma', 'Furgon', 'Kamper', 'Kontener', 'Plandeka', 'Skrzynia', 'Wywrotka', 'Pozostałe']
            },
            {
                name: 'ciężarowe',
                subsubcategories: ['Autobus', 'Autolaweta', 'Chłodnia i izoterma', 'Ciągnik siodłowy', 'Dźwigi', 'Plandeka', 'Do zabudowy', 'Wywrotka', 'Pozostałe']
            },
            {
                name: 'budowlane',
                subsubcategories: ['Dźwigi', 'Koparki', 'Koparko-ładowarki', 'Ładowarki', 'Maszyny drogowe', 'Wózki widłowe', 'Pozostałe']
            },
            {
                name: 'przyczepy i naczepy',
                subsubcategories: ['burtowe i plandeki', 'chłodnie i izotermy', 'wywrotki', 'burtowe i plandeki', 'kempingowe', 'pozostałe']
            },
            {
                name: 'części'
            },
            {
                name: 'opony i felgi'
            },
            {
                name: 'pozostałe'
            },
        ]
    },
    {
        name: 'nieruchomości',
        picture: realEstate,
        subcategories: [
            {
                name: 'mieszkania',
                subsubcategories: ['Wynajem', 'Sprzedaż', 'Zamiana']
            },
            {
                name: 'domy',
                subsubcategories: ['Wynajem', 'Sprzedaż', 'Zamiana']
            },
            {
                name: 'działki',
                subsubcategories: ['Wynajem', 'Sprzedaż', 'Zamiana']
            },
            {
                name: 'biura i lokale',
                subsubcategories: ['Wynajem', 'Sprzedaż', 'Zamiana']
            },
            {
                name: 'garaże i parkingi',
                subsubcategories: ['Wynajem', 'Sprzedaż', 'Zamiana']
            },
            {
                name: 'stancje i pokoje',
            },
            {
                name: 'hale i magazyny',
                subsubcategories: ['Wynajem', 'Sprzedaż', 'Zamiana']
            },
            {
                name: 'pozostałe'
            },
        ]
    },
    {
        name: 'praca',
        picture: job,
        subcategories: [
            {
                name: 'administracja biurowa'
            },
            {
                name: 'budowa',
            },
            {
                name: 'dostawca',
            },
            {
                name: 'handel internetowy',
            },
            {
                name: 'edukacja',
            }
        ]
    },
    {
        name: 'antyki i kolekcje',
        picture: antiques,
        subcategories: [
            {
                name: 'antyki'
            },
            {
                name: 'kolekcje',
            },
            {
                name: 'sztuka',
            },
            {
                name: 'rękodzieło',
            }
        ]
    },
    {
        name: 'dom i ogród',
        picture: house,
        subcategories: [
            {
                name: 'budowa'
            },
            {
                name: 'instalacje',
            },
            {
                name: 'meble',
            },
            {
                name: 'ogród',
            },
            {
                name: 'narzędzia'
            },
            {
                name: 'ogrzewanie',
            },
            {
                name: 'oświetlenie',
            },
            {
                name: 'wykończenie wnętrz',
            }
        ]
    },
    {
        name: 'elektronika',
        picture: electronics,
        subcategories: [
            {
                name: 'fotografia'
            },
            {
                name: 'gry i konsole',
            },
            {
                name: 'komputery',
            },
            {
                name: 'smartwatche i opaski',
            },
            {
                name: 'sprzęt AGD'
            },
            {
                name: 'sprzęt audio',
            },
            {
                name: 'telefony',
            },
            {
                name: 'telewizory',
            }
        ]
    },
    {
        name: 'moda',
        picture: fashion,
        subcategories: [
            {
                name: 'ubrania damskie'
            },
            {
                name: 'ubrania męskie',
            },
            {
                name: 'ubrania dziecięce',
            },
            {
                name: 'akcesoria',
            },
            {
                name: 'biżuteria'
            },
            {
                name: 'buty',
            }
        ]
    },
    {
        name: 'rolnictwo',
        picture: agriculture,
        subcategories: [
            {
                name: 'ciągniki'
            },
            {
                name: 'maszyny rolnicze',
            },
            {
                name: 'przyczepy',
            },
            {
                name: 'opony',
            },
            {
                name: 'zwierzęta',
            }
        ]
    },
    {
        name: 'zwierzęta',
        picture: animals,
        subcategories: [
            {
                name: 'karma i przysmaki'
            },
            {
                name: 'psy',
            },
            {
                name: 'koty',
            },
            {
                name: 'ptaki',
            },
            {
                name: 'gryzonie i króliki',
            }
        ]
    },
    {
        name: 'dla dzieci',
        picture: children,
        subcategories: [
            {
                name: 'akcesoria dla niemowląt'
            },
            {
                name: 'buciki',
            },
            {
                name: 'foteliki i nosidełka',
            },
            {
                name: 'meble dla dzieci',
            },
            {
                name: 'odzież niemowlęca',
            },
            {
                name: 'wózki dziecięce',
            },
            {
                name: 'zabawki',
            },
            {
                name: 'pozostałe',
            }
        ]
    },
    {
        name: 'sport i hobby',
        picture: sport,
        subcategories: [
            {
                name: 'gry planszowe'
            },
            {
                name: 'fitness',
            },
            {
                name: 'rowery',
            },
            {
                name: 'skating',
            },
            {
                name: 'sporty wodne',
            },
            {
                name: 'sporty zimowe',
            },
            {
                name: 'wędkarstwo',
            }
        ]
    },
    {
        name: 'edukacja',
        picture: education,
        subcategories: [
            {
                name: 'książki'
            },
            {
                name: 'muzyka',
            },
            {
                name: 'filmy',
            }
        ]
    },
    {
        name: 'usługi',
        picture: services,
        subcategories: [
            {
                name: 'usługi'
            },
            {
                name: 'wyposażenie firm',
                subsubcategories: ['Budowa i remont', 'Obsługa imprez', 'Sprzątanie', 'Tłumaczenia', 'Usługi informatyczne', 'Usługi motoryzacyjne', 'Korepetycje', 'Serwis i naprawa']
            }
        ]
    }
]


export default categories