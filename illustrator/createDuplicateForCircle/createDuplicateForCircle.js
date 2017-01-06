// creating a document
var doc = null;
if ( app.documents && app.documents.length > 0 ) {
    doc = app.activeDocument;
} else {
    doc = app.documents.add();
}

// set artboard
var artboard = getActiveArtboard();


// get active artboard
function getActiveArtboard()
{
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var result = {};
    var ab = {};

    ab.left = Math.round(artboard.artboardRect[0]);
    ab.leftTop = Math.round(artboard.artboardRect[1]);
    ab.right = Math.round(artboard.artboardRect[2]);
    ab.rightBottom = Math.round(artboard.artboardRect[3]);

    result.x = ab.left;
    result.y = -ab.leftTop;
    result.width = ab.right - ab.left;
    result.height = ab.leftTop - ab.rightBottom;

    return result;
}


// hex code to rgb
function hexToRgb(hex)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


// create duplicate for circle
function createDuplicateForCircle(options)
{
    var group = doc.groupItems.add();

    for (var j = 0; j < options.countForCircle; j++)
    {
        var subgroup = group.groupItems.add();

        for (i = 0; i < options.countForItem; i++)
        {
            var ray = null;

            // set shape
            switch(options.shape) {
                case 'circle':
                    ray = subgroup.pathItems.ellipse(0, 0, options.size, options.size);
                    break;
                case 'line':
                    ray = subgroup.pathItems.add();
                    ray.setEntirePath([ [0, 0], [0, options.size]]);
                    break;
                case 'rectangle':
                    ray = subgroup.pathItems.rectangle(0, 0, options.size, options.size);
                    break;
            }

            // color
            var fillColorRef = new RGBColor;
            fillColorRef.red = hexToRgb(options.fillColor).r;
            fillColorRef.green = hexToRgb(options.fillColor).g;
            fillColorRef.blue = hexToRgb(options.fillColor).b;
            ray.fillColor = fillColorRef;

            // border
            if (options.strokeColor && (options.strokeWidth > 0))
            {
                var borderColorRef = new RGBColor;
                borderColorRef.red = hexToRgb(options.strokeColor).r;
                borderColorRef.green = hexToRgb(options.strokeColor).g;
                borderColorRef.blue = hexToRgb(options.strokeColor).b;
                ray.strokeColor = borderColorRef;
            }
            else
            {
                var noColor = new NoColor();
                ray.strokeColor = noColor;
            }
            ray.strokeWidth = (options.strokeWidth > 0) ? options.strokeWidth : 0;

            // rotate shape
            switch(options.rotateMathod) {
                case 'random':
                    ray.rotation = Math.random() * 360;
                    break;
                default:
                    ray.rotation = (360 / options.countForItem) * i;
                    break;
            }
            ray.rotate(ray.rotation, true, true, true, true, Transformation.BOTTOM);

            // set margin
            var displacement = (options.size + options.offset) * (j + 1) + options.innerOffset;

            var dx =  displacement * Math.sin( (180 + ray.rotation) * Math.PI / 180 );
            var dy =- displacement * Math.cos( (180 + ray.rotation) * Math.PI / 180 );

            ray.translate(dx, dy);
        }
    }

    // change position
    if (options.groupPosition && options.groupPosition.constructor == Array)
    {
        group.left = options.groupPosition[0];
        group.top = -options.groupPosition[1];
    }
    else
    {
        group.left = Math.round((artboard.width * 0.5) - (group.width * 0.5) + artboard.x);
        group.top = Math.round((group.height * 0.5) - (artboard.height * 0.5) - artboard.y);
    }
}


// act func
createDuplicateForCircle({
    groupPosition : null, // [10, 10], null
    countForItem : 32,
    countForCircle : 5,
    offset: 2,
    innerOffset: 40,
    rotateMathod: null, // random, null
    fillColor: '#ff0000',
    shape: 'rectangle', // line, rectangle, circle
    size: 5,
    strokeWidth : 0,
    strokeColor : '#000000',
});
