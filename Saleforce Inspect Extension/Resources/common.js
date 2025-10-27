//
//  content.js
//  Saleforce Inspect
//
//  Created by Soulberto Lorenzo on 27/10/25.
//

const PREFIX = "SF Inspect";

const root = this;

const MOON_ICON = `<svg  style="height: 1em; margin-right: 5px;" class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M524.8 938.666667h-4.266667a439.893333 439.893333 0 0 1-313.173333-134.4 446.293333 446.293333 0 0 1-11.093333-597.333334 432.213333 432.213333 0 0 1 170.666666-116.906666 42.666667 42.666667 0 0 1 45.226667 9.386666 42.666667 42.666667 0 0 1 10.24 42.666667 358.4 358.4 0 0 0 82.773333 375.893333 361.386667 361.386667 0 0 0 376.746667 82.773334 42.666667 42.666667 0 0 1 54.186667 55.04A433.493333 433.493333 0 0 1 836.266667 810.666667a438.613333 438.613333 0 0 1-311.466667 128z" /></svg>`;

const LEFT_ARROW_ICON = `<svg style="transform: rotate(-180deg);" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="8" height="16" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"/></svg>`;

const RIGHT_ARROW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="8" height="16" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"/></svg>`

const MAXIMIZE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="10" height="10" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <style type="text/css">
        .st0{fill:#212121;}
    </style>
    <g>
        <path class="st0" d="M270.17,0l214.94,0.04l3.44,0.39l2.49,0.56l2.96,0.98l2.54,1.15l1.81,1.01l1.78,1.18l1.82,1.42l1.8,1.66   l2.69,3.12l2.04,3.16l1.52,3.21l1.01,3l0.44,1.85l0.26,1.49l0.31,4.22v213.46c0,15.71-12.74,28.45-28.45,28.45   c-14.59,0-26.61-10.98-28.26-25.13l-0.19-3.32l-0.01-144.79l-358,357.97l144.72,0.01c14.59,0,26.61,10.98,28.25,25.13l0.19,3.32   c0,14.59-10.98,26.61-25.13,28.26l-3.32,0.19l-215.08-0.05l-2.72-0.29l-2.18-0.43l-2.2-0.62l-1.96-0.72l-2.56-1.2l-2.55-1.53   l-2.6-1.98l0.92,0.76l-4.74-4.71l-1.45-2l-1.1-1.81l-0.94-1.83l-0.96-2.32l-0.71-2.26l-0.67-3.18l-0.21-1.74l-0.11-2.54V270.09   c0-15.71,12.74-28.45,28.45-28.45c14.59,0,26.61,10.98,28.26,25.13l0.19,3.32v144.75L414.86,56.89H270.17   c-14.59,0-26.61-10.98-28.26-25.13l-0.19-3.32C241.72,12.74,254.46,0,270.17,0z"/>
    </g>
    </svg>`;

const NEW_WINDOW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="10" height="10" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <style type="text/css">
        .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#1D1D1D;}
    </style>
    <g>
        <path class="st0" d="M455.11,455.11H56.89V56.89H256V0H56.89C25.31,0,0,25.61,0,56.89v398.22C0,486.39,25.31,512,56.89,512h398.22   c31.28,0,56.89-25.61,56.89-56.89V256h-56.89V455.11z M312.89,0v56.89H415L135.39,336.5l40.11,40.11L455.11,97v102.11H512V0H312.89   z"/>
    </g>
    </svg>`;

function print(messge) {
    console.log(PREFIX + ": ", messge);
}

function error(message) {
    console.log("[E] " + PREFIX + ": ", messge);
}

function isSandbox() {
    try {
        return /.*(\.sandbox\.).*/.test(window.location.href);
    } catch(err) {
        print(err);
    }
    return false;
}

print('Loaded common.js');
