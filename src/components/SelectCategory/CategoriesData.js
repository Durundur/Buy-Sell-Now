import antiques from './images/antyki-i-kolekcje-4042-1x.png'
import children from './images/dla-dzieci-88-1x.png'
import house from './images/dom-ogrod-628-1x.png'
import electronics from './images/elektronika-99-1x.png'
import fashion from './images/moda-87-1x.png'
import automotive from './images/motoryzacja-5-1x.png'
import education from './images/muzyka-edukacja-751-1x.png'
import realEstate from './images/nieruchomosci-3-1x.png'
import job from './images/praca-4-1x.png'
import agriculture from './images/rolnictwo-757-1x.png'
import sport from './images/sport-hobby-767-1x.png'
import services from './images/uslugi-firmy-619-1x.png'
import animals from './images/zwierzeta-103-1x.png'


const categories = [
    {
        name: 'motoryzacja',
        picture: automotive,
        subcategories: [
            {
                name: 'samochody osobowe',
                subsubcategories: ['aixam', 'alfa romeo', 'audi', 'BMW', 'cadillac', 'chevrolet', 'chrysler', 'citroen', 'dacia', 'daewoo', 'daihatsu', 'dodge', 'fiat', 'ford', 'honda', 'hyundai', 'infiniti', 'jaguar', 'jeep', 'kia', 'lancia', 'land rover', 'lexus', 'mazda', 'mercedes-benz', 'mini', 'mitsubishi', 'nissan', 'opel', 'peugeot', 'polonez', 'porsche', 'renault', 'rover', 'saab', 'seat', 'skoda', 'smart', 'ssangYong', 'subaru', 'suzuki', 'toyota', 'volkswagen', 'volvo', 'pozostałe samochody osobowe']
            },
            {
                name: 'motocykle i skutery',
                subsubcategories: ['chopper', 'enduro-funbike', 'cross', 'motorower', 'quad', 'skuter', 'sportowy', 'szosowo-Turystyczny', 'pozostałe motocykle i skutery']
            },
            {
                name: 'dostawcze',
                subsubcategories: ['autolaweta', 'chłodnia i izoterma', 'furgon', 'kamper', 'kontener', 'plandeka', 'skrzynia', 'wywrotka', 'pozostałe dostawcze']
            },
            {
                name: 'ciężarowe',
                subsubcategories: ['autobus', 'autolaweta', 'chłodnia i izoterma', 'ciągnik siodłowy', 'dźwigi', 'plandeka', 'do zabudowy', 'wywrotka', 'pozostałe ciężarowe']
            },
            {
                name: 'budowlane',
                subsubcategories: ['dźwigi', 'koparki', 'koparko-ładowarki', 'ładowarki', 'maszyny drogowe', 'wózki widłowe', 'pozostałe budowlane']
            },
            {
                name: 'przyczepy i naczepy',
                subsubcategories: ['burtowe i plandeki', 'chłodnie i izotermy', 'wywrotki', 'burtowe i plandeki', 'kempingowe', 'pozostałe przyczepy i naczepy']
            },
            {
                name: 'części',
                subsubcategories: ['osobowe', 'samochody na częsci', 'dostawcze i ciężarowe', 'motocyklowe','pozostałe części']

            },
            {
                name: 'opony i felgi',
                subsubcategories: ['opony', 'felgi', 'koła', 'pozostałe opony i felgi']
            },
            {
                name: 'pozostałe w motoryzacja'
            },
        ]
    },
    {
        name: 'nieruchomości',
        picture: realEstate,
        subcategories: [
            {
                name: 'mieszkania',
            },
            {
                name: 'domy',
            },
            {
                name: 'działki',
            },
            {
                name: 'biura i lokale',
            },
            {
                name: 'garaże i parkingi',
            },
            {
                name: 'stancje i pokoje',
            },
            {
                name: 'hale i magazyny',
            },
            {
                name: 'pozostałe nieruchomości'
            },
        ]
    },
    {
        name: 'praca',
        picture: job,
        subcategories: [
            {
                name: 'administracja biurowa',
                subsubcategories: ['administracja, prace biurowe', 'sekretariat, recepcja']
            },
            {
                name: 'budowa, remonty',
            },
            {
                name: 'dostawca, kurier miejski',
            },
            {
                name: 'handel internetowy',
            },
            {
                name: 'finanse, księgowość',
                subsubcategories: ['księgowość', 'finanse, bankowość', 'pozostałe finanse i księgowość']
            },
            {
                name: 'fryzjerstwo, kosmetyka',
                subsubcategories: ['fryzjer', 'kosmetolog']
            },
            {
                name: 'gastronomia',
                subsubcategories: ['cukiernik, piekarz', 'kelner, barman', 'kucharz', 'pomoc kuchenna', 'manager']
            },
            {
                name: 'HR',
                subsubcategories: ['kadry i płace', 'rekrutacja']
            },
            {
                name: 'IT',
                subsubcategories: ['programista', 'tester', 'analityk', 'wsparcie techniczne', 'administrator systemów', 'administrator baz danych', 'administrator sieci']
            },
            {
                name: 'kierowca',
            },
            {
                name: 'logistyka, spedycja',
                subsubcategories: ['logistyka',  'spedycja']
            },
            {
                name: 'mechanika',
            },
            {
                name: 'praca za granicą',
            },
            {
                name: 'pracownik sklepu',
                subsubcategories: ['kasjer, pracownik sklepu', 'zarządzanie sklepem']
            },
            {
                name: 'produkcja',
                subsubcategories: ['zarządzanie produkcją', 'praca inżynieryjna, techniczna', 'utrzymanie ruchu']
            },
            {
                name: 'pozostałe w praca'
            }
        ]
    },
    {
        name: 'antyki i kolekcje',
        picture: antiques,
        subcategories: [
            {
                name: 'antyki',
                subsubcategories: ['stare meble', 'stare zegary', 'zabytki techniki', 'stare instrumenty', 'stara biżuteria', 'pozostałe antyki']

            },
            {
                name: 'kolekcje',
            },
            {
                name: 'sztuka',
                subsubcategories: ['fotografia','grafika','malarstwo','plakat','rysunek','rzeźba']

            },
            {
                name: 'rękodzieło',
                subsubcategories: ['biżuteria - półprodukty','produkty rękodzielnicze','szycie i filcowanie']

            }
        ]
    },
    {
        name: 'dom i ogród',
        picture: house,
        subcategories: [
            {
                name: 'budowa',
                subsubcategories: ['bramy i ogrodzenia','cegły, bloczki, pustaki','cementy i zaprawy','dachy','deski tarasowe','drewno','drzwi','garaże i hale mobilne', 'elewacje', 'okna', 'pozostałe w budowa']

            },
            {
                name: 'instalacje',
                subsubcategories: ['elektryka','fotowoltaika','hydraulika','klimatyzacja i wentylacja','pozostałe instalacje']

            },
            {
                name: 'meble',
                subsubcategories: ['biukra','kanapy','łóżka', 'stoły', 'szwki', 'szafy', 'komody', 'pozostałe meble']

            },
            {
                name: 'ogród',
                subsubcategories: ['baseny','kosiarki','meble ogrodowe', 'rośliny', 'place zabaw', 'pozostałe w ogród']

            },
            {
                name: 'narzędzia',
                subsubcategories: ['agregaty','elektronarzędzia','maszyny warsztatowe', 'spawarki', 'zestawy narzędzi', 'pozostałe narzędzia']

            },
            {
                name: 'ogrzewanie',
                subsubcategories: ['grzejniki','kotły, piece','pompy ciepła', 'kominki', 'pozostałe ogrzewanie']

            },
            {
                name: 'oświetlenie',

            },
            {
                name: 'wykończenie wnętrz',
                subsubcategories: ['kuchnia','łazienka','malowanie','płytki','podłogi','tapety i panele ścienne','pozostałe wykończenie wnętrz']

            },
            {
                name: 'pozostałe w dom i ogród',
            }
        ]
    },
    {
        name: 'elektronika',
        picture: electronics,
        subcategories: [
            {
                name: 'fotografia',
                subsubcategories: ['aparaty','obiektywy','akcesoria','pozostała elektronika']

            },
            {
                name: 'gry i konsole',
                subsubcategories: ['gry','konsole','akcesoria','pozostałe gry i konsole']

            },
            {
                name: 'komputery',
                subsubcategories: ['komputery stacjonarne','laptopy','monitory','oprogramowanie','akcesoria','pozostałe komputery']

            },
            {
                name: 'smartwatche i opaski',
                subsubcategories: ['smartwatche','opaski','pozostałe smartwatche i opaski']

            },
            {
                name: 'sprzęt AGD'
            },
            {
                name: 'sprzęt audio',
            },
            {
                name: 'telefony',
                subsubcategories: ['smartfony','akcesoria','pozostałe telefony']

            },
            {
                name: 'telewizory',
            },
            {
                name: 'pozostałe w elektronika',
            }
        ]
    },
    {
        name: 'moda',
        picture: fashion,
        subcategories: [
            {
                name: 'ubrania damskie',
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
                name: 'biżuteria',
            },
            {
                name: 'buty',
            },
            {
                name: 'pozostałe w moda',
            }
        ]
    },
    {
        name: 'rolnictwo',
        picture: agriculture,
        subcategories: [
            {
                name: 'ciągniki',
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
            },
            {
                name: 'pozostałe w rolnictwo',
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
            },
            {
                name: 'pozostałe w zwierzęta',
            }
        ]
    },
    {
        name: 'dla dzieci',
        picture: children,
        subcategories: [
            {
                name: 'akcesoria dla niemowląt',
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
                name: 'pozostałe w dla dzieci',
            }
        ]
    },
    {
        name: 'sport i hobby',
        picture: sport,
        subcategories: [
            {
                name: 'gry planszowe',
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
            },
            {
                name: 'pozostałe w sport i hobby',
            }
        ]
    },
    {
        name: 'edukacja',
        picture: education,
        subcategories: [
            {
                name: 'książki',
            },
            {
                name: 'muzyka',
            },
            {
                name: 'filmy',
            },
            {
                name: 'pozostałe w edukacja',
            }
        ]
    },
    {
        name: 'usługi',
        picture: services,
        subcategories: [
            {
                name: 'usługi',
                subsubcategories: ['budowa i remont', 'obsługa imprez', 'sprzątanie', 'tłumaczenia', 'usługi informatyczne', 'usługi motoryzacyjne', 'korepetycje', 'serwis i naprawa']

            },
            {
                name: 'wyposażenie firm',
            },
            {
                name: 'pozostałe w usługi',
            }
        ]
    }
]


export default categories