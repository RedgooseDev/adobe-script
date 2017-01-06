function getLayerSize(layer) {
    var lengthWidth = layer.bounds[2]-layer.bounds[0];
    var lengthHeight = layer.bounds[3]-layer.bounds[1];
    var width = layer.bounds[3]-layer.bounds[1];
    var height = layer.bounds[2]-layer.bounds[0];

    lengthWidth = lengthWidth.toString().replace(' px', '');
    lengthHeight = lengthHeight.toString().replace(' px', '');
    width = width.toString().replace(' px', '');
    height = height.toString().replace(' px', '');

    return Array(height, width); // 거꾸로 되어있음;; 귀찮아..
}

function MoveLayerTo(fLayer,fX,fY) {

  var Position = fLayer.bounds;

  Position[0] = fX - Position[0];
  Position[1] = fY - Position[1];

  fLayer.translate(-Position[0],-Position[1]);
}


// set original document
var originalDocument = activeDocument;

// set symbol file
var fileRef = File('/Users/redgoose/Dropbox/Assets/images/Redgoose-mini.png');
var doc = open(fileRef);
doc.changeMode(ChangeMode.RGB);
doc.bitsPerChannel = BitsPerChannelType.EIGHT;
doc.artLayers.add();
doc.mergeVisibleLayers();

// rename layer; duplicate to new document
var layer = doc.activeLayer;
layer.name = 'symbol';
layer.duplicate(originalDocument, ElementPlacement.PLACEATBEGINNING);

// close imported document
doc.close(SaveOptions.DONOTSAVECHANGES);


// move symbol
var symbolLayer = activeDocument.artLayers.getByName('symbol');
var layerSize = getLayerSize(symbolLayer);
MoveLayerTo(
    symbolLayer,
    (Number(originalDocument.width) - layerSize[0] - 10),
    (Number(originalDocument.height) - layerSize[1] - 10)
);

// change opacity
symbolLayer.opacity = 50;
