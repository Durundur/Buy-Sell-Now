const categoriesFields = [
    {
        subCategoryName: ['samochody osobowe', 'dostawcze', 'ciężarowe'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }, {
            label: "model",
            name: "model",
            type: "text",
            placeholder: ""
        }, {
            label: "numer VIN",
            name: "vinNumber",
            type: "text",
            placeholder: ""
        }, {
            label: "rok produkcji",
            name: "productionYear",
            type: "text",
            placeholder: ""
        }, {
            label: "moc silnika",
            name: "enginePower",
            type: "text",
            placeholder: "KM"
        }, {
            label: "poj. silnika",
            name: "engineSize",
            type: "text",
            placeholder: "cm3"
        }, {
            label: "paliwo",
            name: "fuel",
            type: "select",
            values: ['diesel', 'benzyna', 'lpg', 'elektryczny', 'hybryda'],
            placeholder: "wybierz"
        }, {
            label: "przebieg",
            name: "mileage",
            type: "text",
            placeholder: "km"
        }, {
            label: "stan techniczny",
            name: "condition",
            type: "select",
            values: ['nieuszkodzony', 'uszkodzony'],
            placeholder: "wybierz"
        }, {
            label: 'skrzynia biegów',
            name: "transmission",
            type: "select",
            placeholder: "wybierz",
            values: ['automatyczna', 'manualna']
        }, {
            label: 'napęd',
            name: "driveType",
            type: "select",
            placeholder: "wybierz",
            values: ['4x4', 'przód', 'tył']
        }]
    },
    {
        subCategoryName: 'motocykle i skutery',
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }, {
            label: "marka",
            name: "brand",
            type: "text",
            placeholder: ""
        }, {
            label: "poj. silnika",
            name: "engineSize",
            type: "text",
            placeholder: "cm3"
        }, {
            label: "stan techniczny",
            name: "condition",
            type: "select",
            values: ['nieuszkodzony', 'uszkodzony'],
            placeholder: "wybierz"
        }, {
            label: "rok produkcji",
            name: "productionYear",
            type: "text",
            placeholder: ""
        }, {
            name: "enginePower",
            type: "text",
            placeholder: "KM"
        }]
    }, {
        subCategoryName: ['budowlane', 'przyczepy i naczepy'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }, {
            label: "rok produkcji",
            name: "productionYear",
            type: "text",
            placeholder: ""
        }, {
            label: "przebieg",
            name: "mileage",
            type: "text",
            placeholder: "km"
        }, {
            label: "stan techniczny",
            name: "condition",
            type: "select",
            values: ['nieuszkodzony', 'uszkodzony'],
            placeholder: "wybierz"
        }]
    }, {
        subCategoryName: ['części', 'opony i felgi', 'pozostałe w motoryzacja'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }, {
            label: "stan techniczny",
            name: "condition",
            type: "select",
            values: ['używany', 'nowy'],
            placeholder: "wybierz"
        }]
    }, {
        subCategoryName: ['mieszkania'],
        fields: [
            {
                label: 'poziom',
                name: 'level',
                type: "select",
                values: ['parter', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'powyżej 10', 'poddasze'],
                placeholder: "wybierz"
            },
            {
                label: 'rodzaj zabudowy',
                name: 'buildingType',
                placeholder: "wybierz",
                type: "select",
                values: ['blok', 'kamienica', 'apartamentowiec', 'pozostałe'],
            }, {
                label: 'powierzchnia',
                name: 'livingArea',
                placeholder: 'm3',
                type: 'text',
            }, {
                label: 'liczba pokoi',
                name: 'numberOfRooms',
                placeholder: 'wybierz',
                type: 'select',
                values: ['1', '2', '3', '4 i więcej']
            }, {
                label: 'czynsz',
                name: 'rent',
                placeholder: 'zł',
                type: 'text',
            }
        ]
    }, {
        subCategoryName: ['domy'],
        fields: [
            {
                label: 'powierzchnia',
                name: 'livingArea',
                placeholder: 'm2',
                type: 'text',
            }, {
                label: 'powierzchnia działki',
                name: 'plotArea',
                placeholder: 'm2',
                type: 'text',
            },
            {
                label: 'rodzaj zabudowy',
                name: 'buildingType',
                placeholder: "wybierz",
                type: "select",
                values: ['wolnostojący', 'bliźniak', 'szeregowiec', 'gospodarstwo', 'pozostałe'],
            }, {
                label: 'liczba pokoi',
                name: 'numberOfRooms',
                placeholder: 'wybierz',
                type: 'select',
                values: ['1', '2', '3', '4 i więcej']
            }
        ]
    }, {
        subCategoryName: ['działki'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }, {
            label: 'powierzchnia działki',
            name: 'plotArea',
            placeholder: 'm2',
            type: 'text',
        },
        ]
    }, {
        subCategoryName: ['biura i lokale', 'garaże i parkingi', 'hale i magazyny','stancje i pokoje', 'pozostałe nieruchomości'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }, {
            label: 'powierzchnia',
            name: 'livingArea',
            placeholder: 'm2',
            type: 'text',
        },
        ]
    },{
        subCategoryName: ['administracja biurowa','budowa, remonty','dostawca, kurier miejski','handel internetowy','finanse, księgowość','fryzjerstwo, kosmetyka','gastronomia','HR','IT','kierowca','logistyka, spedycja','mechanika','praca za granicą','pracownik sklepu','produkcja','pozostałe w praca'],
        fields: [{
            label: 'wynagrodzenie',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł/mies'
        }
        ]
    },{
        subCategoryName: ['antyki','kolekcje','sztuka','rękodzieło'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['budowa','instalacje','meble','ogród','narzędzia','ogrzewanie','oświetlenie','wykończenie wnętrz','pozostałe w dom i ogród',],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['fotografia','gry i konsole','komputery','komputery', 'smartwatche i opaski', 'sprzęt AGD','sprzęt audio','telefony', 'telewizory','pozostałe w elektronika'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['ubrania damskie', 'ubrania damskie','ubrania męskie','ubrania dziecięce','akcesoria','biżuteria','buty','pozostałe w moda'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['ciągniki', 'ciągniki','maszyny rolnicze','przyczepy','opony','zwierzęta','pozostałe w rolnictwo'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['karma i przysmaki', 'psy', 'koty', 'ptaki','gryzonie i króliki','pozostałe w zwierzęta'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['akcesoria dla niemowląt', 'buciki', 'foteliki i nosidełka', 'meble dla dzieci', 'odzież niemowlęca', 'wózki dziecięce', 'zabawki', 'pozostałe w dla dzieci'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['fitness', 'rowery', 'skating', 'sporty wodne', 'sporty zimowe', 'wędkarstwo', 'pozostałe w sport i hobby'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['książki', 'muzyka', 'filmy', 'pozostałe w edukacja'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    },{
        subCategoryName: ['usługi', 'wyposażenie firm', 'pozostałe w usługi'],
        fields: [{
            label: 'cena',
            name: 'price.value',
            type: 'text',
            placeholder: 'zł'
        }
        ]
    }

]

export default categoriesFields