import L from 'leaflet';
export const legend = new L.Control({position: 'topright'});
legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info');
    div.innerHTML = '<span class="titlePopup">Edad Individuos</span>' +
        '<table style="margin: auto;">' +
        '<td style="text-align: center">> 19</td><td><div class="circulo rosa"></div></td></tr><tr>' +
        '<td>20 - 29</td><td><div class="circulo celeste"></div></td></tr><tr>' +
        '<td>30 - 39</td><td><div class="circulo cafe"></div></td></tr><tr>' +
        '<td>40 - 49</td><td><div class="circulo oro"></div></td></tr><tr>' +
        '<td>50 - 59</td><td><div class="circulo cyan"></div></td></tr><tr>' +
        '<td>60 - 69</td><td><div class="circulo blanco"></div></td></tr><tr>' +
        '<td style="text-align: center">70 > </td><td><div class="circulo verde-edad"></div></td></tr>' +
        '</table>';
    return div;
};