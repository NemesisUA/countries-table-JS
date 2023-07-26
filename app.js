const appRoot = document.getElementById('app-root');

/*
write your code here

list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/

function createHeader() {

    function createHeading() {
        const h1 = document.createElement('h1');
        h1.textContent = 'Country Search';  
        header.prepend(h1);       
    }

    const header = document.createElement('header');    
    createHeading();     
    document.body.prepend(header);
}

function createForm() {
    const form = document.createElement('form');

    function createSearchTypeBlock() {
        const span = document.createElement('span');
        span.textContent = 'Please choose type of search:';

        const radioBlock = document.createElement('div');
        radioBlock.classList.add('radios');

        function createRadio(labelText, labelValue) {
            const label = document.createElement('label');
            label.textContent = labelText;

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'searchType';
            input.value = labelValue;

            label.prepend(input);
            radioBlock.append(label);
        }

        createRadio('By Region', 'region');
        createRadio('By Language', 'language');

        form.append(span);
        form.append(radioBlock);
    }

    function createSelectBlock() {
        const br = document.createElement('br');        
        const span = document.createElement('span');
        span.textContent = 'Please choose search query:';

        const select = document.createElement('select');
        const option = document.createElement('option');

        select.append(option);
        select.options[0].textContent = 'Select value';
        select.disabled = true;
        
        form.append(br);
        form.append(span);
        form.append(select);
    }
    
    createSearchTypeBlock();
    createSelectBlock();
    
    document.body.firstElementChild.append(form);
}

function getSelectOptions(e) {
    function getList(searchType) {  
        let list;      
        if (searchType === 'region') {
            list = externalService.getRegionsList();
        } if (searchType === 'language') {
            list = externalService.getLanguagesList();
        }
        
        return list;
    }

    function fillSelect(arr) {
        const select = document.querySelector('select');
        select.disabled = false;
        select.innerHTML = '<option>Select value</option>';        
        select.options[0].selected = true;
        
        for (let i = 0; i < arr.length; i++) {            
            const option = document.createElement('option');
            option.value = arr[i];
            option.textContent = arr[i];
            select.append(option);           
        }
    }

    function showMassage() {
        if (document.querySelector('p')) {
            document.querySelector('p').remove();
        }
        const p = document.createElement('p');
        p.textContent = 'No items, please choose search query';
        p.classList.add('message');
        document.querySelector('header').after(p);
    }
   
    const chosenOne = e.target.value;
    const optionsList = getList(chosenOne);  
    fillSelect(optionsList);    
    
    if (document.querySelector('table') !== null) {        
        document.querySelector('table').remove();
    }
    showMassage();
    
    regionOrLanguage = e.target.value;    
}

function buildTable(e) {
    
    const selection = e.target.value;    
    if (regionOrLanguage === 'language') {
        tableList = externalService.getCountryListByLanguage(selection);
    }
    if (regionOrLanguage === 'region') {
        tableList = externalService.getCountryListByRegion(selection);
    }
               
    if (document.querySelector('table') !== null) {        
        document.querySelector('table').remove();
    }
    document.querySelector('p').textContent = '';

    let table = document.createElement('table');
    
    tHead = getTHead();
    table.append(tHead);

    const tBody = document.createElement('tBody');
    tableList.forEach(country => {
        tBody.append( getRow(country) );
    });
    table.append(tBody);

    document.querySelector('header').after(table);    

    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(elem => elem.addEventListener('click', sort));
}

function getTHead() {
    let tHead = document.createElement('tHead'); 
    const arrowsBlock =`<div class="wrapper-arrows">
        <div class="arrow" data-order="1">&#9650</div>
        <div  class="arrow" data-order="-1">&#9660</div>
    </div>`;

    tHead.innerHTML = `<tr>
            <th data-column="name">Country name ${arrowsBlock}</th>
            <th>Capital</th>
            <th>Word Region</th>
            <th>Languages</th>
            <th data-column="area">Area  ${arrowsBlock}</th>
            <th>Flag</th>
        </tr>`;  
        
    return tHead;
}

function getRow(country) {
    let row = document.createElement('tr'); 

    const img = document.createElement('img');
    img.alt = `${country.name} flag`;
    img.src = country.flagURL;
            
    row.innerHTML = `
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${country.region}</td>
        <td>${Object.values(country.languages)}</td>
        <td>${country.area}</td>
        <td style='min-width: 120px'></td>
    `   
   
    row.lastElementChild.append(img);
    return row; 
}

function sort(e) {
    const colToSort = e.target.parentElement.parentElement.dataset.column;
    const orderModifier = +e.target.dataset.order;

    tableList.sort((a, b) => a[colToSort] > b[colToSort] ? orderModifier : -orderModifier);
   
    const tBody = document.querySelector('tBody');
    tBody.innerHTML = '';   

    tableList.forEach(country => {
        tBody.append( getRow(country) );
    });
        
    const arrows = document.querySelectorAll('.arrow');   
    arrows.forEach(arrow => {
        arrow.style.display = 'block';
    });
    const activeArrow = e.target;
    activeArrow.style.display = 'none';
}

createHeader();
createForm();
let regionOrLanguage = '';

document.querySelector('.radios').addEventListener('change', getSelectOptions);
document.querySelector('select').addEventListener('change', buildTable);
