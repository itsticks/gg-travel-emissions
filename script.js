const createCalculatorFormElement = () => {

    const main = document.getElementById('main');
    let forms = [].slice.call(main.getElementsByClassName('form'));
    let id = forms.length + 1;

    let updateResult = () => {
        
    document.getElementById(`result-${id}`).innerHTML = '';
    
    //adjust km-based values for miles
    var milesMultiplier = 1;
    if(document.getElementById(`measurement-${id}`).value=='miles'){
        milesMultiplier = 1.609344;
    }
     
        //todo need to get key dynamically with a .map of the select and strip the || things
    let key = `${document.getElementById(`mode-${id}`).value}|${document.getElementById(`type-${id}`).value}|${document.getElementById(`variant-${id}`).value}`.replace(/\|+$/, "");

    let emissions = data[key];

        if (emissions != undefined) {
            Object.keys(emissions).map(k => {
                let emissionValue = emissions[k] * document.getElementById(`distance-${id}`).value;
                let listElement = document.createElement('li');
                let listElementText = emissions[k] != null ? `${(parseFloat(emissionValue) * milesMultiplier)} ${k}` : 'no data';
                listElement.append(document.createTextNode(listElementText));
                document.getElementById(`result-${id}`).append(listElement);
            })
        }
}


let formElement = document.createElement('form');
    formElement.className = 'form';
    
let fieldsetElement = document.createElement('fieldset');
    
    //    let modeValue = document.getElementById(`mode-${id}`).value;
    let optionGroups = Object.keys(data).reduce((accum, dataKey) => {
        let dataKeyParts = dataKey.split('|');
        dataKeyParts.map((part,j) => {
            if (accum[j] === undefined) { accum[j] = [] }
            if (!accum[j].includes(part)) { accum[j].push(part)}
        })
        return accum;
    },[]);

    let ddSelects = optionGroups.map((optionGroup, i) => {
        
        let dropdown = document.createElement('div');
        let ddLabel = document.createElement('label');
        let ddSelect = document.createElement('select');

        optionGroup.map((optionName, j) => {
            let ddOption = document.createElement('option');
            ddOption.append(document.createTextNode(optionName));
            ddOption.value = optionName;
            ddSelect.append(ddOption);
            return;
        })

        dropdown.append(ddLabel, ddSelect);
        fieldsetElement.append(dropdown);
           
        return ddSelect;
    });

    var resultElement = document.createElement('ul');
    resultElement.id = 'result-'+id;

    formElement.append(fieldsetElement, resultElement);

    ddSelects.forEach((ddSelect,i) => {
        ddSelect.onchange = () => {
            ddSelects.filter((select, j) => j > i)
                .map((select, j) => {
                    [].slice.call(select.getElementsByTagName('option')).map((option, k) => {
                        let keyMatches = Object.keys(data)
                            .filter(dataKey => dataKey.includes(ddSelects[i]).value)
                            .map(x => x.split('|')[j]);
                        option.style.display = 'none';
                        option.disabled = true;
                        if (keyMatches.includes(option.value)) {
                            option.style.display = 'none';
                            option.disabled = true;
                        }
                        return
                    });
                    return
                });
         };
     })


    main.append(formElement);


formElement.onchange = updateResult;
formElement.onkeyup = updateResult;

updateResult();


}


createCalculatorFormElement();

document.getElementById('copy').onclick = createCalculatorFormElement;
