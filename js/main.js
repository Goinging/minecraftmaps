const map = L.map("map", {
    minZoom: 14,
    maxZoom: 15
});

map.setView([44.068,-123.118], 14);

L.tileLayer('https://api.mapbox.com/styles/v1/goinging/cloy47qf100al01r67k1f6l1i/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29pbmdpbmciLCJhIjoiY2xvaXlvNTYzMDBrMTJrc2I3Z2s2cjFtbiJ9.hZslmiJpn9kpQtAgOFI23A').addTo(map);

fetch('data/classified.geojson')
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.Class_name) {
                let popupContent = '';
                if (feature.properties.Class_name === 'Tree/Leaves') {
                    popupContent = `<div> 
                        <h3>Leaves</h3>
                        <img src="minecraftmaps/img/Leaves" style="width: 150px; height: 150px"> 
                    </div>`;
                } else if (feature.properties.Class_name === 'Pumpkins') {
                    popupContent = `<div> 
                    <h3>Pumpkin</h3>
                    <img src="minecraftmaps/img/Pumpkin.png" style="width: 150px; height: 150px"> 
                </div>`;
                } else if (feature.properties.Class_name === 'Grass Block') {
                    popupContent = `<div> 
                        <h3>Grass Block</h3>
                        <img src="minecraftmaps/img/Grass Block.png" style="width: 150px; height: 150px"> 
                    </div>`;
                } else if (feature.properties.Class_name === 'Sand') {
                    popupContent = `<div> 
                    <h3>Sand</h3>
                    <img src="minecraftmaps/img/sand.png" style="width: 150px; height: 150px"> 
                </div>`;
                } else if (feature.properties.Class_name === 'Stone/Gravel') {
                    popupContent = `<div class="popup-container image-container"> 
                        <h3>Stone and Gravel</h3>
                        <img src="minecraftmaps/img/stone.png" style="width: 150px; height: 150px">
                        <img src="minecraftmaps/img/Gravel.png" style="width: 150px; height: 150px">
                    </div>`;
                } else if (feature.properties.Class_name === 'Water') {
                    popupContent = `<div> 
                    <h3>Water</h3>
                    <img src="minecraftmaps/img/water.png" style="width: 150px; height: 150px"> 
                </div>`;
                }
                currentLayer = layer;
                layer.on({
                    mouseover: function (e) {
                        if (currentLayer) {
                            currentLayer.setStyle({ fillColor: 'transparent', color: 'transparent'});
                        }
                        layer.setStyle({ fillColor: 'transparent', color: 'white', weight: 0.4 });
                        layer.bindPopup(popupContent, { maxWidth: 400, maxHeight: 300, autoPan: false}).openPopup(e.latlng);
                        currentLayer= layer;
                    },
        
                    mouseout: function () {
                        if (currentLayer === layer) {
                            currentLayer.setStyle({ fillColor: 'transparent', color: 'transparent'});
                            currentLayer.closePopup();
                            currentLayer = null;
                        }
                    }
                });
            }
        },
        style: function () {
            return { color: 'transparent', fillColor: 'transparent' };
        }
    }).addTo(map);
});
