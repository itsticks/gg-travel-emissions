const createCalculatorFormElement = ()=>{

    const main = document.getElementById('main');
    let forms = [].slice.call(main.getElementsByClassName('form'));
    let id = forms.length + 1;

    let update = (ddIndex)=>{
        if (ddIndex == undefined) {
            ddIndex = ddSelects.length - 1;
        }
        ddSelects.filter((select,j)=>j > ddIndex).map((select,j)=>{

            let keyMatchItem = ddSelects[ddIndex].value;
            let keyMatches = Object.keys(data).filter(dataKey=>dataKey.split("|")[ddIndex] === keyMatchItem);

            select.value = '';
            select.disabled = true;
            select.style.display = 'none';
            let ddOptions = [].slice.call(select.childNodes).map((option,k)=>{
                option.style.display = 'none';
                option.disabled = true;
                if (keyMatches.filter(key=>key.split('|').includes(option.value))[0] !== undefined) {
                    option.style.display = 'block';
                    option.disabled = false;
                    if (select.value == '') {
                        select.value = option.value
                    }
                }
                return option;
            }
            );
            if (ddOptions.filter(x=>x.disabled == false).length > 0) {
                select.disabled = false;
                select.style.display = 'block';
            }
            return
        }
        );
        //adjust km-based values for miles
        var milesMultiplier = 1;
        if (measurementSelect.value == 'miles') {
            milesMultiplier = 1.609344;
        }

        let key = ddSelects.reduce((accum,select)=>{
            return accum += (select.value + '|')
        }
        , "").replace(/\|+$/, "");
        let emissions = data[key];
        resultElement.textContent = '';
        if (emissions != undefined) {
            Object.keys(emissions).map(k=>{
                let emissionValue = (emissions[k] * distanceInput.value)* milesMultiplier;

                console.log(key, emissions[k], distanceInput.value, milesMultiplier, emissionValue);

                let listElement = document.createElement('li');
                let listElementText = emissions[k] != null ? `${emissionValue} ${k}` : 'no data';
                listElement.append(document.createTextNode(listElementText));
                resultElement.append(listElement);
            }
            )
        }
    }

    let formElement = document.createElement('form');
    formElement.className = 'form';

    let fieldsetElement = document.createElement('fieldset');

    let optionGroups = Object.keys(data).reduce((accum,dataKey)=>{
        let dataKeyParts = dataKey.split('|');
        dataKeyParts.map((part,j)=>{
            if (accum[j] === undefined) {
                accum[j] = []
            }
            if (!accum[j].includes(part)) {
                accum[j].push(part)
            }
        }
        )
        return accum;
    }
    , []);

    let ddSelects = optionGroups.map((optionGroup,i)=>{

        let dropdown = document.createElement('div');
        let ddLabel = document.createElement('label');
        let ddSelect = document.createElement('select');

        optionGroup.map((optionName,j)=>{
            let ddOption = document.createElement('option');
            ddOption.append(document.createTextNode(optionName));
            ddOption.value = optionName;
            ddSelect.append(ddOption);
            return;
        }
        )

        dropdown.append(ddLabel, ddSelect);
        fieldsetElement.append(dropdown);

        return ddSelect;
    }
    );

    let distance = document.createElement('div');
    let distanceInput = document.createElement('input');
    let measurementSelect = document.createElement('select');
    let measurementOptions = ['miles', 'km'].map(m=>{
        let option = document.createElement('option');
        option.value = m;
        option.append(document.createTextNode(m));
        measurementSelect.append(option);
        return option;
    }
    )
    distanceInput.type = 'number';
    distanceInput.value = 100;
    distanceInput.step = 5;
    distance.append(distanceInput, measurementSelect);

    fieldsetElement.append(distance);

    let resultElement = document.createElement('ul');
    resultElement.id = 'result-' + id;

    formElement.append(fieldsetElement, resultElement);

    ddSelects.forEach((ddSelect,i)=>{
        ddSelect.onchange = ()=>{
            update(i);
        }
    }
    );

    distanceInput.oninput = update;
    measurementSelect.onchange = update;
    main.append(formElement);
    update(0);

}

createCalculatorFormElement();
document.getElementById('copy').onclick = createCalculatorFormElement;
