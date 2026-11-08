import { Trail } from '@/types/trail';

export const TRAILS_DATA: Trail[] = [
    // =========================================================================
    // 1. CAPITAL & GRANDE SÃO PAULO
    // =========================================================================
    {
        id: 'cantareira-pedra-grande',
        slug: 'trilha-da-pedra-grande-cantareira',
        name: 'Trilha da Pedra Grande (Cantareira)',
        parkName: 'Parque Estadual Cantareira (Núcleo Pedra Grande)',
        region: 'capital',
        city: 'São Paulo (Zona Norte)',
        distanceKm: 9.6,
        elevationGainM: 420,
        maxAltitudeM: 1010,
        difficulty: 'moderate',
        activityType: 'hiking',
        durationHours: 3.5,
        rating: 4.9,
        reviewCount: 1420,
        coverImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Parque_Estadual_da_Cantareira_-_Núcleo_da_Pedra_Grande.JPG?width=1200',
        galleryImages: [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Parque_Estadual_da_Cantareira_-_Núcleo_da_Pedra_Grande.JPG?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Parque_Estadual_da_Cantareira_-_Núcleo_Pedra_Grande_-_Eleessepe_(02).jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Parque_Estadual_da_Cantareira.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Portaria_do_Parque_Estadual_Serra_da_Cantareira,_Núcleo_Pedra_Grande.jpg?width=1200'
        ],
        shortDescription: 'Caminhada clássica por estrada de asfalto rústico sob densa copa florestal até o icônico lajedo de granito com vista para a metrópole.',
        fullDescription: 'Uma das rotas mais populares e gravadas da comunidade Wikiloc em São Paulo. O Núcleo Pedra Grande abriga uma das maiores florestas urbanas nativas do planeta. O trajeto até a Pedra Grande é constante em aclive, porém bem pavimentado, sendo excelente para famílias ativas e corredores de montanha. O mirante na laje de pedra revela uma visão inesquecível do skyline de arranha-céus paulistano contrastando com o verde.',
        highlights: ['Mirante da Pedra Grande', 'Museu da Pedra Grande', 'Lago das Carpas (desvio opcional)', 'Avistamento de bugios e esquilos'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: false,
        hasCellphoneSignal: 'good',
        entryFee: 'R$ 19 a R$ 38 (meia/inteira)',
        openingHours: 'Quarta a Domingo das 08h às 17h (Entrada até 15h)',
        trailheadCoordinates: {
            lat: -23.4375,
            lng: -46.6341,
            address: 'Rua do Horto, 1799 - Horto Florestal, São Paulo - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 780, label: 'Portaria Pedra Grande' },
            { distanceKm: 2.2, elevationM: 880, label: 'Bifurcação Lago das Carpas' },
            { distanceKm: 3.5, elevationM: 950, label: 'Subida da Figueira' },
            { distanceKm: 4.8, elevationM: 1010, label: 'Mirante Pedra Grande' },
            { distanceKm: 9.6, elevationM: 780, label: 'Retorno à Portaria' }
        ],
        essentialGear: ['Tênis de caminhada confortável', 'Garrafa de 1L (bebedouros no início e no cume)', 'Boné ou chapéu'],
        safetyAlerts: [
            'Proibido entrar fora dos horários oficiais do parque.',
            'Atenção ao tráfego ocasional de veículos de fiscalização do parque.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=pedra+grande+cantareira'
    },
    {
        id: 'jaragua-pai-ze',
        slug: 'trilha-do-pai-ze-jaragua',
        name: 'Trilha do Pai Zé (Pico do Jaraguá)',
        parkName: 'Parque Estadual do Jaraguá',
        region: 'capital',
        city: 'São Paulo (Zona Noroeste)',
        distanceKm: 3.6,
        elevationGainM: 360,
        maxAltitudeM: 1135,
        difficulty: 'hard',
        activityType: 'hiking',
        durationHours: 2.5,
        rating: 4.8,
        reviewCount: 980,
        coverImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pico_do_Jaragua.jpg?width=1200',
        galleryImages: [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pico_do_Jaragua.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pico_do_Jaraguá,_São_Paulo_10.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pico_do_Jaraguá_-_Parque_estadual_do_Jaraguá.JPG?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pico_do_Jaraguá_-_Torre_(3868478335).jpg?width=1200'
        ],
        shortDescription: 'Subida desafiadora até o ponto culminante do município de São Paulo, cortando mata nativa fechada e degraus de pedra.',
        fullDescription: 'A rota mais icônica do Pico do Jaraguá no Wikiloc. A Trilha do Pai Zé é a clássica subida pedestre que cruza a mata protegida da Zona Noroeste paulistana. Com aclive acentuado, raízes expostas e escadarias naturais de pedra, culmina nas famosas antenas a 1.135 metros de altitude.',
        highlights: ['Ponto mais alto da cidade de SP (1.135m)', 'Macacos-prego e tucanos na mata', 'Vista panorâmica do Rodoanel e Capital', 'Patrimônio Histórico e da UNESCO'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: false,
        hasCellphoneSignal: 'good',
        entryFee: 'Gratuito',
        openingHours: 'Terça a Domingo das 07h às 16h',
        trailheadCoordinates: {
            lat: -23.4566,
            lng: -46.7661,
            address: 'Rua Antônio Cardoso Nogueira, 539 - Vila Chica Luiza, São Paulo - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 775, label: 'Início / Sede do Parque' },
            { distanceKm: 0.8, elevationM: 860, label: 'Bica do Pai Zé' },
            { distanceKm: 1.8, elevationM: 1020, label: 'Trecho das Pedras' },
            { distanceKm: 2.8, elevationM: 1100, label: 'Acesso às Escadarias' },
            { distanceKm: 3.6, elevationM: 1135, label: 'Cume do Jaraguá' }
        ],
        essentialGear: ['Bota ou tênis com solado aderente', 'Mínimo de 1.5L de água', 'Protetor solar e repelente', 'Casaco corta-vento para o cume'],
        safetyAlerts: [
            'Trechos escorregadios em dias úmidos.',
            'Queda brusca de temperatura e vento frio nas antenas ao entardecer.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=trilha+pai+ze+jaragua'
    },
    {
        id: 'paranapiacaba-poco-formoso',
        slug: 'trilha-poco-formoso-paranapiacaba',
        name: 'Trilha do Poço Formoso (Paranapiacaba)',
        parkName: 'Parque Natural Municipal Nascentes de Paranapiacaba',
        region: 'capital',
        city: 'Santo André / Paranapiacaba',
        distanceKm: 8.2,
        elevationGainM: 320,
        maxAltitudeM: 790,
        difficulty: 'hard',
        activityType: 'trekking',
        durationHours: 4.5,
        rating: 4.9,
        reviewCount: 780,
        coverImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paranapiacaba_SP.jpg?width=1200',
        galleryImages: [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Paranapiacaba_SP.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Vista_aérea_de_Paranapiacaba_2.jpg?width=1200',
            'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Trekking lendário pela selva nebular da Serra do Mar até uma das piscinas naturais mais límpidas e imponentes de São Paulo.',
        fullDescription: 'Um dos roteiros de ecoturismo e aquatrekking mais famosos do Wikiloc no Brasil. Partindo da pitoresca vila histórica inglesa de Paranapiacaba, a trilha desce a escarpa da serra em meio a bromélias gigantescas e samambaias-açu até o Poço Formoso, uma espetacular piscina natural de águas esmeraldas encravada entre paredões verdes da Mata Atlântica.',
        highlights: ['Poço Formoso com piscina natural profunda', 'Atmosfera histórica da Vila de Paranapiacaba', 'Trilha em mata nebular virgem', 'Caminhada sobre antigos leitos de rios'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: true,
        hasWaterPoint: true,
        hasWaterfall: true,
        hasSummit: false,
        isPetFriendly: false,
        hasCellphoneSignal: 'none',
        entryFee: 'Taxa com monitor ambiental credenciado',
        openingHours: 'Sexta a Domingo das 08h às 16h (Agendamento prévio)',
        trailheadCoordinates: {
            lat: -23.7788,
            lng: -46.3021,
            address: 'Centro de Visitantes do Parque Nascentes - Paranapiacaba, Santo André - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 780, label: 'Vila de Paranapiacaba' },
            { distanceKm: 2.2, elevationM: 690, label: 'Descida da Encosta' },
            { distanceKm: 4.1, elevationM: 520, label: 'Poço Formoso & Cachoeira' },
            { distanceKm: 8.2, elevationM: 780, label: 'Retorno à Vila' }
        ],
        essentialGear: ['Bota que possa molhar ou bota de trekking com solado de alta aderência', 'Mochila com saco estanque para celulares', 'Roupas de secagem rápida', 'Repelente contra mosquitos de mata'],
        safetyAlerts: [
            'Proibido fazer a trilha sem guia credenciado pela Prefeitura de Santo André.',
            'Atenção ao risco de tromba d\'água repentina em dias de chuva no topo da serra.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=poco+formoso+paranapiacaba'
    },
    {
        id: 'caminho-do-sal-mogi-andre',
        slug: 'caminho-do-sal-sao-paulo',
        name: 'Caminho do Sal (Rota Histórica dos Tropeiros)',
        parkName: 'Circuito Histórico Caminho do Sal (Serra do Mar)',
        region: 'capital',
        city: 'Santo André / São Bernardo / Mogi das Cruzes',
        distanceKm: 26.5,
        elevationGainM: 580,
        maxAltitudeM: 840,
        difficulty: 'extreme',
        activityType: 'mtb',
        durationHours: 6.5,
        rating: 4.8,
        reviewCount: 650,
        coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Megatravessia histórica do século XVII muito procurada no Wikiloc para ciclismo de montanha e ultramaratona de montanha.',
        fullDescription: 'Aberta em 1640 para o transporte de sal contra o monopólio da Coroa Portuguesa, o Caminho do Sal é hoje um dos maiores clássicos do estado de São Paulo no Wikiloc. O percurso conecta São Bernardo, Santo André e Mogi das Cruzes, dividindo-se nos trechos Caminho do Zanzalá, Caminho dos Carvoeiros e Caminho de Bento Ponte. Atravessa florestas ciliares e mananciais preservados da represa Billings.',
        highlights: ['Mais de 26 km de história viva paulista', 'Passagem por represas e riachos', 'Popular entre ciclistas de MTB e ultramaratonistas', 'Monumento aos Tropeiros'],
        trailType: 'travessia',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: false,
        hasSummit: false,
        isPetFriendly: true,
        hasCellphoneSignal: 'weak',
        entryFee: 'Gratuito',
        openingHours: 'Acesso livre permanente (Recomendado luz diurna)',
        trailheadCoordinates: {
            lat: -23.7541,
            lng: -46.4219,
            address: 'Estrada da Taquacetuba s/n - Bairro do Curucutu, Santo André - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 760, label: 'Início São Bernardo / Zanzalá' },
            { distanceKm: 8.5, elevationM: 820, label: 'Mirante dos Carvoeiros' },
            { distanceKm: 17.2, elevationM: 780, label: 'Bento Ponte' },
            { distanceKm: 26.5, elevationM: 710, label: 'Chegada em Mogi / Taiaçupeba' }
        ],
        essentialGear: ['Bicicleta revisada (se for de bike) com câmara reserva', 'Mochila de hidratação de 3L', 'Barras de cereal e carboidrato para longa duração', 'Kit de reparos rápidos'],
        safetyAlerts: [
            'Extensão física longa. Não inicie após as 10h da manhã se for a pé.',
            'Trechos com tráfego compartilhado em estradas rurais de terra.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=caminho+do+sal'
    },
    {
        id: 'cantareira-engordador',
        slug: 'trilha-da-cachoeira-engordador',
        name: 'Trilha do Macuco & Cachoeiras (Engordador)',
        parkName: 'Parque Estadual Cantareira (Núcleo Engordador)',
        region: 'capital',
        city: 'São Paulo / Mairiporã',
        distanceKm: 3.0,
        elevationGainM: 140,
        maxAltitudeM: 860,
        difficulty: 'easy',
        activityType: 'hiking',
        durationHours: 1.5,
        rating: 4.7,
        reviewCount: 420,
        coverImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Passeio sombreado pelas cachoeiras do Véu da Noiva e Tombo D\'Água, com antiga represa de abastecimento do século XIX.',
        fullDescription: 'O Núcleo Engordador é famoso pelo valor histórico da antiga Casa de Bombas que fornecia água potável para a jovem São Paulo imperial. A trilha contorna riachos cristalinos com poços naturais e cascatas cercadas de samambaias-açu gigantescas. Perfeita para iniciantes e famílias com crianças.',
        highlights: ['Cachoeira do Véu da Noiva', 'Casa de Bombas Histórica de 1894', 'Trilha sombreada e fresca', 'Tanque de captação histórico'],
        trailType: 'circular',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: true,
        hasSummit: false,
        isPetFriendly: false,
        hasCellphoneSignal: 'weak',
        entryFee: 'R$ 19 a R$ 38 (meia/inteira)',
        openingHours: 'Quarta a Domingo das 08h às 17h',
        trailheadCoordinates: {
            lat: -23.4072,
            lng: -46.5925,
            address: 'Av. Cel. Sezefredo Fagundes, 19100 - Jardim Cachoeira, São Paulo - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 790, label: 'Centro de Visitantes' },
            { distanceKm: 0.8, elevationM: 810, label: 'Cachoeira do Tombo' },
            { distanceKm: 1.5, elevationM: 840, label: 'Cachoeira Véu da Noiva' },
            { distanceKm: 2.2, elevationM: 850, label: 'Mirante do Macuco' },
            { distanceKm: 3.0, elevationM: 790, label: 'Casa de Bombas' }
        ],
        essentialGear: ['Repelente reforçado', 'Toalha de secagem rápida', 'Sandália de trilha ou tênis aderente'],
        safetyAlerts: [
            'Pedras lisas e úmidas perto da queda d\'água.',
            'O banho nas cachoeiras pode ser restrito conforme normas de preservação do parque.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=nucleo+engordador+cantareira'
    },
    {
        id: 'fontes-ipiranga-botanico',
        slug: 'trilha-da-nascente-jardim-botanico',
        name: 'Trilha da Nascente do Ipiranga (Jardim Botânico)',
        parkName: 'Parque Estadual das Fontes do Ipiranga',
        region: 'capital',
        city: 'São Paulo (Zona Sul)',
        distanceKm: 1.2,
        elevationGainM: 35,
        maxAltitudeM: 795,
        difficulty: 'easy',
        activityType: 'hiking',
        durationHours: 0.8,
        rating: 4.6,
        reviewCount: 290,
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Passarela de madeira suspensa e 100% acessível no coração da mata de brejo até a histórica nascente do Riacho do Ipiranga.',
        fullDescription: 'Construída totalmente em deck de madeira suspensa de 360 metros de extensão, a Trilha da Nascente permite adentrar um ecossistema brejoso intocado sem pisar no solo frágil. Excelente para caminhadas leves, observação de aves, orquídeas e bromélias raras na Zona Sul da capital.',
        highlights: ['Passarela 100% acessível (PMR / Cadeirantes)', 'Nascente histórica do Riacho do Ipiranga', 'Orquidário e Estufas Botânicas', 'Bambuzal centenário'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: false,
        hasSummit: false,
        isPetFriendly: false,
        hasCellphoneSignal: 'good',
        entryFee: 'R$ 15 a R$ 30 (parque botânico)',
        openingHours: 'Terça a Domingo das 09h às 17h',
        trailheadCoordinates: {
            lat: -23.6391,
            lng: -46.6212,
            address: 'Av. Miguel Estefno, 3031 - Vila Água Funda, São Paulo - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 770, label: 'Alameda Principal' },
            { distanceKm: 0.6, elevationM: 785, label: 'Início da Passarela' },
            { distanceKm: 1.2, elevationM: 795, label: 'Poço da Nascente' }
        ],
        essentialGear: ['Roupas leves', 'Câmera fotográfica / binóculos'],
        safetyAlerts: ['Piso de madeira pode apresentar umidade matinal leve.'],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=jardim+botanico+sao+paulo'
    },

    // =========================================================================
    // 2. ENTORNO & INTERIOR PRÓXIMO (SERRAS & MANTIQUEIRA)
    // =========================================================================
    {
        id: 'atibaia-pedra-grande',
        slug: 'pedra-grande-atibaia-monges',
        name: 'Pedra Grande de Atibaia (Trilha dos Monges)',
        parkName: 'Monumento Natural Estadual da Pedra Grande',
        region: 'interior',
        city: 'Atibaia',
        distanceKm: 5.5,
        elevationGainM: 650,
        maxAltitudeM: 1418,
        difficulty: 'hard',
        activityType: 'hiking',
        durationHours: 3.5,
        rating: 4.9,
        reviewCount: 1650,
        coverImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pedra_Grande_-_Atibaia_01.jpg?width=1200',
        galleryImages: [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pedra_Grande_-_Atibaia_01.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Vista_para_a_Pedra_Grande_em_Atibaia.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pedra_Grande_Atibaia_-_noite.jpg?width=1200',
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Aclive desafiador por floresta e lajes colossais de granito até a meca do voo livre e vista panorâmica de 7 cidades.',
        fullDescription: 'A trilha com maior número de check-ins no Wikiloc na região de Atibaia. A Pedra Grande é um colossal afloramento de monzogranito a 1.418 metros de altitude. A Trilha dos Monges sobe a encosta arborizada e abre no lajedo rochoso aberto. No topo, além do vento revigorante e decolagens de parapente, a vista descortina sete municípios paulistas.',
        highlights: ['Monólito rochoso gigante', 'Ponto clássico de decolagem de voo livre', 'Vista para Atibaia, Bom Jesus dos Perdões e Piracaia', 'Pôr do sol cinematográfico'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: false,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: true,
        hasCellphoneSignal: 'weak',
        entryFee: 'Gratuito',
        openingHours: 'Diariamente das 08h às 18h',
        trailheadCoordinates: {
            lat: -23.1678,
            lng: -46.5298,
            address: 'Estrada da Pedra Grande s/n - Bairro do Arco-Íris, Atibaia - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 820, label: 'Base / Ponto dos Monges' },
            { distanceKm: 1.5, elevationM: 1010, label: 'Floresta de Encosta' },
            { distanceKm: 3.2, elevationM: 1220, label: 'Início da Rampa de Pedra' },
            { distanceKm: 4.5, elevationM: 1350, label: 'Platô Intermediário' },
            { distanceKm: 5.5, elevationM: 1418, label: 'Cume da Pedra Grande' }
        ],
        essentialGear: ['Bota com solado de alta tração', 'Mínimo de 2L de água por pessoa', 'Anorak corta-vento', 'Lanterna de cabeça para retorno no pôr do sol'],
        safetyAlerts: [
            'Sem pontos de água potável no cume. Abasteça antes de começar.',
            'Cuidado extremo nas beiradas dos abismos rochosos, especialmente com rajadas fortes de vento.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=pedra+grande+atibaia+monges'
    },
    {
        id: 'sao-bento-pedra-bauzinho',
        slug: 'pedra-do-bauzinho-mantiqueira',
        name: 'Monumento Natural Pedra do Baú (Bauzinho)',
        parkName: 'Complexo da Pedra do Baú',
        region: 'interior',
        city: 'São Bento do Sapucaí / Mantiqueira',
        distanceKm: 2.8,
        elevationGainM: 190,
        maxAltitudeM: 1760,
        difficulty: 'moderate',
        activityType: 'hiking',
        durationHours: 1.5,
        rating: 5.0,
        reviewCount: 2100,
        coverImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pedra_do_Baú.jpg?width=1200',
        galleryImages: [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pedra_do_Baú.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Bauzinho,_Pedra_do_Baú_e_Ana_Chata.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Pedra_do_baú,_SP.jpg?width=1200',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Caminhada nas alturas da Serra da Mantiqueira com vista privilegiada para o lendário paredão vertical da Pedra do Baú.',
        fullDescription: 'Uma das atrações mais espetaculares e fotografadas do Wikiloc em todo o estado. Localizado a quase 1.800 metros de altitude na Serra da Mantiqueira, o Bauzinho é a rota mais segura e acessível para contemplar a imensidão do Complexo da Pedra do Baú. A trilha segue pela crista da montanha por campos de altitude e mata nebular.',
        highlights: ['Visual direto para o Baú e Ana Chata', 'Campos de altitude da Mantiqueira', 'Pôr do sol cinematográfico acima das nuvens', 'Acessível para quem não faz vias ferratas verticais'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: false,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: true,
        hasCellphoneSignal: 'weak',
        entryFee: 'R$ 20 (estacionamento/taxa de preservação)',
        openingHours: 'Diariamente das 08h às 18h',
        trailheadCoordinates: {
            lat: -22.6865,
            lng: -45.6631,
            address: 'Estrada Municipal da Pedra do Baú s/n, São Bento do Sapucaí - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 1610, label: 'Estacionamento Chico Bento' },
            { distanceKm: 0.9, elevationM: 1680, label: 'Primeiro Mirante' },
            { distanceKm: 1.8, elevationM: 1720, label: 'Crista do Bauzinho' },
            { distanceKm: 2.8, elevationM: 1760, label: 'Mirante dos Abismos' }
        ],
        essentialGear: ['Gorro e agasalho térmico (mesmo no verão esfria rápido)', 'Câmera com lente grande-angular', 'Calçado antiderrapante'],
        safetyAlerts: [
            'Penhascos verticais sem guarda-corpos em alguns trechos. Mantenha distância da borda.',
            'Evite em dias de tempestade com raios devido à alta exposição elétrica no cume.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=bauzinho+pedra+do+bau'
    },
    {
        id: 'joanopolis-pico-do-lopo',
        slug: 'pico-do-lopo-joanopolis',
        name: 'Trilha do Pico do Lopo (Serra do Lopo)',
        parkName: 'Monumento Natural da Serra do Lopo',
        region: 'interior',
        city: 'Joanópolis / Extrema',
        distanceKm: 8.4,
        elevationGainM: 410,
        maxAltitudeM: 1720,
        difficulty: 'moderate',
        activityType: 'hiking',
        durationHours: 3.5,
        rating: 4.8,
        reviewCount: 940,
        coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Caminhada panorâmica pela crista da Mantiqueira passando pela Pedra das Flores e mirante da Represa do Jaguari.',
        fullDescription: 'Muito procurada por trilheiros de fim de semana no Wikiloc, a crista do Pico do Lopo divide o estado de SP e MG a mais de 1.700 metros de altitude. A trilha percorre cristas de montanha com vegetação de altitude, passando pela Pedra do Cume e a deslumbrante Pedra das Flores, com visão aérea da represa e dos vales montanhosos.',
        highlights: ['Pedra das Flores com vista para a Represa do Jaguari', 'Divisa natural entre SP e MG', 'Formações rochosas esculpidas pelo vento', 'Rampa de asa-delta'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: false,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: true,
        hasCellphoneSignal: 'weak',
        entryFee: 'Gratuito',
        openingHours: 'Acesso livre recomendado das 07h às 17h',
        trailheadCoordinates: {
            lat: -22.8872,
            lng: -46.3211,
            address: 'Estrada da Serra do Lopo s/n - Joanópolis - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 1380, label: 'Rampa de Voo Livre' },
            { distanceKm: 2.1, elevationM: 1540, label: 'Pedra do Cume' },
            { distanceKm: 4.2, elevationM: 1720, label: 'Pedra das Flores' },
            { distanceKm: 8.4, elevationM: 1380, label: 'Retorno à Rampa' }
        ],
        essentialGear: ['Calça comprida para proteção contra arbustos', '2L de água', 'Casaco corta-vento'],
        safetyAlerts: ['Ventos fortes na crista rochosa exposta. Evite em dias de chuva torrencial.'],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=pico+do+lopo'
    },
    {
        id: 'petar-caverna-santana',
        slug: 'petar-trilha-cavernas-santana',
        name: 'PETAR - Circuito Caverna de Santana & Morro Preto',
        parkName: 'Parque Estadual Turístico do Alto Ribeira (PETAR)',
        region: 'interior',
        city: 'Iporanga / Apiaí',
        distanceKm: 6.8,
        elevationGainM: 280,
        maxAltitudeM: 420,
        difficulty: 'hard',
        activityType: 'trekking',
        durationHours: 4.0,
        rating: 5.0,
        reviewCount: 1120,
        coverImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Entrada_da_Caverna_do_Santana.jpg?width=1200',
        galleryImages: [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Entrada_da_Caverna_do_Santana.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Caverna_de_Santana_-_PETAR.jpg?width=1200',
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'A capital brasileira das cavernas: exploração geológica fascinante por salões subterrâneos de estalactites e floresta primária.',
        fullDescription: 'Considerado um dos circuitos de ecoturismo mais fantásticos do planeta no Wikiloc. O Núcleo Santana do PETAR abriga a Caverna de Santana, famosa pelos salões subterrâneos colossais como o Salão das Flores, além da Caverna do Morro Preto com seu portal de entrada cinematográfico. As trilhas cruzam o Rio Betari por pontes e pedras.',
        highlights: ['Caverna de Santana (uma das maiores do Brasil)', 'Portal monumental da Caverna Morro Preto', 'Banho no Rio Betari', 'Formações cársticas e espeleotemas raros'],
        trailType: 'circular',
        isProtectedArea: true,
        requiresGuide: true,
        hasWaterPoint: true,
        hasWaterfall: true,
        hasSummit: false,
        isPetFriendly: false,
        hasCellphoneSignal: 'none',
        entryFee: 'R$ 19 a R$ 38 (parque) + diária do monitor credenciado',
        openingHours: 'Terça a Domingo das 08h às 17h (Entrada até 12h)',
        trailheadCoordinates: {
            lat: -24.5367,
            lng: -48.6921,
            address: 'Núcleo Santana do PETAR - Bairro da Serra, Iporanga - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 210, label: 'Centro de Visitantes Santana' },
            { distanceKm: 1.5, elevationM: 260, label: 'Caverna Morro Preto' },
            { distanceKm: 3.4, elevationM: 340, label: 'Interior Caverna de Santana' },
            { distanceKm: 5.0, elevationM: 380, label: 'Mirante do Betari' },
            { distanceKm: 6.8, elevationM: 210, label: 'Retorno ao Centro' }
        ],
        essentialGear: ['Capacete com lanterna de cabeça forte (obrigatório)', 'Calçado totalmente fechado e amaciado', 'Calça comprida obrigatória para cavernas', 'Pilhas extras'],
        safetyAlerts: [
            'Obrigatória contratação de monitor ambiental local credenciado pelo PETAR.',
            'Uso estrito de lanterna e capacete de segurança em todo o trajeto subterrâneo.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=petar+caverna+santana'
    },
    {
        id: 'jundiai-serra-do-japi',
        slug: 'reserva-serra-do-japi-trilha-da-bica',
        name: 'Serra do Japi (Trilha da Bica)',
        parkName: 'Reserva Biológica da Serra do Japi',
        region: 'interior',
        city: 'Jundiaí / Cabreúva',
        distanceKm: 4.2,
        elevationGainM: 210,
        maxAltitudeM: 1080,
        difficulty: 'moderate',
        activityType: 'hiking',
        durationHours: 2.5,
        rating: 4.8,
        reviewCount: 380,
        coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Santuário de biodiversidade sobre solo de quartzito declarado Reserva da Biosfera pela UNESCO.',
        fullDescription: 'A Serra do Japi é uma das raras florestas tropicais do interior remanescentes em solo de quartzito. A Trilha da Bica proporciona uma imersão sensorial profunda, passando por quedas límpidas e árvores centenárias. Por ser reserva integral, a visitação é controlada para garantir mínimo impacto ecológico.',
        highlights: ['Patrimônio Natural da UNESCO', 'Rica fauna de borboletas e anfíbios', 'Bica de água mineral pura', 'Acompanhamento com educador ambiental'],
        trailType: 'circular',
        isProtectedArea: true,
        requiresGuide: true,
        hasWaterPoint: true,
        hasWaterfall: true,
        hasSummit: true,
        isPetFriendly: false,
        hasCellphoneSignal: 'none',
        entryFee: 'Taxa com monitoria (agendamento prévio)',
        openingHours: 'Agendamento prévio nos fins de semana',
        trailheadCoordinates: {
            lat: -23.2389,
            lng: -46.9452,
            address: 'Base Ecológica da Serra do Japi - Av. Atílio Gobbo s/n, Jundiaí - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 880, label: 'Base de Pesquisas' },
            { distanceKm: 1.2, elevationM: 950, label: 'Bica do Japi' },
            { distanceKm: 2.8, elevationM: 1040, label: 'Mirante dos Cristais' },
            { distanceKm: 4.2, elevationM: 1080, label: 'Cume do Observatório' }
        ],
        essentialGear: ['Calça comprida obrigatória', 'Bota de trilha fechada', 'Repelente contra carrapatos'],
        safetyAlerts: [
            'Acesso proibido sem monitor credenciado da Prefeitura de Jundiaí.',
            'Área de preservação estrita: proibido recolher plantas ou pedras.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=serra+do+japi+jundiai'
    },
    {
        id: 'mairipora-olho-dagua',
        slug: 'pico-do-olho-dagua-mairipora',
        name: 'Trilha do Pico do Olho D\'Água',
        parkName: 'Serra da Cantareira Norte',
        region: 'interior',
        city: 'Mairiporã',
        distanceKm: 4.0,
        elevationGainM: 310,
        maxAltitudeM: 1180,
        difficulty: 'moderate',
        activityType: 'hiking',
        durationHours: 2.0,
        rating: 4.7,
        reviewCount: 710,
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Cume panorâmico famoso pelo "mar de nuvens" matinal e vista aérea da represa Paiva Castro.',
        fullDescription: 'O Olho D\'Água é um dos pontos mais procurados pelos amantes de fotografia de nascer do sol no Wikiloc. A trilha de subida passa por eucaliptais e resquícios de mata nativa até alcançar a crista gramada. Ao amanhecer, a inversão térmica frequentemente cobre o vale com um tapete branco de nuvens.',
        highlights: ['Mar de nuvens ao amanhecer', 'Vista para a Represa de Mairiporã', 'Pistas de downhill para mountain bike', 'Acesso fácil próximo à capital'],
        trailType: 'ida-e-volta',
        isProtectedArea: false,
        requiresGuide: false,
        hasWaterPoint: false,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: true,
        hasCellphoneSignal: 'good',
        entryFee: 'Gratuito',
        openingHours: 'Acesso livre 24h (Recomendado entre 05h e 18h)',
        trailheadCoordinates: {
            lat: -23.3242,
            lng: -46.5938,
            address: 'Estrada do Pico s/n - Mairiporã - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 890, label: 'Início da Trilha' },
            { distanceKm: 1.8, elevationM: 1020, label: 'Rampa de Terra' },
            { distanceKm: 4.0, elevationM: 1180, label: 'Cume das Antenas' }
        ],
        essentialGear: ['Lanterna forte para subidas de madrugada', 'Corta-vento pesado', 'Garrafa térmica com café ou chá'],
        safetyAlerts: ['Muita terra solta em períodos secos. Cuidado com ciclistas descendo rápido nas trilhas compartilhadas.'],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=pico+do+olho+d+agua+mairipora'
    },

    // =========================================================================
    // 3. LITORAL PAULISTA (NORTE & SUL)
    // =========================================================================
    {
        id: 'ubatuba-sete-praias',
        slug: 'trilha-das-7-praias-ubatuba',
        name: 'Trilha das 7 Praias (Lagoinha à Fortaleza)',
        parkName: 'Parque Estadual da Serra do Mar (Costão Sul)',
        region: 'litoral',
        city: 'Ubatuba',
        distanceKm: 10.0,
        elevationGainM: 380,
        maxAltitudeM: 110,
        difficulty: 'hard',
        activityType: 'trekking',
        durationHours: 4.5,
        rating: 4.9,
        reviewCount: 2450,
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'A travessia costeira mais famosa do Brasil no Wikiloc conectando 7 praias desertas, costões rochosos e vilarejos caiçaras.',
        fullDescription: 'O roteiro litorâneo número 1 de São Paulo na comunidade Wikiloc. O percurso liga a Praia da Lagoinha até a Praia da Fortaleza, passando por joias selvagens como Praia do Oeste, Perez, Bonete, Grande do Bonete, Deserto, Cedro do Sul e Pontão das Quatro Pistas. Águas em tons de esmeralda contrastam com a floresta preservada que beija o mar.',
        highlights: ['Praia do Deserto & Praia do Cedro do Sul', 'Costões rochosos e piscinas naturais marinhas', 'Almoço caiçara tradicional na Praia Grande do Bonete', 'Banho de mar cristalino em águas calmas'],
        trailType: 'travessia',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: false,
        hasSummit: false,
        isPetFriendly: true,
        hasCellphoneSignal: 'none',
        entryFee: 'Gratuito (Barco-táxi opcional de retorno)',
        openingHours: 'Recomendado iniciar até as 09h da manhã',
        trailheadCoordinates: {
            lat: -23.5186,
            lng: -45.1983,
            address: 'Canto esquerdo da Praia da Lagoinha - Ubatuba - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 5, label: 'Praia da Lagoinha' },
            { distanceKm: 2.1, elevationM: 45, label: 'Praia do Perez / Bonete' },
            { distanceKm: 4.5, elevationM: 80, label: 'Morro do Deserto' },
            { distanceKm: 7.2, elevationM: 110, label: 'Morro do Cedro' },
            { distanceKm: 10.0, elevationM: 5, label: 'Praia da Fortaleza' }
        ],
        essentialGear: ['Sapatilha aquática ou tênis com secagem rápida', 'Saco estanque para celular e documentos', 'Mínimo de 2.5L de água', 'Protetor solar resistente à água'],
        safetyAlerts: [
            'Trechos com tábuas e pedras escorregadias perto de marés altas.',
            'Sem sinal de celular durante 80% do percurso. Planeje o transporte de volta com antecedência na Praia da Fortaleza.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=trilha+7+praias+ubatuba'
    },
    {
        id: 'ilhabela-praia-bonete',
        slug: 'trilha-da-praia-do-bonete-ilhabela',
        name: 'Trilha da Praia do Bonete (Ilhabela)',
        parkName: 'Parque Estadual de Ilhabela',
        region: 'litoral',
        city: 'Ilhabela',
        distanceKm: 12.0,
        elevationGainM: 540,
        maxAltitudeM: 260,
        difficulty: 'hard',
        activityType: 'trekking',
        durationHours: 5.0,
        rating: 4.9,
        reviewCount: 1890,
        coverImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Praia_do_Bonete_-_Ilhabela.jpg?width=1200',
        galleryImages: [
            'https://commons.wikimedia.org/wiki/Special:FilePath/Praia_do_Bonete_-_Ilhabela.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Cachoeira_Bonete_-_Ilhabela-SP_01.jpg?width=1200',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Praia_do_Bonete_vista_de_cima.jpg?width=1200',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Trekking selvagem pelo sul da ilha com três cachoeiras exuberantes até a icônica praia de ondas oceânicas eleita uma das mais belas do planeta.',
        fullDescription: 'Considerada pelo jornal britânico The Guardian uma das praias mais bonitas do mundo, a Praia do Bonete é habitada por uma comunidade caiçara secular sem acesso por carros. A caminhada de 12 km parte de Ponta de Sepituba e cruza três paradas obrigatórias: Cachoeira da Laje (com tobogã de pedra natural), Cachoeira do Areado e Cachoeira do Saquinho.',
        highlights: ['Cachoeira da Laje com escorregador natural', 'Cachoeira do Areado', 'Comunidade caiçara do Bonete', 'Ondas oceânicas e praia de areia branca'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: true,
        hasSummit: false,
        isPetFriendly: false,
        hasCellphoneSignal: 'none',
        entryFee: 'Gratuito',
        openingHours: 'Início obrigatório antes das 10h da manhã',
        trailheadCoordinates: {
            lat: -23.8821,
            lng: -45.4192,
            address: 'Ponta de Sepituba - Fim da Estrada Sul, Ilhabela - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 20, label: 'Estacionamento Sepituba' },
            { distanceKm: 3.5, elevationM: 140, label: 'Cachoeira da Laje' },
            { distanceKm: 7.0, elevationM: 260, label: 'Cachoeira do Areado' },
            { distanceKm: 9.8, elevationM: 180, label: 'Cachoeira do Saquinho' },
            { distanceKm: 12.0, elevationM: 10, label: 'Vila do Bonete' }
        ],
        essentialGear: ['Repelente local à base de óleo mineral (borrachudo)', 'Bota amaciada e meias extras', 'Mochila cargueira para pernoite', 'Pastilhas de cloro/filtro de água'],
        safetyAlerts: [
            'Em caso de mar agitado, o retorno de barco (boneteiro) é cancelado. Esteja preparado para retornar a pé.',
            'Trilha longa com subidas exaustivas sob alta umidade da Mata Atlântica.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=praia+do+bonete+ilhabela'
    },
    {
        id: 'ilhabela-pico-do-baepi',
        slug: 'pico-do-baepi-ilhabela',
        name: 'Trilha do Pico do Baepi (Ilhabela)',
        parkName: 'Parque Estadual de Ilhabela',
        region: 'litoral',
        city: 'Ilhabela',
        distanceKm: 7.4,
        elevationGainM: 1010,
        maxAltitudeM: 1048,
        difficulty: 'extreme',
        activityType: 'hiking',
        durationHours: 5.5,
        rating: 4.9,
        reviewCount: 920,
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
            'https://commons.wikimedia.org/wiki/Special:FilePath/Praia_do_Bonete_vista_de_cima.jpg?width=1200'
        ],
        shortDescription: 'O maior desafio vertical de Ilhabela no Wikiloc: mais de 1.000m de subida contínua na mata até o cume com vista para o canal de São Sebastião.',
        fullDescription: 'O Pico do Baepi é o terceiro pico mais alto de Ilhabela e o mais desafiador acessível sem guias técnicos. São mais de 1.000 metros de desnível vertical acumulado em menos de 4 quilômetros de subida ininterrupta na densa floresta úmida da ilha. O topo rochoso descortina todo o Canal de São Sebastião, o arquipélago e a cordilheira da Serra do Mar.',
        highlights: ['1.048m de cume na ilha', 'Visão panorâmica do Canal de São Sebastião', 'Floresta virgem preservada com bromélias raras', 'Desafio cardiovascular supremo'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: false,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: false,
        hasCellphoneSignal: 'weak',
        entryFee: 'Gratuito',
        openingHours: 'Início obrigatório antes das 09h da manhã',
        trailheadCoordinates: {
            lat: -23.8012,
            lng: -45.3524,
            address: 'Rua Morro da Cruz - Bairro Itaquanduba, Ilhabela - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 40, label: 'Portaria Itaquanduba' },
            { distanceKm: 1.5, elevationM: 450, label: 'Mirante Intermediário' },
            { distanceKm: 2.8, elevationM: 820, label: 'Trecho dos Degraus' },
            { distanceKm: 3.7, elevationM: 1048, label: 'Cume do Baepi' },
            { distanceKm: 7.4, elevationM: 40, label: 'Retorno à Base' }
        ],
        essentialGear: ['Mínimo de 3 litros de água por pessoa', 'Bastões de caminhada (fundamentais para a descida íngreme)', 'Repelente contra borrachudos', 'Eletrólitos / isotônicos'],
        safetyAlerts: [
            'Inclinação brutal constante. Desaconselhável para pessoas com problemas nos joelhos ou sedentárias.',
            'Sem água potável durante todo o aclive.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=pico+do+baepi+ilhabela'
    },
    {
        id: 'ubatuba-sete-fontes',
        slug: 'trilha-das-sete-fontes-ubatuba',
        name: 'Trilha da Praia das 7 Fontes (Saco da Ribeira)',
        parkName: 'Parque Estadual da Serra do Mar',
        region: 'litoral',
        city: 'Ubatuba',
        distanceKm: 8.0,
        elevationGainM: 260,
        maxAltitudeM: 95,
        difficulty: 'moderate',
        activityType: 'hiking',
        durationHours: 3.0,
        rating: 4.8,
        reviewCount: 840,
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Caminhada clássica pela enseada do Flamengo até a praia isolada das Sete Fontes com quiosques caiçaras rústicos e água calma.',
        fullDescription: 'Muito bem avaliada no Wikiloc pela combinação de praia selvagem e boa infraestrutura rústica caiçara. O roteiro parte da Marina do Saco da Ribeira, passa pela Praia da Ribeira, contorna o morro até a isolada Praia do Flamengo (ótima para snorkeling) e finaliza na Praia das Sete Fontes, cercada por morros de mata densa.',
        highlights: ['Praia do Flamengo com mar caribenho', 'Praia das Sete Fontes', 'Vista para as marinas e veleiros do Saco da Ribeira', 'Possibilidade de retorno de barco'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: false,
        hasSummit: false,
        isPetFriendly: true,
        hasCellphoneSignal: 'weak',
        entryFee: 'Gratuito',
        openingHours: 'Recomendado sair antes do anoitecer',
        trailheadCoordinates: {
            lat: -23.5042,
            lng: -45.1189,
            address: 'Canto direito da Praia do Lázaro / Saco da Ribeira - Ubatuba - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 5, label: 'Saco da Ribeira' },
            { distanceKm: 1.8, elevationM: 70, label: 'Praia do Flamengo' },
            { distanceKm: 4.0, elevationM: 95, label: 'Praia das Sete Fontes' },
            { distanceKm: 8.0, elevationM: 5, label: 'Retorno' }
        ],
        essentialGear: ['Máscara e snorkel para mergulho livre', 'Sapatilha de trilha', 'Protetor solar'],
        safetyAlerts: ['Subidas com barro liso após chuvas na enseada.'],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=trilha+sete+fontes+ubatuba'
    },
    {
        id: 'sao-sebastiao-maresias-pauba',
        slug: 'trilha-maresias-pauba',
        name: 'Trilha de Maresias a Paúba (Mirante dos Surfistas)',
        parkName: 'Costa Sul de São Sebastião',
        region: 'litoral',
        city: 'São Sebastião',
        distanceKm: 2.5,
        elevationGainM: 110,
        maxAltitudeM: 75,
        difficulty: 'easy',
        activityType: 'hiking',
        durationHours: 1.0,
        rating: 4.7,
        reviewCount: 960,
        coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Caminhada rápida e deslumbrante sobre o costão que divide duas das praias mais famosas do litoral norte, com mirante de baleias e pôr do sol.',
        fullDescription: 'Um clássico do Wikiloc para quem quer uma trilha rápida, fácil e com visual arrebatador. O caminho liga o canto norte de Maresias à aconchegante Praia de Paúba. Do alto do mirante no costão, contempla-se toda a extensão das ondas de Maresias e, entre junho e agosto, a passagem de baleias jubarte.',
        highlights: ['Mirante com vista de 180° do oceano', 'Avistamento sazonal de baleias e golfinhos', 'Pôr do sol no mar em Paúba', 'Trilha curta e acessível'],
        trailType: 'ida-e-volta',
        isProtectedArea: false,
        requiresGuide: false,
        hasWaterPoint: false,
        hasWaterfall: false,
        hasSummit: true,
        isPetFriendly: true,
        hasCellphoneSignal: 'good',
        entryFee: 'Gratuito',
        openingHours: 'Acesso livre 24h',
        trailheadCoordinates: {
            lat: -23.7912,
            lng: -45.5654,
            address: 'Canto Norte da Praia de Maresias - São Sebastião - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 5, label: 'Canto Norte de Maresias' },
            { distanceKm: 1.2, elevationM: 75, label: 'Mirante dos Pescadores' },
            { distanceKm: 2.5, elevationM: 5, label: 'Praia de Paúba' }
        ],
        essentialGear: ['Tênis confortável', 'Garrafa de água', 'Câmera'],
        safetyAlerts: ['Pedras expostas no costão. Não se aproxime da beirada das falésias com mar agitado.'],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=trilha+maresias+pauba'
    },
    {
        id: 'sao-sebastiao-brava-boicucanga',
        slug: 'trilha-da-praia-brava-de-boicucanga',
        name: 'Trilha da Praia Brava de Boiçucanga',
        parkName: 'Parque Estadual da Serra do Mar (Núcleo São Sebastião)',
        region: 'litoral',
        city: 'São Sebastião',
        distanceKm: 4.4,
        elevationGainM: 280,
        maxAltitudeM: 160,
        difficulty: 'moderate',
        activityType: 'hiking',
        durationHours: 2.0,
        rating: 4.8,
        reviewCount: 680,
        coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Descida íngreme pela mata preservada até uma praia 100% virgem com ondas oceânicas e uma cachoeira que deságua na areia.',
        fullDescription: 'Entre as praias de Maresias e Boiçucanga, esconde-se a Praia Brava. Isolada por morros de mata densa, não possui nenhuma construção nem comércio. A trilha sobe o morro e desce abruptamente até a praia com ondas fortes e uma cachoeira límpida que deságua diretamente na areia.',
        highlights: ['Praia 100% deserta e intocada', 'Cachoeira de água doce na areia da praia', 'Pico de surf renomado', 'Visual incrível do topo do morro'],
        trailType: 'ida-e-volta',
        isProtectedArea: true,
        requiresGuide: false,
        hasWaterPoint: true,
        hasWaterfall: true,
        hasSummit: false,
        isPetFriendly: true,
        hasCellphoneSignal: 'weak',
        entryFee: 'Gratuito',
        openingHours: 'Recomendado sair antes do pôr do sol',
        trailheadCoordinates: {
            lat: -23.7845,
            lng: -45.5976,
            address: 'Rua do Morro - Boiçucanga, São Sebastião - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 30, label: 'Início da Subida' },
            { distanceKm: 1.0, elevationM: 160, label: 'Mirante do Alto do Morro' },
            { distanceKm: 2.2, elevationM: 5, label: 'Praia Brava & Queda d\'Água' },
            { distanceKm: 4.4, elevationM: 30, label: 'Retorno ao Asfalto' }
        ],
        essentialGear: ['Água suficiente (não há comércio na praia)', 'Lanche de trilha', 'Protetor solar e saco de lixo para recolher seus resíduos'],
        safetyAlerts: [
            'Mar de tombo extremamente agitado com correntes de retorno fortes.',
            'Subida de volta é muito íngreme e cansativa sob o sol da tarde.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=praia+brava+boicucanga'
    },
    {
        id: 'bertioga-poco-das-antas',
        slug: 'trilha-do-poco-das-antas-itaguare',
        name: 'Trilha do Poço das Antas (Itaguaré)',
        parkName: 'Parque Estadual Restinga de Bertioga (PERB)',
        region: 'litoral',
        city: 'Bertioga',
        distanceKm: 3.8,
        elevationGainM: 45,
        maxAltitudeM: 60,
        difficulty: 'easy',
        activityType: 'hiking',
        durationHours: 1.5,
        rating: 4.6,
        reviewCount: 380,
        coverImage: 'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
            'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDescription: 'Caminhada suave entre a restinga e a foz do Rio Itaguaré com piscinas naturais de água doce cor de chá.',
        fullDescription: 'O Parque Estadual Restinga de Bertioga protege um dos ecossistemas de restinga mais bem preservados do país. A trilha conduz a piscinas naturais calmas de água doce rica em taninos naturais (cor de chá), ideais para banho relaxante em meio a bromélias e orquídeas da planície costeira.',
        highlights: ['Piscinas naturais de água doce', 'Foz do Rio Itaguaré intocada', 'Observação de guarás-vermelhos e caranguejos', 'Apropriada para crianças e idosos'],
        trailType: 'circular',
        isProtectedArea: true,
        requiresGuide: true,
        hasWaterPoint: false,
        hasWaterfall: true,
        hasSummit: false,
        isPetFriendly: false,
        hasCellphoneSignal: 'good',
        entryFee: 'Taxa ambiental / monitoria',
        openingHours: 'Terça a Domingo das 08h às 16h',
        trailheadCoordinates: {
            lat: -23.8214,
            lng: -46.0623,
            address: 'Praia de Itaguaré - Acesso Rodovia Rio-Santos km 211, Bertioga - SP'
        },
        elevationProfile: [
            { distanceKm: 0.0, elevationM: 5, label: 'Portaria Itaguaré' },
            { distanceKm: 1.5, elevationM: 25, label: 'Mata de Restinga' },
            { distanceKm: 2.8, elevationM: 45, label: 'Poço das Antas' },
            { distanceKm: 3.8, elevationM: 5, label: 'Retorno Foz do Rio' }
        ],
        essentialGear: ['Roupa de banho', 'Repelente biodegradável', 'Sapatilha de neoprene'],
        safetyAlerts: [
            'Cuidado com a correnteza na foz do rio durante a maré vazante.',
            'Uso obrigatório de colete salva-vidas para crianças nas partes mais fundas.'
        ],
        wikilocUrl: 'https://pt.wikiloc.com/trilhas/outdoor/brasil/sao-paulo?q=poco+das+antas+bertioga'
    }
];

export const REGIONS_META = {
    capital: {
        name: 'Capital & Grande São Paulo',
        tagline: 'Refúgios verdes, serras históricas (Paranapiacaba, Cantareira) e mirantes a minutos da metrópole',
        badgeColor: 'bg-emerald-800 text-emerald-100',
        count: 6
    },
    interior: {
        name: 'Entorno & Interior Próximo',
        tagline: 'Serras imponentes, granito, cavernas do PETAR e a Mantiqueira (Atibaia, Baú, Jundiaí)',
        badgeColor: 'bg-amber-900 text-amber-100',
        count: 6
    },
    litoral: {
        name: 'Litoral Paulista',
        tagline: 'Onde a Mata Atlântica mergulha nas águas esmeralda do oceano (Ubatuba, Ilhabela, São Sebastião)',
        badgeColor: 'bg-teal-900 text-teal-100',
        count: 6
    }
};
