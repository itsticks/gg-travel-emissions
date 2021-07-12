// values are all per km so the code adjusts for miles
// using businessTravelEmissions.json data because passengerVehiclesEmissions.json assumes electric/hybrid energy is included 
// in their household energy already thus has 0 values for electric and lesser values for hybrids
const data = { "Mini|Diesel": { "kg CO2e": 0.1063, "kg CO2": 0.10442, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Mini|Petrol": { "kg CO2e": 0.1361, "kg CO2": 0.13542, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Mini|Unknown": { "kg CO2e": 0.13579, "kg CO2": 0.1351, "kg CH4": 0.00031, "kg N2O": 0.00038 }, "Mini|Plug-in Hybrid Electric Vehicle": { "kg CO2e": null, "kg CO2": null, "kg CH4": null, "kg N2O": null }, "Mini|Battery Electric Vehicle": { "kg CO2e": 0.04391, "kg CO2": 0.04347, "kg CH4": 0.00016, "kg N2O": 0.00028 }, "Supermini|Diesel": { "kg CO2e": 0.13078, "kg CO2": 0.1289, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Supermini|Petrol": { "kg CO2e": 0.1513, "kg CO2": 0.15062, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Supermini|Unknown": { "kg CO2e": 0.14822, "kg CO2": 0.14736, "kg CH4": 0.00027, "kg N2O": 0.00059 }, "Supermini|Plug-in Hybrid Electric Vehicle": { "kg CO2e": "0.05568", "kg CO2": "0.0552", "kg CH4": "0.0002", "kg N2O": "0.00028" }, "Supermini|Battery Electric Vehicle": { "kg CO2e": 0.04616, "kg CO2": 0.04569, "kg CH4": 0.00017, "kg N2O": 0.0003 }, "Lower medium|Diesel": { "kg CO2e": 0.14307, "kg CO2": 0.14119, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Lower medium|Petrol": { "kg CO2e": 0.17497, "kg CO2": 0.17429, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Lower medium|Unknown": { "kg CO2e": 0.15903, "kg CO2": 0.15775, "kg CH4": 0.00016, "kg N2O": 0.00112 }, "Lower medium|Plug-in Hybrid Electric Vehicle": { "kg CO2e": "0.08876", "kg CO2": "0.08812", "kg CH4": "0.0003", "kg N2O": "0.00034" }, "Lower medium|Battery Electric Vehicle": { "kg CO2e": 0.05256, "kg CO2": 0.05202, "kg CH4": 0.0002, "kg N2O": 0.00034 }, "Upper medium|Diesel": { "kg CO2e": 0.15955, "kg CO2": 0.15767, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Upper medium|Petrol": { "kg CO2e": 0.20359, "kg CO2": 0.20291, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Upper medium|Unknown": { "kg CO2e": 0.169, "kg CO2": 0.16737, "kg CH4": 0.00007, "kg N2O": 0.00156 }, "Upper medium|Plug-in Hybrid Electric Vehicle": { "kg CO2e": "0.09271", "kg CO2": "0.09203", "kg CH4": "0.00031", "kg N2O": "0.00037" }, "Upper medium|Battery Electric Vehicle": { "kg CO2e": 0.03883, "kg CO2": 0.03843, "kg CH4": 0.00015, "kg N2O": 0.00025 }, "Executive|Diesel": { "kg CO2e": 0.17399, "kg CO2": 0.17211, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Executive|Petrol": { "kg CO2e": 0.22342, "kg CO2": 0.22274, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Executive|Unknown": { "kg CO2e": 0.18577, "kg CO2": 0.18417, "kg CH4": 0.00008, "kg N2O": 0.00152 }, "Executive|Plug-in Hybrid Electric Vehicle": { "kg CO2e": "0.09409", "kg CO2": "0.09337", "kg CH4": "0.00031", "kg N2O": "0.00041" }, "Executive|Battery Electric Vehicle": { "kg CO2e": 0.05122, "kg CO2": 0.0507, "kg CH4": 0.00019, "kg N2O": 0.00033 }, "Luxury|Diesel": { "kg CO2e": 0.21174, "kg CO2": 0.20986, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Luxury|Petrol": { "kg CO2e": 0.32586, "kg CO2": 0.32518, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Luxury|Unknown": { "kg CO2e": 0.26579, "kg CO2": 0.26448, "kg CH4": 0.00015, "kg N2O": 0.00116 }, "Luxury|Plug-in Hybrid Electric Vehicle": { "kg CO2e": "0.11788", "kg CO2": "0.11704", "kg CH4": "0.0004", "kg N2O": "0.00044" }, "Luxury|Battery Electric Vehicle": { "kg CO2e": 0.05983, "kg CO2": 0.05922, "kg CH4": 0.00022, "kg N2O": 0.00039 }, "Sports|Diesel": { "kg CO2e": 0.16664, "kg CO2": 0.16476, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Sports|Petrol": { "kg CO2e": 0.24266, "kg CO2": 0.24198, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Sports|Unknown": { "kg CO2e": 0.23053, "kg CO2": 0.22966, "kg CH4": 0.00027, "kg N2O": 0.0006 }, "Sports|Plug-in Hybrid Electric Vehicle": { "kg CO2e": "0.09487", "kg CO2": "0.0942", "kg CH4": "0.00032", "kg N2O": "0.00035" }, "Sports|Battery Electric Vehicle": { "kg CO2e": 0.07474, "kg CO2": 0.07398, "kg CH4": 0.00028, "kg N2O": 0.00048 }, "Dual purpose 4X4|Diesel": { "kg CO2e": 0.20376, "kg CO2": 0.20188, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "Dual purpose 4X4|Petrol": { "kg CO2e": 0.21658, "kg CO2": 0.2159, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "Dual purpose 4X4|Unknown": { "kg CO2e": 0.20716, "kg CO2": 0.20559, "kg CH4": 0.00009, "kg N2O": 0.00148 }, "Dual purpose 4X4|Plug-in Hybrid Electric Vehicle": { "kg CO2e": "0.10701", "kg CO2": "0.10622", "kg CH4": "0.00036", "kg N2O": "0.00043" }, "Dual purpose 4X4|Battery Electric Vehicle": { "kg CO2e": 0.06819, "kg CO2": 0.06749, "kg CH4": 0.00026, "kg N2O": 0.00044 }, "MPV|Diesel": { "kg CO2e": 0.17503, "kg CO2": 0.17315, "kg CH4": 0.000004, "kg N2O": 0.00188 }, "MPV|Petrol": { "kg CO2e": 0.19479, "kg CO2": 0.19411, "kg CH4": 0.00032, "kg N2O": 0.00036 }, "MPV|Unknown": { "kg CO2e": 0.18031, "kg CO2": 0.17874, "kg CH4": 0.00009, "kg N2O": 0.00148 }, "MPV|Plug-in Hybrid Electric Vehicle": { "kg CO2e": null, "kg CO2": null, "kg CH4": null, "kg N2O": null }, "MPV|Battery Electric Vehicle": { "kg CO2e": 0.06907, "kg CO2": 0.06837, "kg CH4": 0.00026, "kg N2O": 0.00044 } };
const main = document.getElementById('main');

const addFormElementToPage = () => {

let forms = [].slice.call(main.getElementsByClassName('form'));
let id = forms.length + 1;
let formElement = document.createElement('form');
formElement.className = 'form';
formElement.innerHTML = `
<fieldset>
<label for='carSize-${id}'>Vehicle</label>
<select id='carSize-${id}'>
    <option>Mini</option>
    <option>Supermini</option>
    <option>Lower medium</option>
    <option>Upper medium</option>
    <option>Executive</option>
    <option>Luxury</option>
    <option>Sports</option>
    <option>Dual purpose 4X4</option>
    <option>MPV</option>
</select>
</fieldset>

<fieldset>
<label for='engineType-${id}'>Engine</label>
<select id='engineType-${id}'>
    <option>Petrol</option>
    <option>Diesel</option>
    <option>Battery Electric Vehicle</option>
    <option>Plug-in Hybrid Electric Vehicle</option>
    <option>Unknown</option>

</select>
</fieldset>

<fieldset>
<label for='distance-${id}'>Distance</label>
<input type='number' id='distance-${id}' value='10' step='5' />
<select id='measurement-${id}'>
    <option>km</option>
    <option>miles</option>
</select>
</fieldset>

<fieldset>
<ul id='result-${id}'>
</ul>
</fieldset>`;

let updateResult = ()=>{
    document.getElementById(`result-${id}`).innerHTML = '';
    var milesMultiplier = 1;

    //adjust km values for miles
    if(document.getElementById(`measurement-${id}`).value=='miles'){
        milesMultiplier = 1.609344;
    }

    let emissions = data[`${document.getElementById(`carSize-${id}`).value}|${document.getElementById(`engineType-${id}`).value}`];

    Object.keys(emissions).map(k=>{
        let emissionValue = emissions[k]*document.getElementById(`distance-${id}`).value;
        let listElement = document.createElement('li');
        let listElementText = emissions[k] != null ? `${(parseFloat(emissionValue) * milesMultiplier)} ${k}` : 'no data';
        listElement.append(document.createTextNode(listElementText));
        document.getElementById(`result-${id}`).append(listElement);
    })
}


main.append(formElement);

formElement.onchange = updateResult;
formElement.onkeyup = updateResult;

updateResult();

}

addFormElementToPage();

document.getElementById('copy').onclick = addFormElementToPage;
