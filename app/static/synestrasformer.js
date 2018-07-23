function get_mapping() {
    var targets = document.getElementById('color-mapping').getElementsByClassName("colormap");
    var mapping = {};
    for (let div of targets) {
        name = div.getElementsByTagName('label')[0].textContent;
        color = div.getElementsByTagName('input')[0].value;
        mapping[name] = color;
    }
    return mapping;
}

function get_text() {
    return document.getElementById('textbox').value;
}

function preprocess_character(char) {
    char = char.toLowerCase();

    char = char.replace(/[á]/g, "a");
    char = char.replace(/[é]/g, "é");
    char = char.replace(/[í]/g, "i");
    char = char.replace(/[óöő]/g, "o");
    char = char.replace(/[úüű]/g, "u");

    return char
}

function transform(text, mapping) {
    var transformed = '';
    text.split('').map(function(char){
        var normed = preprocess_character(char);
        var colorcode = mapping.hasOwnProperty(normed) ? mapping[normed] : '#FFF';
        transformed += '<span style="background-color: ' + colorcode + '">' + char + "</span>";
    });
    var target = document.getElementById('output')
    target.innerHTML = transformed;
}

function save_mapping(mapping) {
    console.log('SAVING COLORS...')
    bake_cookie('color_mapping', mapping);
}

function load_mapping() {
    console.log('CHECKING FOR COLORS...')
    var mapping = read_cookie('color_mapping');
    if (mapping) {
        console.log('LOADING COLORS...')
        for (key in mapping) {
            var value = mapping[key];
            var target = document.getElementById('char-' + key).getElementsByTagName('input')[0];
            target.value = value;
        }
    }
}

function copy_mapping_to_clipboard(mapping) {
    console.log('COPYING TO CLIPBOARD...')
    navigator.clipboard.writeText(JSON.stringify(mapping));
}
