# vue3media

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Server start

json-server --id guid data.json --routes routes.json

### Postup projektu

1. Vytvorím projekt(zvolím custom projekt a pridám tam vuex a použijem eslint+prettier) a nainštalujem globálne JSON server pomocou npm install -g json-server (bude slúžit ako mocked API)

2. V projekte pridám routes.json, kde si nastavím custom trasy pre API a zároveň vytvorím data.json, čo bude slúžit ako súbor s dátami

3. V data.json vytvorím pár médii pre demonštráciu s potrebnými hodnotami

4. nainštalujem si package pre UUID, axios a tailwind

5. Vytvorím jednoduchú tabuľku a pridám komponent, pre média

6. Vo vuex vytvorím trasovanie pre api s HTTP requestami pre GET, POST, PUT, DELETE

7. V hlavnom komponente si prepošlem dáta z VUEX, a do komponentu média pridám cyklus pre zobrazenie každého média.

8. V komponente média následne vypíšem, čo sa má zobrazovať, pridám button na editáciu a mazanie média

9. Na komponente média prídám button na zobrazovanie a schovávanie formulára pre pridávanie nového média, vytvorím nový komponent pre pridávanie média, ktorý obsahuje jednoduchý formulár

10. V komponente na pridávanie média si prepošlem propreties, do metód pridám akciu na pridávanie média z vuex pomocou mapActions, do dát pridám hodnoty, ktoré sa majú spracovať z formulára a do metód pridám funckiu na odoslanie formulára, kde zapíšem dáta z inputu a následne ich pridám do API, v komponente si taktiež zavolám package na generovanie GUID a ten pridelím pri spracovávaní formulára

11. Vyvtvorím jednoduchú validáciu vo funckii onSubmit, aby používateľ nemohol odosielať prázdny formulár(dá sa použiť aj package vee-validate/vuelidate), do computed properties pridám každú časť čo sa má overiť(dá sa to aj cez dáta miesto computed, ale v computed reaguje validácia dynamicky a nie až keď používateľ odošle formulár) následne vytvorím p tagy pod každým inputom a pridám im podmienku aby saa zobrazovali, pokiaľ není splnená validácia

12. Pridám jednoduché animácie pre pridávanie médii a otváranie formulára cez transition a transition-group

13. Vytvorím nový komponent pre editáciu média, ktorý sa bude zobrazovať po kliknutí na tlačidlo edit vedľa každého média

14. V komponente Média pridám funckiu na otváranie popupu pre editáciu, v edit komponente pridám formulár a tlačidlo na zatváranie popupu, funckiu pre zatváranie popupu si prepošlem z rodiča do editu, tam ho emitnem a zavolám pri príslušnom buttone

15. Pre edit použijem podobnú metódu ako pri pridávaní, len s requestom .put, aby som editoval príslušne médium, identifikujem ich podľa GUID a pridám takisto validáciu formulára ako pri pridávaní média

16. V liste som pridal jednoduchý filter, kde si používateľ môže filtrovať média pomocou názvu, typu, druhu, počtu diskov a roku vydania.

17. Filter som vytvoril vo vuex, kde som pridal statement pre každý filtrovaný výraz, v actions jednotlivé metódy, v mutations som vytvoril pre jednotlivé metódy funkcionalitu a v getteroch som vypísal jednotlivé výsledky hľadania.

18. V hlavnom komponente som do hlavičky tabuľky pridal inputy pre názov, počet diskov a rok vydania a select elementy pre typ a druh

19. V hlavnom komponente som pridal metódu, kde sa vypisujú filtrované média pomocou zadaných výrazov a ak hodnoty vo filtroch sú prázdne zobrazia sa všetky média, do computed som pridal každý state pre hľadaný výraz a nastavil mu getter a setter podľa hodnoty z filtra, následne som upravil podmienku pre komponent média, aby sa zobrazovali filtrované média
