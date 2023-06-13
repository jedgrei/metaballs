function clear() {
    set_background("e0e0e0");
    all_circs = [];
    all_layers = [];
}

function preset_cmyk() {
    clear();
    set_background("#202020");
    add_circs({num: 40});
    add_layer({circs: 0, color: "#80f0f0"});
    add_circs({num: 30});
    add_layer({circs: 1, color: "#f080f0"});
    add_circs({num: 20});
    add_layer({circs: 2, color: "#f0f080"});
}

function preset_solar() {
    clear();
    set_background("#202020");
    add_circs({num: 10, min_rad: max_dim/20, max_rad: max_dim/10});
    // add_layer({circs: 0, color: "#ff0000", thresh: 0.5});
    add_layer({circs: 0, color: "#ff4000", thresh: 0.7});
    add_layer({circs: 0, color: "#ff8000", thresh: 1});
    add_layer({circs: 0, color: "#ffc000", thresh: 1.5});
}

function preset_watermelon() {
    clear();
    set_background("#202020");
    add_circs({num: 25, min_rad: max_dim/30, max_rad: max_dim/15});
    add_layer({circs: 0, color: "#00c040", thresh: 1})
    add_layer({circs: 0, color: "#ff60a0", thresh: 1.3})
    add_layer({circs: 0, color: "#ff70b0", thresh: 1.7})
    add_circs({num: 20, min_rad: max_dim/60, max_rad: max_dim/60, vel: max_dim/100});
    add_layer({circs: 1, color: "#202020", thresh: 1})
}

function preset_purple() {
    clear();
    set_background("#1b1a1d");
    add_circs({num:50});
    add_layer({circs:0, color:"#a26ff2"});
}

const presets = {
    "cmyk": preset_cmyk,
    "solar": preset_solar,
    "watermelon": preset_watermelon,
    "purple": preset_purple,
}

function random_preset() {
    let r = randint(0, 4);
    switch(r) {
        case 0:
            preset_cmyk();
            break;
        case 1:
            preset_solar();
            break;
        case 2:
            preset_watermelon();
            break;
        case 3:
            preset_dark();
            break;
    }
}

const url_params = new URLSearchParams(window.location.search);

if(url_params.has("preset")) {
    presets[url_params.get("preset")]();
}
else {
    random_preset();
}
