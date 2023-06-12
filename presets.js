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
    add_circs({num: 27});
    add_layer({circs: 1, color: "#f080f0"});
    add_circs({num: 15});
    add_layer({circs: 2, color: "#f0f080"});
}

function preset_solar() {
    clear();
    set_background("#202020");
    add_circs({num: 10, min_rad: c.width/20, max_rad: c.width/10});
    // add_layer({circs: 0, color: "#ff0000", thresh: 0.5});
    add_layer({circs: 0, color: "#ff4000", thresh: 0.7});
    add_layer({circs: 0, color: "#ff8000", thresh: 1});
    add_layer({circs: 0, color: "#ffc000", thresh: 1.5});
}

function random_preset() {
    let r = randint(0, 2);
    switch(r) {
        case 0:
            preset_cmyk();
            break;
        case 1:
            preset_solar();
            break;
    }
}

random_preset();