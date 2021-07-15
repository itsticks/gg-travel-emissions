const createCalculatorFormElement = ()=>{

    const main = document.getElementById('main');
    let forms = [].slice.call(main.getElementsByClassName('form'));
    let id = forms.length + 1;


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
    
    optionGroups.push(['miles','km'])

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
        let distanceLabel = document.createElement('label');
        let distanceInput = document.createElement('input');
        distanceInput.type = 'number';
    distanceInput.value = 100;
    distanceLabel.append(document.createTextNode('Distance'));
    distance.append(distanceLabel,distanceInput);
        
    fieldsetElement.append(distance);

    let resultElement = document.createElement('ul');
    resultElement.id = 'result-' + id;

    formElement.append(fieldsetElement, resultElement);

    ddSelects.forEach((ddSelect,i)=>{
        ddSelect.onchange = () => {
            ddSelects.filter((select, j, arr) => j > i && j < arr.length - 1).map((select, j) => {
                let keyMatches = Object.keys(data)
                    //  .filter(dataKey => dataKey.includes(select.value))
                    .map(x => x.split('|')[i + j]);
                [].slice.call(select.childNodes).map((option, k) => {
                    // option.style.display = 'block';
                    option.disabled = false;
                    if (!keyMatches.includes(option.innerHTML)) {
                        // option.style.display = 'none';
                        option.disabled = true;
                    }
                    return
                }
                );
                return
            }
            );
            //adjust km-based values for miles
            var milesMultiplier = 1;
            // if(document.getElementById(`measurement-${id}`).value=='miles'){
            milesMultiplier = 1.609344;
            //  }

            let key = ddSelects.filter((x,i,arr)=>i<arr.length-1).reduce((accum, select) => {
                return accum += (select.value + '|')
            },""
            )
        .replace(/\|+$/, "");
            console.log(key)
            let emissions = data[key];
            console.log(ddSelects[0],key, emissions)
            resultElement.textContent = '';
            if (emissions != undefined) {
                Object.keys(emissions).map(k=>{
                    let emissionValue = emissions[k] * distanceInput.value;
                    let listElement = document.createElement('li');
                    let listElementText = emissions[k] != null ? `${(parseFloat(emissionValue) * milesMultiplier)} ${k}` : 'no data';
                    listElement.append(document.createTextNode(listElementText));
                    resultElement.append(listElement);
                }
                )
            }

        }
        ;
    }
    )

    main.append(formElement);

    // formElement.onchange = updateResult;
    // formElement.onkeyup = updateResult;

    // updateResult();

}

createCalculatorFormElement();

document.getElementById('copy').onclick = createCalculatorFormElement;
