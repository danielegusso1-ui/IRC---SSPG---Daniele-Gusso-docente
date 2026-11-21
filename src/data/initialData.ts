import { PortalData } from '../types/irc';

export const INITIAL_PORTAL_DATA: PortalData = {
  units: [
    // CLASSE PRIMA
    {
      id: 'u1_bibbia',
      gradeId: '1',
      title: 'La Bibbia e le origini',
      description: 'Struttura, lingue originali, generi letterari e formazione dei testi sacri dell’Antico e Nuovo Testamento.',
      order: 1,
      status: 'published',
    },
    {
      id: 'u1_ebraismo',
      gradeId: '1',
      title: "Le radici dell'Ebraismo",
      description: 'La storia di Abramo, l’Esodo con Mosè, l’Alleanza, la Sinagoga, lo Shabbat e le principali feste ebraiche.',
      order: 2,
      status: 'published',
    },
    {
      id: 'u1_arte',
      gradeId: '1',
      title: 'Arte sacra e simboli',
      description: 'Come i primi cristiani raccontavano la fede attraverso segni nascosti, catacombe e mosaici bizantini.',
      order: 3,
      status: 'published',
    },
    // CLASSE SECONDA
    {
      id: 'u2_gesu',
      gradeId: '2',
      title: 'La figura storica di Gesù',
      description: 'La Palestina del I secolo, i luoghi di Gesù, la vita quotidiana, i gruppi religiosi e le fonti storiche.',
      order: 1,
      status: 'published',
    },
    {
      id: 'u2_chiesa',
      gradeId: '2',
      title: 'Nascita e storia della Chiesa',
      description: 'Dalla Pentecoste ai viaggi di Paolo, dalle persecuzioni all’Editto di Milano, fino al monachesimo e ai Concili.',
      order: 2,
      status: 'published',
    },
    {
      id: 'u2_messaggio',
      gradeId: '2',
      title: 'Il messaggio evangelico',
      description: 'Le Parabole, il Discorso della Montagna e le Beatitudini come guida per costruire relazioni autentiche.',
      order: 3,
      status: 'published',
    },
    // CLASSE TERZA
    {
      id: 'u3_religioni',
      gradeId: '3',
      title: 'Le grandi religioni del mondo',
      description: 'Uno sguardo rispettoso su Ebraismo, Cristianesimo, Islam, Induismo e Buddhismo: testi, riti e valori comuni.',
      order: 1,
      status: 'published',
    },
    {
      id: 'u3_etica',
      gradeId: '3',
      title: 'Etica, valori e scelte di vita',
      description: 'Coscienza personale, responsabilità, uso consapevole dei media, tutela dell’ambiente e dignità della persona.',
      order: 2,
      status: 'published',
    },
    {
      id: 'u3_dialogo',
      gradeId: '3',
      title: 'Dialogo interreligioso e pace',
      description: 'Dal Concilio Vaticano II allo Spirito di Assisi: costruire la pace tra culture e tradizioni religiose diverse.',
      order: 3,
      status: 'published',
    },
  ],
  resources: [
    // CLASSE PRIMA - Unit 1: La Bibbia e le origini
    {
      id: 'r1_1',
      gradeId: '1',
      unitId: 'u1_bibbia',
      type: 'document',
      title: 'Come è strutturata la Bibbia: una piccola biblioteca',
      description: 'Scheda sintetica con la divisione tra Antico e Nuovo Testamento, le lingue antiche e il significato della parola "Bibbia".',
      durationOrMeta: 'Scheda didattica · 4 min di lettura',
      content: `LA BIBBIA: UNA PICCOLA BIBLIOTECA

Il termine "Bibbia" deriva dal greco antico "tà biblía" e significa letteralmente "i libri". Non è infatti un volume unico scritto da un solo autore, ma una raccolta di 73 libri scritti nell'arco di circa mille anni da autori diversi, in contesti storici differenti.

1. Le due grandi parti
• Antico Testamento (46 libri): racconta la storia dell'Alleanza tra Dio e il popolo d'Israele prima della nascita di Gesù. È diviso in Pentateuco (i primi 5 libri, chiamati Torah dagli ebrei), Libri Storici, Libri Sapienziali e Libri Profetici.
• Nuovo Testamento (27 libri): racconta la vita, la morte e la risurrezione di Gesù e la nascita delle prime comunità cristiane. Comprende i 4 Vangeli (Matteo, Marco, Luca, Giovanni), gli Atti degli Apostoli, le Lettere e l'Apocalisse.

2. Le lingue originali
• Ebraico: la lingua di quasi tutto l'Antico Testamento.
• Aramaico: la lingua parlata quotidianamente da Gesù (alcune parti di Daniele ed Esdra).
• Greco antico (koinè): la lingua del Nuovo Testamento e della prima grande traduzione dell'Antico Testamento (la "Settanta").

3. Come si legge una citazione biblica
Esempio: Gn 1, 26-28
• Gn = sigla del libro (Genesi)
• 1 = numero del capitolo
• 26-28 = versetti dal 26 al 28`,
      status: 'published',
      createdAt: '2026-09-15',
    },
    {
      id: 'r1_2',
      gradeId: '1',
      unitId: 'u1_bibbia',
      type: 'activity',
      title: 'Caccia al versetto: impariamo a consultare la Bibbia',
      description: 'Esercizio guidato a coppie per riconoscere sigle, capitoli, versetti e generi letterari biblici.',
      durationOrMeta: 'Attività in classe · 20 min',
      content: `OBIETTIVO DELL'ATTIVITÀ
Imparare a orientarsi tra i libri dell'Antico e del Nuovo Testamento decifrando le citazioni bibliche.

ISTRUZIONI PASSO PER PASSO
1. Osserva le seguenti 4 citazioni bibliche e identifica: nome completo del libro, sezione (Antico o Nuovo Testamento), capitolo e versetti.
   • Es 3, 1-6
   • Sal 23, 1-4
   • Lc 15, 11-32
   • 1Cor 13, 4-7

2. Domande guida sul quaderno:
   a) Che differenza c'è tra il genere letterario del libro dei Salmi e quello dei Vangeli?
   b) Perché la Bibbia non è un libro di scienze naturali ma un testo di fede e significato?
   c) Scegli una frase tra i versetti letti e spiega perché ti ha colpito con parole tue.

3. Confronto finale in classe: condividi con il tuo compagno di banco la citazione che hai trovato più significativa.`,
      status: 'published',
      createdAt: '2026-09-18',
    },
    {
      id: 'r1_3',
      gradeId: '1',
      unitId: 'u1_bibbia',
      type: 'image',
      title: 'Dal rotolo di pergamena al codice miniato',
      description: 'Confronto visivo tra un antico rotolo manoscritto e un codice medievale rilegato e decorato a mano.',
      imageUrl: '/src/assets/images/bibbia_codice_miniato_1795260414100.jpg',
      caption: 'Antico rotolo di pergamena accanto a un codice miniato: per secoli i testi biblici furono copiati a mano su papiro o pergamena prima dell’invenzione della stampa.',
      durationOrMeta: 'Immagine didattica · Manoscritti',
      content: 'Confronto storico tra rotolo (volumen) e codice rilegato.',
      status: 'published',
      createdAt: '2026-09-20',
    },
    {
      id: 'r1_4',
      gradeId: '1',
      unitId: 'u1_bibbia',
      type: 'video',
      title: 'Video lezione: come nasce la Bibbia',
      description: 'Breve percorso animato sulla trasmissione orale, sui rotoli del Mar Morto e sulle prime traduzioni.',
      url: 'https://www.youtube.com/watch?v=9YffrCViTVk',
      durationOrMeta: 'Video educativo · 6 min',
      content: 'Video di approfondimento per introdurre la trasmissione dei testi biblici dall’oralità alla scrittura.',
      status: 'published',
      createdAt: '2026-09-22',
    },
    {
      id: 'r1_5',
      gradeId: '1',
      unitId: 'u1_bibbia',
      type: 'link',
      title: 'Bibbia Edu – Testo ufficiale CEI e note per studenti',
      description: 'Portale italiano per consultare gratuitamente tutti i libri biblici con ricerca rapida per sigla e parola chiave.',
      url: 'https://www.bibbiaedu.it/',
      durationOrMeta: 'Risorsa esterna · BibbiaEdu.it',
      content: 'Sito istituzionale della Conferenza Episcopale Italiana per la consultazione del testo biblico.',
      status: 'published',
      createdAt: '2026-09-24',
    },

    // CLASSE PRIMA - Unit 2: Le radici dell'Ebraismo
    {
      id: 'r1_6',
      gradeId: '1',
      unitId: 'u1_ebraismo',
      type: 'document',
      title: 'La Sinagoga, la Torah e il riposo dello Shabbat',
      description: 'Guida chiara ai luoghi, ai simboli e alle feste principali della tradizione ebraica, radice del Cristianesimo.',
      durationOrMeta: 'Scheda didattica · 5 min di lettura',
      content: `LE RADICI DELL'EBRAISMO

L'Ebraismo è la più antica tra le tre grandi religioni monoteiste (insieme a Cristianesimo e Islam). Gesù stesso era ebreo e frequentava la sinagoga e il Tempio di Gerusalemme.

1. La Sinagoga ("casa di riunione")
Dopo la distruzione del Tempio di Gerusalemme nel 70 d.C., la sinagoga è diventata il centro della vita comunitaria e della preghiera. Al suo interno troviamo:
• L'Aron ha-Qodesh: l'armadio sacro rivolto verso Gerusalemme che custodisce i rotoli della Torah.
• La Menorah: il candelabro a sette bracci, simbolo di luce e creazione.
• La Bimah: il leggio rialzato da cui si legge pubblicamente la Scrittura.

2. Lo Shabbat
È il giorno settimanale di riposo e gioia, dal tramonto del venerdì al tramonto del sabato. Ricorda il riposo di Dio dopo i sei giorni della creazione e invita le famiglie a fermarsi dal lavoro, pregare e condividere il pasto festivo.

3. Le grandi feste
• Pesach (Pasqua): ricorda la liberazione dalla schiavitù in Egitto (l'Esodo).
• Hanukkah (Festa delle Luci): celebra la riconsacrazione del Tempio.`,
      status: 'published',
      createdAt: '2026-10-03',
    },
    {
      id: 'r1_7',
      gradeId: '1',
      unitId: 'u1_ebraismo',
      type: 'image',
      title: 'Interno di una Sinagoga con Aron ha-Qodesh e Menorah',
      description: 'Osserva gli arredi liturgici della sinagoga per riconoscere l’Arca della Torah e il candelabro a sette bracci.',
      imageUrl: '/src/assets/images/sinagoga_menorah_1795260414066.jpg',
      caption: 'Interno di sinagoga storica: al centro l’Aron ha-Qodesh (armadio dei rotoli della Torah) e sulla destra la Menorah a sette bracci.',
      durationOrMeta: 'Immagine didattica · Luoghi sacri',
      content: 'Esplorazione guidata degli arredi della sinagoga.',
      status: 'published',
      createdAt: '2026-10-05',
    },
    {
      id: 'r1_8',
      gradeId: '1',
      unitId: 'u1_ebraismo',
      type: 'activity',
      title: 'Il diario dello Shabbat: cosa significa "fermarsi"?',
      description: 'Attività di riflessione sul valore del tempo libero, dell’ascolto e della festa in famiglia.',
      durationOrMeta: 'Attività individuale · 15 min',
      content: `RIFLESSIONE SULLO SHABBAT

Nella nostra vita quotidiana siamo sempre connessi tra smartphone, compiti e impegni sportivi. La tradizione ebraica propone ogni settimana 24 ore di "stacco" dal lavoro per dedicarsi alle relazioni e al creato.

CONSEGNA PER GLI ALUNNI
1. Immagina di poter progettare un tuo "pomeriggio senza schermi" insieme alla famiglia o agli amici.
2. Elenca 3 attività che ti aiuterebbero a riposare davvero la mente e a stare bene con gli altri.
3. Scrivi in 5 righe perché, secondo te, nella Bibbia il riposo è considerato un dono prezioso e non solo "non fare nulla".`,
      status: 'published',
      createdAt: '2026-10-07',
    },
    {
      id: 'r1_9',
      gradeId: '1',
      unitId: 'u1_ebraismo',
      type: 'link',
      title: 'MEIS – Museo Nazionale dell’Ebraismo Italiano (Ferrara)',
      description: 'Risorse culturali, visite virtuali e storie sulla presenza ebraica in Italia dall’antichità ad oggi.',
      url: 'https://meis.museum/',
      durationOrMeta: 'Risorsa esterna · MEIS Museum',
      content: 'Sito ufficiale del Museo Nazionale dell’Ebraismo Italiano e della Shoah.',
      status: 'published',
      createdAt: '2026-10-10',
    },

    // CLASSE PRIMA - Unit 3: Arte sacra e simboli
    {
      id: 'r1_10',
      gradeId: '1',
      unitId: 'u1_arte',
      type: 'document',
      title: 'I primi simboli cristiani: Pesce, Colomba e Buon Pastore',
      description: 'Perché i primi cristiani comunicavano attraverso simboli grafici e qual è il significato di ciascuno.',
      durationOrMeta: 'Scheda didattica · 4 min di lettura',
      content: `IL LINGUAGGIO DEI SIMBOLI NELL'ARTE PALEOCRISTIANA

Nei primi tre secoli, quando il Cristianesimo non era ancora riconosciuto ufficialmente nell'Impero Romano, i cristiani svilupparono un linguaggio fatto di segni semplici e immediati, dipinti nelle catacombe o incisi sulle lapidi.

1. Il Pesce (ICHTHYS)
In greco antico "pesce" si scrive ΙΧΘΥΣ (Ichthys). Le cinque lettere formavano un acrostico segreto:
• I = Iesous (Gesù)
• CH = Christos (Cristo)
• TH = Theou (di Dio)
• Y = Yios (Figlio)
• S = Soter (Salvatore)

2. La Colomba con il ramo d'ulivo
Richiama l'episodio biblico di Noè dopo il diluvio. Simboleggia la pace, la nuova vita e l'azione dello Spirito Santo.

3. L'Ancora
Nasconde al suo interno la forma della croce e indica la speranza salda anche nei momenti di tempesta o persecuzione.

4. Il Buon Pastore
Rappresenta Gesù giovane che porta sulle spalle la pecora smarrita: immagine di cura, misericordia e protezione.`,
      status: 'published',
      createdAt: '2026-10-14',
    },
    {
      id: 'r1_11',
      gradeId: '1',
      unitId: 'u1_arte',
      type: 'image',
      title: 'Mosaico bizantino: la colomba della pace su fondo oro',
      description: 'Dettaglio in stile ravennate con tessere in oro e lapislazzuli che raffigura il simbolo della pace e della rinascita.',
      imageUrl: '/src/assets/images/mosaico_arte_sacra_1795260414693.jpg',
      caption: 'Mosaico paleocristiano con tessere d’oro e blu cobalto: la colomba con il ramoscello d’ulivo è uno dei simboli più antichi di pace e riconciliazione.',
      durationOrMeta: 'Opera d’arte · Mosaici di Ravenna',
      content: 'Analisi iconografica del mosaico della colomba.',
      status: 'published',
      createdAt: '2026-10-15',
    },
    {
      id: 'r1_12',
      gradeId: '1',
      unitId: 'u1_arte',
      type: 'activity',
      title: 'Bozza verifica: Costruisci il tuo stemma simbolico (in preparazione)',
      description: 'Scheda laboratoriale in preparazione per la lezione di settimana prossima sul disegno di un simbolo personale.',
      durationOrMeta: 'Laboratorio artistico · 30 min',
      content: `PROGETTO DI ARTE E SIMBOLI
Disegna su un cartoncino un simbolo geometrico o naturale che rappresenti un valore importante per te (amicizia, pace, speranza, rispetto) e scrivi sul retro una breve didascalia esplicativa.`,
      status: 'draft',
      createdAt: '2026-11-18',
    },

    // CLASSE SECONDA - Unit 1: La figura storica di Gesù
    {
      id: 'r2_1',
      gradeId: '2',
      unitId: 'u2_gesu',
      type: 'document',
      title: 'La Palestina al tempo di Gesù: geografia e società',
      description: 'Le regioni (Galilea, Samaria, Giudea), il dominio romano e i diversi gruppi religiosi e politici del I secolo.',
      durationOrMeta: 'Scheda storica · 5 min di lettura',
      content: `LA PALESTINA NEL I SECOLO D.C.

Per comprendere i racconti dei Vangeli è fondamentale conoscere l'ambiente storico e geografico in cui visse Gesù di Nazaret.

1. Le tre regioni principali
• Galilea (a nord): terra verdeggiante intorno al lago di Tiberiade, abitata da agricoltori e pescatori. Qui si trova Nazaret, dove Gesù crebbe, e Cafarnao.
• Samaria (al centro): regione abitata dai Samaritani, che avevano divergenze religiose con i Giudei. Gesù sceglie spesso di dialogare con loro.
• Giudea (a sud): zona collinare e desertica con la capitale Gerusalemme, sede del Tempio e del Sinedrio.

2. La situazione politica
La terra d'Israele era una provincia controllata dall'Impero Romano tramite un governatore (Ponzio Pilato) e re locali come Erode.

3. I gruppi principali
• Farisei: laici molto attenti all'osservanza della Legge e alle tradizioni.
• Sadducei: aristocrazia sacerdotale legata al Tempio di Gerusalemme.
• Esseni: comunità ritirate nel deserto (come a Qumran) in attesa di un rinnovamento.
• Zeloti: gruppi ribelli che volevano cacciare i Romani con le armi.`,
      status: 'published',
      createdAt: '2026-09-21',
    },
    {
      id: 'r2_2',
      gradeId: '2',
      unitId: 'u2_gesu',
      type: 'image',
      title: 'Villaggio della Galilea tra uliveti e terrazzamenti',
      description: 'Ricostruzione didattica di un tipico villaggio collinare della Galilea nel I secolo con muretti a secco e campi coltivati.',
      imageUrl: '/src/assets/images/gerusalemme_antica_1795260415276.jpg',
      caption: 'Ricostruzione storica di un abitato della Galilea nel I secolo: tra le case in pietra, gli uliveti e le strade di campagna nascevano molte immagini delle parabole evangeliche.',
      durationOrMeta: 'Ricostruzione storica · I secolo',
      content: 'Ricostruzione visiva dell’ambiente quotidiano di Gesù.',
      status: 'published',
      createdAt: '2026-09-25',
    },
    {
      id: 'r2_3',
      gradeId: '2',
      unitId: 'u2_gesu',
      type: 'activity',
      title: 'Intervista impossibile a un abitante della Galilea',
      description: 'Lavoro di gruppo per immedesimarsi nella vita quotidiana del I secolo e confrontare le prospettive dei vari gruppi.',
      durationOrMeta: 'Lavoro di gruppo · 25 min',
      content: `ISTRUZIONI PER IL LAVORO A GRUPPI

Dividetevi in gruppi da 3 studenti. Ogni gruppo sceglie un personaggio del I secolo in Palestina:
• Un pescatore del lago di Tiberiade
• Un giovane scriba fariseo
• Un mercante samaritano
• Una donna di un villaggio della Galilea

DOMANDE DELL'INTERVISTA (scrivete risposte realistiche basate sulla scheda storica):
1. Che lavoro fai ogni giorno e cosa produci?
2. Come vedi la presenza dei soldati romani nelle città?
3. Che cosa hai sentito dire di quel maestro di Nazaret chiamato Gesù?`,
      status: 'published',
      createdAt: '2026-09-28',
    },

    // CLASSE SECONDA - Unit 2: Nascita e storia della Chiesa
    {
      id: 'r2_4',
      gradeId: '2',
      unitId: 'u2_chiesa',
      type: 'document',
      title: 'Dalle prime comunità all’Editto di Milano e al Monachesimo',
      description: 'Le tappe decisive dei primi cinque secoli: da minoranza perseguitata a custode della cultura europea nei monasteri.',
      durationOrMeta: 'Scheda storica · 6 min di lettura',
      content: `IL CAMMINO DELLA CHIESA NEI PRIMI SECOLI

1. La Pentecoste e l'apertura al mondo
Dopo la Pasqua, gli Apostoli iniziano ad annunciare il Vangelo a Gerusalemme. Grazie ai viaggi missionari di San Paolo lungo le strade e i porti del Mediterraneo, nascono comunità in Grecia, Asia Minore e a Roma.

2. Le persecuzioni e l'Editto di Milano (313 d.C.)
Per quasi tre secoli i cristiani subirono fasi alterne di tolleranza e persecuzione. Nel 313 d.C. l'imperatore Costantino emanò l'Editto di Milano, concedendo libertà di culto a tutti i cittadini dell'Impero, cristiani compresi.

3. San Benedetto da Norcia e il Monachesimo (VI secolo)
Dopo la caduta dell'Impero Romano d'Occidente, i monasteri benedettini divennero veri centri di pace, ospitalità e cultura. La regola di San Benedetto si riassume nel motto "Ora et labora" (prega e lavora): grazie agli scriptoria monastici furono ricopiati e salvati migliaia di libri antichi.`,
      status: 'published',
      createdAt: '2026-10-08',
    },
    {
      id: 'r2_5',
      gradeId: '2',
      unitId: 'u2_chiesa',
      type: 'image',
      title: 'Il chiostro romanico: cuore della vita monastica',
      description: 'Architettura medievale di un’abbazia con porticato ad archetti e giardino centrale, simbolo di armonia e studio.',
      imageUrl: '/src/assets/images/chiesa_romanica_chiostro_1795260414033.jpg',
      caption: 'Chiostro di un’abbazia romanica italiana: intorno al cortile si aprivano la chiesa, la sala capitolare, la biblioteca (scriptorium) e il refettorio.',
      durationOrMeta: 'Fotografia storica · Monachesimo',
      content: 'Analisi degli spazi di un monastero medievale.',
      status: 'published',
      createdAt: '2026-10-12',
    },
    {
      id: 'r2_6',
      gradeId: '2',
      unitId: 'u2_chiesa',
      type: 'video',
      title: 'I monasteri e la regola "Ora et Labora"',
      description: 'Approfondimento audiovisivo su come i monaci amanuensi hanno salvato il patrimonio culturale europeo.',
      url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
      durationOrMeta: 'Video storico · 5 min',
      content: 'Documentario breve sulla vita quotidiana in un’abbazia benedettina.',
      status: 'published',
      createdAt: '2026-10-16',
    },

    // CLASSE SECONDA - Unit 3: Il messaggio evangelico
    {
      id: 'r2_7',
      gradeId: '2',
      unitId: 'u2_messaggio',
      type: 'document',
      title: 'Le Parabole e le Beatitudini: un messaggio sempre attuale',
      description: 'Cosa sono le parabole e perché le otto Beatitudini (Mt 5) rappresentano la "carta d’identità" del cristiano.',
      durationOrMeta: 'Scheda tematica · 4 min di lettura',
      content: `PARABOLE E BEATITUDINI

1. Perché Gesù parlava in parabole?
La parabola è un breve racconto tratto dalla vita di tutti i giorni (un seminatore, una pecora smarrita, un padre che abbraccia il figlio, un viandante soccorso). Non dà risposte banali, ma fa pensare chi ascolta e invita a guardare gli altri con occhi nuovi.

2. Tre parabole celebri:
• Il Buon Samaritano (Lc 10, 25-37): chi è il mio prossimo? Chiunque ha bisogno di aiuto, oltre ogni confine.
• Il Padre misericordioso (Lc 15, 11-32): l'amore gratuito che perdona e ricomincia sempre.
• I Talenti (Mt 25, 14-30): la responsabilità di non sprecare le proprie capacità e metterle al servizio di tutti.

3. Le Beatitudini (Mt 5, 1-12)
Gesù proclama "beati" (cioè felici nel profondo) non i prepotenti o chi accumula, ma i miti, i misericordiosi, gli operatori di pace, chi ha fame e sete di giustizia.`,
      status: 'published',
      createdAt: '2026-10-20',
    },
    {
      id: 'r2_8',
      gradeId: '2',
      unitId: 'u2_messaggio',
      type: 'activity',
      title: 'Riscrivi il Buon Samaritano a scuola',
      description: 'Trasforma una celebre parabola in una storia ambientata nei corridoi o nel cortile della tua scuola.',
      durationOrMeta: 'Laboratorio di scrittura · 25 min',
      content: `ATTIVITÀ CREATIVA: PARABOLA NELL'OGGI

1. Rileggi brevemente la parabola del Buon Samaritano (Lc 10, 30-35).
2. Scegli una situazione reale della vita scolastica o sportiva in cui qualcuno viene escluso o è in difficoltà (es. un compagno nuovo che non conosce la lingua, uno studente preso in giro nella chat di classe).
3. Scrivi un breve racconto di 12-15 righe in cui compaiono:
   • Chi "passa oltre" facendo finta di niente;
   • Chi sceglie invece di fermarsi e prendersi cura dell'altro;
   • Un finale aperto che faccia riflettere la classe.`,
      status: 'published',
      createdAt: '2026-10-25',
    },
    {
      id: 'r2_9',
      gradeId: '2',
      unitId: 'u2_messaggio',
      type: 'link',
      title: 'Vatican.va – I quattro Vangeli online',
      description: 'Testo integrale dei Vangeli con ricerca per parola e commenti introduttivi.',
      url: 'https://www.vatican.va/archive/ITA0001/_INDEX.HTM',
      durationOrMeta: 'Risorsa esterna · Santa Sede',
      content: 'Accesso diretto ai testi dei Vangeli.',
      status: 'published',
      createdAt: '2026-10-27',
    },

    // CLASSE TERZA - Unit 1: Le grandi religioni del mondo
    {
      id: 'r3_1',
      gradeId: '3',
      unitId: 'u3_religioni',
      type: 'document',
      title: 'Le cinque grandi religioni a confronto: mappa essenziale',
      description: 'Tabella comparativa di Ebraismo, Cristianesimo, Islam, Induismo e Buddhismo: origini, testi, luoghi e feste.',
      durationOrMeta: 'Scheda comparativa · 6 min di lettura',
      content: `PANORAMA DELLE GRANDI RELIGIONI

Conoscere le grandi tradizioni religiose dell'umanità aiuta a superare i pregiudizi e a comprendere la storia e l'arte di popoli diversi.

1. Le tre religioni abramitiche (monoteiste)
• Ebraismo: fede in un solo Dio (YHWH), testo sacro Torah (Tanakh), luogo Sinagoga, giorno di riposo Shabbat.
• Cristianesimo: fede in Dio Uno e Trino rivelato in Gesù Cristo, testo Bibbia, luogo Chiesa, giorno Domenica.
• Islam: fede in un solo Dio (Allah), testo Corano rivelato a Muhammad, luogo Moschea, giorno di preghiera comunitaria Venerdì. I "Cinque Pilastri" guidano la vita del credente.

2. Le grandi tradizioni dell'Oriente
• Induismo: antichissima tradizione nata in India; testi come i Veda e la Bhagavad Gita; concetti chiave di Dharma (dovere/armonia) e Ahimsa (non violenza).
• Buddhismo: nato dagli insegnamenti di Siddhartha Gautama (il Buddha, "il Risvegliato", V sec. a.C.); le Quattro Nobili Verità e l'Ottuplice Sentiero per liberarsi dalla sofferenza e coltivare compassione.`,
      status: 'published',
      createdAt: '2026-09-19',
    },
    {
      id: 'r3_2',
      gradeId: '3',
      unitId: 'u3_religioni',
      type: 'activity',
      title: 'Scheda di confronto: la Regola d’Oro nelle religioni',
      description: 'Scopri come quasi tutte le religioni esprimono lo stesso principio fondamentale di rispetto reciproco.',
      durationOrMeta: 'Attività di ricerca · 20 min',
      content: `LA REGOLA D'ORO NELLE TRADIZIONI DEL MONDO

Leggi queste formulazioni provenienti da culture diverse:
• Ebraismo: "Ciò che è odioso per te, non farlo al tuo prossimo." (Talmud)
• Cristianesimo: "Tutto quanto volete che gli uomini facciano a voi, anche voi fatelo a loro." (Vangelo secondo Matteo)
• Islam: "Nessuno di voi è un vero credente finché non desidera per il proprio fratello ciò che desidera per sé." (Hadith)
• Buddhismo: "Non ferire gli altri con ciò che ferisce te stesso." (Udana-Varga)
• Induismo: "Non fare agli altri ciò che causerebbe dolore se fosse fatto a te." (Mahabharata)

DOMANDE PER IL DIBATTITO IN CLASSE
1. Che cosa hanno in comune tutte queste frasi nonostante le differenze di epoca e luogo?
2. Fai un esempio concreto di come applicare la Regola d'Oro sui social network o nella vita di quartiere.`,
      status: 'published',
      createdAt: '2026-09-24',
    },
    {
      id: 'r3_3',
      gradeId: '3',
      unitId: 'u3_religioni',
      type: 'image',
      title: 'Il giardino dell’incontro tra culture e tradizioni',
      description: 'Illustrazione simbolica di un cortile mediterraneo con l’albero d’ulivo, segno condiviso di pace e dialogo.',
      imageUrl: '/src/assets/images/dialogo_religioni_pace_1795260415429.jpg',
      caption: 'Un cortile mediterraneo attorno a un ulivo secolare: l’incontro sereno tra persone di culture e fedi diverse nasce dall’ascolto reciproco.',
      durationOrMeta: 'Illustrazione tematica · Dialogo',
      content: 'Immagine stimolo per la discussione sul pluralismo religioso.',
      status: 'published',
      createdAt: '2026-09-29',
    },

    // CLASSE TERZA - Unit 2: Etica, valori e scelte di vita
    {
      id: 'r3_4',
      gradeId: '3',
      unitId: 'u3_etica',
      type: 'document',
      title: 'Coscienza, libertà e responsabilità nelle scelte quotidiane',
      description: 'Che differenza c’è tra seguire la massa e scegliere con coscienza critica? Riflessioni per preadolescenti.',
      durationOrMeta: 'Scheda di educazione civica e IRC · 5 min',
      content: `LIBERTÀ E RESPONSABILITÀ

Crescere significa passare dall'obbedire semplicemente a regole esterne allo scegliere in prima persona ciò che è giusto per sé e per gli altri.

1. Che cos'è la libertà?
Essere liberi non vuol dire "fare tutto ciò che mi va sul momento", perché spesso gli impulsi ci rendono schiavi delle mode o della rabbia. La vera libertà è la capacità di scegliere il bene dopo aver pensato alle conseguenze delle proprie azioni.

2. La coscienza morale
È la "bussola interiore" che aiuta ogni persona a valutare se un'azione rispetta la dignità propria e altrui. La coscienza si educa leggendo, confrontandosi con gli adulti, ascoltando le storie degli altri.

3. Ecologia integrale (Laudato si')
Ogni scelta di consumo, spreco o cura del territorio ha un impatto sui più fragili e sulle generazioni future: prendersi cura della "casa comune" è una responsabilità etica di tutti.`,
      status: 'published',
      createdAt: '2026-10-11',
    },
    {
      id: 'r3_5',
      gradeId: '3',
      unitId: 'u3_etica',
      type: 'activity',
      title: 'Laboratorio dilemmi etici: tu cosa sceglieresti?',
      description: 'Tre scenari realistici su amicizia, verità, ambiente e mondo digitale per esercitare l’argomentazione in classe.',
      durationOrMeta: 'Circle time · 30 min',
      content: `TRE DILEMMI PER DISCUTERE IN CLASSE

Scenario A – Il gruppo chat
In una chat di classe viene condivisa una foto imbarazzante di un compagno per riderci sopra. Nessuno reagisce per paura di sembrare "pesante". Cosa fai e perché?

Scenario B – La vittoria ingiusta
Durante un torneo scolastico l'arbitro assegna alla tua squadra un punto decisivo che sai benissimo essere irregolare. Dirlo significa perdere la coppa. Qual è la scelta più giusta?

Scenario C – Consumo e ambiente
Ogni giorno scegliamo cosa comprare, cosa buttare e quanto tempo dedicare alle cose rispetto alle persone. Quale piccolo cambiamento concreto puoi proporre alla tua classe per un mese?`,
      status: 'published',
      createdAt: '2026-10-18',
    },
    {
      id: 'r3_6',
      gradeId: '3',
      unitId: 'u3_etica',
      type: 'link',
      title: 'Costituzione Italiana – Principi fondamentali (Art. 2, 3, 8, 19)',
      description: 'Testo ufficiale degli articoli costituzionali dedicati ai diritti umani, all’uguaglianza e alla libertà religiosa.',
      url: 'https://www.senato.it/istituzione/la-costituzione/principi-fondamentali',
      durationOrMeta: 'Risorsa istituzionale · Senato.it',
      content: 'Collegamento interdisciplinare tra IRC ed Educazione Civica.',
      status: 'published',
      createdAt: '2026-10-21',
    },

    // CLASSE TERZA - Unit 3: Dialogo interreligioso e pace
    {
      id: 'r3_7',
      gradeId: '3',
      unitId: 'u3_dialogo',
      type: 'document',
      title: 'La Dichiarazione Nostra Aetate e lo Spirito di Assisi',
      description: 'Come nel 1965 il Concilio Vaticano II aprì una nuova stagione di rispetto e collaborazione tra le religioni.',
      durationOrMeta: 'Scheda storica · 4 min di lettura',
      content: `IL DIALOGO INTERRELIGIOSO NEL NOVECENTO

1. La svolta di "Nostra Aetate" (28 ottobre 1965)
Durante il Concilio Vaticano II, la Chiesa Cattolica pubblicò un documento storico: "Nostra Aetate" ("Nel nostro tempo"). In esso si afferma con chiarezza che la Chiesa non rigetta nulla di quanto è vero e santo nelle altre religioni, condanna ogni forma di discriminazione o antisemitismo e invita i credenti al dialogo e alla collaborazione per la giustizia e la pace.

2. Lo Spirito di Assisi (27 ottobre 1986)
Papa Giovanni Paolo II invitò ad Assisi, città di San Francesco, i rappresentanti delle principali religioni del mondo per una storica Giornata di Preghiera per la Pace. Non per mescolare le fedi, ma per mostrare che le religioni devono essere sempre strumento di pace e mai giustificazione per la violenza.`,
      status: 'published',
      createdAt: '2026-10-28',
    },
    {
      id: 'r3_8',
      gradeId: '3',
      unitId: 'u3_dialogo',
      type: 'activity',
      title: 'Progetta il Manifesto della Pace della 3ª Media',
      description: 'Attività conclusiva per scrivere insieme 5 impegni concreti di ascolto, accoglienza e non-violenza.',
      durationOrMeta: 'Progetto di classe · 35 min',
      content: `PROGETTO DI FINE UNITÀ

1. Dividete la lavagna in tre parole chiave: ASCOLTO, RISPETTO, CORAGGIO.
2. Ogni gruppo propone 2 regole concrete per rendere la propria classe e il proprio quartiere luoghi più accoglienti verso chi ha origini, idee o fedi diverse.
3. Redigete il "Manifesto della Pace" in formato cartellone o presentazione digitale da esporre in aula.`,
      status: 'published',
      createdAt: '2026-11-02',
    },
  ],

  timelineEvents: [
    // CLASSE PRIMA - Storia Biblica
    {
      id: 'tl1_1',
      gradeId: '1',
      era: 'Età dei Patriarchi',
      yearLabel: 'ca. 1850 a.C.',
      title: 'Abramo e la chiamata alla terra promessa',
      description: 'Da Ur dei Caldei verso Canaan: nasce la storia dell’Alleanza e della fiducia in un unico Dio.',
      imageUrl: '/src/assets/images/gerusalemme_antica_1795260415276.jpg',
      status: 'published',
      order: 1,
    },
    {
      id: 'tl1_2',
      gradeId: '1',
      era: 'Liberazione ed Esodo',
      yearLabel: 'ca. 1250 a.C.',
      title: 'Mosè, l’Esodo e il dono della Torah al Sinai',
      description: 'Il popolo d’Israele esce dalla schiavitù in Egitto e riceve sul monte Sinai le Dieci Parole (Decalogo).',
      imageUrl: '/src/assets/images/sinagoga_menorah_1795260414066.jpg',
      status: 'published',
      order: 2,
    },
    {
      id: 'tl1_3',
      gradeId: '1',
      era: 'Monarchia Unita',
      yearLabel: 'ca. 1000 a.C.',
      title: 'Re Davide e il Tempio di Salomone a Gerusalemme',
      description: 'Gerusalemme diventa capitale politica e centro religioso del popolo ebraico con la costruzione del primo Tempio.',
      status: 'published',
      order: 3,
    },
    {
      id: 'tl1_4',
      gradeId: '1',
      era: 'Esilio Babilonese',
      yearLabel: '587–538 a.C.',
      title: 'Esilio a Babilonia e redazione dei testi sacri',
      description: 'Lontani dal Tempio distrutto, gli scribi raccolgono per iscritto la Torah e nascono le prime sinagoghe.',
      imageUrl: '/src/assets/images/bibbia_codice_miniato_1795260414100.jpg',
      status: 'published',
      order: 4,
    },
    {
      id: 'tl1_5',
      gradeId: '1',
      era: 'Età Ellenistica',
      yearLabel: 'ca. 250 a.C.',
      title: 'La traduzione greca dei "Settanta" (LXX)',
      description: 'Ad Alessandria d’Egitto la Bibbia ebraica viene tradotta in greco, diventando accessibile a tutto il mondo mediterraneo.',
      status: 'published',
      order: 5,
    },
    {
      id: 'tl1_6',
      gradeId: '1',
      era: 'Scoperte Archeologiche',
      yearLabel: 'ca. 150 a.C. – 68 d.C.',
      title: 'I Rotoli di Qumran (Mar Morto)',
      description: 'Manoscritti conservati in giare di terracotta nel deserto di Giuda: testimoniano la fedeltà dei testi biblici antichi.',
      imageUrl: '/src/assets/images/bibbia_codice_miniato_1795260414100.jpg',
      status: 'published',
      order: 6,
    },

    // CLASSE SECONDA - Storia di Gesù e della Chiesa
    {
      id: 'tl2_1',
      gradeId: '2',
      era: 'Origini Cristiane',
      yearLabel: 'ca. 6–4 a.C.',
      title: 'Nascita di Gesù a Betlemme in Giudea',
      description: 'Negli ultimi anni del regno di Erode il Grande nasce Gesù, che crescerà poi a Nazaret in Galilea.',
      imageUrl: '/src/assets/images/gerusalemme_antica_1795260415276.jpg',
      status: 'published',
      order: 1,
    },
    {
      id: 'tl2_2',
      gradeId: '2',
      era: 'Prima Comunità',
      yearLabel: 'ca. 30 d.C.',
      title: 'Pasqua, Pentecoste e la Chiesa di Gerusalemme',
      description: 'Gli Apostoli annunciano la risurrezione di Gesù e formano la prima comunità cristiana caratterizzata dalla condivisione.',
      status: 'published',
      order: 2,
    },
    {
      id: 'tl2_3',
      gradeId: '2',
      era: 'Missione nel Mediterraneo',
      yearLabel: '45–64 d.C.',
      title: 'I viaggi di San Paolo e le prime Lettere',
      description: 'Paolo di Tarso porta il Vangelo in Grecia, Turchia e fino a Roma; le sue lettere sono i testi più antichi del Nuovo Testamento.',
      status: 'published',
      order: 3,
    },
    {
      id: 'tl2_4',
      gradeId: '2',
      era: 'Impero Romano',
      yearLabel: '313 d.C.',
      title: 'Editto di Milano: libertà religiosa',
      description: 'L’imperatore Costantino riconosce la libertà di culto ai cristiani; terminano le persecuzioni ed emergono le prime basiliche.',
      imageUrl: '/src/assets/images/mosaico_arte_sacra_1795260414693.jpg',
      status: 'published',
      order: 4,
    },
    {
      id: 'tl2_5',
      gradeId: '2',
      era: 'Alto Medioevo',
      yearLabel: '529 d.C.',
      title: 'San Benedetto fonda Montecassino',
      description: 'Con la regola "Ora et labora", i monasteri diventano centri di spiritualità, lavoro agricolo, ospitalità e conservazione dei libri.',
      imageUrl: '/src/assets/images/chiesa_romanica_chiostro_1795260414033.jpg',
      status: 'published',
      order: 5,
    },
    {
      id: 'tl2_6',
      gradeId: '2',
      era: 'Età Contemporanea',
      yearLabel: '1962–1965',
      title: 'Il Concilio Vaticano II',
      description: 'Convocato da Papa Giovanni XXIII, apre la Chiesa al dialogo con il mondo moderno, adotta le lingue nazionali nella liturgia e promuove il dialogo.',
      status: 'published',
      order: 6,
    },

    // CLASSE TERZA - Storia del Dialogo e dei Diritti
    {
      id: 'tl3_1',
      gradeId: '3',
      era: 'Radici Antiche',
      yearLabel: 'VI–V sec. a.C.',
      title: 'Nascono le grandi tradizioni filosofiche e religiose orientali',
      description: 'In India e in Cina fioriscono gli insegnamenti di Buddha e Confucio, mentre nel Mediterraneo si consolidano Bibbia e filosofia greca.',
      status: 'published',
      order: 1,
    },
    {
      id: 'tl3_2',
      gradeId: '3',
      era: 'Età Moderna',
      yearLabel: '1893',
      title: 'Primo Parlamento delle Religioni del Mondo (Chicago)',
      description: 'Per la prima volta rappresentanti di Oriente e Occidente si incontrano pubblicamente per dialogare anziché scontrarsi.',
      status: 'published',
      order: 2,
    },
    {
      id: 'tl3_3',
      gradeId: '3',
      era: 'Diritti Umani',
      yearLabel: '1948',
      title: 'Dichiarazione Universale dei Diritti Umani (ONU)',
      description: 'Dopo gli orrori della Seconda Guerra Mondiale, l’articolo 18 tutela la libertà di pensiero, coscienza e religione di ogni persona.',
      status: 'published',
      order: 3,
    },
    {
      id: 'tl3_4',
      gradeId: '3',
      era: 'Concilio Vaticano II',
      yearLabel: '1965',
      title: 'Dichiarazione "Nostra Aetate"',
      description: 'Documento storico della Chiesa Cattolica sul rispetto e il dialogo fraterno con Ebraismo, Islam, Induismo e Buddhismo.',
      status: 'published',
      order: 4,
    },
    {
      id: 'tl3_5',
      gradeId: '3',
      era: 'Dialogo per la Pace',
      yearLabel: '1986',
      title: 'Incontro Interreligioso di Assisi',
      description: 'I leader delle religioni mondiali si riuniscono nella città di San Francesco per pregare e testimoniare insieme l’impegno per la pace.',
      imageUrl: '/src/assets/images/dialogo_religioni_pace_1795260415429.jpg',
      status: 'published',
      order: 5,
    },
  ],

  quizzes: [
    // CLASSE PRIMA QUIZZES
    {
      id: 'q1_bibbia',
      gradeId: '1',
      unitId: 'u1_bibbia',
      title: 'Mettiti alla prova: La Bibbia e le origini',
      status: 'published',
      questions: [
        {
          id: 'qq1_1',
          question: 'Che cosa significa letteralmente la parola greca "Bibbia" (tà biblía)?',
          options: ['Il grande tempio', 'I libri (una raccolta di libri)', 'La legge antica', 'Il rotolo d’oro'],
          correctIndex: 1,
          explanation: 'Bibbia significa "i libri", perché è una vera biblioteca composta da 73 libri scritti in epoche diverse.',
        },
        {
          id: 'qq1_2',
          question: 'Quali sono le due grandi sezioni in cui è divisa la Bibbia cristiana?',
          options: ['Torah e Corano', 'Genesi e Apocalisse', 'Antico Testamento e Nuovo Testamento', 'Vangeli e Salmi'],
          correctIndex: 2,
          explanation: 'La Bibbia cristiana comprende l’Antico Testamento (46 libri) e il Nuovo Testamento (27 libri).',
        },
        {
          id: 'qq1_3',
          question: 'Nella citazione "Gn 1, 27", che cosa indica il numero 27?',
          options: ['La pagina del libro', 'Il versetto', 'L’anno di scrittura', 'Il capitolo'],
          correctIndex: 1,
          explanation: 'Dopo la sigla del libro (Gn = Genesi) c’è il numero del capitolo (1) e dopo la virgola il versetto (27).',
        },
        {
          id: 'qq1_4',
          question: 'In quale lingua è stato scritto originariamente il Nuovo Testamento?',
          options: ['Latino', 'Greco antico (koinè)', 'Ebraico moderno', 'Italiano volgare'],
          correctIndex: 1,
          explanation: 'Il Nuovo Testamento fu scritto in greco koinè, la lingua internazionale parlata nel Mediterraneo del I secolo.',
        },
      ],
    },
    {
      id: 'q1_ebraismo',
      gradeId: '1',
      unitId: 'u1_ebraismo',
      title: "Mettiti alla prova: Le radici dell'Ebraismo",
      status: 'published',
      questions: [
        {
          id: 'qq1_5',
          question: 'Che cos’è la Torah per la tradizione ebraica?',
          options: ['Un tipo di pane azzimo', 'I primi cinque libri della Bibbia (Legge / Insegnamento)', 'Il campanile del Tempio', 'Una festa primaverile'],
          correctIndex: 1,
          explanation: 'La Torah (Pentateuco) comprende Genesi, Esodo, Levitico, Numeri e Deuteronomio.',
        },
        {
          id: 'qq1_6',
          question: 'Quale oggetto liturgico della sinagoga ha sette bracci e simboleggia la luce?',
          options: ['La Menorah', 'La Bimah', 'Lo Shofar', 'Il Tallit'],
          correctIndex: 0,
          explanation: 'La Menorah è il candelabro a sette bracci presente nella tradizione ebraica fin dal Tempio di Gerusalemme.',
        },
        {
          id: 'qq1_7',
          question: 'Che cosa ricorda principalmente la festa di Pesach (Pasqua ebraica)?',
          options: ['Il raccolto d’autunno', 'La liberazione dalla schiavitù in Egitto', 'La fondazione di Roma', 'La nascita di Davide'],
          correctIndex: 1,
          explanation: 'Pesach celebra il passaggio (Esodo) del popolo ebraico dalla schiavitù in Egitto verso la libertà.',
        },
      ],
    },
    {
      id: 'q1_arte',
      gradeId: '1',
      unitId: 'u1_arte',
      title: 'Mettiti alla prova: Arte sacra e simboli',
      status: 'published',
      questions: [
        {
          id: 'qq1_8',
          question: 'Perché i primi cristiani usavano spesso il simbolo del pesce (Ichthys)?',
          options: ['Perché era facile da pescare nel Tevere', 'Perché le lettere greche formavano l’acrostico "Gesù Cristo Figlio di Dio Salvatore"', 'Perché era lo stemma dell’Imperatore', 'Solo per decorare le tavole'],
          correctIndex: 1,
          explanation: 'ICHTHYS in greco serviva come segno discreto di riconoscimento della fede cristiana.',
        },
        {
          id: 'qq1_9',
          question: 'Che cosa rappresenta la colomba con il ramoscello d’ulivo?',
          options: ['La guerra e la conquista', 'La ricchezza materiale', 'La pace e la nuova vita', 'Il commercio marittimo'],
          correctIndex: 2,
          explanation: 'Collegata al racconto biblico di Noè, la colomba con l’ulivo è simbolo universale di pace e riconciliazione.',
        },
        {
          id: 'qq1_10',
          question: 'Quale forma geometrica era nascosta nel simbolo dell’ancora paleocristiana?',
          options: ['La stella cometa', 'La croce', 'Il labirinto', 'La corona d’alloro'],
          correctIndex: 1,
          explanation: 'L’ancora nascondeva la croce e simboleggiava la speranza capace di tenere salda la vita nei momenti difficili.',
        },
      ],
    },

    // CLASSE SECONDA QUIZZES
    {
      id: 'q2_gesu',
      gradeId: '2',
      unitId: 'u2_gesu',
      title: 'Mettiti alla prova: La figura storica di Gesù',
      status: 'published',
      questions: [
        {
          id: 'qq2_1',
          question: 'In quale regione settentrionale della Palestina crebbe Gesù?',
          options: ['Giudea', 'Galilea (a Nazaret)', 'Egitto', 'Mesopotamia'],
          correctIndex: 1,
          explanation: 'Gesù crebbe a Nazaret, un piccolo villaggio della Galilea, regione agricola intorno al lago di Tiberiade.',
        },
        {
          id: 'qq2_2',
          question: 'Quale impero governava politicamente la Palestina al tempo di Gesù?',
          options: ['Impero Persiano', 'Impero Romano', 'Impero Ottomano', 'Impero Egizio'],
          correctIndex: 1,
          explanation: 'La Palestina era sotto il controllo dell’Impero Romano (governatore della Giudea era Ponzio Pilato).',
        },
        {
          id: 'qq2_3',
          question: 'Quale lingua parlava Gesù nella vita quotidiana?',
          options: ['Aramaico', 'Latino', 'Sanscrito', 'Italiano'],
          correctIndex: 0,
          explanation: 'La lingua quotidiana della popolazione della Galilea era l’aramaico (simile all’ebraico).',
        },
      ],
    },
    {
      id: 'q2_chiesa',
      gradeId: '2',
      unitId: 'u2_chiesa',
      title: 'Mettiti alla prova: Nascita e storia della Chiesa',
      status: 'published',
      questions: [
        {
          id: 'qq2_4',
          question: 'Che cosa stabilì l’Editto di Milano nel 313 d.C.?',
          options: ['La chiusura di tutte le chiese', 'La libertà di culto per i cristiani e tutte le religioni nell’Impero', 'La costruzione del Colosseo', 'La divisione dei Vangeli'],
          correctIndex: 1,
          explanation: 'Con l’Editto di Milano voluto da Costantino e Licinio finirono le persecuzioni contro i cristiani.',
        },
        {
          id: 'qq2_5',
          question: 'Chi fu l’autore della celebre regola monastica riassunta in "Ora et labora"?',
          options: ['San Paolo di Tarso', 'San Benedetto da Norcia', 'Costantino', 'Mosè'],
          correctIndex: 1,
          explanation: 'San Benedetto da Norcia fondò Montecassino nel 529 d.C. unendo preghiera, studio e lavoro manuale.',
        },
        {
          id: 'qq2_6',
          question: 'Perché gli scriptoria dei monasteri medievali furono così importanti per l’Europa?',
          options: ['Perché producevano armi', 'Perché i monaci copiarono e salvarono i manoscritti antichi e biblici', 'Perché erano stazioni ferroviarie', 'Perché ospitavano solo imperatori'],
          correctIndex: 1,
          explanation: 'Senza il paziente lavoro degli amanuensi nei monasteri, moltissimi testi classici e cristiani sarebbero andati perduti.',
        },
      ],
    },
    {
      id: 'q2_messaggio',
      gradeId: '2',
      unitId: 'u2_messaggio',
      title: 'Mettiti alla prova: Il messaggio evangelico',
      status: 'published',
      questions: [
        {
          id: 'qq2_7',
          question: 'Che cos’è una parabola evangelica?',
          options: ['Una legge giuridica romana', 'Un breve racconto tratto dalla vita quotidiana con un messaggio profondo', 'Un calcolo geometrico', 'Una poesia in rima baciata'],
          correctIndex: 1,
          explanation: 'Gesù usava immagini concrete (semi, perle, pastori, viaggiatori) per rendere accessibile il messaggio del Regno di Dio.',
        },
        {
          id: 'qq2_8',
          question: 'Nella parabola del Buon Samaritano, chi aiuta davvero l’uomo ferito?',
          options: ['Un sacerdote che passa di lì', 'Un funzionario del tempio', 'Uno straniero samaritano che si ferma e si prende cura di lui', 'Un soldato di passaggio'],
          correctIndex: 2,
          explanation: 'Gesù mostra che "prossimo" diventa chiunque sceglie la compassione concreta superando i pregiudizi.',
        },
        {
          id: 'qq2_9',
          question: 'In quale discorso Gesù proclama le otto Beatitudini?',
          options: ['Nel Discorso della Montagna (Mt 5)', 'Nell’Apocalisse', 'Nel libro dell’Esodo', 'Negli Atti degli Apostoli'],
          correctIndex: 0,
          explanation: 'Le Beatitudini aprono il Discorso della Montagna nel Vangelo secondo Matteo.',
        },
      ],
    },

    // CLASSE TERZA QUIZZES
    {
      id: 'q3_religioni',
      gradeId: '3',
      unitId: 'u3_religioni',
      title: 'Mettiti alla prova: Le grandi religioni del mondo',
      status: 'published',
      questions: [
        {
          id: 'qq3_1',
          question: 'Quali sono le tre grandi religioni monoteiste che si richiamano alla figura di Abramo?',
          options: ['Induismo, Buddhismo, Shintoismo', 'Ebraismo, Cristianesimo, Islam', 'Buddhismo, Ebraismo, Taoismo', 'Solo Cristianesimo e Induismo'],
          correctIndex: 1,
          explanation: 'Ebraismo, Cristianesimo e Islam sono chiamate "religioni abramitiche" e professano la fede in un unico Dio.',
        },
        {
          id: 'qq3_2',
          question: 'Come si chiama il testo sacro fondamentale dell’Islam?',
          options: ['Torah', 'Veda', 'Corano', 'Vangelo'],
          correctIndex: 2,
          explanation: 'Il Corano è il libro sacro dell’Islam, suddiviso in 114 sure (capitoli).',
        },
        {
          id: 'qq3_3',
          question: 'Chi è all’origine della tradizione buddhista nel V secolo a.C.?',
          options: ['Siddhartha Gautama (il Buddha)', 'Mosè', 'San Francesco', 'Maometto'],
          correctIndex: 0,
          explanation: 'Siddhartha Gautama, principe indiano noto come il Buddha ("il Risvegliato"), insegnò il superamento della sofferenza tramite compassione e consapevolezza.',
        },
      ],
    },
    {
      id: 'q3_etica',
      gradeId: '3',
      unitId: 'u3_etica',
      title: 'Mettiti alla prova: Etica, valori e scelte di vita',
      status: 'published',
      questions: [
        {
          id: 'qq3_4',
          question: 'Che cosa distingue una scelta responsabile da una semplice reazione impulsiva?',
          options: ['Seguire sempre cosa fa la maggioranza', 'Riflettere sulle conseguenze delle proprie azioni verso sé e gli altri', 'Non prendere mai nessuna decisione', 'Decidere in base alla fretta'],
          correctIndex: 1,
          explanation: 'La responsabilità unisce la libertà personale all’attenzione concreta per il bene proprio e della comunità.',
        },
        {
          id: 'qq3_5',
          question: 'Che cosa esprime il principio di "ecologia integrale"?',
          options: ['Solo la raccolta della plastica', 'Il legame profondo tra cura dell’ambiente naturale e giustizia verso le persone', 'La chiusura dei parchi naturali', 'Un argomento solo di matematica'],
          correctIndex: 1,
          explanation: 'L’ecologia integrale ricorda che crisi ambientale e crisi sociale sono strettamente collegate.',
        },
        {
          id: 'qq3_6',
          question: 'Quale articolo della Costituzione Italiana tutela la libertà di religione di ogni persona?',
          options: ['Articolo 19', 'Articolo 99', 'Articolo 120', 'Non esiste nella Costituzione'],
          correctIndex: 0,
          explanation: 'L’art. 19 riconosce a tutti il diritto di professare liberamente la propria fede religiosa in forma individuale o associata.',
        },
      ],
    },
    {
      id: 'q3_dialogo',
      gradeId: '3',
      unitId: 'u3_dialogo',
      title: 'Mettiti alla prova: Dialogo interreligioso e pace',
      status: 'published',
      questions: [
        {
          id: 'qq3_7',
          question: 'Quale documento del Concilio Vaticano II (1965) è dedicato al dialogo con le religioni non cristiane?',
          options: ['Editto di Milano', 'Nostra Aetate', 'Magna Carta', 'Regola Benedettina'],
          correctIndex: 1,
          explanation: '"Nostra Aetate" ha aperto una nuova pagina di dialogo, stima e rifiuto di ogni discriminazione religiosa.',
        },
        {
          id: 'qq3_8',
          question: 'Che cosa si intende per "Spirito di Assisi" (1986)?',
          options: ['Una gara sportiva medievale', 'L’impegno comune dei leader delle religioni a pregare e operare insieme per la pace', 'La fusione di tutte le religioni in una sola', 'Un trattato commerciale'],
          correctIndex: 1,
          explanation: 'Ad Assisi nel 1986 le religioni si incontrarono mantenendo ciascuna la propria identità, ma unite nel ripudio della violenza.',
        },
        {
          id: 'qq3_9',
          question: 'Qual è la differenza tra ecumenismo e dialogo interreligioso?',
          options: ['Non c’è alcuna differenza', 'L’ecumenismo è il dialogo tra le diverse Chiese cristiane; il dialogo interreligioso avviene tra religioni diverse', 'L’ecumenismo riguarda solo la musica', 'Il dialogo interreligioso riguarda solo i politici'],
          correctIndex: 1,
          explanation: 'L’ecumenismo cerca l’unità tra cattolici, ortodossi e protestanti; il dialogo interreligioso mette in relazione fedi diverse come Cristianesimo, Ebraismo, Islam, Buddhismo.',
        },
      ],
    },
  ],

  glossary: [
    {
      id: 'g1',
      term: 'Alleanza',
      category: 'Bibbia',
      definition: 'Patto di amicizia, fedeltà e responsabilità reciproca che nella Bibbia lega Dio al popolo d’Israele e all’umanità.',
      exampleOrOrigin: 'Esempio: l’Alleanza con Noè (arcobaleno), con Abramo e sul Sinai con Mosè.',
    },
    {
      id: 'g2',
      term: 'Beatitudini',
      category: 'Vangelo',
      definition: 'Otto brevi proclamazioni di gioia ("Beati i...") pronunciate da Gesù nel Discorso della Montagna, che indicano la strada per una felicità autentica.',
      exampleOrOrigin: 'Vangelo secondo Matteo, capitolo 5.',
    },
    {
      id: 'g3',
      term: 'Concilio',
      category: 'Storia della Chiesa',
      definition: 'Assemblea solenne dei vescovi di tutto il mondo, presieduta dal Papa, per riflettere su questioni importanti della fede e della vita della Chiesa.',
      exampleOrOrigin: 'Il più recente è il Concilio Vaticano II (1962-1965).',
    },
    {
      id: 'g4',
      term: 'Ecumenismo',
      category: 'Dialogo',
      definition: 'Movimento e cammino di dialogo, preghiera e collaborazione tra le diverse Chiese cristiane (cattolici, ortodossi, protestanti) per superare le divisioni.',
      exampleOrOrigin: 'Dal greco "oikoumene" = tutta la terra abitata.',
    },
    {
      id: 'g5',
      term: 'Esodo',
      category: 'Bibbia / Ebraismo',
      definition: 'Uscita del popolo ebraico dalla schiavitù in Egitto sotto la guida di Mosè verso la terra promessa; è anche il nome del secondo libro della Bibbia.',
      exampleOrOrigin: 'Dal greco "ex-odos" = uscita, cammino fuori.',
    },
    {
      id: 'g6',
      term: 'Etica',
      category: 'Valori e Scelte',
      definition: 'Riflessione su ciò che è bene o giusto fare nelle scelte quotidiane, mettendo al centro il rispetto della dignità umana e della coscienza.',
      exampleOrOrigin: 'Dal greco "ethos" = comportamento, modo di vivere.',
    },
    {
      id: 'g7',
      term: 'Monachesimo',
      category: 'Storia della Chiesa',
      definition: 'Forma di vita cristiana nata nei primi secoli e fiorita nel Medioevo, in cui donne e uomini vivono in comunità (monasteri) tra preghiera, lavoro e studio.',
      exampleOrOrigin: 'Celebre il motto benedettino "Ora et labora".',
    },
    {
      id: 'g8',
      term: 'Parabola',
      category: 'Vangelo',
      definition: 'Breve racconto simbolico tratto dalla vita di tutti i giorni usato da Gesù per spiegare valori profondi e far riflettere chi ascolta.',
      exampleOrOrigin: 'Esempi celebri: il Buon Samaritano, il Seminatore, i Talenti.',
    },
    {
      id: 'g9',
      term: 'Pentecoste',
      category: 'Storia della Chiesa',
      definition: 'Festa che si celebra cinquanta giorni dopo la Pasqua e ricorda la discesa dello Spirito Santo sugli Apostoli, segnando l’inizio pubblico della Chiesa.',
      exampleOrOrigin: 'Dal greco "pentekostè" = cinquantesimo giorno.',
    },
    {
      id: 'g10',
      term: 'Regola d’Oro',
      category: 'Dialogo Interreligioso',
      definition: 'Principio morale condiviso da quasi tutte le religioni e filosofie del mondo: trattare gli altri come vorremmo essere trattati noi.',
      exampleOrOrigin: 'Presente in Ebraismo, Cristianesimo, Islam, Buddhismo e Induismo.',
    },
    {
      id: 'g11',
      term: 'Sinagoga',
      category: 'Ebraismo',
      definition: 'Luogo di incontro, preghiera e studio delle Scritture per la comunità ebraica; ospita i rotoli della Torah nell’armadio sacro (Aron ha-Qodesh).',
      exampleOrOrigin: 'Dal greco "synagoghé" = assemblea, luogo di riunione.',
    },
    {
      id: 'g12',
      term: 'Simbolo',
      category: 'Arte Sacra',
      definition: 'Segno concreto (un’immagine, un gesto, un colore) che rimanda a un significato più profondo e invisibile, unendo chi lo condivide.',
      exampleOrOrigin: 'Esempio: la colomba con il ramo d’ulivo per la pace.',
    },
    {
      id: 'g13',
      term: 'Torah',
      category: 'Ebraismo',
      definition: 'Insegnamento o Legge: indica i primi cinque libri della Bibbia (Genesi, Esodo, Levitico, Numeri, Deuteronomio), custoditi in rotoli scritti a mano.',
      exampleOrOrigin: 'Nella tradizione cristiana questi cinque libri si chiamano Pentateuco.',
    },
    {
      id: 'g14',
      term: 'Vangelo',
      category: 'Bibbia',
      definition: 'Significa letteralmente "Buona Notizia": indica sia l’annuncio di Gesù sia i quattro libri del Nuovo Testamento scritti da Matteo, Marco, Luca e Giovanni.',
      exampleOrOrigin: 'Dal greco "eu-anghélion" = lieto annuncio.',
    },
  ],
};
