import { createRef, useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import ContainerBox from './../ContainerBox';
import { Flex, Text, Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react';
const str = `Jesteśmy największym producentem prefabrykatów oraz betonu towarowego zarówno w Olsztynie jak i w województwie warmińsko-mazurskim. Naszym celem jest dążenie do najwyższej jakości produkcji oraz realizowanie dostaw zgodnie z życzeniami Klientów. W realizacji misji posługujemy się jednymi z najszybszych wytwórni w województwie. Produkcja PREFABRYKATÓW odbywa się pod stałą kontrolą laboratorium oraz Zakładowej Kontroli Produkcji.Produkowane przez nas wyroby posiadają wszelkie niezbędne certyfikaty, aktualne badania jakościowe co jest potwierdzone stosownymi dokumentami. Prefabrykaty produkujemy w technologii maszynowej przy wykorzystaniu WIBROPRASY.Maszyna posiada 4 bardzo mocne wibratory w stalowej formie co powoduje, że nasze produkty są najmocniejsze na rynku. Utrzymujemy stały stan magazynowy na poziomie około 1000 szt., a więc wszystkie prefabrykaty dostępne są "od ręki" co powoduje, że bardzo szybko realizujemy wszystkie zamówienia.. Najlepszym wyrazem uznania jest dla nas zadowolenie naszych Klientów.`
export default function UserInfo(props) {
    const [setActiveTab] = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])


    return (
        <ContainerBox >
            <Flex direction={'column'} gap={4} shadow={'md'} padding={'20px'} bg={'#fff'} borderRadius={'20px'} >
                <Text fontWeight={500} fontSize={'lg'}>O nas</Text>
                <Text>{str}</Text>
                <Flex alignItems={'flex-start'} gap={4} direction={'column'} >
                    <Text fontWeight={500} fontSize={'lg'}>Strona internetowa</Text>
                    <Link display={'block'}>https://www.bestkomin.pl/</Link>
                </Flex>
            </Flex>
        </ContainerBox>
    )
}