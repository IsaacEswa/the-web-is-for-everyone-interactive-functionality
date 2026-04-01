# Buurtcampuskrant
Het platform voor bewoners, wijkpartners, studenten en HvA medewerkers om kennis te laten maken en te informeren over de laatste ontwikkelingen en programma's van de Buurtcampus Amsterdam.

Deze sprint lag de focus op het ontwikkelen van de districtpagina's en de detailpagina's. Alle artikelen worden dynamisch opgehaald uit Directus. De website is alleen nog beschikbaar voor mobiel

## Wat is Buurtcampuskrant
Het doel is gemeenschap op te bouwen, HvA netwerk en betrokkenheid te vergroten en de diverse initiatieven binnen de Buurtcampus zichtbaar te maken. Daarmee willen we de weg van bewoners, wijkpartners, studenten, docenten en andere HvA medewerkers naar de Buurtcampus makkelijker maken en vergroten.

## Vraag opdrachtgever
Ontwerp en ontwikkel de digitale krant voor de Buurtcampus Amsterdam.

Link naar huidige website: https://the-web-is-for-everyone-interactive-oir7.onrender.com/

<img width="400" alt="image" src="https://github.com/user-attachments/assets/4d278684-2dee-4a92-a2b6-a878217d3c31" />


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual of video toe 📸 -->
<!-- Voeg een link toe naar GitHub Pages 🌐-->
### Het ontwerp
Éen belangrijk puntje was dat de doorklik naar de districten en artikelen heel makkelijk moet gaan. En dat je duidelijk kan zien op welk district je bent. Dit heb ik gedaan door de kleuren te gebruiken van het desbetreffend district. En door op de homepagina gemakkelijk navigatie naar de districts.

Figma ontwerp: https://www.figma.com/design/3OBR5yVABlBnnT8Vi6vDdl/Buurtcampuskrant?node-id=0-1&t=jriLkkJgdD5fBE6Q-1

### Ontwerpkeuzes
* **Kleurgebruik**: Kleuren komen vooral vanuit de districts, website zelf is minimalistisch en rustig zodat dit uitnodigender en rustiger is voor de gebruiker. Felle oranje knoppen voor de Call-To-Action zodat deze goed opvallen en verbetert de gebruikerservaring.
* **Consistente UI**: De artikel cards hebben allemaal dezelfde layout en vormgeving. De afgeronde hoeken maken de website rustiger en zachter.

<img width="500" alt="image" src="https://github.com/user-attachments/assets/4eaacec3-a91f-4636-a7e0-e7418856f2bd" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/39ee685e-4c17-4282-81a6-ceb17fd2f770" />

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
### Homepagina
Op de homepagina staat als call to action het meest recente artikel. Vervolgens zie je de districten met de 3 meest recente artikelen per distrct en een knop om naar de desbetreffende district te gaan.

Ook een sidebar op desktop die meebeweegt als je scrolled met de 3 recente artikelen en het archief.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/457aad08-f1be-47f6-899d-e0d09b5a2637" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/024fb868-b5df-46d8-861e-a11bc0e39ceb" />

### Districtpagina
Op de districtpagina zie je direct op welk district je je bevindt en kan je filteren op de doelgroep en sorteren op nieuw -> oud of oud -> nieuw. Deze filtering en sortering wordt automatisch toegepast om de gebruiksvriendelijkheid te verbeteren. Ook wordt het aantal getoond voor de gebruiksvriendelijk.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/f51fc2da-5dbc-46b4-a4bd-6b9d503e6859" />

https://github.com/user-attachments/assets/ef7f0233-d237-477c-87ee-d00182d820cf

### Detailpagina
Hier zie je de content van het artikel, gebruikers kunnen onder het artikel een opmerking plaatsen. Onderaan staat er weer een navigatie zodat je door kan klikken naar andere artikelen van het desbetreffende district.

<img width="200" alt="image" src="https://github.com/user-attachments/assets/e91e00c4-afad-4ecd-b8f0-f6becdb37da6" />

<img width="500" alt="image" src="https://github.com/user-attachments/assets/3b3c5fb5-1614-4c83-8c4c-c167929c3c31" />


## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->
In dit project wordt er gebruik gemaakt van Node.js en Express om de webserver te beheren. Voor het genereren van dynamische HTML-pagina's wordt Liquid gebruikt, wat de webpagina's flexibel en makkelijk te onderhouden maakt. De opdrachtgever kan zelf artikelen toevoegen en die worden da dynamisch geladen op de website.

### Route-configuraties
* Homepagina `/`: De webserver haalt gegevens op via de Directus API en toont deze op de hoofdpagina `index.liquid.`
* Districtpagina `/:district/`: Hier worden artikelen opgehaald van desbetreffende district en kunnen gebruikers filteren op doelgroep. De data wordt weergegeven in `district.liquid`.
* Detailpagina `/:district/:slug/`: Deze route haalt dynamisch de artikel op met inhoud.Op deze pagina's kunnen gebruikers een reactie plaatsen en wordt het per artikel opgeslagen, met deze POST methode: `/${request.params.district}/${request.params.slug}/`

### Dynamische data
* Data ophalen via API: De server maakt een API-aanroep om de benodigde gegevens op te halen in JSON-formaat. [Voorbeeld](https://github.com/IsaacEswa/the-web-is-for-everyone-interactive-functionality/blob/c858a5eb4ab5dfbbf10c4d2a11d9c46dd8d88fb9/server.js#L44)
* Data doorgeven aan Liquid: De opgehaalde data wordt doorgegeven aan de Liquid-template via response.render(). [Voorbeeld](https://github.com/IsaacEswa/the-web-is-for-everyone-interactive-functionality/blob/c858a5eb4ab5dfbbf10c4d2a11d9c46dd8d88fb9/server.js#L276)
* Data verwerken in Liquid: In de Liquid-template wordt de data met behulp van loops en variabelen verwerkt en weergegeven. [Variabelen](https://github.com/IsaacEswa/the-web-is-for-everyone-interactive-functionality/blob/c858a5eb4ab5dfbbf10c4d2a11d9c46dd8d88fb9/views/details.liquid#L27-L29)
[Loops](https://github.com/IsaacEswa/the-web-is-for-everyone-interactive-functionality/blob/c858a5eb4ab5dfbbf10c4d2a11d9c46dd8d88fb9/views/district.liquid#L60-L75)


* HTML genereren en tonen: Liquid genereert de HTML, die naar de browser wordt gestuurd en zichtbaar wordt voor de gebruiker.
* Data opslaan wordt uitgevoerd via een POST-aanroep. De server maakt een API-aanroep om de benodigde gegevens op te halen in JSON-formaat en slaat deze op in de database. [Voorbeeld](https://github.com/IsaacEswa/the-web-is-for-everyone-interactive-functionality/blob/c858a5eb4ab5dfbbf10c4d2a11d9c46dd8d88fb9/server.js#L281-L299)

### UI-states stack
<img width="800" alt="image" src="https://github.com/user-attachments/assets/c74a733f-e851-4f91-b2a4-264074cc14a5" />


## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->


## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
