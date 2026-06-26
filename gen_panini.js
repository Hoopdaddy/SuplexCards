const fs = require('fs');
const path = require('path');

const HOF_RE = new RegExp(
  'Hulk Hogan|Stone Cold|Steve Austin|The Rock\\b|Undertaker|Triple H|Hunter Hearst|' +
  'Shawn Michaels|Bret.*Hart|Randy Savage|Macho Man|Ultimate Warrior|Andre The Giant|' +
  '\\bEdge\\b|Batista|Eddie Guerrero|Dusty Rhodes|Goldberg|Booker T|Rikishi|' +
  '\\bLita\\b|Trish Stratus|Diamond Dallas Page|Kurt Angle|The Godfather|Jerry Lawler|' +
  'Bruno Sammartino|Molly Holly|Iron Sheik|Don Muraco|Rick Rude|Ravishing Rick|' +
  '\\bMr\\. T\\b|Curt Hennig|Mr\\. Perfect|Freddie Blassie|Lou Albano|Jay Strongbow|' +
  'Big John Studd|Junkyard Dog|Yokozuna|British Bulldog|Road Dogg|Ted DiBiase|' +
  'Million Dollar Man|Diesel|Razor Ramon|Honky Tonk Man|Nikki Bella|Brie Bella|' +
  'Beth Phoenix|Chyna|Billy Graham|Superstar Billy Graham|Mick Foley|Mankind|' +
  'Cactus Jack|Dude Love|Rob Van Dam|Sgt\\. Slaughter|Cowboy Bob|Jimmy Hart|' +
  'Paul Bearer|Jim Duggan|Hacksaw|Gene Okerlund|Gorilla Monsoon|Torrie Wilson|' +
  'Alundra Blayze|Ron Simmons|Faarooq|Michael Hayes|Rocky Johnson|Ricky.*Steamboat|' +
  'Pat Patterson|Bushwhacker|Kevin Nash|Lex Luger|X-Pac|1-2-3 Kid|' +
  'Greg Valentine|Jake Roberts|\\bKane\\b|Jeff Jarrett|Stacy Keibler|' +
  'Nikolai Volkoff|High Chief Peter Maivia|Captain Lou Albano|Chief Jay Strongbow|' +
  'Ivory\\b|Kelly Kelly|Michelle McCool|\\bPaige\\b|Bad News Barrett|Johnny Rodz|' +
  'Stan Hansen|Ivan Putski|Dory Funk|Terry Funk|Gerald Brisco|Al Snow|' +
  'The Sandman|Teddy Long|Leilani Kai|Brian Knobbs|Jerry Sags|Brutus Beefcake|' +
  'The Boogeyman|The Hurricane\\b|Brother Love|Typhoon\\b|\\bKama\\b|' +
  'Cowboy Bob Orton|Vader\\b|Bubba Ray Dudley|William Regal|Ken Shamrock|' +
  'Sherri Martel|Miss Elizabeth|Tito Santana|Bob Backlund|Wendi Richter|' +
  'Scott Hall|Madusa|Dok Hendrix|Scott Steiner|Rick Steiner',
  'i'
);

function badge(name) {
  return HOF_RE.test(name) ? ' <span class="hof-badge">HOF</span>' : '';
}

function parseCards(setId, raw) {
  return raw.trim().split('\n').flatMap(line => {
    line = line.trim();
    if (!line.startsWith('___')) return [];
    const rest = line.slice(3).trim();
    const sp = rest.indexOf(' ');
    if (sp === -1) return [];
    const n = rest.slice(0, sp).replace(/^-/, ''); // handle "-1" style numbers
    const nm = rest.slice(sp + 1).trim().replace(/^[–\-]\s*/, ''); // strip leading dash
    const cid = `${setId}-${n}`;
    return [
      `      <div class="card-item"><input type="checkbox" id="${cid}" value="${n}">` +
      `<span class="card-num">#${n}</span>` +
      `<label for="${cid}">${nm}${badge(nm)}</label></div>`
    ];
  }).join('\n');
}

function divider(txt) {
  return `      <div class="card-item card-divider"><span>${txt}</span></div>`;
}

function makeSet(setId, year, name, sections) {
  const parts = [
    `  <div class="set-header" data-set-id="${setId}" data-year="${year}">`,
    `    <div class="set-title-row">`,
    `      <span class="set-name">${name}</span>`,
    `      <span class="set-count"></span>`,
    `    </div>`,
    `  </div>`,
    `  <div class="checklist-body" data-set-id="${setId}" data-year="${year}">`,
    `    <div class="checklist-controls">`,
    `      <button class="btn-small btn-check-all">Check All</button>`,
    `      <button class="btn-small btn-uncheck-all">Clear All</button>`,
    `      <div class="progress-bar-wrap"><div class="progress-bar" style="width:0%"></div></div>`,
    `      <span class="progress-label">0 / 0 (0%)</span>`,
    `    </div>`,
    `    <div class="card-list">`,
  ];
  for (const [label, raw] of sections) {
    parts.push(divider(label));
    parts.push(parseCards(setId, raw));
  }
  parts.push('    </div>', '  </div>');
  return parts.join('\n');
}

// ── SET DATA ──────────────────────────────────────────────────────────────────
const setsHtml = [];

// ── 2022 PANINI WWE CHRONICLES ────────────────────────────────────────────────
setsHtml.push(makeSet('chr22', '2022', '2022 Panini WWE Chronicles', [
  ['Base Chronicles — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 1 Alexa Bliss
___ 2 Happy Corbin
___ 3 Liv Morgan
___ 4 Josh Briggs
___ 5 Bam Bam Bigelow
___ 6 Molly Holly
___ 7 Robert Roode
___ 8 Bron Breakker
___ 10 Commander Azeez
___ 11 Asuka
___ 12 The Honky Tonk Man
___ 13 Mandy Rose
___ 14 Junkyard Dog
___ 15 D-Lo Brown
___ 16 Montez Ford
___ 17 R-Truth
___ 18 Angel
___ 19 Cora Jade
___ 20 Cowboy Bob Orton
___ 21 Becky Lynch
___ 22 Humberto
___ 23 Rhea Ripley
___ 24 Ken Shamrock
___ 25 Rick Steiner
___ 26 Mr. T
___ 27 Shelton Benjamin
___ 28 Angelo Dawkins
___ 29 Gable Steveson
___ 30 Dana Brooke
___ 31 Brock Lesnar
___ 32 Ilja Dragunov
___ 33 Roman Reigns
___ 34 Lex Luger
___ 35 Karrion Kross
___ 36 Mustafa Ali
___ 37 Sid Vicious
___ 38 Big Boss Man
___ 39 Bayley
___ 40 Dominik Mysterio
___ 41 Charlotte Flair
___ 42 Ivar
___ 43 Rhonda Rousey
___ 44 Ludwig Kaiser
___ 45 Hulk Hogan
___ 46 MVP
___ 47 Tamina
___ 48 Big John Studd
___ 49 Nikkita Lyons
___ 50 Don Muraco
___ 51 The American Nightmare Cody Rhodes
___ 52 Jagger Reid
___ 53 Elektra Lopez
___ 54 Mace
___ 55 Macho Man Randy Savage
___ 57 Otis
___ 58 British Bulldog
___ 59 Roxanne Perez
___ 60 Erik
___ 61 Edge
___ 62 Jey Uso
___ 63 Bret "Hit Man" Hart
___ 64 Madcap Moss
___ 65 Stone Cold Steve Austin
___ 66 Ravishing Rick Rude
___ 67 Umaga
___ 68 Captain Lou Albano
___ 69 Solo Sikoa
___ 70 Ezekiel
___ 71 Finn Balor
___ 72 Jim "The Anvil" Niedhart
___ 73 Goldberg
___ 74 Mansoor
___ 75 Triple H
___ 76 Reggie
___ 77 Vader
___ 78 Cedric Alexander
___ 79 Tony D'Angelo
___ 80 Freddie Blassie
___ 81 Gigi Dolin
___ 82 Jimmy Uso
___ 83 The Rock
___ 84 Meiko Satomura
___ 85 Ultimate Warrior
___ 86 Ridge Holland
___ 87 Xavier Woods
___ 88 Chad Gable
___ 89 Veer Mahaan
___ 90 The Godfather
___ 91 John Cena
___ 92 Jinder Mahal
___ 93 Shawn Michaels
___ 94 Michael Hayes
___ 95 Undertaker
___ 96 Road Dogg
___ 97 X-Pac
___ 98 Chief Jay Strongbow
___ 99 AJ Styles
___ 100 Greg Valentine
`],
  ['Base Contenders Season Ticket — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 101 Asuka
___ 102 Finn Balor
___ 103 Becky Lynch
___ 104 John Cena
___ 105 Brock Lesnar
___ 106 Charlotte Flair
___ 107 AJ Styles
___ 108 The American Nightmare Cody Rhodes
___ 109 Alexa Bliss
___ 110 Edge
`],
  ['Base Donruss Rated Rookie — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 111 Carmello Hayes
___ 112 Nikkita Lyons
___ 113 Joe Gacy
___ 114 Roxanne Perez
___ 115 Solo Sikoa
___ 116 Bron Breakker
___ 117 Tony D'Angelo
___ 118 Cora Jade
___ 119 Veer Mahaan
___ 120 Gable Steveson
`],
  ['Base Absolute — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 121 Liv Morgan
___ 122 Bret "Hit Man" Hart
___ 123 Mandy Rose
___ 124 The Rock
___ 125 Rhea Ripley
___ 126 Goldberg
___ 127 Roman Reigns
___ 128 Rhonda Rousey
___ 129 Gigi Dolan
___ 130 Solo Sikoa
`],
  ['Base Origins — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 131 Damian Priest
___ 132 Randy Orton
___ 133 Eddie Guerrero
___ 134 Gunther
___ 135 Axiom
___ 136 Jake Roberts
___ 137 Batista
___ 138 Kit Wilson
___ 139 Brie Bella
___ 140 Nathan Frazer
`],
  ['Base Legacy — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 141 Shawn Michaels
___ 142 Andre The Giant
___ 143 Chyna
___ 144 Hulk Hogan
___ 145 Macho Man Randy Savage
___ 146 Stone Cold Steve Austin
___ 147 Triple H
___ 148 Ultimate Warrior
___ 149 Undertaker
___ 150 Batista
`],
  ['Base Luminance — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 151 Edris Enofe
___ 152 Rowdy Roddy Piper
___ 153 Big E
___ 154 Shinsuke Nakamura
___ 155 Brooks Jensen
___ 156 Carmella
___ 157 Bayley
___ 158 Valentina Feroz
___ 159 Alba Fyre
___ 160 Guru Raaj
`],
  ['Base Playoff — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 161 Aleah James
___ 162 Raquel Rodrigeuz
___ 163 Beth Phoenix
___ 164 Roderick Strong
___ 165 Shotzi
___ 166 John "Bradshaw" Layfield
___ 167 Terry Funk
___ 168 Kofi Kingston
___ 169 Von Wagner
___ 170 Nikki A.S.H.
`],
  ['Base Prestige', `
___ 171 Dante Chen
___ 172 Nikki Bella
___ 173 Elektra Lopez
___ 174 Ru Feng
___ 175 Ikermen Jiro
___ 176 Sonya Deville
___ 177 Jerry Lawler
___ 178 Kevin Owens
___ 179 Bruno Sammartino
___ 180 Razor Ramon
`],
  ['Base Rookies & Stars — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 181 Tiffany Stratton
___ 182 Grayson Waller
___ 183 Blair Davenport
___ 184 Ivy Nile
___ 185 Shanky
___ 186 Jacy Jayne
___ 187 Brutus Creed
___ 188 Julius Creed
___ 189 Elton Prince
___ 190 Wendy Choo
`],
  ['Base Score — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 191 Drew McIntyre
___ 192 Trish Stratus
___ 193 Iyo Sky
___ 194 Kayden Carter
___ 195 Alundra Blayze
___ 196 Odyssey Jones
___ 197 Bianca Belair
___ 198 Queen Zelina
___ 199 Wendy Choo
___ 200 Superstar Billy Graham
`],
  ['Base Black — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 201 Carmelo Hayes
___ 202 Kevin Owens
___ 203 Nikki Bella
___ 204 Brutus Creed
___ 205 Aliyah
___ 206 Gorilla Monsoon
___ 207 Kofi Kingston
___ 208 AJ Styles
___ 209 Ricky "The Dragon" Steamboat
___ 210 Asuka
___ 211 Xia Li
___ 212 Bayley
___ 213 Andre Chase
___ 214 Doudrop
___ 215 Amari Miller
___ 216 Jacy Jayne
___ 217 Odyssey Jones
___ 218 Alexa Bliss
___ 219 Shanky
___ 220 Bron Breakker
`],
  ['Base Certified — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 221 Charlotte Flair
___ 222 Terry Funk
___ 223 Tiffany Stratton
___ 224 Rowdy Roddy Piper
___ 225 Butch
___ 226 Aoife Valkyrie
___ 227 Grayson Waller
___ 228 The Miz
___ 229 Becky Lynch
___ 230 Ricochet
___ 231 Cora Jade
___ 232 Yokozuna
___ 233 Beth Phoenix
___ 234 Bodhi Hayward
___ 235 Drew McIntyre
___ 236 Big E
___ 237 Jake Roberts
___ 238 Oliver Carter
___ 239 Brock Lesnar
___ 240 Shayna Baszler
`],
  ['Base Elite — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 241 Finn Balor
___ 242 Alba Fyre
___ 243 Axiom
___ 244 Shinsuke Nakamura
___ 245 Cactus Jack
___ 246 Bobby "The Brain" Heenan
___ 247 John "Bradshaw" Layfield
___ 248 Omos
___ 249 The American Nightmare Cody Rhodes
___ 250 Sheamus
___ 251 Gable Steveson
___ 252 Yulisa Leon
___ 253 Bianca Belair
___ 254 Stacy Keibler
___ 255 The Great Khali
___ 256 The Great Khali
___ 257 Lacey Evans
___ 258 Matt Riddle
___ 259 Edge
___ 260 The Miz
`],
  ['Base Illusions — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 261 Liv Morgan
___ 262 Shinsuke Nakamura
___ 263 Bret "Hit Man" Hart
___ 264 Trick Williams
___ 265 Big E
___ 266 Butch
___ 267 Duke Hudson
___ 268 Jerry Lawler
___ 269 Gigi Dolan
___ 270 Paul Bearer
___ 271 Mandy Rose
___ 272 Theory
___ 273 Dude Love
___ 274 Booker T
___ 275 Cameron Grimes
___ 276 Carmella
___ 277 Gunther
___ 278 Lash Legend
___ 279 John Cena
___ 280 Rikishi
`],
  ['Base XR — Parallels: Bronze; Red #/199; Blue #/99; Green #/99; Purple #/49; Gold #/10; Platinum 1/1', `
___ 281 Blair Davenport
___ 282 Diamond Dallas Page
___ 283 Dusty Rhodes
___ 284 Jinny
___ 285 Rhea Ripley
___ 286 Paul Heyman
___ 287 Rhonda Rousey
___ 288 Shotzi
___ 289 Goldberg
___ 290 Cactus Jack
___ 291 Carmella
___ 292 Cruz Del Toro
___ 293 Guru Raaj
___ 294 Malik Blade
___ 295 Roman Reigns
___ 296 Rob Van Dam
___ 297 Solo Sikoa
___ 298 The All Mighty Bobby Lashley
___ 299 Aleah James
___ 300 Ciampa
`],
  ['Base Phoenix — Parallels: Bronze; Silver; Red #/199; Blue #/99; Purple #/49; Green #/25; Gold #/10; Gold Vinyl 1/1', `
___ 301 Ciampa
___ 302 Mr. Perfect Curt Hennig
___ 303 Joaquin Wilde
___ 304 Rowdy Roddy Piper
___ 305 Roxanne Perez
___ 306 Alundra Blayze
___ 307 Rhea Ripley
___ 308 Cruz Del Toro
___ 309 Aliyah
___ 310 Indi Hartwell
___ 311 Eddie Guerrero
___ 312 Queen Zelina
___ 313 Mankind
___ 314 Sonya Deville
___ 315 Rhonda Rousey
___ 316 The All Mighty Bobby Lashley
___ 317 The Rock
___ 318 Edris Enofe
___ 319 Bobby "The Brain" Heenan
___ 320 Julius Creed
___ 321 Ikemen Jiro
___ 322 Roderick Strong
___ 323 Trish Stratus
___ 324 Torrie Wilson
___ 325 Roman Reigns
`],
  ['Base Flux — Parallels: Bronze; Silver; Red #/100; Blue #/99; Purple #/49; Green #/25; Gold #/10; Black 1/1', `
___ 326 Mandy Rose
___ 327 Torrie Wilson
___ 328 Gigi Dolan
___ 329 Doudrop
___ 330 Elektra Lopez
___ 331 Dusty Rhodes
___ 332 Solo Sikoa
___ 333 Faarooq
___ 334 Ru Feng
___ 335 Trish Stratus
___ 336 Liv Morgan
___ 337 Andre Chase
___ 338 Shawn Michaels
___ 339 Dude Love
___ 340 Iyo Sky
___ 341 Scott Steiner
___ 342 Randy Orton
___ 343 Gene Okerlund
___ 344 Stevie Turner
___ 345 Trick Williams
___ 346 John Cena
___ 347 Kevin Nash
___ 348 Damian Priest
___ 349 Duke Hudson
___ 350 Katana Chance
`],
  ['Base Donruss Optic — Parallels: Bronze; Silver; Red #/199; Blue #/99; Purple #/49; Green #/25; Gold #/10; Gold Vinyl 1/1', `
___ 351 The American Nightmare Cody Rhodes
___ 352 Lacey Evans
___ 353 Andre The Giant
___ 354 Paul Heyman
___ 355 Nikki Bella
___ 356 Sami Zayn
___ 357 Million Dollar Man Ted DiBiase
___ 358 Bruno Sammartino
___ 359 Finn Balor
___ 360 Superstar Billy Graham
___ 361 Charlotte Flair
___ 362 Rikishi
___ 363 Diesel
___ 364 Rey Mysterio
___ 365 Rick Boogs
___ 366 Seth "Freakin" Rollins
___ 367 Brie Bella
___ 368 Stacy Keibler
___ 369 Edge
___ 370 Kevin Owens
___ 371 Brock Lesnar
___ 372 Omos
___ 373 Gene Okerlund
___ 374 Undertaker
___ 375 Terry Gordy
`],
  ['Base Spectra — Parallels: Bronze; Silver; Red #/199; Blue #/99; Purple #/49; Green #/25; Gold #/10; Nebula 1/1', `
___ 376 The Miz
___ 377 Iron Sheik
___ 378 Raquel Rodrigeuz
___ 379 AJ Styles
___ 380 Bodhi Hayward
___ 381 Becky Lynch
___ 382 Ricochet
___ 383 Amari Miller
___ 384 Shayna Baszler
___ 385 Kurt Angle
___ 386 Theory
___ 387 Kayden Carter
___ 388 Sami Zayn
___ 389 Alexa Bliss
___ 390 Billy Gunn
___ 391 Chyna
___ 392 Matt Riddle
___ 393 Booker T
___ 394 Sheamus
___ 395 Randy Orton
___ 396 Xia Li
___ 397 Natalya
___ 398 Johnny Rodz
___ 399 Asuka
___ 400 Trick Williams
`],
  ['Base Noir — Serial #/99; Parallels: Gold #/10; Platinum 1/1', `
___ 401 Stone Cold Steve Austin
___ 402 Rikishi
___ 403 Elton Prince
___ 404 Nathan Frazer
___ 405 AJ Styles
___ 406 Valentina Feroz
___ 407 Gigi Dolan
___ 408 IRS
___ 409 Bron Breakker
___ 410 Ken Shamrock
___ 411 Undertaker
___ 412 Drew McIntyre
___ 413 Isla Dawn
___ 414 Razor Ramon
___ 415 Becky Lynch
___ 416 1-2-3 Kid
___ 417 Mandy Rose
___ 418 Joaquin Wilde
___ 419 Bret "Hit Man" Hart
___ 420 Nikolai Volkoff
___ 421 Dante Chen
___ 422 Stevie Turner
___ 423 Bianca Belair
___ 424 Santos Escobar
___ 425 The American Nightmare Cody Rhodes
___ 426 The Great Khali
___ 427 Rhonda Rousey
___ 428 Malik Blade
___ 429 Shawn Michaels
___ 430 Paul Bearer
`],
  ['Base National Treasures — Serial #/99; Parallels: Gold #/10; Platinum 1/1', `
___ 431 John Cena
___ 432 Mr. Perfect Curt Hennig
___ 433 Cora Jade
___ 434 Papa Shango
___ 435 Triple H
___ 436 The Hurricane
___ 437 Brooks Jensen
___ 438 Ivy Nile
___ 439 Alexa Bliss
___ 440 Rey Mysterio
___ 441 Roxanne Perez
___ 442 Randy Orton
___ 443 Goldberg
___ 444 Santos Escobar
___ 445 Andre The Giant
___ 446 Von Wagner
___ 447 Diamond Dallas Page
___ 448 Kevin Owens
___ 449 Brock Lesnar
___ 450 Karrion Kross
___ 451 Rhea Ripley
___ 452 Ricky "The Dragon" Steamboat
___ 453 Hulk Hogan
___ 454 Stephanie McMahon
___ 455 Aoife Valkyrie
___ 456 Yulisa Leon
___ 457 Faarooq
___ 458 Nikki A.S.H.
___ 459 Edge
___ 460 Lash Legend
`],
  ['Base One — Serial #/99; Parallels: Gold #/10; Platinum 1/1', `
___ 461 Liv Morgan
___ 462 The Rock
___ 463 Stacy Keibler
___ 464 Chyna
___ 465 Gorilla Monsoon
___ 466 Rey Mysterio
___ 467 Isla Dawn
___ 468 Yokozuna
___ 469 Asuka
___ 470 Kit Wilson
___ 471 Roman Reigns
___ 472 Batista
___ 473 Macho Man Randy Savage
___ 474 Million Dollar Man Ted DiBiase
___ 475 Tiffany Stratton
___ 476 Torrie Wilson
___ 477 Indi Hartwell
___ 478 Jinny
___ 479 Charlotte Flair
___ 480 Mankind
___ 481 Mankind
___ 482 Rob Van Dam
___ 483 Ultimate Warrior
___ 484 The Boogeyman
___ 485 Captain Lou Albano
___ 486 Wendy Choo
___ 487 Iron Sheik
___ 488 Katana Chance
___ 489 Finn Balor
___ 490 Oliver Carter
`],
  ['Base Gala Rookies — Serial #/8', `
___ 491 Roxanne Perez
___ 492 Gable Steveson
___ 493 Solo Sikoa
___ 494 Bron Breakker
___ 495 Carmelo Hayes
___ 496 Tony D'Angelo
___ 497 Nikkita Lyons
___ 498 Cora Jade
___ 499 Joe Gacy
___ 500 Veer Mahaan
`],
  ['Absolute Tools of the Trade Signatures — Base #/99; Parallels: Prime #/10; Super Prime 1/1', `
___ 1 Queen Zelina
___ 2 Dolph Ziggler
___ 3 Ridge Holland
___ 4 Ilja Dragunov
___ 5 Shotzi
___ 6 Joe Gacy
___ 7 Damian Priest
___ 8 Angelo Dawkins
___ 9 MVP
___ 10 Cameron Grimes
___ 11 Reggie
___ 12 Doudrop
___ 13 Roderick Strong
___ 14 Iyo Sky
___ 15 The Miz
___ 16 Katana Chance
___ 17 Lacey Evans
___ 18 Asuka
___ 19 Natalya
___ 20 Carmelo Hayes
___ 21 Rhea Ripley
___ 22 Gigi Dolan
___ 23 Santos Escobar
___ 24 Jacy Jayne
___ 25 Jey Uso
___ 26 Kayden Carter
___ 27 Liv Morgan
___ 28 Theory
___ 29 Odyssey Jones
___ 30 Butch
___ 31 Ricochet
___ 32 Gunther
___ 33 Shayna Baszler
___ 34 Jimmy Uso
___ 35 Veer Mahaan
___ 36 Xavier Woods
___ 37 Meiko Satomura
___ 38 Montez Ford
___ 39 Otis
___ 40 Dana Brooke
`],
  ['Chronicles Signatures — Parallels: Red; Gold #/10; Platinum 1/1', `
___ 1 Joe Coffey
___ 2 Lita
___ 3 Johnny Rodz
___ 4 Million Dollar Man Ted DiBiase
___ 5 Kit Wilson
___ 7 Joaquin Wilde
___ 8 John Cena
___ 9 Xyon Quinn
___ 10 Shawn Michaels
___ 11 JD McDonagh
___ 12 Mankind
___ 13 Mark Coffey
___ 14 Rikishi
___ 15 Diamond Dallas Page
___ 16 Boa
___ 17 Kayden Carter
___ 18 Undertaker
___ 19 Rip Fowler
___ 20 Bret "Hit Man" Hart
___ 21 Ron Simmons
___ 22 Nikki Bella
___ 24 Jerry Lawler
___ 25 Tyler Bate
___ 26 Giovanni Vinci
___ 27 Ludwig Kaiser
___ 28 Batista
___ 29 Kane
___ 30 Brie Bella
___ 31 Elton Prince
___ 32 Trish Stratus
___ 34 Road Dogg
___ 35 Wolfgang
___ 36 Jagger Reid
___ 37 Wes Lee
___ 38 Goldberg
___ 39 Kurt Angle
___ 40 Kevin Nash
`],
  ['Contenders Rookie Ticket — Parallels: Red; Cracked Ice #/25; Championship 1/1', `
___ 1 Axiom
___ 2 Aoife Valkyrie
___ 3 Brutus Creed
___ 4 Bron Breakker
___ 5 Gable Steveson
___ 6 Jinny
___ 7 Lash Legend
___ 8 Solo Sikoa
___ 9 Stevie Turner
___ 10 Veer Mahaan
`],
  ['Crown Royale Silhouettes — Base #/99; Parallels: Prime #/10; Super Prime 1/1', `
___ 1 Grayson Waller
___ 3 Jey Uso
___ 4 Tyler Bate
___ 5 Kevin Owens
___ 6 Ludwig Kaiser
___ 7 Apollo Crews
___ 8 Omos
___ 9 Damian Priest
___ 10 Rick Boogs
___ 11 Happy Corbin
___ 12 Sheamus
___ 13 Jinder Mahal
___ 14 Von Wagner
___ 15 Kofi Kingston
___ 16 Montez Ford
___ 17 Brutus Beefcake
___ 18 Roderick Strong
___ 19 Jagger Reid
___ 20 Matt Riddle
___ 21 Indi Hartwell
___ 22 Sonya Deville
___ 23 Julius Creed
___ 24 Giovanni Vinci
___ 25 Max Dupri
___ 26 Angelo Dawkins
___ 27 Joaquin Wilde
___ 28 Raquel Rodriguez
___ 29 Dominik Mysterio
___ 31 Ivar
___ 32 Ciampa
___ 33 Alba Fyre
___ 34 Zoey Stark
___ 35 Lash Legend
___ 36 Nikki A.S.H.
___ 37 Cora Jade
___ 38 Rey Mysterio
___ 39 Erik
___ 40 Sami Zayn
`],
  ['Donruss Optic Rated Rookie Signatures — Parallels: Red; Gold #/10; Gold Vinyl 1/1', `
___ 1 Solo Sikoa
___ 2 Ivy Nile
___ 3 Julius Creed
___ 4 Axiom
___ 5 Odyssey Jones
___ 6 Bron Breakker
___ 7 Shanky
___ 8 Cora Jade
___ 9 Aoife Valkyrie
___ 10 Gable Steveson
`],
  ['Flex Auto — Parallels: Red; Gold #/10; Black 1/1', `
___ 1 AJ Styles
___ 2 Ridge Holland
___ 3 Dominik Mysterio
___ 4 Ezekiel
___ 5 Rhea Ripley
___ 6 Titus O'Neil
___ 7 The Miz
___ 8 Damian Priest
___ 9 Roman Reigns
___ 10 Jinder Mahal
___ 11 Alexa Bliss
___ 12 Xia Li
___ 13 Drew Gulak
___ 14 Joaquin Wilde
___ 15 Matt Riddle
___ 16 Butch
___ 17 Angelo Dawkins
___ 18 Jey Uso
___ 19 The American Nightmare Cody Rhodes
___ 20 Montez Ford
___ 21 Commander Azeez
___ 22 Kevin Owens
___ 23 Sonya Deville
___ 24 Shotzi
___ 25 Zoey Stark
___ 26 Apollo Crews
___ 27 Jimmy Uso
___ 28 Dolph Ziggler
___ 29 MVP
___ 30 Happy Corbin
`],
  ['Hall of Fame Autographs — Parallels: Red; Gold #/10; Platinum 1/1', `
___ 1 Hulk Hogan
___ 2 Stone Cold Steve Austin
___ 3 Iron Sheik
___ 5 Diesel
___ 6 Trish Stratus
___ 7 Kurt Angle
___ 8 Rob Van Dam
___ 9 Diamond Dallas Page
___ 10 Million Dollar Man Ted DiBiase
`],
  ['National Pride Signatures — Parallels: Red; Gold #/10; Black 1/1', `
___ 1 Trish Stratus
___ 2 Shanky
___ 3 Iron Sheik
___ 4 Gunther
___ 5 Natalya
___ 6 Mark Coffey
___ 7 Shinsuke Nakamura
___ 9 Edge
___ 10 Gable Steveson
___ 11 Asuka
___ 12 William Regal
___ 13 Mansoor
___ 14 Hulk Hogan
___ 15 Kurt Angle
___ 16 Wolfgang
___ 17 Hacksaw Jim Duggan
___ 18 Wade Barrett
___ 19 Finn Balor
`],
  ['National Treasures Memorabilia Autographs — Base #/49; Parallels: Gold #/10; Platinum 1/1', `
___ 1 Mandy Rose
___ 2 Bianca Belair
___ 3 Roman Reigns
___ 4 Brock Lesnar
___ 5 Seth "Freakin" Rollins
___ 6 Carmella
___ 7 Drew McIntyre
___ 8 AJ Styles
___ 9 Finn Balor
___ 11 Kevin Owens
___ 12 Asuka
___ 13 Rey Mysterio
___ 14 Bron Breakker
___ 15 Shinsuke Nakamura
___ 16 Charlotte Flair
___ 17 Edge
___ 18 Alexa Bliss
___ 19 Gable Steveson
___ 20 Becky Lynch
`],
  ['Origins Autographs — Parallels: Red; Gold #/10; Platinum 1/1', `
___ 1 Greg Valentine
___ 2 Rhonda Rousey
___ 3 Molly Holly
___ 4 Kane
___ 5 Superstar Billy Graham
___ 6 John "Bradshaw" Layfield
___ 7 X-Pac
___ 8 Afa
___ 9 Sika
___ 10 Bushwhacker Luke
___ 11 Ivory
___ 12 Triple H
___ 13 Jerry Lawler
___ 14 Booker T
___ 15 The Godfather
___ 16 Million Dollar Man Ted DiBiase
___ 17 Kelly Kelly
___ 18 Beth Phoenix
___ 19 The Boogeyman
___ 20 Diamond Dallas Page
___ 21 Jimmy Hart
___ 22 Bret "Hit Man" Hart
___ 23 Road Dogg
___ 24 Brother Love
___ 25 Titus O'Neil
___ 26 Rikishi
___ 27 Lex Luger
___ 28 Brutus Beefcake
___ 29 Shane Helms
___ 30 Don Muraco
___ 31 Kurt Angle
___ 32 Kevin Nash
___ 33 Rob Van Dam
___ 34 Iron Sheik
___ 35 Wade Barrett
___ 36 Hacksaw Jim Duggan
___ 37 Michelle McCool
___ 38 Bushwhacker Butch
___ 39 William Regal
___ 40 Faarooq
`],
  ['Phoenix Autographs — Parallels: Red; Gold #/10; Gold Vinyl 1/1', `
___ 1 Reggie
___ 2 Theory
___ 3 Xia Li
___ 4 Doudrop
___ 5 Jagger Reid
___ 6 Ivar
___ 7 Lacey Evans
___ 8 The American Nightmare Cody Rhodes
___ 9 Omos
___ 10 Big E
___ 11 Ridge Holland
___ 12 Commander Azeez
___ 13 Happy Corbin
___ 14 Drew Gulak
___ 15 Joaquin Wilde
___ 16 Jey Uso
___ 17 Montez Ford
___ 18 Rey Mysterio
___ 19 Otis
___ 20 Charlotte Flair
___ 21 Sheamus
___ 22 Damian Priest
___ 23 Sonya Deville
___ 24 Ezekiel
___ 25 Rip Fowler
___ 26 Jimmy Uso
___ 27 MVP
___ 28 Bayley
___ 29 Xavier Woods
___ 30 Angelo Dawkins
___ 31 Titus O'Neil
___ 32 Dolph Ziggler
___ 33 Butch
___ 34 Erik
___ 35 Blair Davenport
___ 36 Jinder Mahal
___ 37 Nikki A.S.H.
___ 38 Bianca Belair
___ 39 Queen Zelina
___ 40 Apollo Crews
`],
  ["It's All About the Game Insert Set", `
___ 1 Hunter Hearst Helmsley
___ 2 Hunter Hearst Helmsley
___ 3 Hunter Hearst Helmsley
___ 4 Hunter Hearst Helmsley
___ 5 Hunter Hearst Helmsley
___ 6 Hunter Hearst Helmsley
___ 7 Triple H
___ 8 Triple H
___ 9 Triple H
___ 10 Triple H
___ 11 Triple H
___ 12 Triple H
___ 13 Triple H
___ 14 Triple H
___ 15 Triple H
___ 16 Triple H
___ 17 Triple H
___ 18 Triple H
___ 19 Triple H
___ 20 Triple H
___ 21 Triple H
___ 22 Triple H
___ 23 Triple H
___ 24 Triple H
___ 25 Triple H
___ 26 Triple H
___ 27 Triple H
___ 28 Triple H
___ 29 Triple H
___ 30 Triple H
___ 31 Triple H
___ 32 Triple H
___ 33 Triple H
___ 34 Triple H
___ 35 Triple H
___ 36 Triple H
___ 37 Triple H
___ 38 Triple H
___ 39 Triple H
___ 40 Triple H
___ 41 Triple H
___ 42 Triple H
___ 43 Triple H
___ 44 Triple H
___ 45 Triple H
___ 46 Triple H
___ 47 Triple H
___ 48 Triple H
___ 49 Triple H
___ 50 Triple H
`],
]));

// ── 2022 PANINI WWE IMMACULATE ────────────────────────────────────────────────
setsHtml.push(makeSet('imm22', '2022', '2022 Panini WWE Immaculate', [
  ['Base Set — Parallels: Red #/40; Gold #/10; Green #/5; Platinum 1/1', `
___ 1 Shawn Michaels
___ 2 Dakota Kai
___ 3 Triple H
___ 4 Finn Balor
___ 5 Junkyard Dog
___ 6 "Macho Man" Randy Savage
___ 7 Matt Riddle
___ 8 Asuka
___ 9 Razor Ramon
___ 10 Booker T
___ 11 Shayna Baszler
___ 12 Damian Priest
___ 13 Trish Stratus
___ 14 Gigi Dolan
___ 15 Kane
___ 16 "Million Dollar Man" Ted DiBiase
___ 17 Natalya
___ 18 Bam Bam Bigelow
___ 19 Rey Mysterio
___ 20 Bret "Hit Man" Hart
___ 21 Shinsuke Nakamura
___ 22 Diesel
___ 23 Tyler Bate
___ 24 Goldberg
___ 25 Karrion Kross
___ 26 "Mr. Perfect" Curt Hennig
___ 27 Nikki Bella
___ 28 Batista
___ 29 Rhea Ripley
___ 30 British Bulldog
___ 31 Shotzi
___ 32 Dolph Ziggler
___ 33 Ultimate Warrior
___ 34 Gunther
___ 35 Katana Chance
___ 36 "Rowdy" Roddy Piper
___ 37 Nikkita Lyons
___ 38 Bayley
___ 39 Ricochet
___ 40 Brock Lesnar
___ 41 Solo Sikoa
___ 42 Dominik Mysterio
___ 43 Umaga
___ 44 "Hollywood" Hulk Hogan
___ 45 Kevin Owens
___ 46 "Stone Cold" Steve Austin
___ 47 Braun Strowman
___ 48 Becky Lynch
___ 49 The Rock
___ 50 Bruno Sammartino
___ 51 Sonya Deville
___ 52 Drew McIntyre
___ 53 Vader
___ 54 Ilja Dragunov
___ 55 Kofi Kingston
___ 56 "The All Mighty" Bobby Lashley
___ 57 Omos
___ 58 Bianca Belair
___ 59 Roman Reigns
___ 60 Butch
___ 61 Stacy Keibler
___ 62 Dusty Rhodes
___ 63 Xavier Woods
___ 64 Iyo Sky
___ 65 Lacey Evans
___ 66 "The American Nightmare" Cody Rhodes
___ 67 Paul Bearer
___ 68 Big Boss Man
___ 69 Ronda Rousey
___ 70 Carmella
___ 71 Terry Funk
___ 72 Eddie Guerrero
___ 73 X-Pac
___ 74 Jey Uso
___ 75 Liv Morgan
___ 76 Alba Fyre
___ 77 Paul Heyman
___ 78 Big E
___ 79 Roxanne Perez
___ 80 Charlotte Flair
___ 81 The Miz
___ 82 Edge
___ 83 Yokozuna
___ 84 Jimmy Uso
___ 85 Mandy Rose
___ 86 Alexa Bliss
___ 87 Randy Orton
___ 88 Big John Studd
___ 89 Scarlett
___ 90 Chyna
___ 91 Austin Theory
___ 92 Elektra Lopez
___ 93 Johnny Gargano
___ 94 John Cena
___ 95 Mankind
___ 96 Andre The Giant
___ 97 Raquel Rodriguez
___ 98 Bobby "The Brain" Heenan
___ 99 Seth "Freakin" Rollins
___ 100 Tommaso Ciampa
`],
  ['Rookie Memorabilia Autographs — Base #/99; Parallels: Red #/25; Gold #/10; Acetate #/8; Green #/5; Platinum 1/1', `
___ 101 Von Wagner
___ 102 Grayson Waller
___ 103 Jacy Jayne
___ 104 Bron Breakker
___ 105 Joe Gacy
___ 106 Carmelo Hayes
___ 107 Ivy Nile
___ 108 Cora Jade
___ 109 Veer Mahaan
___ 110 Gable Steveson
`],
  ['All Time Greats Signatures — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Jeff Jarrett
___ 2 Jerry Lawler
___ 3 Lita
___ 4 "Million Dollar Man" Ted DiBiase
___ 5 Shawn Michaels
___ 6 Batista
___ 7 Superstar Billy Graham
___ 8 Cactus Jack
___ 9 Trish Stratus
___ 10 Goldberg
___ 11 X-Pac
___ 12 John Cena
___ 13 Road Dogg
___ 14 "Stone Cold" Steve Austin
___ 15 Nikki Bella
___ 16 "Cowboy" Bob Orton
___ 17 Triple H
___ 18 Gerald Brisco
___ 19 Undertaker
___ 20 Hulk Hogan
`],
  ['Dual Autographed Memorabilia — Serial #/10; Parallels: Platinum 1/1', `
___ 1 Randy Orton/Matt Riddle
___ 2 Becky Lynch/Bianca Belair
___ 3 Shanky/Jinder Mahal
___ 4 Edge/AJ Styles
___ 5 Edge/Damian Priest
___ 6 Brock Lesnar/Seth "Freakin" Rollins
___ 7 Brutus Creed/Julius Creed
___ 8 Katana Chance/Kayden Carter
___ 9 Angelo Dawkins/Montez Ford
___ 11 Jimmy Uso/Jey Uso
___ 12 Drew McIntyre/Happy Corbin
___ 13 Gunther/LA Knight
___ 14 Roman Reigns/Brock Lesnar
___ 15 Rip Fowler/Jagger Reid
___ 16 Ciampa/Bron Breakker
___ 17 Jacy Jayne/Gigi Dolin
___ 20 Commander Azeez/Apollo Crews
___ 21 Erik/Ivar
___ 22 "The All Mighty" Bobby Lashley
___ 23 Natalya/Shayna Baszler
___ 24 Brock Lesnar/Drew McIntyre
___ 25 Mandy Rose/Cora Jade
___ 26 Dolph Ziggler/Bron Breakker
___ 27 Omos/MVP
___ 28 Kit Wilson/Elton Prince
___ 29 Rey Mysterio/Dominik Mysterio
___ 30 Rhea Ripley/Damian Priest
`],
  ['Dual Autographs — Serial #/10; Parallels: Platinum 1/1', `
___ 1 Damian Priest/Rhea Ripley
___ 2 Becky Lynch/Bianca Belair
___ 3 Kurt Angle/Gable Steveson
___ 4 Brock Lesnar/Roman Reigns
___ 5 Ilja Dragunov/Jordan Devlin
___ 6 Julius Creed/Brutus Creed
___ 7 Randy Orton/"The American Nightmare" Cody Rhodes
___ 8 Katana Chance/Kayden Carter
___ 9 Rey Mysterio/Dominik Mysterio
___ 10 Matt Riddle/Rob Van Dam
___ 11 Jey Uso/Jimmy Uso
___ 12 Happy Corbin/Drew McIntyre
___ 13 Trish Stratus/Lita
___ 14 Undertaker/Kane
___ 15 Jagger Reid/Rip Fowler
___ 16 Jacy Jayne/Gigi Dolan
___ 17 Kama/Faarooq
___ 18 Shayna Baszler/Ronda Rousey
___ 19 Randy Orton/Matt Riddle
___ 20 Kevin Owens/"Stone Cold" Steve Austin
___ 21 Erik/Ivar
___ 22 "The All Mighty" Bobby Lashley/Omos
___ 23 Shayna Baszler/Natalya
___ 24 Bushwhacker Luke/Bushwhacker Butch
___ 25 Brock Lesnar/Gable Steveson
___ 26 Afa/Sika
___ 27 Angelo Dawkins/Montez Ford
___ 29 Damian Priest/Edge
___ 30 Ronda Rousey/Charlotte Flair
___ 31 Jinder Mahal/Shanky
___ 32 Edge/AJ Styles
___ 33 Iron Sheik/Hulk Hogan
___ 34 Faarooq/Bradshaw
___ 35 Nikki Bella/Brie Bella
___ 36 Triple H/Stephanie McMahon
___ 38 Kit Wilson/Elton Prince
___ 39 Commander Azeez/Apollo Crews
___ 40 "The American Nightmare" Cody Rhodes/Seth "Freakin" Rollins
`],
  ['Heralded Signatures — Base #/99; Parallels: Gold #/10; Platinum 1/1', `
___ 1 Stan Hansen
___ 2 Jerry Lawler
___ 3 Road Dogg
___ 4 Beth Phoenix
___ 5 Papa Shango
___ 6 "Million Dollar Man" Ted DiBiase
___ 7 Michelle McCool
___ 8 Bushwhacker Luke
___ 9 "Cowboy" Bob Orton
___ 10 Greg Valentine
___ 11 Terri Runnels
___ 12 Jimmy Hart
___ 13 Rob Van Dam
___ 14 Booker T
___ 16 Rikishi
___ 17 Tyson Kidd
___ 18 Diamond Dallas Page
___ 19 Gerald Brisco
___ 20 "Hacksaw" Jim Duggan
___ 21 The Boogeyman
___ 22 Kurt Angle
___ 23 Superstar Billy Graham
___ 24 Iron Sheik
___ 25 1-2-3 Kid
___ 26 Alundra Blayze
___ 27 Al Snow
___ 28 Don Muraco
___ 29 Jerry Sags
___ 30 Paul Heyman
___ 31 The Sandman
___ 32 Michael Hayes
___ 33 Teddy Long
___ 35 Kelly Kelly
___ 36 Brutus Beefcake
___ 37 Brian Knobbs
___ 38 Ron Simmons
___ 39 Johnny Rodz
___ 40 Ivory
`],
  ['Immaculate Celebrations', `
___ 1 Shawn Michaels
___ 2 Booker T
___ 3 Kevin Nash
___ 4 Michael Hayes
___ 5 Bushwhacker Luke
___ 6 Stan Hansen
___ 7 Don Muraco
___ 8 Superstar Billy Graham
___ 10 Teddy Long
___ 11 "Hacksaw" Jim Duggan
___ 12 Johnny Rodz
___ 13 Torrie Wilson
___ 14 Ricky "The Dragon" Steamboat
___ 15 Bushwhacker Luke
___ 16 "Stone Cold" Steve Austin
___ 17 Goldberg
___ 18 "Million Dollar Man" Ted DiBiase
___ 19 Jeff Jarrett
___ 20 The Honky Tonk Man
`],
  ['Immaculate Ink — Serial #/99; Parallels: Gold #/10; Platinum 1/1', `
___ 1 Kevin Owens
___ 3 Leilani Kai
___ 4 Angelo Dawkins
___ 5 MVP
___ 6 Ricochet
___ 7 Ivar
___ 8 Jason Jordan
___ 10 The Blue Meanie
___ 11 Austin Theory
___ 12 Montez Ford
___ 13 Simon Dean
___ 14 Apollo Crews
___ 15 Butch
___ 16 Jey Uso
___ 18 Mosh
___ 19 Dory Funk, Jr.
___ 20 Thrasher
___ 21 Haku
___ 22 Damian Priest
___ 26 Erik
___ 28 Stevie Richards
___ 29 The Miz
___ 30 Tom Prichard
`],
  ['Immaculate Milestones', `
___ 1 John Cena
___ 2 Kane
___ 3 Hulk Hogan
___ 4 Undertaker
___ 5 Natalya
___ 6 Roman Reigns
___ 7 Booker T
___ 8 Drew McIntyre
___ 9 Randy Orton
___ 10 Rey Mysterio
`],
  ['Immaculate Moments', `
___ 1 Kofi Kingston
___ 2 Triple H
___ 3 Mankind
___ 4 Goldberg
___ 5 "The American Nightmare" Cody Rhodes
___ 6 Roman Reigns
___ 7 Hulk Hogan
___ 8 Shawn Michaels
___ 9 Kane
___ 10 "Stone Cold" Steve Austin
`],
  ['Immaculate Nicknames — Serial #/25', `
___ 1 Triple H
___ 2 Shawn Michaels
___ 3 Randy Orton
___ 4 AJ Styles
___ 5 Undertaker
___ 6 Dolph Ziggler
___ 7 Beth Phoenix
___ 8 Batista
___ 9 Jimmy Hart
___ 10 Seth "Freakin" Rollins
___ 11 Hulk Hogan
___ 12 Mick Foley
___ 13 Alexa Bliss
___ 14 "Cowboy" Bob Orton
___ 15 Bret "Hit Man" Hart
___ 16 Charlotte Flair
___ 17 Don Muraco
___ 18 Greg Valentine
___ 19 Jerry Lawler
___ 20 "Million Dollar Man" Ted DiBiase
___ 21 Kane
___ 22 Diesel
___ 23 Kevin Owens
___ 24 Lex Luger
___ 25 The Miz
___ 26 Natalya
___ 27 Ricochet
___ 28 Rob Van Dam
___ 29 Ronda Rousey
___ 30 Shayna Baszler
`],
  ['Immaculate Signature Moves', `
___ 1 Brock Lesnar
___ 2 Roman Reigns
___ 3 Becky Lynch
___ 4 Drew McIntyre
___ 5 Edge
___ 6 "Million Dollar Man" Ted DiBiase
___ 7 AJ Styles
___ 8 Asuka
___ 9 Bianca Belair
___ 10 Charlotte Flair
___ 11 Dolph Ziggler
___ 12 Kevin Owens
___ 13 Trish Stratus
___ 14 "Stone Cold" Steve Austin
___ 15 Kofi Kingston
___ 16 Brie Bella
___ 17 Kurt Angle
___ 18 Goldberg
___ 19 Lita
___ 20 Shawn Michaels
`],
  ['Immaculate Marks of Greatness — Parallels: Gold #/10; Platinum 1/1', `
___ 2 Brother Love
___ 4 Liv Morgan
___ 5 Jey Uso
___ 6 Ronda Rousey
___ 7 Carmelo Hayes
___ 8 Rey Mysterio
___ 9 Io Shirai
___ 10 Bayley
___ 11 Solo Sikoa
___ 12 Carmella
___ 13 Meiko Satomura
___ 14 Shinsuke Nakamura
___ 15 Alba Fyre
___ 16 Goldberg
___ 17 Ciampa
___ 18 Seth "Freakin" Rollins
___ 19 Ludwig Kaiser
___ 20 Bianca Belair
___ 21 Santos Escobar
___ 22 Otis
___ 24 Montez Ford
___ 25 Bron Breakker
___ 26 Finn Balor
___ 27 Cora Jade
___ 28 Alexa Bliss
___ 29 Mandy Rose
___ 30 Big E
___ 31 Gunther
___ 32 Mansoor
___ 34 Jimmy Uso
___ 35 Cameron Grimes
___ 37 Giovanni Vinci
___ 38 Asuka
___ 39 Raquel Rodriguez
___ 40 Ezekiel
`],
  ['Memorabilia Autographs — Base #/99; Parallels: Red #/25; Gold #/10; Acetate #/8; Green #/5; Platinum 1/1', `
___ 1 Drew McIntyre
___ 2 Liv Morgan
___ 3 Io Shirai
___ 4 Natalya
___ 5 AJ Styles
___ 6 Jimmy Uso
___ 7 Becky Lynch
___ 8 Ciampa
___ 9 Nikki A.S.H.
___ 10 Gigi Dolan
___ 11 Edge
___ 12 Omos
___ 13 Kevin Owens
___ 14 Randy Orton
___ 15 Alexa Bliss
___ 16 Seth "Freakin" Rollins
___ 17 Bianca Belair
___ 18 Apollo Crews
___ 19 Carmella
___ 20 Raquel Rodriguez
___ 21 Finn Balor
___ 22 Jey Uso
___ 23 Kofi Kingston
___ 24 Rey Mysterio
___ 25 Asuka
___ 26 Shinsuke Nakamura
___ 28 Damian Priest
___ 29 Charlotte Flair
___ 30 Rhea Ripley
___ 31 Gunther
___ 32 Ricochet
___ 33 Mandy Rose
___ 34 Xia Li
___ 36 The Miz
___ 37 "The All Mighty" Bobby Lashley
___ 38 Dominik Mysterio
___ 39 Dolph Ziggler
___ 40 Xavier Woods
`],
  ['Modern Marks — Base #/99; Parallels: Gold #/10; Platinum 1/1', `
___ 2 Shotzi
___ 3 Omos
___ 4 Kit Wilson
___ 5 Otis
___ 6 Stevie Turner
___ 7 Xyon Quinn
___ 8 Dana Brooke
___ 10 Mansoor
___ 11 Dominik Mysterio
___ 12 Reggie
___ 13 Elton Prince
___ 14 Queen Zelina
___ 15 Sonya Deville
___ 17 Rip Fowler
___ 19 Kofi Kingston
___ 20 Nikki A.S.H.
___ 21 Boa
___ 22 Jagger Reid
___ 23 Jinny
___ 24 Damian Priest
___ 26 Matt Riddle
___ 27 Robert Roode
___ 28 Carmella
___ 29 Sheamus
___ 30 Ridge Holland
`],
  ['Premium Memorabilia Autographs — Parallels: Red #/25; Gold #/10; Acetate #/8; Green #/5; Platinum 1/1', `
___ 2 Dana Brooke
___ 3 Brock Lesnar
___ 4 Rick Boogs
___ 5 Edge
___ 6 Kofi Kingston
___ 7 Jey Uso
___ 8 Roman Reigns
___ 9 Shayna Baszler
___ 10 Ciampa
___ 11 Becky Lynch
___ 12 Katana Chance
___ 13 Carmella
___ 14 Santos Escobar
___ 15 Finn Balor
___ 16 Mandy Rose
___ 17 Jimmy Uso
___ 18 Montez Ford
___ 19 Sheamus
___ 20 Theory
___ 21 Bianca Belair
___ 22 Alba Fyre
___ 23 Charlotte Flair
___ 25 Gunther
___ 26 Natalya
___ 27 Omos
___ 28 Seth "Freakin" Rollins
___ 29 AJ Styles
___ 30 Cameron Grimes
___ 32 Queen Zelina
___ 33 Dolph Ziggler
___ 34 Shotzi
___ 35 Io Shirai
___ 36 Randy Orton
___ 37 Matt Riddle
___ 38 Shinsuke Nakamura
___ 39 Alexa Bliss
___ 40 Drew Gulak
___ 41 "The All Mighty" Bobby Lashley
___ 42 Reggie
___ 43 Drew McIntyre
___ 44 Sonya Deville
___ 45 Kevin Owens
___ 46 Rey Mysterio
___ 47 Sami Zayn
___ 48 The Miz
___ 49 Asuka
___ 50 Doudrop
`],
  ['Quad Autograph Cards — Serial #/5; Parallels: Platinum 1/1', `
___ 1 Shawn Michaels/Triple H/X-Pac/Road Dogg
___ 2 Shawn Michaels/Edge/Randy Orton/John Cena
___ 3 Jey Uso/Sika/Jimmy Uso/Afa
___ 4 The Miz/Dolph Ziggler/Rob Van Dam/Edge
___ 5 Jimmy Uso/Angelo Dawkins/Montez Ford/Jey Uso
___ 6 Alexa Bliss/Asuka/Carmella/Bayley
___ 7 Ronda Rousey/Brock Lesnar/Shayna Baszler/Matt Riddle
___ 8 Undertaker/"Stone Cold" Steve Austin/Mankind/Triple H
___ 9 Faarooq/Kane/X-Pac/Bradshaw
___ 10 Goldberg/"The All Mighty" Bobby Lashley/Edge/Roman Reigns
`],
  ['Shadowbox Signatures — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Blair Davenport
___ 2 Lash Legend
___ 6 "The American Nightmare" Cody Rhodes
___ 7 Ivy Nile
___ 8 Joe Gacy
___ 9 Axiom
___ 11 Brutus Creed
___ 12 Noam Dar
___ 14 Solo Sikoa
___ 15 Gigi Dolan
___ 16 Von Wagner
___ 17 Jacy Jayne
___ 18 Julius Creed
___ 20 Kit Wilson
___ 21 Butch
___ 22 Odyssey Jones
___ 23 Drew Gulak
___ 24 Stevie Turner
___ 25 Grayson Waller
___ 26 Wes Lee
___ 27 Jinny
___ 28 Katana Chance
___ 29 Angelo Dawkins
___ 30 Max Dupri
___ 31 Damian Priest
___ 33 Elton Prince
___ 35 Indi Hartwell
___ 36 Xyon Quinn
___ 38 Kayden Carter
___ 39 Aoife Valkyrie
___ 40 Lacey Evans
`],
  ['The Bloodline Autograph Booklet — Serial #/25', `
___ 1 Solo Sikoa/Roman Reigns/Jimmy Uso/Afa/Sika/Rikishi/Jey Uso
`],
  ['Triple Autographs — Parallels: Platinum 1/1', `
___ 1 Undertaker/Shawn Michaels/Triple H
___ 2 Grayson Waller/Bron Breakker/Carmelo Hayes
___ 3 Dolph Ziggler/Bron Breakker/Ciampa
___ 4 Xavier Woods/Big E/Kofi Kingston
___ 5 Kelly Kelly/Michelle McCool/Beth Phoenix
___ 6 Seth "Freakin" Rollins/Stephanie McMahon/Triple H
___ 7 Faarooq/Undertaker/Bradshaw
___ 8 Jey Uso/Jimmy Uso/Roman Reigns
___ 9 D-Von Dudley/Spike Dudley/Bubba Ray Dudley
___ 11 Kevin Nash/Bret "Hit Man" Hart/Jeff Jarrett
___ 12 "Million Dollar Man" Ted DiBiase/LA Knight/Cameron Grimes
___ 13 Charlotte Flair/Becky Lynch/Bayley
___ 14 Randy Orton/Triple H/Batista
___ 15 Torrie Wilson/Michelle McCool/Kelly Kelly
___ 16 Mark Coffey/Wolfgang/Joe Coffey
___ 17 Jimmy Hart/The Honky Tonk Man/Greg Valentine
___ 18 Mandy Rose/Gigi Dolan/Jacy Jayne
___ 20 Butch/Ridge Holland/Sheamus
`],
  ['Jumbo Memorabilia Hoodies', `
___ 1 Brutus Creed
___ 3 Erik
___ 4 Edge
___ 11 Butch
___ 20 Seth "Freakin" Rollins
___ 26 Grayson Waller
___ 29 Alexa Bliss
___ 31 Carmelo Hayes
___ 45 Julius Creed
___ 50 Sheamus
___ 51 Iyo Sky
___ 63 Ivar
___ 68 Ridge Holland
___ 78 Roderick Strong
___ 83 Jey Uso
___ 86 Drew McIntyre
___ 93 Jimmy Uso
`],
  ['Jumbo Memorabilia Shirts', `
___ 1 Brutus Creed
___ 2 Tyler Bate
___ 3 Erik
___ 5 Jinder Mahal
___ 6 Noam Dar
___ 7 Lash Legend
___ 8 Rampage Brown
___ 9 AJ Styles
___ 10 Santos Escobar
___ 11 Butch
___ 12 Veer Mahaan
___ 13 Ezekiel
___ 14 Carmella
___ 15 Joaquin Wilde
___ 17 Liv Morgan
___ 18 Raquel Rodriguez
___ 19 Alba Fyre
___ 20 Seth "Freakin" Rollins
___ 21 Cameron Grimes
___ 22 Wes Lee
___ 23 Gigi Dolan
___ 24 Axiom
___ 25 Joe Gacy
___ 26 Grayson Waller
___ 27 Mandy Rose
___ 28 Reggie
___ 29 Alexa Bliss
___ 30 Shanky
___ 31 Carmelo Hayes
___ 32 Xavier Woods
___ 33 Happy Corbin
___ 34 Mark Coffey
___ 35 JD McDonagh
___ 36 Rey Mysterio
___ 37 Mansoor
___ 38 Rhea Ripley
___ 39 Angelo Dawkins
___ 40 Shayna Baszler
___ 41 Tommaso Ciampa
___ 42 Xia Li
___ 43 Indi Hartwell
___ 44 Dolph Ziggler
___ 45 Julius Creed
___ 46 Dominik Mysterio
___ 47 Meiko Satomura
___ 48 Ricochet
___ 49 Apollo Crews
___ 50 Sheamus
___ 51 Commander Azeez
___ 52 Xyon Quinn
___ 53 Iyo Sky
___ 54 Jinny
___ 55 Kayden Carter
___ 57 Montez Ford
___ 58 Matt Riddle
___ 59 Asuka
___ 60 Shinsuke Nakamura
___ 61 Damian Priest
___ 62 Zoey Stark
___ 63 Ivar
___ 64 Blair Davenport
___ 65 Kevin Owens
___ 67 MVP
___ 68 Ridge Holland
___ 69 Becky Lynch
___ 70 Shotzi
___ 71 Dana Brooke
___ 72 Ilja Dragunov
___ 73 Jacy Jayne
___ 74 Aoife Valkyrie
___ 75 Kofi Kingston
___ 77 Nikki A.S.H.
___ 78 Roderick Strong
___ 79 Bianca Belair
___ 80 "The All Mighty" Bobby Lashley
___ 81 Doudrop
___ 82 Joe Coffey
___ 83 Jey Uso
___ 84 Natalya
___ 85 Max Dupri
___ 86 Drew McIntyre
___ 87 Odyssey Jones
___ 88 Roman Reigns
___ 89 Boa
___ 90 The Miz
___ 91 Drew Gulak
___ 92 Wolfgang
___ 93 Jimmy Uso
___ 94 Sonya Deville
___ 95 Lacey Evans
___ 96 Cora Jade
___ 97 Otis
___ 98 Sami Zayn
___ 99 Bron Breakker
___ 100 Von Wagner
`],
  ['Jumbo Memorabilia Specialty', `
___ 16 Finn Balor
___ 38 Rhea Ripley
___ 39 Angelo Dawkins
___ 57 Montez Ford
___ 58 Matt Riddle
___ 69 Becky Lynch
`],
  ['Jumbo Ring Canvas — Serial #/99', `
___ 1 Roman Reigns
___ 2 Cameron Grimes
___ 3 "The American Nightmare" Cody Rhodes
___ 4 Mandy Rose
___ 5 "Stone Cold" Steve Austin
___ 6 Bron Breakker
___ 7 Edge
___ 8 Brock Lesnar
___ 9 Jimmy Uso
___ 10 Rey Mysterio
___ 11 The Miz
___ 12 Carmelo Hayes
___ 13 Seth "Freakin" Rollins
___ 14 Cora Jade
___ 15 Randy Orton
___ 16 AJ Styles
___ 17 Gable Steveson
___ 18 Jey Uso
___ 19 Kevin Owens
___ 20 Bianca Belair
___ 21 Tony D'Angelo
___ 22 Charlotte Flair
___ 23 Gunther
___ 24 Matt Riddle
___ 25 Theory
___ 26 Pat McAfee
___ 27 Dominik Mysterio
___ 28 Drew McIntyre
___ 29 Raquel Rodriguez
___ 30 Becky Lynch
___ 31 Tommaso Ciampa
___ 32 Ronda Rousey
___ 33 Dolph Ziggler
___ 34 "The All Mighty" Bobby Lashley
___ 35 Bianca Belair
___ 36 Becky Lynch
___ 37 Damian Priest
___ 38 The Miz
___ 39 "The All Mighty" Bobby Lashley
___ 40 Theory
___ 41 Rey Mysterio
___ 42 Dominik Mysterio
___ 43 Pat McAfee
___ 44 Jimmy Uso
___ 45 Jey Uso
___ 46 Liv Morgan
___ 47 Ronda Rousey
___ 48 Roman Reigns
___ 49 Brock Lesnar
___ 50 Finn Balor
`],
  ['Standout Memorabilia — Serial #/99; Parallels: Red #/25; Gold #/10; Platinum 1/1', `
___ 1 Indi Hartwell
___ 2 Xavier Woods
___ 3 Joaquin Wilde
___ 4 Lacey Evans
___ 5 AJ Styles
___ 6 Rampage Brown
___ 7 Bron Breakker
___ 8 Roman Reigns
___ 9 Dana Brooke
___ 10 Shinsuke Nakamura
___ 11 Ivar
___ 12 Xyon Quinn
___ 13 JD McDonagh
___ 14 Mansoor
___ 15 Alexa Bliss
___ 16 Reggie
___ 17 Butch
___ 18 Santos Escobar
___ 19 Doudrop
___ 20 "The All Mighty" Bobby Lashley
___ 21 Jey Uso
___ 22 Wolfgang
___ 23 Kayden Carter
___ 24 Montez Ford
___ 25 Apollo Crews
___ 26 Ricochet
___ 27 Carmelo Hayes
___ 28 Seth "Freakin" Rollins
___ 29 Erik
___ 30 Carmella
___ 31 Jinder Mahal
___ 32 Liv Morgan
___ 33 Kofi Kingston
___ 34 Odyssey Jones
___ 35 Bianca Belair
___ 36 Ridge Holland
___ 37 Commander Azeez
___ 38 Shayna Baszler
___ 39 Gigi Dolan
___ 40 Veer Mahaan
`],
  ['Superstar Swatches — Serial #/99; Parallels: Red #/25; Gold #/10; Platinum 1/1', `
___ 1 Alba Fyre
___ 2 Nikki A.S.H.
___ 3 Brutus Creed
___ 4 Matt Riddle
___ 5 Carmella
___ 6 Sheamus
___ 7 Iyo Sky
___ 8 Wes Lee
___ 9 Joe Gacy
___ 10 Lash Legend
___ 11 Angelo Dawkins
___ 12 Otis
___ 13 Cameron Grimes
___ 14 Roderick Strong
___ 15 Drew Gulak
___ 16 Shotzi
___ 17 Jacy Jayne
___ 18 Xia Li
___ 19 Julius Creed
___ 20 Mandy Rose
___ 21 Asuka
___ 22 Raquel Rodriguez
___ 23 Tommaso Ciampa
___ 24 Sami Zayn
___ 25 Ezekiel
___ 26 The Miz
___ 27 Jimmy Uso
___ 28 Zoey Stark
___ 29 Kevin Owens
___ 30 Meiko Satomura
___ 31 Boa
___ 32 Rhea Ripley
___ 33 Damian Priest
___ 34 Shanky
___ 35 Happy Corbin
___ 36 Tyler Bate
___ 37 Jinny
___ 38 Blair Davenport
___ 39 Max Dupri
___ 40 MVP
`],
  ['Immaculate Standard — Serial #/99', `
___ 1 Bayley
___ 2 Sheamus
___ 3 Austin Theory
___ 4 Kevin Owens
___ 5 Gable Steveson
___ 6 Iyo Sky
___ 7 Alexa Bliss
___ 8 Queen Zelina
___ 9 Gigi Dolan
___ 10 Ivy Nile
___ 11 Mandy Rose
___ 12 The Miz
___ 13 Carmelo Hayes
___ 14 Shotzi
___ 15 Roman Reigns
___ 16 Jacy Jayne
___ 17 Charlotte Flair
___ 18 Rhea Ripley
___ 19 Liv Morgan
___ 20 Jey Uso
___ 21 AJ Styles
___ 22 Brutus Creed
___ 23 Drew McIntyre
___ 24 Finn Balor
___ 25 Bron Breakker
___ 26 Lacey Evans
___ 27 Becky Lynch
___ 28 Matt Riddle
___ 29 Randy Orton
___ 30 Jimmy Uso
___ 31 Sonya Deville
___ 32 Julius Creed
___ 33 Edge
___ 34 "The All Mighty" Bobby Lashley
___ 35 Xavier Woods
___ 36 Nikki A.S.H.
___ 37 Bianca Belair
___ 38 Carmella
___ 39 Rey Mysterio
___ 40 Alba Fyre
___ 41 Asuka
___ 42 Natalya
___ 43 Katana Chance
___ 44 Grayson Waller
___ 45 Brock Lesnar
___ 46 Omos
___ 47 Cora Jade
___ 48 Dominik Mysterio
___ 49 Seth "Freakin" Rollins
___ 50 Kofi Kingston
`],
]));

// ── 2022 PANINI WWE IMPECCABLE ────────────────────────────────────────────────
setsHtml.push(makeSet('imp22', '2022', '2022 Panini WWE Impeccable', [
  ['Base Set — Serial #/99; Parallels: Silver #/49; Gold #/35; Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 The Rock
___ 2 Rhea Ripley
___ 3 Ivar
___ 4 AJ Styles
___ 5 Ricochet
___ 6 Damian Priest
___ 7 Rhonda Rousey
___ 8 Otis
___ 9 Cameron Grimes
___ 10 Alexa Bliss
___ 11 Stone Cold Steve Austin
___ 12 Tamina
___ 13 Jey Uso
___ 14 Akira Tozawa
___ 15 Ridge Holland
___ 16 Dolph Ziggler
___ 17 Chyna
___ 18 Randy Orton
___ 19 Eddie Guerrero
___ 20 Becky Lynch
___ 21 Undertaker
___ 22 Angel
___ 23 Jimmy Uso
___ 24 Angelo Dawkins
___ 25 Roman Reigns
___ 26 Dominik Mysterio
___ 27 Shayna Baszler
___ 28 Reggie
___ 29 Dusty Rhodes
___ 30 Bianca Belair
___ 31 Triple H
___ 32 Big E
___ 33 Jinder Mahal
___ 34 Apollo Crews
___ 35 Sami Zayn
___ 36 Edge
___ 37 Shotzi
___ 38 Rey Mysterio
___ 39 Solo Sikoa
___ 40 Carmella
___ 41 Cactus Jack
___ 42 The American Nightmare Cody Rhodes
___ 43 Xavier Woods
___ 44 Theory
___ 45 Sheamus
___ 46 Finn Balor
___ 47 Xia Li
___ 48 Riddle
___ 49 Ciampa
___ 50 Dana Brooke
___ 51 Bruno Sammartino
___ 52 Drew Gulak
___ 53 Kofi Kingston
___ 54 The All Mighty Bobby Lashley
___ 55 Shinsuke Nakamura
___ 56 Kevin Owens
___ 57 Asuka
___ 58 Robert Roode
___ 59 Santos Escobar
___ 60 Doudrop
___ 61 Ultimate Warrior
___ 62 Drew McIntyre
___ 64 Mace
___ 65 Aliyah
___ 66 The Miz
___ 67 Bayley
___ 68 R-Truth
___ 69 Goldberg
___ 70 Liv Morgan
___ 71 Andre The Giant
___ 72 Erik
___ 73 Madcap Moss
___ 74 Cedric Alexander
___ 75 Charlotte Flair
___ 76 Montez Ford
___ 77 John Cena
___ 78 Seth "Freakin" Rollins
___ 79 Raquel Rodriguez
___ 80 Maryse
___ 81 Meiko Satomura
___ 82 Happy Corbin
___ 83 Mansoor
___ 84 Chad Gable
___ 85 Hulk Hogan
___ 86 MVP
___ 87 Lacey Evans
___ 88 Shelton Benjamin
___ 89 Alba Fyre
___ 90 Nikki A.S.H.
___ 91 Ilja Dragunov
___ 92 Humberto
___ 93 Rick Boogs
___ 94 Commander Azeez
___ 95 Natalya
___ 96 Omos
___ 97 Shanky
___ 98 T-Bar
___ 99 Mandy Rose
___ 100 Queen Zelina
`],
  ['Elegance Rookie Memorabilia Autographs — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 101 Bron Breakker
___ 102 Carmelo Hayes
___ 103 Gable Steveson
___ 104 Grayson Waller
___ 105 Ivy Nile
___ 106 Joe Gacy
___ 107 Von Wagner
___ 108 Cora Jade
___ 109 Jacy Jayne
___ 110 Veer Mahaan
`],
  ['Elegance Memorabilia Autographs — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Io Shirai
___ 2 Carmella
___ 3 Jey Uso
___ 4 Brock Lesnar
___ 5 Liv Morgan
___ 6 Finn Balor
___ 7 Rhea Ripley
___ 8 AJ Styles
___ 9 Shotzi
___ 11 Raquel Rodriguez
___ 12 LA Knight
___ 13 Jimmy Uso
___ 14 Roman Reigns
___ 15 Montez Ford
___ 16 Randy Orton
___ 17 Riddle
___ 18 Alexa Bliss
___ 19 The Miz
___ 20 The All Mighty Bobby Lashley
___ 21 Ciampa
___ 22 Damian Priest
___ 23 Jinder Mahal
___ 24 Becky Lynch
___ 25 Omos
___ 26 Rey Mysterio
___ 27 Sami Zayn
___ 28 Asuka
___ 29 Cameron Grimes
___ 30 Charlotte Flair
___ 31 Ilja Dragunov
___ 32 Dolph Ziggler
___ 33 Kevin Owens
___ 34 Drew McIntyre
___ 35 Natalya
___ 36 Otis
___ 37 Sheamus
___ 39 Doudrop
___ 40 Angelo Dawkins
___ 41 Gunther
___ 42 Dominik Mysterio
___ 43 Kofi Kingston
___ 44 Edge
___ 45 Sonya Deville
___ 46 Seth "Freakin" Rollins
___ 47 Shinsuke Nakamura
___ 48 Bianca Belair
___ 49 Gigi Dolan
___ 50 Apollo Crews
`],
  ['Illustrious Ink — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Jinny
___ 2 Otis
___ 3 Jerry Lawler
___ 4 Diamond Dallas Page
___ 5 Joaquin Wilde
___ 6 Faarooq
___ 7 Zoey Stark
___ 8 Hacksaw Jim Duggan
___ 9 Mandy Rose
___ 10 Drew Gulak
___ 11 Kenny Williams
___ 12 Ridge Holland
___ 13 Dana Brooke
___ 15 Afa
___ 16 Don Muraco
___ 17 Odyssey Jones
___ 18 Amale
___ 19 Mark Coffey
___ 20 Ivar
___ 21 Teoman
___ 22 Carmella
___ 23 Sonya Deville
___ 24 Sika
___ 25 Boa
___ 26 Cactus Jack
___ 27 Julius Creed
___ 28 Dominik Mysterio
___ 29 Dave Mastiff
___ 30 Xavier Woods
`],
  ['Immortal Ink — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Booker T
___ 2 Cowboy Bob Orton
___ 3 Rikishi
___ 4 Undertaker
___ 5 Brutus Beefcake
___ 6 Greg Valentine
___ 7 Brie Bella
___ 8 Jimmy Hart
___ 9 Superstar Billy Graham
___ 10 Paige
___ 11 Iron Sheik
___ 12 X-Pac
___ 13 Brother Love
___ 14 Shawn Michaels
___ 15 Bushwhacker Butch
___ 16 Ivory
___ 17 Lita
___ 18 Michael Hayes
___ 19 Million Dollar Man Ted DiBiase
___ 20 Rob Van Dam
___ 21 John "Bradshaw" Layfield
___ 22 Kelly Kelly
___ 23 Alundra Blayze
___ 24 Bret "Hit Man" Hart
___ 25 Bushwhacker Luke
___ 26 Jerry Lawler
___ 27 Nikki Bella
___ 28 Molly Holly
___ 29 Beth Phoenix
___ 30 The Godfather
`],
  ['Impeccable Championship Debuts Autographs', `
___ 1 Stone Cold Steve Austin
___ 2 AJ Styles
___ 3 Alexa Bliss
___ 4 Asuka
___ 5 Batista
___ 6 Becky Lynch
___ 7 Beth Phoenix
___ 8 Bianca Belair
___ 9 Brock Lesnar
___ 10 Charlotte Flair
___ 11 Drew McIntyre
___ 12 Edge
___ 13 Finn Balor
___ 14 Goldberg
___ 15 Hulk Hogan
___ 16 Iron Sheik
___ 17 John "Bradshaw" Layfield
___ 18 John Cena
___ 19 Kelly Kelly
___ 20 Kofi Kingston
___ 21 Lita
___ 22 Mankind
___ 23 Michelle McCool
___ 24 Paige
___ 25 Randy Orton
___ 26 Rey Mysterio
___ 27 Dolph Ziggler
___ 28 The All Mighty Bobby Lashley
___ 29 Seth "Freakin" Rollins
___ 30 Sheamus
`],
  ['Impeccable Championships Signatures', `
___ 1 Seth "Freakin" Rollins
___ 2 Bret "Hit Man" Hart
___ 3 Stone Cold Steve Austin
___ 4 John Cena
___ 5 Trish Stratus
___ 6 Randy Orton
___ 7 Batista
___ 8 Edge
___ 9 Roman Reigns
___ 10 Mankind
___ 11 Goldberg
___ 12 Undertaker
___ 13 Charlotte Flair
___ 14 Triple H
___ 15 Alundra Blayze
___ 16 Hulk Hogan
___ 17 AJ Styles
___ 18 Becky Lynch
___ 19 Alexa Bliss
___ 20 Brock Lesnar
`],
  ['Impeccable Hall of Fame Signatures', `
___ 1 Greg Valentine
___ 2 JBL
___ 3 The Godfather
___ 4 Molly Holly
___ 5 Jimmy Hart
___ 6 Lita
___ 7 Jerry Lawler
___ 8 Goldberg
___ 9 Ivan Putski
___ 10 Shawn Michaels
___ 11 Torrie Wilson
___ 12 Ron Simmons
___ 13 Hulk Hogan
___ 14 Trish Stratus
___ 15 Iron Sheik
___ 16 Diamond Dallas Page
___ 17 Undertaker
___ 18 Million Dollar Man Ted DiBiase
___ 19 Johnny Rodz
___ 20 Brutus Beefcake
___ 21 Alundra Blayze
___ 22 Kane
___ 23 Cowboy Bob Orton
___ 24 Booker T
___ 25 Bret "Hit Man" Hart
___ 26 Rob Van Dam
___ 27 Beth Phoenix
___ 28 Ivory
___ 29 Rikishi
___ 30 Edge
`],
  ['Impeccable Jumbo Materials — Serial #/35', `
___ 1 Finn Balor
___ 2 The All Mighty Bobby Lashley
___ 3 Randy Orton
___ 4 Liv Morgan
___ 5 Stone Cold Steve Austin
___ 6 AJ Styles
___ 7 Brock Lesnar
___ 8 Asuka
___ 9 Becky Lynch
___ 10 Bianca Belair
___ 11 Edge
___ 12 Charlotte Flair
___ 13 Rey Mysterio
___ 14 Carmella
___ 15 Seth "Freakin" Rollins
___ 16 Alexa Bliss
___ 17 Roman Reigns
___ 18 Bron Breakker
___ 19 Drew McIntyre
___ 20 The American Nightmare Cody Rhodes
`],
  ['Impeccable WrestleMania Signatures', `
___ 1 Batista
___ 2 Rey Mysterio
___ 3 Brock Lesnar
___ 4 Undertaker
___ 5 Kofi Kingston
___ 6 Kane
___ 7 Seth "Freakin" Rollins
___ 8 Shawn Michaels
___ 9 The Miz
___ 10 Edge
___ 11 Stone Cold Steve Austin
___ 12 Kurt Angle
___ 13 JBL
___ 14 Triple H
___ 15 AJ Styles
___ 16 Randy Orton
___ 17 Sheamus
___ 18 John Cena
___ 19 Roman Reigns
___ 20 Hulk Hogan
`],
  ['Indelible Ink — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Xyon Quinn
___ 2 Batista
___ 3 Jordan Devlin
___ 4 Robert Roode
___ 5 Kit Wilson
___ 6 Michelle McCool
___ 7 Gerald Brisco
___ 8 Commander Azeez
___ 9 Shanky
___ 10 Mansoor
___ 11 Zack Gibson
___ 12 Rhea Ripley
___ 13 Mandy Rose
___ 14 Diesel
___ 15 Stevie Turner
___ 16 Xia Li
___ 17 Ivy Nile
___ 18 Doudrop
___ 19 The Boogeyman
___ 20 MVP
___ 21 Dani Luna
___ 22 Rick Boogs
___ 23 Elton Prince
___ 24 Shotzi
___ 25 Fabian Aichner
___ 27 Katana Chance
___ 28 Erik
___ 29 The Hurricane
___ 30 Nikki A.S.H.
___ 31 Flash Morgan Webster
___ 32 Ricochet
___ 33 Mark Andrews
___ 34 Kurt Angle
___ 35 Tyler Bate
___ 36 Gable Steveson
___ 37 Lex Luger
___ 38 Lacey Evans
___ 39 William Regal
___ 40 Omos
`],
  ['Stainless Stars Autographs — Serial #/99; Parallels: Blue #/75; Purple #/49; Orange #/25; Gold #/10; Platinum 1/1', `
___ 1 Meiko Satomura
___ 2 Seth "Freakin" Rollins
___ 3 Titus O'Neil
___ 4 Roman Reigns
___ 5 Katana Chance
___ 6 Trish Stratus
___ 7 Indi Hartwell
___ 8 Torrie Wilson
___ 9 Aoife Valkyrie
___ 10 Becky Lynch
___ 11 A-Kid
___ 12 Bron Breakker
___ 13 Zack Gibson
___ 14 Brock Lesnar
___ 15 Wes Lee
___ 16 Randy Orton
___ 17 Raquel Rodriguez
___ 18 Finn Balor
___ 19 Noam Dar
___ 20 Drew McIntyre
___ 21 Santos Escobar
___ 22 Sarray
___ 23 Io Shirai
___ 24 Rey Mysterio
___ 25 Goldberg
`],
  ['Superstars Autographs — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Batista
___ 2 Happy Corbin
___ 3 Alexa Bliss
___ 4 Kayden Carter
___ 5 Asuka
___ 6 Wolfgang
___ 7 Riddle
___ 8 Ezekiel
___ 9 Stone Cold Steve Austin
___ 10 Shayna Baszler
___ 11 Goldberg
___ 12 James Drake
___ 13 The All Mighty Bobby Lashley
___ 14 Brutus Creed
___ 15 Bianca Belair
___ 16 Emilia McKenzie
___ 17 Riddle
___ 18 Bad News Barrett
___ 19 John Cena
___ 20 Angelo Dawkins
___ 21 Hulk Hogan
___ 22 Roderick Strong
___ 23 Bayley
___ 24 Ludwig Kaiser
___ 25 Big E
___ 26 Joe Coffey
___ 27 Liv Morgan
___ 28 Natalya
___ 29 Road Dogg
___ 30 Reggie
___ 31 AJ Styles
___ 32 Lash Legend
___ 33 Charlotte Flair
___ 34 Jacy Jayne
___ 35 Montez Ford
___ 36 Rampage Brown
___ 37 Theory
___ 38 Queen Zelina
___ 39 Triple H
___ 40 Superstar Billy Graham
`],
  ['Silver WWE Logo — Serial #/35; Parallels: Gold 1/1', `
___ 1 Jimmy Uso
___ 2 Seth "Freakin" Rollins
___ 3 Big E
___ 4 Cora Jade
___ 5 Solo Sikoa
___ 6 Kofi Kingston
___ 7 AJ Styles
___ 8 Asuka
___ 9 Jey Uso
___ 10 Bayley
___ 11 Roman Reigns
___ 12 Raquel Rodriguez
___ 13 Sami Zayn
___ 14 Bron Breakker
___ 15 Carmella
___ 16 The All Mighty Bobby Lashley
___ 17 Damian Priest
___ 18 Drew McIntyre
___ 19 The American Nightmare Cody Rhodes
___ 20 Liv Morgan
___ 21 Dominik Mysterio
___ 22 Ilja Dragunov
___ 23 Edge
___ 24 Grayson Waller
___ 25 Riddle
___ 26 Shinsuke Nakamura
___ 27 Rhonda Rousey
___ 28 Brock Lesnar
___ 29 Randy Orton
___ 30 Charlotte Flair
___ 31 Bianca Belair
___ 32 Mandy Rose
___ 33 Rey Mysterio
___ 34 Finn Balor
___ 35 Ciampa
___ 46 Kevin Owens
___ 47 Alexa Bliss
___ 48 The Miz
___ 49 Becky Lynch
___ 50 John Cena
`],
  ['Silver WWE Legends Logo — Serial #/35; Parallels: Gold 1/1', `
___ 1 Junkyard Dog
___ 2 Paul Bearer
___ 3 Alundra Blayze
___ 4 Rowdy Roddy Piper
___ 5 Bret "Hit Man" Hart
___ 6 Stone Cold Steve Austin
___ 7 Diesel
___ 8 Triple H
___ 9 Hulk Hogan
___ 10 Undertaker
___ 11 Macho Man Randy Savage
___ 12 Razor Ramon
___ 13 Andre The Giant
___ 14 Terry Gordy
___ 15 Brie Bella
___ 16 Million Dollar Man Ted DiBiase
___ 17 Dusty Rhodes
___ 18 Trish Stratus
___ 19 Iron Sheik
___ 20 Vader
___ 21 Mankind
___ 22 Rob Van Dam
___ 23 Batista
___ 24 Shawn Michaels
___ 25 Bruno Sammartino
___ 26 Superstar Billy Graham
___ 27 Eddie Guerrero
___ 28 Ultimate Warrior
___ 29 JBL
___ 30 X-Pac
___ 31 Nikki Bella
___ 32 The Rock
___ 33 Booker T
___ 34 Stacy Keibler
___ 35 Chyna
___ 36 Terry Funk
___ 37 Goldberg
___ 38 Umaga
___ 39 Jerry Lawler
___ 40 Yokozuna
`],
  ['Stainless Stars — Serial #/99; Parallels: Orange #/25; Red FOTL #/15; Gold #/10; Platinum 1/1', `
___ 1 Undertaker
___ 2 Mandy Rose
___ 3 Triple H
___ 4 Solo Sikoa
___ 5 The Rock
___ 6 Drew McIntyre
___ 7 Stone Cold Steve Austin
___ 8 Charlotte Flair
___ 9 Randy Orton
___ 10 Seth "Freakin" Rollins
___ 11 Roman Reigns
___ 12 Bron Breakker
___ 13 Edge
___ 14 Ciampa
___ 15 Ronda Rousey
___ 16 Brock Lesnar
___ 17 The American Nightmare Cody Rhodes
___ 18 John Cena
___ 19 Becky Lynch
___ 20 Raquel Rodriguez
___ 21 Bianca Belair
___ 22 Cora Jade
___ 23 Rey Mysterio
___ 24 The All Mighty Bobby Lashley
___ 25 Alexa Bliss
`],
]));

// ── 2022-2023 PANINI WWE INSTANT WEEKLY PASS ──────────────────────────────────
setsHtml.push(makeSet('ins22', '2022', '2022–2023 Panini WWE Instant Weekly Pass', [
  ['Base — Parallels: Versicolor #/5; Black 1/1', `
___ 1 Undertaker
___ 2 Raquel Gonzalez & Dakota Kai
___ 3 Cameron Grimes
___ 4 Tommaso Ciampa
___ 5 MSK
___ 6 Mandy Rose
___ 7 Dolph Ziggler
___ 8 The Usos
___ 9 Bianca Belair
___ 10 Cody Rhodes
___ 11 Charlotte Flair
___ 12 "Stone Cold" Steve Austin
___ 13 Triple H
___ 14 RK-Bro
___ 15 Gable Steveson
___ 16 Sasha Banks & Naomi
___ 17 Edge & Damian Priest
___ 18 Roman Reigns
___ 19 Bron Breakker
___ 20 Toxic Attraction
___ 21 Nikkita Lyons
___ 22 "The American Nightmare" Cody Rhodes
___ 23 Omos
___ 24 Edge
___ 25 Rhea Ripley
___ 26 Rhonda Rousey
___ 27 Roman Reigns & The Usos
___ 28 The Usos
___ 29 Bianca Belair
___ 30 Theory
___ 31 Cody Rhodes
___ 32 Finn Balor
___ 33 Gunther
___ 34 Brock Lesnar
___ 35 John Cena
___ 36 John Cena
___ 37 John Cena
___ 38 John Cena
___ 39 John Cena
___ 40 John Cena
___ 41 John Cena
___ 42 John Cena
___ 43 John Cena
___ 44 John Cena
___ 45 John Cena
___ 46 John Cena
___ 47 John Cena
___ 48 John Cena
___ 49 John Cena
___ 50 John Cena
___ 51 John Cena
___ 52 "The All Mighty" Bobby Lashley
___ 53 The Usos
___ 54 Liv Morgan
___ 55 Riddle
___ 56 Theory
___ 57 Cora Jade & Roxanne Perez
___ 58 Bianca Belair
___ 59 Edge
___ 60 Pat McAfee
___ 61 Roman Reigns
___ 62 Raquel Rodriguez & Aliyah
___ 63 Damage CTRL
___ 64 Gunther
___ 65 Dominik Mysterio
___ 66 Seth "Freakin" Rollins
___ 67 Roman Reigns
___ 68 Pretty Deadly
___ 69 Mandy Rose
___ 70 Bron Breakker
___ 71 Braun Strowman
___ 72 Damage CTRL
___ 73 Solo Sikoa
___ 74 Ronda Rousey
___ 75 Karrion Kross
___ 76 Matt Riddle
___ 77 Bray Wyatt
___ 78 Wes Lee
___ 79 Roxanne Perez
___ 80 Mandy Rose
___ 81 Bron Breakker
___ 82 Ava Rayne
___ 83 Becky Lynch
___ 84 AJ Styles
___ 85 Austin Theory
___ 86 Sami Zayn
___ 87 Roxanne Perez
___ 88 "The American Nightmare" Cody Rhodes
___ 89 Rhea Ripley
___ 90 Sami Zayn
___ 91 Lita & Becky Lynch
`],
]));

// ── 2022 PANINI WWE NXT 2.0 ───────────────────────────────────────────────────
setsHtml.push(makeSet('nxt22', '2022', '2022 Panini WWE NXT 2.0 Wrestling Cards', [
  ['Base Set — Parallels: Green; Silver; Red #/199; Blue #/149; Purple #/99; Black & Gold #/75; Teal #/49; 2.0 #/25; Gold #/10; Black 1/1', `
___ 1 Sanga
___ 2 Tyler Bate
___ 3 Fallon Henley
___ 4 Alba Fyre
___ 5 Andre Chase
___ 6 Zoey Stark
___ 7 Giovanni Vinci
___ 8 Xia Brookside
___ 9 Jack Starz
___ 10 Mark Andrews
___ 11 Solo Sikoa
___ 12 Wolfgang
___ 13 Cora Jade
___ 14 Kayden Carter
___ 15 Boa
___ 16 Tiger Turan
___ 17 Grayson Waller
___ 18 A-Kid
___ 19 Oliver Carter
___ 20 Mark Coffey
___ 21 Nathan Frazer
___ 22 Dani Luna
___ 23 Damon Kemp
___ 24 Lash Legend
___ 25 Bron Breakker
___ 26 Santos Escobar
___ 27 Ashton Smith
___ 28 Dave Mastiff
___ 29 Malik Blade
___ 30 Noam Dar
___ 31 Tony D'Angelo
___ 32 Emilia McKenzie
___ 33 Elektra Lopez
___ 34 Mandy Rose
___ 35 Brooks Jensen
___ 36 Amale
___ 37 Charlie Dempsey
___ 38 Eddie Dennis
___ 39 Sam Gradwell
___ 40 Rampage Brown
___ 41 Trick Williams
___ 42 Stevie Turner
___ 43 Gigi Dolin
___ 44 Aleah James
___ 45 Brutus Creed
___ 46 Aoife Valkyrie
___ 47 Ikemen Jiro
___ 48 Flash Morgan Webster
___ 49 Roxanne Perez
___ 50 Kit Wilson
___ 51 Von Wagner
___ 52 Wild Boar
___ 53 Indi Hartwell
___ 54 Bodhi Hayward
___ 55 Carmelo Hayes
___ 56 Blair Davenport
___ 57 James Drake
___ 58 Ilja Dragunov
___ 59 Odyssey Jones
___ 60 Saxon Huxley
___ 61 Wes Lee
___ 62 Primate
___ 63 Io Shirai
___ 64 Sarray
___ 65 Cameron Grimes
___ 66 Isla Dawn
___ 67 Joaquin Wilde
___ 68 Joe Coffey
___ 69 Nikkita Lyons
___ 70 Sha Samuels
___ 71 Xyon Quinn
___ 72 Roderick Strong
___ 73 Ivy Nile
___ 74 Tiffany Stratton
___ 75 Dante Chen
___ 76 Jinny
___ 77 Joe Gacy
___ 78 Jordan Devlin
___ 79 Cruz Del Toro
___ 80 Teoman
___ 81 Zack Gibson
___ 82 Edris Enofe
___ 83 Jacy Jayne
___ 84 Valentina Feroz
___ 85 T-Bone
___ 86 Meiko Satomura
___ 87 Josh Briggs
___ 88 Kenny Williams
___ 89 Robert Stone
___ 90 Trent Seven
___ 91 Amari Miller
___ 92 Yulisa Leon
___ 93 Katana Chance
___ 94 Wendy Choo
___ 95 Duke Hudson
___ 96 Nina Samuels
___ 97 Julius Creed
___ 98 Elton Prince
___ 99 Johnny Saint
___ 100 Triple H
`],
  ['NXT Alumni — Parallels: Green; Silver; Red #/199; Blue #/149; Purple #/99; Black & Gold #/75; Teal #/49; 2.0 #/25; Gold #/10; Black 1/1', `
___ 101 Kevin Owens
___ 102 Bianca Belair
___ 103 Drew McIntyre
___ 104 Montez Ford
___ 105 Bayley
___ 106 Apollo Crews
___ 107 Seth "Freakin" Rollins
___ 108 Charlotte Flair
___ 109 Big E
___ 110 Shayna Baszler
___ 111 Finn Balor
___ 112 Damian Priest
___ 113 Alexa Bliss
___ 114 Angelo Dawkins
___ 115 Becky Lynch
___ 116 Asuka
___ 117 Tyler Breeze
___ 118 Otis
___ 119 Sami Zayn
___ 120 Ricochet
___ 121 Shinsuke Nakamura
___ 122 Chad Gable
___ 123 Rhea Ripley
___ 124 Roman Reigns
___ 125 Corey Graves
`],
  ['Dual Autographs — Serial #/25; Parallels: Gold #/10; Black 1/1', `
___ 1 Trent Seven/Tyler Bate
___ 3 Wolfgang/Mark Coffey
___ 4 Bron Breakker/Tommaso Ciampa
___ 5 Cameron Grimes/LA Knight
___ 6 Julius Creed/Brutus Creed
___ 7 Bron Breakker/Santos Escobar
___ 8 Marcel Barthel/Fabian Aichner
___ 9 Io Shirai/Zoey Stark
___ 11 Blair Davenport/Meiko Satomura
___ 12 Kacy Catanzaro/Kayden Carter
___ 13 Elton Prince/Kit Wilson
___ 14 Mandy Rose/Raquel Gonzalez
___ 16 James Drake/Zack Gibson
___ 19 AJ Styles/Grayson Waller
___ 20 Gigi Dolin/Jacy Jayne
`],
  ['NXT Alumni Signatures — Parallels: Green; Red #/49; 2.0 #/25; Black & Gold #/25; Gold #/10; Black 1/1', `
___ 1 Big E
___ 2 Seth "Freakin" Rollins
___ 3 Shayna Baszler
___ 4 Drew McIntyre
___ 5 Alexa Bliss
___ 6 Kevin Owens
___ 7 Asuka
___ 8 Paige
___ 9 Becky Lynch
___ 10 Sami Zayn
___ 11 Carmella
___ 12 Shinsuke Nakamura
___ 13 Charlotte Flair
___ 14 Finn Balor
___ 15 Apollo Crews
___ 16 Liv Morgan
___ 17 Bayley
___ 18 Roman Reigns
___ 19 Bianca Belair
`],
  ['NXT Signatures — Parallels: Green; Red #/49; 2.0 #/25; Black & Gold #/25; Gold #/10; Black 1/1', `
___ 1 Kit Wilson
___ 2 Gigi Dolin
___ 3 Trent Seven
___ 4 Jacy Jayne
___ 5 Kacy Catanzaro
___ 6 A-Kid
___ 7 Lash Legend
___ 8 Brutus Creed
___ 9 Noam Dar
___ 10 Dani Luna
___ 11 Santos Escobar
___ 12 Grayson Waller
___ 13 Tyler Bate
___ 14 Jinny
___ 15 Kay Lee Ray
___ 16 Amale
___ 17 Elton Prince
___ 18 Cameron Grimes
___ 19 Odyssey Jones
___ 20 Dave Mastiff
___ 21 Sarray
___ 22 Ilja Dragunov
___ 23 Von Wagner
___ 24 Joe Coffey
___ 25 Kayden Carter
___ 26 Aoife Valkyrie
___ 27 Mandy Rose
___ 31 Stevie Turner
___ 32 Indi Hartwell
___ 33 Gunther
___ 34 Joe Gacy
___ 35 Kenny Williams
___ 36 Blair Davenport
___ 37 Marcel Barthel
___ 38 Carmelo Hayes
___ 39 Wolfgang
___ 40 Emilia McKenzie
___ 41 Teoman
___ 42 Io Shirai
___ 43 Wes Lee
___ 44 Roderick Strong
___ 46 Boa
___ 47 Meiko Satomura
___ 48 Cora Jade
___ 49 Rampage Brown
___ 50 Fabian Aichner
___ 51 Tommaso Ciampa
___ 52 Ivy Nile
___ 53 Xyon Quinn
___ 54 Julius Creed
___ 55 LA Knight
___ 56 Bron Breakker
___ 59 Raquel Gonzalez
___ 60 Flash Morgan Webster
`],
  ['NXT Memorabilia Signatures — Parallels: 2.0 #/25; Gold #/10; Black 1/1', `
___ 1 Io Shirai (#/49)
___ 2 Wes Lee (#/99)
___ 3 Joaquin Wilde (#/99)
___ 4 Alba Fyre (#/99)
___ 5 Boa (#/99)
___ 6 Lash Legend (#/99)
___ 7 Cora Jade (#/99)
___ 8 Odyssey Jones (#/99)
___ 9 Giovanni Vinci (#/99)
___ 10 Santos Escobar (#/99)
___ 11 Ivy Nile (#/49)
___ 12 Xyon Quinn (#/99)
___ 13 Joe Gacy (#/99)
___ 14 Kayden Carter (#/99)
___ 15 Bron Breakker (#/99)
___ 16 Mandy Rose (#/99)
___ 17 Carmelo Hayes (#/49)
___ 18 Trent Seven (#/99)
___ 19 Gigi Dolin (#/49)
___ 20 Sarray (#/99)
___ 21 Jacy Jayne (#/99)
___ 22 Zack Gibson (#/99)
___ 23 Julius Creed (#/99)
___ 24 Gunther (#/99)
___ 25 Brutus Creed (#/99)
___ 26 Ludwig Kaiser (#/49)
___ 27 Roderick Strong (#/99)
___ 28 Meiko Satomura (#/24)
___ 29 Grayson Waller (#/99)
___ 30 Ciampa (#/49)
___ 31 James Drake (#/99)
___ 32 Zoey Stark (#/99)
___ 33 Katana Chance (#/99)
___ 34 Max Dupri (#/49)
___ 35 Cameron Grimes (#/99)
___ 37 Tyler Bate (#/99)
___ 38 Raquel Rodriguez (#/49)
___ 39 Indi Hartwell (#/99)
___ 40 Von Wagner (#/99)
`],
  ['NXT Memorabilia — Parallels: Green; Red #/99; Blue #/49; 2.0 #/25; Black & Gold #/25; Gold #/10; Black 1/1', `
___ 1 Noam Dar
___ 2 Lash Legend
___ 3 Meiko Satomura
___ 4 Boa
___ 5 Wes Lee
___ 6 Kenny Williams
___ 7 Blair Davenport
___ 8 Io Shirai
___ 9 Mark Andrews
___ 10 Julius Creed
___ 12 Mandy Rose
___ 13 Raquel Rodriguez
___ 14 Bron Breakker
___ 15 Xyon Quinn
___ 16 Kit Wilson
___ 17 A-Kid
___ 18 Ivy Nile
___ 19 Mark Coffey
___ 20 Katana Chance
___ 21 Wolfgang
___ 22 Ludwig Kaiser
___ 23 Santos Escobar
___ 24 Brutus Creed
___ 25 Zack Gibson
___ 26 Giovanni Vinci
___ 27 Aoife Valkyrie
___ 28 Jacy Jayne
___ 29 Gunther
___ 30 Alba Fyre
___ 31 Flash Morgan Webster
___ 32 Amale
___ 33 Sarray
___ 34 Cameron Grimes
___ 35 Zoey Stark
___ 36 Gigi Dolin
___ 38 James Drake
___ 39 Elton Prince
___ 40 Kayden Carter
___ 41 Dani Luna
___ 42 Odyssey Jones
___ 43 Ciampa
___ 44 Emilia McKenzie
___ 45 Cora Jade
___ 46 Grayson Waller
___ 47 Jinny
___ 48 Joaquin Wilde
___ 49 Tyler Bate
___ 50 Stevie Turner
___ 51 Dave Mastiff
___ 52 Teoman
___ 53 Von Wagner
___ 54 Carmelo Hayes
___ 55 Roderick Strong
___ 56 Indi Hartwell
___ 57 Joe Coffey
___ 58 Joe Gacy
___ 59 Trent Seven
___ 60 Max Dupri
`],
  ['2021 NXT Highlights — Parallels: Green; Silver; Black & Gold #/75; 2.0 #/25; Gold #/10; Black 1/1', `
___ 1 Santos Escobar
___ 2 Raquel Rodriguez
___ 3 Finn Balor
___ 4 Santos Escobar
___ 5 Io Shirai
___ 6 Finn Balor
___ 7 Io Shirai
___ 8 LA Knight
___ 9 Pete Dunne
___ 10 WALTER
___ 11 Raquel Rodriguez
___ 12 Santos Escobar
___ 13 Kushida
___ 14 Sarray
___ 15 Indi Hartwell/Candice LeRae
___ 16 Raquel Rodriguez
___ 17 Kushida
___ 18 Kushida
___ 19 LA Knight
___ 20 Raquel Rodriguez
___ 21 Kushida
___ 22 Io Shirai/Zoey Stark
___ 23 Raquel Rodriguez
___ 24 Cameron Grimes
___ 25 Raquel Rodriguez
___ 26 Bron Breakker
___ 27 Ciampa
___ 28 Roderick Strong
___ 29 Raquel Rodriguez
___ 30 Carmelo Hayes
___ 31 Jacy Jayne/Gigi Dolin
___ 32 Mandy Rose
___ 33 Fabian Aichner/Ludwig Kaiser
___ 34 Ciampa
___ 35 Solo Sikoa
___ 36 Carmelo Hayes
___ 37 Cora Jade
___ 38 Fabian Aichner/Ludwig Kaiser
___ 39 Cameron Grimes
___ 40 Bron Breakker
___ 41 Cameron Grimes
___ 42 Meiko Satomura
___ 43 Raquel Rodriguez
___ 44 WALTER
___ 45 Tyler Bate
___ 46 Meiko Satomura
___ 47 A-Kid
___ 48 Ilja Dragunov
___ 49 Noam Dar
___ 50 Tyler Bate/Trent Seven
`],
  ['All-Time NXT Highlights — Parallels: Green; Silver; Black & Gold #/75; 2.0 #/25; Gold #/10; Black 1/1', `
___ 1 Seth "Freakin" Rollins
___ 2 Big E
___ 3 Tyler Breeze
___ 4 Shayna Baszler
___ 5 Charlotte Flair
___ 6 Charlotte Flair
___ 7 Sami Zayn
___ 8 The Demon Finn Balor
___ 9 Tyler Bate
___ 10 Kevin Owens
___ 11 Pete Dunne
___ 12 WALTER
___ 13 The Demon Finn Balor
___ 14 Bayley
___ 15 The Demon Finn Balor
___ 16 Asuka
___ 17 Bayley
___ 18 Bayley
___ 19 The Demon Finn Balor
___ 20 Shinsuke Nakamura
___ 21 Asuka
___ 22 Asuka
___ 23 Shinsuke Nakamura
___ 24 Asuka
___ 25 Shinsuke Nakamura
`],
  ['NXT Gold — Parallels: Green; Silver; Black & Gold #/75; 2.0 #/25; Gold #/10; Black 1/1', `
___ 1 Drew McIntyre
___ 2 Raquel Rodriguez
___ 3 Trent Seven
___ 4 Gigi Dolin
___ 5 Roderick Strong
___ 6 Charlotte Flair
___ 7 Seth "Freakin" Rollins
___ 8 Bayley
___ 9 Finn Balor
___ 10 Shayna Baszler
___ 11 Bron Breakker
___ 12 Tyler Bate
___ 13 Fabian Aichner
___ 14 Jacy Jayne
___ 15 Ilja Dragunov
___ 16 Io Shirai
___ 17 Kevin Owens
___ 18 Asuka
___ 19 Shinsuke Nakamura
___ 20 Mandy Rose
___ 21 Carmelo Hayes
___ 22 Ciampa
___ 23 Ludwig Kaiser
___ 24 Corey Graves
___ 25 Dolph Ziggler
`],
  ['Oversized Cards', `
___ 1 Bron Breakker
___ 2 Carmelo Hayes
___ 3 Cora Jade
___ 4 Roxanne Perez
`],
]));

// ── 2022 PANINI WWE PRIZM ─────────────────────────────────────────────────────
setsHtml.push(makeSet('prz22', '2022', '2022 Panini WWE Prizm', [
  ['Base Set #1–100 (Horizontal) — Parallels: Green; Hyper; Ice; Red/White/Blue; Ruby Wave; Silver; White Sparkle; Red #/299; Blue #/199; Purple #/149; Orange #/99; Teal #/49; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 Dana Brooke
___ 2 Shelton Benjamin
___ 3 Fabian Aichner
___ 4 Von Wagner
___ 5 Rikishi
___ 6 Kenny Williams
___ 7 AJ Styles
___ 8 Mustafa Ali
___ 9 Bianca Belair
___ 10 Rick Boogs
___ 11 Lita
___ 12 Shotzi
___ 13 Flash Morgan Webster
___ 14 Wes Lee
___ 15 Jimmy Uso
___ 16 Kofi Kingston
___ 17 A-Kid
___ 18 Naomi
___ 19 Blair Davenport
___ 20 Riddle
___ 21 Dave Mastiff
___ 22 Stevie Turner
___ 23 Gable Steveson
___ 24 King Woods
___ 25 Jinny
___ 26 Harland
___ 27 Akira Tozawa
___ 28 Natalya
___ 29 Bobby Lashley
___ 30 Robert Roode
___ 31 Dolph Ziggler
___ 32 T-Bar
___ 33 Goldberg
___ 34 Xyon Quinn
___ 35 Joe Coffey
___ 36 Lewis Howley
___ 37 Alexa Bliss
___ 38 Nikki A.S.H.
___ 39 Bron Breakker
___ 40 Roman Reigns
___ 41 Doudrop
___ 42 Teoman
___ 43 Grayson Waller
___ 44 Queen Zelina
___ 45 John Cena
___ 46 Liv Morgan
___ 47 Aliyah
___ 48 Odyssey Jones
___ 49 Cameron Grimes
___ 50 Sam Stoker
___ 51 Drew Gulak
___ 52 Shane McMahon
___ 53 Ilja Dragunov
___ 54 Amale
___ 55 Paul Heyman
___ 56 Madcap Moss
___ 57 Angel
___ 58 Guru Raaj
___ 59 Carmella
___ 60 Beth Phoenix
___ 61 Duke Hudson
___ 62 Tommaso Ciampa
___ 63 Io Shirai
___ 64 Angelo Dawkins
___ 65 Joseph Conners
___ 66 Mansoor
___ 67 Aoife Valkyrie
___ 68 Pete Dunne
___ 69 Cedric Alexander
___ 70 Sarray
___ 71 Elektra Lopez
___ 72 Tony D'Angelo
___ 73 Ivar
___ 74 Apollo Crews
___ 75 Julius Creed
___ 76 Mark Andrews
___ 77 Eddie Guerrero
___ 78 Randy Orton
___ 79 Chad Gable
___ 80 The Great Khali
___ 81 Ikemen Jiro
___ 82 Trent Seven
___ 83 Jacy Jayne
___ 84 Asuka
___ 85 Malcolm Bivens
___ 86 Wendy Choo
___ 87 Austin Theory
___ 88 Raul Mendoza
___ 89 Commander Azeez
___ 90 Jerry Lawler
___ 91 Erik
___ 92 Valentina Feroz
___ 93 Ultimate Warrior
___ 94 Malik Blade
___ 95 Kayden Carter
___ 96 Robert Stone
___ 97 Becky Lynch
___ 98 Rey Mysterio
___ 99 Dakota Kai
___ 100 Shayna Baszler
`],
  ['Base Set #101–200 (Vertical) — Parallels: Green; Hyper; Ice; Red/White/Blue; Ruby Wave; Silver; White Sparkle; Red #/299; Blue #/199; Purple #/149; Orange #/99; Teal #/49; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 101 Damian Priest
___ 102 Sasha Banks
___ 103 Saurav
___ 104 Tiffany Stratton
___ 105 James Drake
___ 106 Kay Lee Ray
___ 107 Mark Coffey
___ 108 Bayley
___ 109 Rampage Brown
___ 110 Dani Luna
___ 111 Seth Rollins
___ 112 The Demon Finn Balor
___ 113 Kevin Nash
___ 114 Solo Sikoa
___ 115 Jack Starz
___ 116 Meiko Satomura
___ 117 Big E
___ 118 Raquel Gonzalez
___ 119 Dante Chen
___ 120 Shanky
___ 121 Primate
___ 122 Tyler Bate
___ 123 Jey Uso
___ 124 Kevin Owens
___ 125 Montez Ford
___ 126 Boa
___ 127 Reggie
___ 128 Dexter Lumis
___ 129 Sheamus
___ 130 Gigi Dolin
___ 131 Veer Mahaan
___ 132 Jinder Mahal
___ 133 Kushida
___ 134 MVP
___ 135 Brock Lesnar
___ 136 Rhea Ripley
___ 137 Dominik Mysterio
___ 138 Shinsuke Nakamura
___ 139 Wild Boar
___ 140 WALTER
___ 141 Joaquin Wilde
___ 142 LA Knight
___ 143 Nash Carter
___ 144 Brutus Creed
___ 145 Ricochet
___ 146 Booker T
___ 147 Sonya Deville
___ 148 Happy Corbin
___ 149 Wolfgang
___ 150 Joe Gacy
___ 151 Lash Legend
___ 152 Stacy Keibler
___ 153 Candice LeRae
___ 154 Ridge Holland
___ 155 Drew McIntyre
___ 156 Tamina
___ 157 Humberto
___ 158 Xia Li
___ 159 Bruno Sammartino
___ 160 Santos Escobar
___ 161 Noam Dar
___ 162 Carmelo Hayes
___ 163 Roderick Strong
___ 164 Edge
___ 165 Chyna
___ 166 Indi Hartwell
___ 167 Zack Gibson
___ 168 Jordan Devlin
___ 169 Mace
___ 170 Omos
___ 171 Cesaro
___ 172 R-Truth
___ 173 Elias
___ 174 The Miz
___ 175 Dusty Rhodes
___ 176 Zoey Stark
___ 177 Josh Briggs
___ 178 Mandy Rose
___ 179 Otis
___ 180 Charlotte Flair
___ 181 Sami Zayn
___ 182 Emilia McKenzie
___ 183 Titus O'Neil
___ 184 Ivy Nile
___ 185 Kacy Catanzaro
___ 186 Marcel Barthel
___ 187 Persia Pirotta
___ 188 Cora Jade
___ 189 Lacey Evans
___ 190 Mick Foley
___ 191 The Rock
___ 192 Stone Cold Steve Austin
___ 193 Undertaker
___ 194 Triple H
___ 195 Hulk Hogan
___ 196 Batista
___ 197 Trish Stratus
___ 198 Bret "Hit Man" Hart
___ 199 Shawn Michaels
___ 200 Andre The Giant
`],
  ['Fearless — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 Big E
___ 2 Asuka
___ 3 Shinsuke Nakamura
___ 4 Riddle
___ 5 Alexa Bliss
___ 6 Rhea Ripley
___ 7 Edge
___ 8 Sasha Banks
___ 9 Bayley
___ 10 The Miz
___ 11 Roman Reigns
___ 12 Randy Orton
___ 13 The Demon Finn Balor
___ 14 Brock Lesnar
___ 15 Kofi Kingston
___ 16 Bobby Lashley
___ 17 AJ Styles
___ 18 Drew McIntyre
___ 19 Rey Mysterio
___ 20 Goldberg
___ 21 Charlotte Flair
___ 22 Bianca Belair
___ 23 John Cena
___ 24 Seth Rollins
___ 25 Becky Lynch
`],
  ['Prizmatic Entrances — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 Carmella
___ 2 Sheamus
___ 3 Edge
___ 4 Stone Cold Steve Austin
___ 5 AJ Styles
___ 6 Kane
___ 7 Bayley
___ 8 Rey Mysterio
___ 9 Big E
___ 10 Roman Reigns
___ 11 Charlotte Flair
___ 12 Shinsuke Nakamura
___ 13 The Demon Finn Balor
___ 14 John Cena
___ 15 Alexa Bliss
___ 16 Kofi Kingston
___ 17 Becky Lynch
___ 18 Rhea Ripley
___ 19 Bobby Lashley
___ 20 Sasha Banks
___ 21 Drew McIntyre
___ 22 The Miz
___ 23 Goldberg
___ 24 Undertaker
___ 25 Asuka
___ 26 Randy Orton
___ 27 Bianca Belair
___ 28 Riddle
___ 29 Brock Lesnar
___ 30 Seth Rollins
`],
  ['WWE Gold — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 Randy Orton
___ 2 Drew McIntyre
___ 3 Seth Rollins
___ 4 Tommaso Ciampa
___ 5 The Miz
___ 6 Alexa Bliss
___ 7 Rey Mysterio
___ 8 Sasha Banks
___ 9 Triple H
___ 10 Big E
___ 11 Edge
___ 12 Kofi Kingston
___ 13 Roman Reigns
___ 14 Bayley
___ 15 Dolph Ziggler
___ 16 Asuka
___ 17 Ilja Dragunov
___ 18 Charlotte Flair
___ 19 Shawn Michaels
___ 20 AJ Styles
`],
  ['WWE Next Level — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 The Demon Finn Balor
___ 2 Big E
___ 3 Bobby Lashley
___ 4 Riddle
___ 5 Rey Mysterio
___ 6 Edge
___ 7 Bianca Belair
___ 8 Bayley
___ 9 Seth Rollins
___ 10 Roman Reigns
___ 11 Brock Lesnar
___ 12 Asuka
___ 13 AJ Styles
___ 14 Alexa Bliss
___ 15 Goldberg
___ 16 Sasha Banks
___ 17 John Cena
___ 18 The Miz
___ 19 Becky Lynch
___ 20 Randy Orton
___ 21 Kofi Kingston
___ 22 Shinsuke Nakamura
___ 23 Drew McIntyre
___ 24 Rhea Ripley
___ 25 Charlotte Flair
`],
  ['Champion Signatures — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Green Pulsar #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ CS-SCA Stone Cold Steve Austin
___ CS-RRS Roman Reigns
___ CS-UND Undertaker
___ CS-CFL Charlotte Flair
___ CS-SKN Shinsuke Nakamura
___ CS-BGE Big E
___ CS-TPH Triple H
___ CS-BLY Becky Lynch
___ CS-HHG Hulk Hogan
___ CS-DPS Damian Priest
`],
  ['Champion Signatures Premium Box Set — Serial #/20', `
___ CS-SCA Stone Cold Steve Austin
___ CS-RRS Roman Reigns
___ CS-UND Undertaker
___ CS-CFL Charlotte Flair
___ CS-SKN Shinsuke Nakamura
___ CS-BGE Big E
___ CS-TPH Triple H
___ CS-BLY Becky Lynch
___ CS-HHG Hulk Hogan
___ CS-DPS Damian Priest
`],
  ['Iconic Rivals Dual Autographs — Serial #/25; Parallels: Gold #/10; Black 1/1', `
___ IR-SB Seth Rollins/Brock Lesnar
___ IR-BB Becky Lynch/Bianca Belair
___ IR-GH Goldberg/Hulk Hogan
___ IR-CL Cameron Grimes/LA Knight
___ IR-ST Shawn Michaels/Triple H
___ IR-DR Dakota Kai/Raquel Gonzalez
___ IR-JR John Cena/Roman Reigns
___ IR-RJ Randy Orton/John Cena
___ IR-BD Bobby Lashley/Drew McIntyre
___ IR-AC Asuka/Charlotte Flair
___ IR-SS Stone Cold Steve Austin/Shawn Michaels
___ IR-BK Brock Lesnar/Kurt Angle
___ IR-MT Mick Foley/Triple H
___ IR-BA Bret "Hit Man" Hart/Stone Cold Steve Austin
___ IR-CB Becky Lynch/Charlotte Flair
___ IR-ER Edge/Randy Orton
___ IR-RU Roman Reigns/Undertaker
___ IR-IW Ilja Dragunov/WALTER
___ IR-BG Bobby Lashley/Goldberg
___ IR-KS Kevin Owens/Sami Zayn
`],
  ['Legendary Signatures — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Green Pulsar #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ LS-KAN Kurt Angle
___ LS-SMC Shawn Michaels
___ LS-BTS Batista
___ LS-TST Trish Stratus
___ LS-RDG Road Dogg
___ LS-NBL Nikki Bella
___ LS-RKS Rikishi
___ LS-ISH Iron Sheik
___ LS-KNE Kane
___ LS-LTA Lita
___ LS-SLT Sgt. Slaughter
___ LS-KNS Kevin Nash
___ LS-BKT Booker T
___ LS-BBL Brie Bella
___ LS-BHT Bret "Hit Man" Hart
___ LS-JLW Jerry Lawler
___ LS-MFL Mick Foley
`],
  ['Sensational Signatures — Parallels: Green; Green Pulsar #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ SS-ERK Erik
___ SS-GKH The Great Khali
___ SS-JMH Jinder Mahal
___ SS-MBT Marcel Barthel
___ SS-ADK Angelo Dawkins
___ SS-PDN Pete Dunne
___ SS-SHK Shanky
___ SS-TBT Tyler Bate
___ SS-FAC Fabian Aichner
___ SS-LVE Brother Love
___ SS-MST Meiko Satomura
___ SS-ACR Apollo Crews
___ SS-RCC Ricochet
___ SS-SBZ Shayna Baszler
___ SS-CAZ Commander Azeez
___ SS-VMH Veer Mahaan
___ SS-GWL Grayson Waller
___ SS-JDV Jordan Devlin
___ SS-CSR Cesaro
___ SS-RHL Ridge Holland
___ SS-AML Amale
___ SS-DKI Dakota Kai
___ SS-VWG Von Wagner
___ SS-HCB Happy Corbin
___ SS-PGE Paige
___ SS-KLR Kay Lee Ray
___ SS-MVP MVP
___ SS-DDP Diamond Dallas Page
___ SS-RRD Robert Roode
___ SS-DBK Dana Brooke
___ SS-WLE Wes Lee
___ SS-KSH Kushida
___ SS-NOM Naomi
___ SS-DZG Dolph Ziggler
___ SS-RST Roderick Strong
___ SS-BDV Blair Davenport
___ SS-AKD A-Kid
___ SS-XWD King Woods
___ SS-IDR Ilja Dragunov
___ SS-RVD Rob Van Dam
___ SS-NPH Paul Heyman
___ SS-NSH Nash Carter
___ SS-DMY Dominik Mysterio
___ SS-ATH Austin Theory
___ SS-JJN Jacy Jayne
___ SS-DLM Dexter Lumis
___ SS-ZVG Queen Zelina
___ SS-IHW Indi Hartwell
___ SS-SBG Superstar Billy Graham
___ SS-LAK LA Knight
___ SS-NTL Natalya
___ SS-JUS Jey Uso
___ SS-SZY Sami Zayn
___ SS-CGR Cameron Grimes
___ SS-DDR Doudrop
___ SS-ZST Zoey Stark
___ SS-JCR Julius Creed
___ SS-LEV Lacey Evans
___ SS-NKA Nikki A.S.H.
___ SS-JMU Jimmy Uso
___ SS-INL Ivy Nile
___ SS-CLR Candice LeRae
___ SS-TCP Tommaso Ciampa
___ SS-BCR Brutus Creed
___ SS-IVR Ivar
___ SS-TDB Million Dollar Man Ted DiBiase
___ SS-NDR Noam Dar
___ SS-KOW Kevin Owens
___ SS-SES Santos Escobar
___ SS-CMH Carmelo Hayes
___ SS-OJN Odyssey Jones
___ SS-DGL Drew Gulak
___ SS-PPT Persia Pirotta
___ SS-MSR Mansoor
___ SS-OTS Otis
___ SS-MTF Montez Ford
___ SS-SRY Sarray
___ SS-TSV Trent Seven
___ SS-ELS Elias
`],
  ['Superstar Autographs — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Green Pulsar #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ SA-MIZ The Miz
___ SA-DMT Drew McIntyre
___ SA-BBK Bron Breakker
___ SA-ISH Io Shirai
___ SA-KKS Kofi Kingston
___ SA-BLS Brock Lesnar
___ SA-RMS Rey Mysterio
___ SA-ROR Randy Orton
___ SA-SHM Sheamus
___ SA-BLY Bayley
___ SA-WTR WALTER
___ SA-EDG Edge
___ SA-OMS Omos
___ SA-GGD Gigi Dolin
___ SA-LMG Liv Morgan
___ SA-JCN John Cena
___ SA-RRP Rhea Ripley
___ SA-SBK Sasha Banks
___ SA-SHZ Shotzi
___ SA-BBL Bianca Belair
___ SA-XLI Xia Li
___ SA-FBL The Demon Finn Balor
___ SA-RKB Rick Boogs
___ SA-IDR Ilja Dragunov
___ SA-MRS Mandy Rose
___ SA-ABS Alexa Bliss
___ SA-RDL Riddle
___ SA-AJS AJ Styles
___ SA-SDV Sonya Deville
___ SA-BLS Bobby Lashley
___ SA-CJD Cora Jade
___ SA-GST Gable Steveson
___ SA-RGE Reggie
___ SA-KCZ Kacy Catanzaro
___ SA-RQG Raquel Gonzalez
___ SA-GBG Goldberg
___ SA-SRL Seth Rollins
___ SA-ASK Asuka
___ SA-JGC Joe Gacy
___ SA-CML Carmella
`],
  ['Color Blast Insert', `
___ 1 Brock Lesnar
___ 2 Charlotte Flair
___ 3 Roman Reigns
___ 4 Alexa Bliss
___ 5 Goldberg
___ 6 Becky Lynch
___ 7 John Cena
___ 8 Sasha Banks
___ 9 Big E
___ 10 Bianca Belair
`],
]));

// ── 2022 PANINI WWE REVOLUTION DEBUT EDITION ─────────────────────────────────
setsHtml.push(makeSet('rev22', '2022', '2022 Panini WWE Revolution Debut Edition', [
  ['Base #1–100 — Parallels: Astro; Groove; Fractal; Galactic; Angular #/199; Cosmic #/149; Sunburst #/99; Cubic #/49; Lava #/10', `
___ 1 Tony D'Angelo
___ 2 Brock Lesnar
___ 3 Meiko Satomura
___ 4 Rick Boogs
___ 5 Natalya
___ 6 AJ Styles
___ 7 Sonya Deville
___ 8 Kevin Owens
___ 9 Nash Carter
___ 10 Alexa Bliss
___ 11 Von Wagner
___ 12 Chad Gable
___ 13 Gigi Dolin
___ 14 Ricochet
___ 15 Sasha Banks
___ 16 Apollo Crews
___ 17 Bron Breakker
___ 18 The Miz
___ 19 Wes Lee
___ 20 Becky Lynch
___ 21 Xyon Quinn
___ 22 Drew McIntyre
___ 23 Jacy Jayne
___ 24 Roman Reigns
___ 25 Shayna Baszler
___ 26 Big E
___ 27 Cameron Grimes
___ 28 Montez Ford
___ 29 Odyssey Jones
___ 30 Bianca Belair
___ 31 Zack Gibson
___ 32 Happy Corbin
___ 33 Mandy Rose
___ 34 Sami Zayn
___ 35 Shotzi
___ 36 The All Mighty Bobby Lashley
___ 37 Carmelo Hayes
___ 38 Angelo Dawkins
___ 39 Pete Dunne
___ 40 Carmella
___ 41 James Drake
___ 42 Jey Uso
___ 43 Indi Hartwell
___ 44 Sheamus
___ 45 Theory
___ 46 Damian Priest
___ 47 Dexter Lumis
___ 48 Omos
___ 49 Rey Mysterio
___ 50 Ronda Rousey
___ 51 Candice LeRae
___ 52 Jimmy Uso
___ 53 Io Shirai
___ 54 Shanky
___ 55 Xia Li
___ 56 Dolph Ziggler
___ 57 Fabian Aichner
___ 58 Randy Orton
___ 59 Roderick Strong
___ 60 Doudrop
___ 61 Cora Jade
___ 62 Jinder Mahal
___ 63 Katana Chance
___ 64 Shinsuke Nakamura
___ 65 Asuka
___ 66 Dominik Mysterio
___ 67 Grayson Waller
___ 68 Riddle
___ 69 Santos Escobar
___ 70 Liv Morgan
___ 71 Dakota Kai
___ 72 King Woods
___ 73 Alba Fyre
___ 74 Aliyah
___ 75 Bayley
___ 76 Edge
___ 77 Kushida
___ 78 Reggie
___ 79 Solo Sikoa
___ 80 Nikki A.S.H.
___ 81 Gunther
___ 82 Kofi Kingston
___ 83 Raquel Rodriguez
___ 84 Charlotte Flair
___ 85 John Cena
___ 86 Finn Balor
___ 87 LA Knight
___ 88 Seth "Freakin" Rollins
___ 89 Elektra Lopez
___ 90 Queen Zelina
___ 91 Ilja Dragunov
___ 92 Mansoor
___ 93 Sarray
___ 94 Naomi
___ 95 Lacey Evans
___ 96 Gable Steveson
___ 97 Ludwig Kaiser
___ 98 Veer Mahaan
___ 99 Ciampa
___ 100 Rhea Ripley
`],
  ['Legends #101–130 — Parallels: Astro; Groove; Fractal; Galactic; Angular #/199; Cosmic #/149; Sunburst #/99; Cubic #/49; Lava #/10', `
___ 101 Andre The Giant
___ 102 Bret "Hit Man" Hart
___ 103 Faarooq
___ 104 Cactus Jack
___ 105 Ultimate Warrior
___ 106 Dusty Rhodes
___ 107 Hulk Hogan
___ 108 Eddie Guerrero
___ 109 Jerry Lawler
___ 110 Shawn Michaels
___ 111 Rikishi
___ 112 Nikki Bella
___ 113 Stone Cold Steve Austin
___ 114 Chyna
___ 115 Undertaker
___ 116 The Godfather
___ 117 Iron Sheik
___ 118 Triple H
___ 119 Lex Luger
___ 120 Batista
___ 121 Rob Van Dam
___ 122 Bruno Sammartino
___ 123 Million Dollar Man Ted DiBiase
___ 124 Diesel
___ 125 X-Pac
___ 126 The Great Khali
___ 127 JBL
___ 128 The Rock
___ 129 Macho Man Randy Savage
___ 130 Booker T
`],
  ['Tag Teams #131–150 — Parallels: Astro; Groove; Fractal; Galactic; Angular #/199; Cosmic #/149; Sunburst #/99; Cubic #/49; Lava #/10', `
___ 131 Macho Man Randy Savage/Hulk Hogan
___ 132 Fabian Aichner/Ludwig Kaiser
___ 133 Kane/Undertaker
___ 134 Shawn Michaels/Triple H
___ 135 Bret "Hit Man" Hart/Jim Neidhart
___ 136 Erik/Ivar
___ 137 Mankind/The Rock
___ 138 King Woods/Kofi Kingston
___ 139 Bradshaw/Faarooq
___ 140 Randy Orton/Riddle
___ 141 Booker T/Stevie Ray
___ 142 Gigi Dolin/Jacy Jayne
___ 143 Edge/Randy Orton
___ 144 Roman Reigns/Seth "Freakin" Rollins
___ 145 Brie Bella/Nikki Bella
___ 146 Angelo Dawkins/Montez Ford
___ 147 Diesel/Shawn Michaels
___ 148 Chad Gable/Otis
___ 149 Gerald Brisco/Pat Patterson
___ 150 Jey Uso/Jimmy Uso
`],
  ['Liftoff! Insert — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10', `
___ 1 Bobby Lashley
___ 2 Kofi Kingston
___ 3 Charlotte Flair
___ 4 Finn Balor
___ 5 Alexa Bliss
___ 6 Seth "Freakin" Rollins
___ 7 Edge
___ 8 Drew McIntyre
___ 9 Rey Mysterio
___ 10 AJ Styles
`],
  ['Shock Wave Insert — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10', `
___ 1 Becky Lynch
___ 2 Shinsuke Nakamura
___ 3 Carmella
___ 4 Xia Li
___ 5 Doudrop
___ 6 Roman Reigns
___ 7 Jimmy Uso
___ 8 Montez Ford
___ 9 AJ Styles
___ 10 Riddle
___ 11 Big E
___ 12 The Miz
___ 13 Charlotte Flair
___ 14 Bobby Lashley
___ 15 Edge
___ 16 Randy Orton
___ 17 Kofi Kingston
___ 18 Raquel Rodriguez
___ 19 Apollo Crews
___ 20 Sami Zayn
___ 21 Brock Lesnar
___ 22 Gunther
___ 23 Dolph Ziggler
___ 24 John Cena
___ 25 Io Shirai
___ 26 Sasha Banks
___ 27 Mandy Rose
___ 28 Rhea Ripley
___ 29 Ronda Rousey
___ 30 Seth "Freakin" Rollins
`],
  ['Supernova Insert — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10', `
___ 1 Drew McIntyre
___ 2 Shotzi
___ 3 Jey Uso
___ 4 Gunther
___ 5 Kevin Owens
___ 6 Mandy Rose
___ 7 Alexa Bliss
___ 8 Rey Mysterio
___ 9 Bobby Lashley
___ 10 Sasha Banks
___ 11 Edge
___ 12 The Miz
___ 13 Jimmy Uso
___ 14 Xia Li
___ 15 Liv Morgan
___ 16 Randy Orton
___ 17 Becky Lynch
___ 18 Rhea Ripley
___ 19 Brock Lesnar
___ 20 Seth "Freakin" Rollins
___ 21 Finn Balor
___ 22 Bayley
___ 23 John Cena
___ 24 Queen Zelina
___ 25 AJ Styles
___ 26 Raquel Rodriguez
___ 27 Big E
___ 28 Roman Reigns
___ 29 Charlotte Flair
___ 30 Shinsuke Nakamura
`],
  ['Vortex Insert — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10', `
___ 1 Rey Mysterio
___ 2 Bayley
___ 3 Sasha Banks
___ 4 Bobby Lashley
___ 5 Brock Lesnar
___ 6 Damian Priest
___ 7 Finn Balor
___ 8 John Cena
___ 9 Liv Morgan
___ 10 Apollo Crews
___ 11 Ricochet
___ 12 Becky Lynch
___ 13 Sheamus
___ 14 Bron Breakker
___ 15 King Woods
___ 16 Dominik Mysterio
___ 17 Jey Uso
___ 18 AJ Styles
___ 19 Ronda Rousey
___ 20 Asuka
___ 21 Roman Reigns
___ 22 Bianca Belair
___ 23 Shotzi
___ 24 Cora Jade
___ 25 Queen Zelina
___ 26 Drew McIntyre
___ 27 Kevin Owens
___ 28 Alexa Bliss
___ 29 Randy Orton
___ 30 Austin Theory
`],
  ['Autograph Cards — Parallels: Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ AG-SKN Shinsuke Nakamura
___ AG-RRN Roman Reigns
___ AG-GBG Goldberg
___ AG-BLH The All Mighty Bobby Lashley
___ AG-RQG Raquel Rodriguez
___ AG-SRL Seth "Freakin" Rollins
___ AG-BGE Big E
___ AG-BHT Bret "Hit Man" Hart
___ AG-MRS Mandy Rose
___ AG-BTS Batista
___ AG-SDV Sonya Deville
___ AG-ROR Randy Orton
___ AG-LIV Liv Morgan
___ AG-BLY Bayley
___ AG-GTH Gunther
___ AG-DMC Drew McIntyre
___ AG-RRP Rhea Ripley
___ AG-TSH Trish Stratus
___ AG-CML Carmella
___ AG-HHG Hulk Hogan
___ AG-GSV Gable Steveson
___ AG-BLN Becky Lynch
___ AG-SMM Stephanie McMahon
___ AG-CLF Charlotte Flair
___ AG-DGZ Dolph Ziggler
___ AG-AJS AJ Styles
___ AG-KKG Kofi Kingston
___ AG-SCA Stone Cold Steve Austin
___ AG-RDL Riddle
___ AG-SHL Shawn Michaels
___ AG-JCN John Cena
___ AG-EGE Edge
___ AG-XLI Xia Li
___ AG-DMY Dominik Mysterio
___ AG-ASK Asuka
___ AG-SHZ Shotzi
___ AG-UND Undertaker
___ AG-MIZ The Miz
___ AG-SBK Sasha Banks
___ AG-BLS Brock Lesnar
___ AG-RMY Rey Mysterio
___ AG-KCZ Katana Chance
___ AG-FBL Finn Balor
___ AG-OMS Omos
___ AG-BBL Bianca Belair
___ AG-IOS Io Shirai
___ AG-HHH Triple H
___ AG-SHM Sheamus
___ AG-ABS Alexa Bliss
`],
]));

// ── 2022 PANINI WWE SELECT ────────────────────────────────────────────────────
setsHtml.push(makeSet('sel22', '2022', '2022 Panini WWE Select', [
  ['Base Concourse #1–100 — Parallels: Red; Blue; Silver; Light Blue #/299; Red #/249; White #/99; Neon Green #/49; Pink #/49; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 LA Knight
___ 2 Alba Fyre
___ 3 Alexa Bliss
___ 4 Mansoor
___ 5 Brock Lesnar
___ 6 Raquel Rodriguez
___ 7 Eddie Guerrero
___ 8 Seth "Freakin" Rollins
___ 9 The Godfather
___ 10 The Miz
___ 11 Jey Uso
___ 12 Meiko Satomura
___ 13 AJ Styles
___ 14 Maryse
___ 15 Bron Breakker
___ 16 Rhea Ripley
___ 17 Dominik Mysterio
___ 18 Gunther
___ 19 Goldberg
___ 20 The Rock
___ 21 Jerry Lawler
___ 22 Montez Ford
___ 23 Angel
___ 24 Mick Foley
___ 25 Cedric Alexander
___ 26 Ricochet
___ 27 Doudrop
___ 28 Shawn Michaels
___ 29 The Great Khali
___ 30 Undertaker
___ 31 Jimmy Uso
___ 32 Kevin Owens
___ 33 Angelo Dawkins
___ 34 Shotzi
___ 35 Diamond Dallas Page
___ 36 Riddle
___ 37 Drew McIntyre
___ 38 Shelton Benjamin
___ 39 Harland
___ 40 Triple H
___ 41 Jinder Mahal
___ 42 Xavier Woods
___ 43 Apollo Crews
___ 44 Liv Morgan
___ 45 Charlotte Flair
___ 46 Rikishi
___ 47 Dusty Rhodes
___ 48 Shinsuke Nakamura
___ 49 Indi Hartwell
___ 50 Sheamus
___ 51 Happy Corbin
___ 52 Kofi Kingston
___ 53 Becky Lynch
___ 54 Nikki A.S.H.
___ 55 Stone Cold Steve Austin
___ 56 Roman Reigns
___ 57 Edge
___ 58 Solo Sikoa
___ 59 Julius Creed
___ 60 Veer Mahaan
___ 61 Joe Gacy
___ 62 Kushida
___ 63 Big E
___ 64 Odyssey Jones
___ 65 Cora Jade
___ 66 Ciampa
___ 67 Dolph Ziggler
___ 68 Sonya Deville
___ 69 Hulk Hogan
___ 70 Wes Lee
___ 71 John Cena
___ 72 Macho Man Randy Savage
___ 73 Blair Davenport
___ 74 Omos
___ 75 Damian Priest
___ 76 Santos Escobar
___ 77 Faarooq
___ 78 Grayson Waller
___ 79 Humberto
___ 80 Bayley
___ 81 Jordan Devlin
___ 82 Rick Boogs
___ 83 The All Mighty Bobby Lashley
___ 84 Butch
___ 85 Bret "Hit Man" Hart
___ 86 Sasha Banks
___ 87 Gigi Dolin
___ 88 Million Dollar Man Ted DiBiase
___ 89 Ilja Dragunov
___ 90 Ronda Rousey
___ 91 Katana Chance
___ 92 Rob Van Dam
___ 93 Booker T
___ 94 Randy Orton
___ 95 Bruno Sammartino
___ 96 Von Wagner
___ 97 Jacy Jayne
___ 98 Tony D'Angelo
___ 99 Io Shirai
___ 100 Michael Cole
`],
  ['Base Premier Level #101–200 — Parallels: Red & Blue; Silver; Blue #/199; Maroon #/149; Purple #/75; Pink #/49; Orange #/35; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 101 Charlotte Flair
___ 102 Shane McMahon
___ 103 Edge
___ 104 Typhoon
___ 105 Jey Uso
___ 106 Kevin Owens
___ 107 AJ Styles
___ 108 MVP
___ 109 Big E
___ 110 Ricochet
___ 111 Chyna
___ 112 Shayna Baszler
___ 113 Elektra Lopez
___ 114 Ultimate Warrior
___ 115 Jimmy Hart
___ 116 Xavier Woods
___ 117 Finn Balor
___ 118 Natalya
___ 119 Boa
___ 120 Riddle
___ 121 Cora Jade
___ 122 Sheamus
___ 123 Gene Okerlund
___ 124 Von Wagner
___ 125 Jinny
___ 126 LA Knight
___ 127 Aliyah
___ 128 Nina Samuels
___ 129 Bret "Hit Man" Hart
___ 130 Ridge Holland
___ 131 Damian Priest
___ 132 Shinsuke Nakamura
___ 133 Gigi Dolin
___ 134 Bad News Barrett
___ 135 Joaquin Wilde
___ 136 Elton Prince
___ 137 Alundra Blayze
___ 138 Oliver Carter
___ 139 Brock Lesnar
___ 140 Rob Van Dam
___ 141 Dana Brooke
___ 142 Shotzi
___ 143 Grayson Waller
___ 144 Wolfgang
___ 145 John Cena
___ 146 Madcap Moss
___ 147 Aoife Valkyrie
___ 148 Otis
___ 149 Bruno Sammartino
___ 150 Roderick Strong
___ 151 Dave Mastiff
___ 152 The Miz
___ 153 Happy Corbin
___ 154 Xia Li
___ 155 Jordan Devlin
___ 156 Mandy Rose
___ 157 Apollo Crews
___ 158 Queen Zelina
___ 159 Bron Breakker
___ 160 Roman Reigns
___ 161 Dolph Ziggler
___ 162 The Rock
___ 163 Harland
___ 164 Zack Gibson
___ 165 Julius Creed
___ 166 Mark Coffey
___ 167 Asuka
___ 168 Randy Orton
___ 169 Cactus Jack
___ 170 Kit Wilson
___ 171 Drew Gulak
___ 172 Ciampa
___ 173 Indi Hartwell
___ 174 Vader
___ 175 Kama
___ 176 Meiko Satomura
___ 177 Becky Lynch
___ 178 Cruz Del Toro
___ 179 Cameron Grimes
___ 180 Stone Cold Steve Austin
___ 181 Drew McIntyre
___ 182 Tony D'Angelo
___ 183 Jacy Jayne
___ 184 Umaga
___ 185 Kayden Carter
___ 186 Montez Ford
___ 187 Beth Phoenix
___ 188 Reggie
___ 189 Carmella
___ 190 Saxon Huxley
___ 191 Eddie Guerrero
___ 192 Trent Seven
___ 193 Jerry Lawler
___ 194 Nikkita Lyons
___ 195 Kevin Nash
___ 196 Mr. T
___ 197 Big Boss Man
___ 198 Rick Boogs
___ 199 Chad Gable
___ 200 Seth "Freakin" Rollins
`],
  ['Base Ringside #201–300 — Parallels: Red & Blue; Silver; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 201 Liv Morgan
___ 202 AJ Styles
___ 203 Nikki Bella
___ 204 Big E
___ 205 Ricky "The Dragon" Steamboat
___ 206 Carmelo Hayes
___ 207 Shawn Michaels
___ 208 Gable Steveson
___ 209 Trick Williams
___ 210 Io Shirai
___ 211 Macho Man Randy Savage
___ 212 Alexa Bliss
___ 213 Otis
___ 214 The All Mighty Bobby Lashley
___ 215 Riddle
___ 216 Charlotte Flair
___ 217 Sheamus
___ 218 Finn Balor
___ 219 Triple H
___ 220 Joe Gacy
___ 221 Madcap Moss
___ 222 Amale
___ 223 Paul Heyman
___ 224 Bret "Hit Man" Hart
___ 225 Rikishi
___ 226 Dakota Kai
___ 227 Shinsuke Nakamura
___ 228 Gigi Dolin
___ 229 Ultimate Warrior
___ 230 John Cena
___ 231 Mandy Rose
___ 232 Aliyah
___ 233 Nikkita Lyons
___ 234 Brie Bella
___ 235 Rob Van Dam
___ 236 Damian Priest
___ 237 Stone Cold Steve Austin
___ 238 Goldberg
___ 239 Undertaker
___ 240 Jordan Devlin
___ 241 Mankind
___ 242 Apollo Crews
___ 243 High Chief Peter Maivia
___ 244 The British Bulldog
___ 245 Roderick Strong
___ 246 Dexter Lumis
___ 247 Solo Sikoa
___ 248 Grayson Waller
___ 249 Xia Brookside
___ 250 Kevin Owens
___ 251 Ludwig Kaiser
___ 252 Asuka
___ 253 Randy Orton
___ 254 Brock Lesnar
___ 255 Roman Reigns
___ 256 Diesel
___ 257 Stacy Keibler
___ 258 Gunther
___ 259 X-Pac
___ 260 Xavier Woods
___ 261 Maryse
___ 262 Theory
___ 263 Raquel Rodriguez
___ 264 Bron Breakker
___ 265 Sami Zayn
___ 266 Doudrop
___ 267 Stephanie McMahon
___ 268 Happy Corbin
___ 269 Zoey Stark
___ 270 Kofi Kingston
___ 271 Ashton Smith
___ 272 Bayley
___ 273 Rey Mysterio
___ 274 Cameron Grimes
___ 275 Santos Escobar
___ 276 Drew McIntyre
___ 277 The Miz
___ 278 Hulk Hogan
___ 279 Ronda Rousey
___ 280 Kushida
___ 281 Meiko Satomura
___ 282 Becky Lynch
___ 283 Rhea Ripley
___ 284 Candice LeRae
___ 285 Sasha Banks
___ 286 Edge
___ 287 The Rock
___ 288 Ilja Dragunov
___ 289 Nathan Frazer
___ 290 LA Knight
___ 291 Montez Ford
___ 292 Bianca Belair
___ 293 Rick Boogs
___ 294 Carmella
___ 295 Seth "Freakin" Rollins
___ 296 Fabian Aichner
___ 297 Ciampa
___ 298 Indi Hartwell
___ 299 The American Nightmare Cody Rhodes
___ 300 Lex Luger
`],
  ['Base Mezzanine #301–400 (Blaster Exclusives) — Parallels: Silver; Tie-Dye #/25; Gold #/10; Green #/5; Black 1/1', `
___ 301 The Rock
___ 302 Jimmy Uso
___ 303 Mandy Rose
___ 304 A-Kid
___ 305 Nikki Bella
___ 306 The All Mighty Bobby Lashley
___ 307 Rey Mysterio
___ 308 Damian Priest
___ 309 Santos Escobar
___ 310 Erik
___ 311 Trent Seven
___ 312 Jinny
___ 313 Ludwig Kaiser
___ 314 Akira Tozawa
___ 315 Nikolai Volkoff
___ 316 Brie Bella
___ 317 Ravishing Rick Rude
___ 318 Dana Brooke
___ 319 Sarray
___ 320 Ikemen Jiro
___ 321 Tyler Bate
___ 322 John Cena
___ 323 Booker T
___ 324 Amari Miller
___ 325 Noam Dar
___ 326 Brock Lesnar
___ 327 Riddle
___ 328 Dominik Mysterio
___ 329 Sasha Banks
___ 330 Iron Sheik
___ 331 Undertaker
___ 332 Don Muraco
___ 333 Molly Holly
___ 334 Andre Chase
___ 335 Omos
___ 336 Brutus Creed
___ 337 Robert Roode
___ 338 Drew McIntyre
___ 339 Michelle McCool
___ 340 Ivar
___ 341 Xia Li
___ 342 Stone Cold Steve Austin
___ 343 Roxanne Perez
___ 344 Theory
___ 345 Paige
___ 346 Carmelo Hayes
___ 347 Robert Stone
___ 348 Dude Love
___ 349 Seth "Freakin" Rollins
___ 350 Ivy Nile
___ 351 Xyon Quinn
___ 352 Josh Briggs
___ 353 Mr. Perfect Curt Hennig
___ 354 Batista
___ 355 Papa Shango
___ 356 Paul Heyman
___ 357 Rocky Johnson
___ 358 Duke Hudson
___ 359 Shinsuke Nakamura
___ 360 Jacy Jayne
___ 361 Yulisa Leon
___ 362 Kenny Williams
___ 363 Trish Stratus
___ 364 Bayley
___ 365 Primate
___ 366 Charlotte Flair
___ 367 Rohan Raja
___ 368 Eddie Dennis
___ 369 Tamina
___ 370 James Drake
___ 371 Bron Breakker
___ 372 Lacey Evans
___ 373 Naomi
___ 374 Becky Lynch
___ 375 Queen Zelina
___ 376 Superstar Billy Graham
___ 377 Roman Reigns
___ 378 Edge
___ 379 T-Bar
___ 380 JBL
___ 381 Ronda Rousey
___ 382 Lash Legend
___ 383 Elton Prince
___ 384 Bianca Belair
___ 385 Rampage Brown
___ 386 Commander Azeez
___ 387 R-Truth
___ 388 Ezekiel
___ 389 Terry Funk
___ 390 Jey Uso
___ 391 Ken Shamrock
___ 392 Mace
___ 393 Natalya
___ 394 Big E
___ 395 Randy Orton
___ 396 Corey Graves
___ 397 Sami Zayn
___ 398 Kit Wilson
___ 399 The Miz
___ 400 Jim "The Anvil" Neidhart
`],
  ['Championship Set — Parallels: Flash; Silver; Gold #/10; Black 1/1', `
___ 1 The All Mighty Bobby Lashley
___ 2 Undertaker
___ 3 Randy Orton
___ 4 Becky Lynch
___ 5 Stone Cold Steve Austin
___ 6 John Cena
___ 7 The Rock
___ 8 Brock Lesnar
___ 9 Roman Reigns
___ 10 Charlotte Flair
`],
  ['Global Icons — Parallels: Flash; Silver; Gold #/10; Black 1/1', `
___ 1 Finn Balor
___ 2 Hacksaw Jim Duggan
___ 3 Bret "Hit Man" Hart
___ 4 The Great Khali
___ 5 Sheamus
___ 6 Gunther
___ 7 Trish Stratus
___ 8 Drew McIntyre
___ 9 Pat Patterson
___ 10 Iron Sheik
___ 11 Meiko Satomura
___ 12 The British Bulldog
___ 13 Becky Lynch
___ 14 Asuka
___ 15 Yokozuna
___ 16 Rey Mysterio
___ 17 Shinsuke Nakamura
___ 18 Andre The Giant
___ 19 Kevin Owens
___ 20 Hulk Hogan
`],
  ['Hall of Fame Selections — Parallels: Flash; Silver; Gold #/10; Black 1/1', `
___ 1 Stone Cold Steve Austin
___ 2 Booker T
___ 3 Shawn Michaels
___ 4 Ultimate Warrior
___ 5 Trish Stratus
___ 6 Macho Man Randy Savage
___ 7 Kevin Nash
___ 8 Edge
___ 9 Ricky "The Dragon" Steamboat
___ 10 Dusty Rhodes
___ 11 Eddie Guerrero
___ 12 Mick Foley
___ 13 The British Bulldog
___ 14 Rikishi
___ 15 Superstar Billy Graham
___ 16 Jerry Lawler
___ 17 Hulk Hogan
___ 18 Bret "Hit Man" Hart
___ 19 Mr. Perfect Curt Hennig
___ 20 Million Dollar Man Ted DiBiase
`],
  ['NXT 2.0 Set — Parallels: Flash; Silver; Gold #/10; Black 1/1', `
___ 1 Gigi Dolin
___ 2 LA Knight
___ 3 Carmelo Hayes
___ 4 Raquel Rodriguez
___ 5 Ilja Dragunov
___ 6 Ludwig Kaiser
___ 7 Dakota Kai
___ 8 Nikkita Lyons
___ 9 Gunther
___ 10 Jordan Devlin
___ 11 Bron Breakker
___ 12 Cameron Grimes
___ 13 Ciampa
___ 14 Jacy Jayne
___ 15 Meiko Satomura
___ 16 Fabian Aichner
___ 17 Grayson Waller
___ 18 Santos Escobar
___ 19 Mandy Rose
___ 20 Io Shirai
`],
  ['Phenomenon Set — Parallels: Flash; Silver; Gold #/10; Black 1/1', `
___ 1 Finn Balor
___ 2 Bianca Belair
___ 3 Omos
___ 4 AJ Styles
___ 5 Rey Mysterio
___ 6 Seth "Freakin" Rollins
___ 7 Shawn Michaels
___ 8 Big E
___ 9 Mankind
___ 10 Stone Cold Steve Austin
___ 11 Rob Van Dam
___ 12 Becky Lynch
___ 13 Kofi Kingston
___ 14 Randy Orton
___ 15 Roman Reigns
___ 16 Kevin Owens
___ 17 Shinsuke Nakamura
___ 18 Undertaker
___ 19 Drew McIntyre
___ 20 The Miz
___ 21 Edge
___ 22 Rhea Ripley
___ 23 Xavier Woods
___ 24 Riddle
___ 25 Sheamus
___ 26 Brock Lesnar
___ 27 Sasha Banks
___ 28 The Rock
___ 29 Bron Breakker
___ 30 Charlotte Flair
`],
  ['Signatures — Parallels: Red Wave; Red #/99; Blue #/49; Tie-Dye #/25; Gold #/10; Gold Wave #/5; Black 1/1', `
___ SG-RBG Rick Boogs
___ SG-EGE Edge
___ SG-SBK Sasha Banks
___ SG-IOS Io Shirai
___ SG-KKG Kofi Kingston
___ SG-AJS AJ Styles
___ SG-MKS Meiko Satomura
___ SG-BLY Becky Lynch
___ SG-PDN Pete Dunne
___ SG-CML Carmella
___ SG-RDL Riddle
___ SG-ELS Ezekiel
___ SG-SHM Sheamus
___ SG-JMU Jimmy Uso
___ SG-KSH Kushida
___ SG-ADK Angelo Dawkins
___ SG-MVP MVP
___ SG-BBL Bianca Belair
___ SG-QZL Queen Zelina
___ SG-DPS Damian Priest
___ SG-SZN Sami Zayn
___ SG-ERK Erik
___ SG-SHZ Shotzi
___ SG-JGC Joe Gacy
___ SG-LVM Liv Morgan
___ SG-ASK Asuka
___ SG-NTY Natalya
___ SG-BLS The All Mighty Bobby Lashley
___ SG-RKO Randy Orton
___ SG-DBK Dana Brooke
___ SG-SES Santos Escobar
___ SG-GGD Gigi Dolin
___ SG-SDV Sonya Deville
___ SG-KLR Alba Fyre
___ SG-MRS Mandy Rose
___ SG-ATH Theory
___ SG-OTS Otis
___ SG-BLS Brock Lesnar
___ SG-RHR Rhea Ripley
___ SG-DMY Dominik Mysterio
___ SG-VMH Veer Mahaan
___ SG-HCB Happy Corbin
___ SG-TMC Ciampa
___ SG-KOW Kevin Owens
___ SG-MSR Mansoor
`],
  ['Legendary Signatures — Parallels: Red Wave; Red #/99; Blue #/49; Tie-Dye #/25; Gold #/10; Gold Wave #/5; Black 1/1', `
___ LS-RKI Rikishi
___ LS-UND Undertaker
___ LS-BKT Booker T
___ LS-LTA Lita
___ LS-NBL Nikki Bella
___ LS-SCA Stone Cold Steve Austin
___ LS-KNE Kane
___ LS-JCE John Cena
___ LS-BPH Beth Phoenix
___ LS-HHH Triple H
`],
  ['Ringside Action Signatures — Parallels: Red Wave; Red #/99; Blue #/49; Tie-Dye #/25; Gold #/10; Gold Wave #/5; Black 1/1', `
___ RA-BBK Bron Breakker
___ RA-RQG Raquel Rodriguez
___ RA-CAZ Commander Azeez
___ RA-RRD Robert Roode
___ RA-DDR Doudrop
___ RA-MIZ The Miz
___ RA-JUS Jey Uso
___ RA-KWD King Woods
___ RA-ABL Alexa Bliss
___ RA-NOM Naomi
___ RA-CGR Cameron Grimes
___ RA-RGE Reggie
___ RA-CJD Cora Jade
___ RA-RRN Roman Reigns
___ RA-DGL Drew Gulak
___ RA-VWG Von Wagner
___ RA-JMH Jinder Mahal
___ RA-LAK LA Knight
___ RA-ACR Apollo Crews
___ RA-NKA Nikki A.S.H.
___ RA-CHY Carmelo Hayes
___ RA-RMY Rey Mysterio
___ RA-DKI Dakota Kai
___ RA-SRL Seth "Freakin" Rollins
___ RA-DMI Drew McIntyre
___ RA-GTH Gunther
___ RA-JDV Jordan Devlin
___ RA-LEV Lacey Evans
___ RA-BLY Bayley
___ RA-OMS Omos
___ RA-BDV Blair Davenport
___ RA-RCC Ricochet
___ RA-DZG Dolph Ziggler
___ RA-SBZ Shayna Baszler
___ RA-FBL Finn Balor
___ RA-XLI Xia Li
___ RA-KCT Katana Chance
___ RA-MZF Montez Ford
___ RA-BGE Big E
___ RA-CFL Charlotte Flair
___ RA-RHD Ridge Holland
___ RA-IVR Ivar
___ RA-SKN Shinsuke Nakamura
___ RA-GWL Grayson Waller
`],
  ['Signature Selections (Blaster Exclusives) — Parallels: Flash; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ SN-SHM Shawn Michaels
___ SN-RRD Robert Roode
___ SN-TSV Trent Seven
___ SN-JKL Jerry Lawler
___ SN-KLR Alba Fyre
___ SN-AKD A-Kid
___ SN-MBL Ludwig Kaiser
___ SN-ILU Brother Love
___ SN-PSA Persia Pirotta
___ SN-DMS Dave Mastiff
___ SN-SRY Sarray
___ SN-GWL Grayson Waller
___ SN-TBT Tyler Bate
___ SN-JHT Jimmy Hart
___ SN-KDC Kayden Carter
___ SN-ALB Alundra Blayze
___ SN-MAD Mark Andrews
___ SN-BBF Brutus Beefcake
___ SN-PDN Pete Dunne
___ SN-DLM Dexter Lumis
___ SN-SBK Sasha Banks
___ SN-GHV Greg Valentine
___ SN-VWG Von Wagner
___ SN-JNY Jinny
___ SN-KLY Kelly Kelly
___ SN-AML Amale
___ SN-MCF Mark Coffey
___ SN-BCD Brutus Creed
___ SN-RPB Rampage Brown
___ SN-DMI Drew McIntyre
___ SN-SRL Seth "Freakin" Rollins
___ SN-IHW Indi Hartwell
___ SN-GTH Gunther
___ SN-JWD Joaquin Wilde
___ SN-KNY Kenny Williams
___ SN-AOF Aoife Valkyrie
___ SN-MKS Meiko Satomura
___ SN-BWB Bushwhacker Butch
___ SN-RKO Randy Orton
___ SN-EDG Edge
___ SN-SGS Sgt. Slaughter
___ SN-IOS Io Shirai
___ SN-WSL Wes Lee
___ SN-JCF Joe Coffey
___ SN-KSH Kushida
___ SN-BLY Becky Lynch
___ SN-MHY Michael Hayes
___ SN-BWL Bushwhacker Luke
___ SN-RQG Raquel Rodriguez
___ SN-EMK Emilia McKenzie
___ SN-SHY Shanky
___ SN-ISH Iron Sheik
___ SN-WFG Wolfgang
___ SN-NAO Naomi
___ SN-BBL Brie Bella
___ SN-BVD Blair Davenport
___ SN-MHL Molly Holly
___ SN-CGR Cameron Grimes
___ SN-RMY Rey Mysterio
___ SN-FAI Fabian Aichner
___ SN-STN Stevie Turner
___ SN-INY Ivy Nile
___ SN-XQN Xyon Quinn
___ SN-JDV Jordan Devlin
___ SN-LSH Lash Legend
___ SN-BOA Boa
___ SN-CLR Candice LeRae
___ SN-RVD Rob Van Dam
___ SN-FBL Finn Balor
___ SN-TEO Teoman
___ SN-JJN Jacy Jayne
___ SN-ZBG Zack Gibson
___ SN-HHG Hulk Hogan
___ SN-EPC Elton Prince
___ SN-CBO Cowboy Bob Orton
___ SN-NMD Noam Dar
___ SN-CHY Carmelo Hayes
___ SN-RST Roderick Strong
___ SN-FMW Flash Morgan Webster
___ SN-HCN The Hurricane
___ SN-JDK James Drake
___ SN-ZST Zoey Stark
___ SN-JCD Julius Creed
___ SN-LXL Lex Luger
___ SN-BLS Brock Lesnar
___ SN-ODY Odyssey Jones
___ SN-CJD Cora Jade
___ SN-RRN Roman Reigns
___ SN-GSV Gable Steveson
___ SN-BTA Batista
___ SN-JBL JBL
___ SN-XLI Xia Li
___ SN-KCY Katana Chance
___ SN-MRS Mandy Rose
___ SN-BBK Bron Breakker
___ SN-PGE Paige
___ SN-DLN Dani Luna
___ SN-KWS Kit Wilson
___ SN-GBS Gerald Brisco
`],
  ['Sparks Set — Parallels: Flash; Silver; Gold #/10; Black 1/1', `
___ SP-BLY Becky Lynch
___ SP-RRN Roman Reigns
___ SP-KKG Kofi Kingston
___ SP-RMY Rey Mysterio
___ SP-SKN Shinsuke Nakamura
___ SP-DPS Damian Priest
___ SP-SHZ Shotzi
___ SP-BBL Bianca Belair
___ SP-BLS Brock Lesnar
___ SP-LVM Liv Morgan
___ SP-EDG Edge
___ SP-BLS The All Mighty Bobby Lashley
___ SP-SBK Sasha Banks
___ SP-MIZ The Miz
___ SP-SRL Seth "Freakin" Rollins
___ SP-AJS AJ Styles
___ SP-ASK Asuka
___ SP-JMU Jimmy Uso
___ SP-RHR Rhea Ripley
___ SP-CFL Charlotte Flair
___ SP-DMI Drew McIntyre
___ SP-JUS Jey Uso
___ SP-ACR Apollo Crews
___ SP-RKO Randy Orton
___ SP-CML Carmella
___ SP-ABL Alexa Bliss
___ SP-FBL Finn Balor
___ SP-KOW Kevin Owens
`],
  ['Selective Swatches — Parallels: Tie-Dye #/25; Gold #/10; Black 1/1', `
___ SW-SKN Shinsuke Nakamura
___ SW-MIZ The Miz
___ SW-RKO Randy Orton
___ SW-SHZ Shotzi
___ SW-AJS AJ Styles
___ SW-ABL Alexa Bliss
___ SW-BLS Brock Lesnar
___ SW-JMU Jimmy Uso
___ SW-KOW Kevin Owens
___ SW-BLY Becky Lynch
___ SW-CFL Charlotte Flair
___ SW-KKG Kofi Kingston
___ SW-BLS The All Mighty Bobby Lashley
___ SW-SHM Sheamus
___ SW-JUS Jey Uso
___ SW-DMY Dominik Mysterio
___ SW-RMY Rey Mysterio
___ SW-SBK Sasha Banks
___ SW-DBK Dana Brooke
___ SW-ACR Apollo Crews
___ SW-DPS Damian Priest
___ SW-SRL Seth "Freakin" Rollins
___ SW-CML Carmella
___ SW-BBL Bianca Belair
___ SW-ASK Asuka
___ SW-FBL Finn Balor
___ SW-LVM Liv Morgan
___ SW-RHR Rhea Ripley
___ SW-RRN Roman Reigns
___ SW-EDG Edge
___ SW-RDL Riddle
___ SW-DMI Drew McIntyre
___ SW-ADK Angelo Dawkins
`],
  ['Autographed Memorabilia — Parallels: Tie-Dye #/25; Gold #/10; Black 1/1', `
___ AM-AJS AJ Styles (#/199)
___ AM-SHM Sheamus (#/199)
___ AM-BBL Bianca Belair (#/199)
___ AM-ADK Angelo Dawkins (#/199)
___ AM-BLS Brock Lesnar (#/49)
___ AM-DMY Dominik Mysterio (#/199)
___ AM-FBL Finn Balor (#/199)
___ AM-KOW Kevin Owens (#/199)
___ AM-SBK Sasha Banks (#/199)
___ AM-RHR Rhea Ripley (#/199)
___ AM-ABL Alexa Bliss (#/199)
___ AM-SKN Shinsuke Nakamura (#/199)
___ AM-BGE Big E (#/199)
___ AM-ACR Apollo Crews (#/199)
___ AM-RRN Roman Reigns (#/199)
___ AM-JUS Jey Uso (#/199)
___ AM-RKO Randy Orton (#/199)
___ AM-KKG Kofi Kingston (#/199)
___ AM-SRL Seth "Freakin" Rollins (#/199)
___ AM-RDL Riddle (#/199)
___ AM-ASK Asuka (#/199)
___ AM-SHZ Shotzi (#/199)
___ AM-BLS The All Mighty Bobby Lashley (#/199)
___ AM-CML Carmella (#/199)
___ AM-DMI Drew McIntyre (#/199)
___ AM-JMU Jimmy Uso (#/199)
___ AM-RMY Rey Mysterio (#/199)
___ AM-LVM Liv Morgan (#/199)
___ AM-BLY Becky Lynch (#/199)
___ AM-DBK Dana Brooke (#/199)
___ AM-BLY Bayley (#/199)
___ AM-MIZ The Miz (#/199)
___ AM-CFL Charlotte Flair (#/199)
___ AM-DPS Damian Priest (#/199)
___ AM-EDG Edge (#/199)
`],
]));

// ── 2023 WWE PANINI CHRONICLES ────────────────────────────────────────────────
setsHtml.push(makeSet('chr23', '2023', '2023 WWE Panini Chronicles', [
  ['Chronicles Set — Parallels: Bronze; Pink #/349; Red #/199; Blue #/99; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 1 – Johnny Gargano – Raw
___ 2 – Baron Corbin – NXT
___ 3 – Apollo Crews – Raw
___ 4 – Becky Lynch – Raw
___ 5 – Alexa Bliss – WWE
___ 6 – Ludwig Kaiser – Raw
___ 7 – "Dirty" Dominik Mysterio – Raw
___ 8 – Dijak – NXT
___ 9 – Dakota Kai – SmackDown
___ 10 – Piper Niven – Raw
___ 11 – Raquel Rodriguez – Raw
___ 12 – Blair Davenport – NXT
___ 13 – B-Fab – SmackDown
___ 15 – Bianca Belair – SmackDown
___ 16 – Jey Uso – Raw
___ 17 – Finn Balor – Raw
___ 18 – Dragon Lee – SmackDown
___ 19 – Lyra Valkyria – NXT
___ 20 – Santos Escobar – SmackDown
___ 21 – Scarlett – SmackDown
___ 22 – Butch – SmackDown
___ 23 – Bronson Reed – Raw
___ 24 – "The American Nightmare" Cody Rhodes – Raw
___ 25 – Charlotte Flair – SmackDown
___ 26 – Kevin Owens – SmackDown
___ 27 – Jimmy Uso – SmackDown
___ 28 – Lola Vice – NXT
___ 29 – Drew McIntyre – Raw
___ 30 – Shayna Baszler – Raw
___ 31 – Sheamus – SmackDown
___ 32 – Chad Gable – Raw
___ 33 – Cameron Grimes – SmackDown
___ 34 – Randy Orton – SmackDown
___ 35 – Liv Morgan – Raw
___ 36 – Rey Mysterio – SmackDown
___ 37 – Julius Creed – Raw
___ 38 – Grayson Waller – SmackDown
___ 39 – Gigi Dolin – NXT
___ 40 – Shinsuke Nakamura – Raw
___ 41 – Shotzi – SmackDown
___ 42 – Chelsea Green – Raw
___ 43 – Channing "Stacks" Lorenzo – NXT
___ 44 – Roman Reigns – SmackDown
___ 45 – Rhea Ripley – Raw
___ 46 – Sami Zayn – Raw
___ 47 – Roxanne Perez – NXT
___ 48 – Ivy Nile – Raw
___ 49 – Gunther – Raw
___ 50 – Sol Ruca – NXT
___ 51 – Solo Sikoa – SmackDown
___ 52 – Dexter Lumis – Raw
___ 53 – Carlito – Legend
___ 54 – AJ Styles – SmackDown
___ 55 – Valhalla – Raw
___ 56 – The Miz – Raw
___ 57 – Seth "Freakin" Rollins – Raw
___ 58 – Jacy Jayne – NXT
___ 59 – IYO SKY – SmackDown
___ 60 – Sonya Deville – SmackDown
___ 61 – Thea Hail – NXT
___ 62 – CM Punk – WWE
___ 63 – Brutus Creed – Raw
___ 64 – Austin Theory – SmackDown
___ 65 – Asuka – SmackDown
___ 66 – Alba Fyre – SmackDown
___ 67 – Tiffany Stratton – NXT
___ 68 – Katana Chance – Raw
___ 69 – Karrion Kross – SmackDown
___ 70 – Tony D'Angelo – NXT
___ 71 – Wes Lee – NXT
___ 72 – Ilja Dragunov – NXT
___ 73 – Fallon Henley – NXT
___ 74 – Bray Wyatt – WWE
___ 75 – Bayley – SmackDown
___ 76 – Big E – WWE
___ 77 – Ava – NXT
___ 78 – LA Knight – SmackDown
___ 79 – Kofi Kingston – Raw
___ 80 – Xavier Woods – Raw
___ 81 – Xia Li – Raw
___ 82 – Isla Dawn – SmackDown
___ 83 – Indi Hartwell – Raw
___ 84 – Carmelo Hayes – NXT
___ 85 – Bron Breakker – NXT
___ 86 – Braun Strowman – Raw
___ 87 – "The All Mighty" Bobby Lashley – SmackDown
___ 88 – Montez Ford – SmackDown
___ 89 – Maxxine Dupri – Raw
___ 90 – Zelina Vega – SmackDown
___ 91 – Zoey Stark – Raw
___ 92 – Joe Gacy – NXT
___ 93 – JD McDonagh – Raw
___ 94 – Damian Priest – Raw
___ 95 – Cora Jade – NXT
___ 96 – Carmella – WWE
___ 97 – Candice LeRae – Raw
___ 98 – Nikkita Lyons – NXT
___ 99 – Natalya – Raw
___ 100 – Paul Heyman – SmackDown
`],
  ['Contenders Season Ticket — Parallels: Bronze; Pink #/349; Red #/199; Blue #/99; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 101 – Bron Breakker – NXT
___ 102 – Rhea Ripley – Raw
___ 103 – The Miz – Raw
___ 104 – Finn Balor – Raw
___ 105 – Austin Theory – SmackDown
___ 106 – Jacy Jayne – NXT
___ 107 – Becky Lynch – Raw
___ 108 – Kevin Owens – SmackDown
___ 109 – Bianca Belair – SmackDown
___ 110 – Randy Orton – SmackDown
___ 111 – Carmella – WWE
___ 112 – Roxanne Perez – NXT
___ 113 – Damian Priest – Raw
___ 114 – Gigi Dolin – NXT
___ 115 – Ava – NXT
`],
  ['Ring Royalty — Parallels: Bronze; Pink #/349; Red #/199; Blue #/99; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 116 – Batista – Legend
___ 117 – The Rock – Legend
___ 118 – Chyna – Legend
___ 119 – Triple H – Legend
___ 120 – Eddie Guerrero – Legend
___ 121 – Trish Stratus – Legend
___ 122 – Jerry Lawler – Legend
___ 123 – Lita – Legend
___ 124 – Mankind – Legend
___ 125 – Rob Van Dam – Legend
___ 126 – Booker T – Legend
___ 127 – "Stone Cold" Steve Austin – Legend
___ 128 – Diamond Dallas Page – Legend
___ 129 – Undertaker – Legend
___ 130 – The Godfather – Legend
`],
  ['Origins — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 131 – Asuka – SmackDown
___ 132 – LA Knight – SmackDown
___ 133 – Bray Wyatt – WWE
___ 134 – Rey Mysterio – SmackDown
___ 135 – Charlotte Flair – SmackDown
___ 136 – Gigi Dolin – NXT
___ 137 – Finn Balor – Raw
___ 138 – Seth "Freakin" Rollins – Raw
___ 139 – Gunther – Raw
___ 140 – Jimmy Uso – SmackDown
___ 141 – "The All Mighty" Bobby Lashley – SmackDown
___ 142 – Raquel Rodriguez – Raw
___ 144 – Roman Reigns – SmackDown
___ 145 – Cora Jade – NXT
`],
  ['Classics — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 146 – Alundra Blayze – Legend
___ 147 – Shawn Michaels – Legend
___ 148 – Big Boss Man – Legend
___ 149 – "Million Dollar Man" Ted DiBiase – Legend
___ 150 – "Mr. Perfect" Curt Hennig – Legend
___ 151 – Yokozuna – Legend
___ 152 – Ultimate Warrior – Legend
___ 153 – Razor Ramon – Legend
___ 154 – Lex Luger – Legend
___ 155 – "Ravishing" Rick Rude – Legend
___ 156 – Bam Bam Bigelow – Legend
___ 157 – Sycho Sid – Legend
___ 158 – Bret "Hit Man" Hart – Legend
___ 159 – Vader – Legend
___ 160 – Diesel – Legend
`],
  ['Luminance — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 161 – AJ Styles – SmackDown
___ 162 – Jey Uso – Raw
___ 163 – Bayley – SmackDown
___ 164 – Grayson Waller – SmackDown
___ 165 – Carmelo Hayes – NXT
___ 166 – Sami Zayn – Raw
___ 167 – "Dirty" Dominik Mysterio – Raw
___ 168 – Tiffany Stratton – NXT
___ 169 – Drew McIntyre – Raw
___ 170 – IYO SKY – SmackDown
___ 171 – Alexa Bliss – WWE
___ 172 – Liv Morgan – Raw
___ 173 – Braun Strowman – Raw
___ 174 – Nikkita Lyons – NXT
___ 175 – "The American Nightmare" Cody Rhodes – Raw
`],
  ['Golden Age — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 176 – Andre The Giant – Legend
___ 177 – "Rowdy" Roddy Piper – Legend
___ 178 – "Chief" Jay Strongbow – Legend
___ 179 – Hulk Hogan – Legend
___ 180 – Gene Okerlund – Legend
___ 181 – "Cowboy" Bob Orton – Legend
___ 182 – George "The Animal" Steele – Legend
___ 183 – "Superstar" Billy Graham – Legend
___ 184 – Gorilla Monsoon – Legend
___ 185 – Howard Finkel – Legend
___ 186 – Bruno Sammartino – Legend
___ 187 – The Honky Tonk Man – Legend
___ 188 – Freddie Blassie – Legend
___ 189 – Iron Sheik – Legend
___ 190 – Wendi Richter – Legend
`],
  ['Voices of the Ring — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 192 – Gorilla Monsoon – Legend
___ 193 – Kayla Braxton – SmackDown
___ 194 – Michael Cole – SmackDown
___ 195 – Alicia Taylor – NXT
___ 196 – Sarah Schreiber – WWE
___ 197 – Byron Saxton – Raw
___ 198 – Jerry Lawler – Legend
___ 199 – Booker T – Legend
___ 200 – Bobby "The Brain" Heenan – Legend
`],
  ['Certified — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 201 – Austin Theory – SmackDown
___ 202 – Rhea Ripley – Raw
___ 204 – Shawn Michaels – Legend
___ 205 – Diamond Dallas Page – Legend
___ 206 – Hulk Hogan – Legend
___ 207 – "Million Dollar Man" Ted DiBiase – Legend
___ 208 – Jimmy Uso – SmackDown
___ 209 – AJ Styles – SmackDown
___ 210 – Liv Morgan – Raw
___ 211 – Becky Lynch – Raw
___ 212 – Kayden Carter – Raw
___ 213 – Bubba Ray Dudley – Legend
___ 214 – Torrie Wilson – Legend
___ 215 – "Dirty" Dominik Mysterio – Raw
___ 216 – Iron Sheik – Legend
___ 217 – "Stone Cold" Steve Austin – Legend
___ 218 – Kane – Legend
___ 219 – Alexa Bliss – WWE
___ 220 – Randy Orton – SmackDown
___ 221 – Bret "Hit Man" Hart – Legend
___ 222 – Seth "Freakin" Rollins – Raw
___ 223 – "The American Nightmare" Cody Rhodes – Raw
___ 224 – Undertaker – Legend
___ 225 – Finn Balor – Raw
`],
  ['Limited — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 226 – Alba Fyre – SmackDown
___ 227 – John Cena – Legend
___ 228 – Bianca Belair – SmackDown
___ 229 – Kurt Angle – Legend
___ 230 – Bron Breakker – NXT
___ 231 – Roman Reigns – SmackDown
___ 232 – Charlotte Flair – SmackDown
___ 233 – Triple H – Legend
___ 234 – Kevin Nash – Legend
___ 235 – Scott Hall – Legend
___ 236 – Batista – Legend
___ 237 – Grayson Waller – SmackDown
___ 238 – "The All Mighty" Bobby Lashley – SmackDown
___ 239 – Nikkita Lyons – NXT
___ 240 – Mankind – Legend
___ 241 – Solo Sikoa – SmackDown
___ 242 – Damian Priest – Raw
___ 243 – Zelina Vega – SmackDown
___ 244 – Drew McIntyre – Raw
___ 245 – IYO SKY – SmackDown
___ 246 – Bayley – SmackDown
___ 247 – Kevin Owens – SmackDown
___ 248 – Booker T – Legend
___ 249 – Raquel Rodriguez – Raw
___ 250 – Carmelo Hayes – NXT
`],
  ['Illusions — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 251 – LA Knight – SmackDown
___ 253 – Rey Mysterio – SmackDown
___ 254 – Maxxine Dupri – Raw
___ 255 – "The American Nightmare" Cody Rhodes – Raw
___ 256 – Tiffany Stratton – NXT
___ 257 – Jerry Lawler – Legend
___ 258 – William Regal – Legend
___ 259 – Bradshaw – Legend
___ 260 – Becky Lynch – Raw
___ 261 – Lita – Legend
___ 262 – Bray Wyatt – WWE
___ 263 – Road Dogg – Legend
___ 264 – Sami Zayn – Raw
___ 265 – Dragon Lee – SmackDown
___ 266 – Trish Stratus – Legend
___ 267 – Jey Uso – Raw
___ 268 – 1-2-3 Kid – Legend
___ 269 – Papa Shango – Legend
___ 270 – Alexa Bliss – WWE
___ 271 – Liv Morgan – Raw
___ 272 – Asuka – SmackDown
___ 273 – Razor Ramon – Legend
___ 274 – The Great Khali – Legend
___ 275 – Ron Simmons – Legend
`],
  ['XR — Parallels: Bronze; Pink #/349; Red #/199; Green #/75; Purple #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 276 – Roxanne Perez – NXT
___ 277 – "Dirty" Dominik Mysterio – Raw
___ 278 – Gigi Dolin – NXT
___ 279 – AJ Styles – SmackDown
___ 280 – Jimmy Uso – SmackDown
___ 281 – Bayley – SmackDown
___ 282 – Paul Heyman – SmackDown
___ 283 – Braun Strowman – Raw
___ 284 – Rhea Ripley – Raw
___ 285 – Charlotte Flair – SmackDown
___ 286 – Seth "Freakin" Rollins – Raw
___ 287 – Dragon Lee – SmackDown
___ 288 – Gunther – Raw
___ 289 – Austin Theory – SmackDown
___ 290 – John Cena – Legend
___ 291 – Bianca Belair – SmackDown
___ 292 – Randy Orton – SmackDown
___ 293 – Carmella – WWE
___ 294 – Roman Reigns – SmackDown
___ 295 – Cora Jade – NXT
___ 296 – The Miz – Raw
___ 297 – Finn Balor – Raw
___ 298 – Jacy Jayne – NXT
___ 299 – Ava – NXT
___ 300 – LA Knight – SmackDown
`],
  ['Phoenix — Parallels: Silver; Silver Wave; Pink #/199; Red #/199; Blue #/99; Green #/75; Purple #/49; Mojo #/25; Gold #/10; Gold Vinyl 1/1', `
___ 301 – Bray Wyatt – WWE
___ 302 – Paul Heyman – SmackDown
___ 303 – LA Knight – SmackDown
___ 304 – Tiffany Stratton – NXT
___ 305 – Alexa Bliss – WWE
___ 306 – Carmella – WWE
___ 307 – "The American Nightmare" Cody Rhodes – Raw
___ 308 – Gigi Dolin – NXT
___ 309 – Bayley – SmackDown
___ 310 – Jacy Jayne – NXT
___ 311 – Chad Gable – Raw
___ 312 – Roxanne Perez – NXT
___ 313 – Rey Mysterio – SmackDown
___ 314 – Ava – NXT
___ 315 – Becky Lynch – Raw
___ 316 – Dragon Lee – SmackDown
___ 317 – Liv Morgan – Raw
___ 318 – Gunther – Raw
___ 319 – Asuka – SmackDown
___ 320 – Solo Sikoa – SmackDown
___ 321 – Jey Uso – Raw
___ 322 – Cora Jade – NXT
___ 323 – Sami Zayn – Raw
___ 324 – Braun Strowman – Raw
`],
  ['Honors — Parallels: Silver; Silver Wave; Pink #/199; Red #/199; Blue #/99; Green #/75; Purple #/49; Mojo #/25; Gold #/10; Gold Vinyl 1/1', `
___ 326 – Bayley – SmackDown
___ 327 – The Godfather – Legend
___ 328 – John Cena – Legend
___ 329 – John "Bradshaw" Layfield – Legend
___ 330 – Austin Theory – SmackDown
___ 331 – Lita – Legend
___ 332 – Jimmy Uso – SmackDown
___ 333 – The Rock – Legend
___ 334 – Rhea Ripley – Raw
___ 335 – The Miz – Raw
___ 336 – Bianca Belair – SmackDown
___ 337 – Trish Stratus – Legend
___ 338 – Roman Reigns – SmackDown
___ 339 – Faarooq – Legend
___ 340 – "Dirty" Dominik Mysterio – Raw
___ 341 – Road Dogg – Legend
___ 342 – Randy Orton – SmackDown
___ 343 – Bob Backlund – Legend
___ 344 – Seth "Freakin" Rollins – Raw
___ 345 – Rob Van Dam – Legend
___ 346 – Charlotte Flair – SmackDown
___ 347 – X-Pac – Legend
___ 348 – AJ Styles – SmackDown
___ 349 – Jerry Lawler – Legend
___ 350 – Finn Balor – Raw
`],
  ['Donruss Optic — Parallels: Silver; Silver Wave; Pink #/199; Red #/199; Blue #/99; Green #/75; Purple #/49; Mojo #/25; Gold #/10; Gold Vinyl 1/1', `
___ 351 – Raquel Rodriguez – Raw
___ 352 – Liv Morgan – Raw
___ 353 – Batista – Legend
___ 354 – "The All Mighty" Bobby Lashley – SmackDown
___ 355 – Booker T – Legend
___ 356 – Damian Priest – Raw
___ 357 – Grayson Waller – SmackDown
___ 358 – Alexa Bliss – WWE
___ 359 – Kevin Owens – SmackDown
___ 361 – Solo Sikoa – SmackDown
___ 362 – Hulk Hogan – Legend
___ 363 – John Cena – Legend
___ 364 – Bron Breakker – NXT
___ 365 – Cactus Jack – Legend
___ 366 – Drew McIntyre – Raw
___ 367 – IYO SKY – SmackDown
___ 368 – Becky Lynch – Raw
___ 369 – Nikkita Lyons – NXT
___ 370 – "The American Nightmare" Cody Rhodes – Raw
___ 371 – Zelina Vega – SmackDown
___ 372 – Alba Fyre – SmackDown
___ 373 – Triple H – Legend
___ 374 – Carmelo Hayes – NXT
___ 375 – Diesel – Legend
`],
  ['Spectra — Parallels: Silver; Silver Wave; Pink #/199; Red #/199; Blue #/99; Green #/75; Purple #/49; Mojo #/25; Gold #/10; Gold Vinyl 1/1', `
___ 376 – "Million Dollar Man" Ted DiBiase – Legend
___ 377 – LA Knight – SmackDown
___ 378 – Tiffany Stratton – NXT
___ 379 – Bayley – SmackDown
___ 380 – Shawn Michaels – Legend
___ 381 – John Cena – Legend
___ 382 – Diamond Dallas Page – Legend
___ 383 – Asuka – SmackDown
___ 384 – Kurt Angle – Legend
___ 385 – "The American Nightmare" Cody Rhodes – WWE
___ 386 – Bubba Ray Dudley – Legend
___ 387 – Rey Mysterio – SmackDown
___ 388 – "Stone Cold" Steve Austin – Legend
___ 389 – Bianca Belair – SmackDown
___ 390 – Undertaker – Legend
___ 391 – Roman Reigns – SmackDown
___ 392 – Kane – Legend
___ 393 – Bray Wyatt – WWE
___ 394 – Torrie Wilson – Legend
___ 395 – Jey Uso – Raw
___ 396 – Iron Sheik – Legend
___ 397 – Sami Zayn – Raw
___ 398 – Hulk Hogan – Legend
___ 399 – Charlotte Flair – SmackDown
___ 400 – Bret "Hit Man" Hart – Legend
`],
  ['Hall of Fame Autographs — Parallels: Blue #/46; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 1 – Torrie Wilson – Legend
___ 2 – Rey Mysterio – SmackDown
___ 3 – Stacy Keibler – Legend
___ 4 – Hulk Hogan – Legend
___ 5 – Kane – Legend
___ 6 – Jimmy Hart – Legend
___ 7 – Molly Holly – Legend
___ 8 – Kurt Angle – Legend
___ 9 – Brutus Beefcake – Legend
___ 10 – Rikishi – Legend
`],
  ['National Pride Signatures — Parallels: Blue #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 1 – Zelina Vega – SmackDown
___ 2 – Tyler Bate – NXT
___ 3 – Finn Balor – Raw
___ 4 – Kofi Kingston – Raw
___ 5 – Hulk Hogan – Legend
___ 6 – Rey Mysterio – SmackDown
___ 7 – Rhea Ripley – Raw
___ 8 – JD McDonagh – Raw
___ 9 – Alba Fyre – SmackDown
___ 10 – Noam Dar – NXT
___ 11 – Drew McIntyre – Raw
___ 12 – Becky Lynch – Raw
___ 13 – Santos Escobar – SmackDown
___ 14 – Butch – SmackDown
___ 15 – Meiko Satomura – NXT
`],
  ['National Treasures Memorabilia Autographs — Parallels: Gold #/10; Platinum 1/1', `
___ 1 – "Stone Cold" Steve Austin – Legend
___ 2 – Roman Reigns – SmackDown
___ 3 – Sami Zayn – Raw
___ 4 – Sheamus – SmackDown
___ 5 – Rhea Ripley – Raw
___ 6 – "The American Nightmare" Cody Rhodes – Raw
___ 7 – Becky Lynch – Raw
___ 8 – Bianca Belair – SmackDown
___ 9 – Charlotte Flair – SmackDown
___ 10 – Drew McIntyre – Raw
___ 11 – Finn Balor – Raw
___ 12 – Rey Mysterio – SmackDown
___ 13 – Seth "Freakin" Rollins
___ 14 – Kevin Owens – SmackDown
___ 15 – AJ Styles – SmackDown
___ 16 – Asuka – SmackDown
___ 17 – The Miz – Raw
___ 18 – Jey Uso – Raw
___ 19 – Jimmy Uso – SmackDown
`],
  ['Origins Autographs — Parallels: Blue #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 1 – Otis – Raw
___ 2 – Big E – WWE
___ 3 – Shotzi – SmackDown
___ 4 – Charlotte Flair – SmackDown
___ 5 – Torrie Wilson – Legend
___ 6 – Grayson Waller – SmackDown
___ 7 – John Cena – Legend
___ 8 – "Hacksaw" Jim Duggan – Legend
___ 9 – Malik Blade – NXT
___ 10 – Apollo Crews – Raw
___ 11 – Rey Mysterio – SmackDown
___ 12 – Baron Corbin – NXT
___ 13 – Stevie Ray – Legend
___ 14 – Dante Chen – NXT
___ 15 – Tyler Breeze – NXT
___ 16 – Ilja Dragunov – NXT
___ 17 – Karl Anderson – SmackDown
___ 18 – "The American Nightmare" Cody Rhodes – Raw
___ 19 – Meiko Satomura – NXT
___ 20 – Asuka – SmackDown
___ 21 – Rikishi – Legend
___ 22 – Brooks Jensen – NXT
___ 23 – The Honky Tonk Man – Legend
___ 24 – Duke Hudson – NXT
___ 25 – Ricky "The Dragon" Steamboat – Legend
___ 26 – Jerry Lawler – Legend
___ 27 – Kevin Owens – SmackDown
___ 28 – Adam Pearce – WWE
___ 29 – Molly Holly – Legend
___ 30 – Austin Theory – SmackDown
___ 31 – Scarlett – SmackDown
___ 32 – Candice LeRae – Raw
___ 33 – Tiffany Stratton – NXT
___ 34 – Bronson Reed – Raw
___ 35 – Zelina Vega – SmackDown
___ 36 – Jimmy Uso – SmackDown
___ 37 – Liv Morgan – Raw
___ 38 – Alexa Bliss – WWE
___ 39 – Nikkita Lyons – NXT
___ 40 – Becky Lynch – Raw
`],
  ['Chronicles Signatures — Parallels: Blue #/49; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 1 – Johnny Gargano – Raw
___ 2 – "Million Dollar Man" Ted DiBiase – Legend
___ 3 – Maryse – Raw
___ 4 – Arianna Grace – NXT
___ 5 – Piper Niven – Raw
___ 6 – Wendy Choo – NXT
___ 7 – Sol Ruca – NXT
___ 8 – Dakota Kai – SmackDown
___ 9 – Trick Williams – NXT
___ 10 – Faarooq – Legend
___ 11 – Karrion Kross – SmackDown
___ 12 – AJ Styles – SmackDown
___ 13 – Michin – SmackDown
___ 14 – Baron Corbin – NXT
___ 15 – Rhea Ripley – Raw
___ 16 – Bret "Hit Man" Hart – Legend
___ 17 – Tatanka – Legend
___ 18 – Shinsuke Nakamura – Raw
___ 19 – Tyson Kidd – Legend
___ 20 – Iyo Sky – SmackDown
___ 21 – Kiana James – NXT
___ 22 – Tensai – WWE
___ 23 – Montez Ford – SmackDown
___ 24 – Bayley – SmackDown
___ 25 – Road Dogg – Legend
___ 26 – Brutus Beefcake – Legend
___ 27 – The Hurricane – Legend
___ 28 – Ricochet – Raw
___ 29 – Xavier Woods – Raw
___ 30 – Jey Uso – Raw
___ 31 – Lita – Legend
___ 32 – Madusa – Legend
___ 33 – Noam Dar – NXT
___ 34 – Beth Phoenix – Legend
___ 35 – Seth "Freakin" Rollins – Raw
___ 36 – Carmella – WWE
___ 37 – Tommaso Ciampa – Raw
___ 38 – Greg "The Hammer" Valentine – Legend
___ 39 – Zoey Stark – Raw
___ 40 – Jinder Mahal – Raw
`],
  ['Donruss Optic Signature Series — Parallels: Blue #/49; Mojo #/25; Gold #/10; Gold Vinyl 1/1', `
___ 1 – The Shockmaster – Legend
___ 2 – Jey Uso – Raw
___ 3 – Booker T – Legend
___ 4 – "Million Dollar Man" Ted DiBiase – Legend
___ 5 – Karrion Kross – SmackDown
___ 6 – Zelina Vega – SmackDown
___ 7 – Shotzi – SmackDown
___ 8 – "Hacksaw" Jim Duggan – Legend
___ 9 – Ricochet – Raw
___ 10 – Maryse – Raw
___ 11 – Liv Morgan – Raw
___ 12 – Rhea Ripley – Raw
___ 13 – Montez Ford – SmackDown
___ 14 – Apollo Crews – Raw
___ 15 – Xavier Woods – Raw
___ 16 – Brutus Beefcake – Legend
___ 17 – X-Pac – Legend
___ 18 – Alundra Blayze – Legend
___ 19 – Butch – SmackDown
___ 20 – Dakota Kai – SmackDown
___ 21 – "The American Nightmare" Cody Rhodes – Raw
___ 22 – Sonya Deville – SmackDown
___ 23 – Wendi Richter – Legend
___ 24 – Bron Breakker – NXT
___ 25 – JD McDonagh – Raw
___ 26 – Katana Chance – Raw
___ 27 – Tensai – WWE
___ 28 – Tyler Breeze – Legend
___ 29 – Tyler Bate – NXT
___ 30 – Kiana James – NXT
`],
  ['Silhouettes — Parallels: Gold #/10; Platinum 1/1', `
___ 1 – Apollo Crews – Raw
___ 2 – Baron Corbin – NXT
___ 3 – Damian Priest – Raw
___ 4 – Dexter Lumis – Raw
___ 5 – Shinsuke Nakamura – Raw
___ 6 – Gunther – Raw
___ 7 – Jinder Mahal – Raw
___ 9 – Kofi Kingston – Raw
___ 10 – Liv Morgan – Raw
___ 11 – Ilja Dragunov – NXT
___ 12 – Cameron Grimes – SmackDown
___ 13 – Montez Ford – SmackDown
___ 14 – MVP – Raw
___ 15 – Nikki Cross – Raw
___ 16 – Otis – Raw
___ 17 – Rhea Ripley – Raw
___ 18 – Ricochet – Raw
___ 20 – Shayna Baszler – Raw
___ 21 – Shotzi – SmackDown
___ 22 – Veer – Raw
___ 23 – Zelina Vega – SmackDown
___ 25 – Butch – SmackDown
___ 26 – Candice LeRae – Raw
___ 28 – Iyo Sky – SmackDown
___ 29 – LA Knight – SmackDown
___ 31 – Santos Escobar – SmackDown
___ 32 – Sonya Deville – SmackDown
___ 33 – Tyler Bate – NXT
___ 34 – Carmelo Hayes – NXT
___ 35 – Grayson Waller – SmackDown
___ 36 – Jacy Jayne – NXT
___ 40 – Tony D'Angelo – NXT
`],
  ['Phoenix Autographs — Parallels: Blue #/49; Mojo #/25; Gold #/10; Platinum 1/1', `
___ 1 – "The American Nightmare" Cody Rhodes – Raw
___ 2 – Tommaso Ciampa – Raw
___ 3 – Luke Gallows – SmackDown
___ 4 – Michin – SmackDown
___ 5 – Sol Ruca – NXT
___ 6 – Damian Priest – Raw
___ 7 – Santos Escobar – SmackDown
___ 8 – Jimmy Hart – Legend
___ 9 – Kurt Angle – Legend
___ 10 – Noam Dar – NXT
___ 11 – Adam Pearce – WWE
___ 12 – Road Dogg – Legend
___ 13 – Becky Lynch – Raw
___ 14 – Greg "The Hammer" Valentine – Legend
___ 15 – Austin Theory – SmackDown
___ 16 – Bayley – SmackDown
___ 17 – Jerry Lawler – Legend
___ 18 – Zoey Stark – Raw
___ 19 – Otis – Raw
___ 20 – The Godfather – Legend
___ 21 – Torrie Wilson – Legend
___ 22 – Charlotte Flair – SmackDown
___ 23 – Carmella – WWE
___ 24 – Karrion Kross – SmackDown
___ 25 – B-Fab – SmackDown
___ 26 – Joe Gacy – NXT
___ 27 – Gable Steveson – Raw
___ 28 – Cameron Grimes – SmackDown
___ 29 – Baron Corbin – NXT
___ 30 – Grayson Waller – SmackDown
___ 31 – Lita – Legend
___ 32 – Channing "Stacks" Lorenzo – NXT
___ 33 – Tony D'Angelo – NXT
___ 34 – Raquel Rodriguez – Raw
___ 35 – Sami Zayn – Raw
___ 36 – Norman Smiley – Legend
___ 37 – Mankind – Legend
___ 38 – Tiffany Stratton – NXT
___ 39 – Beth Phoenix – Legend
___ 40 – Tatanka – Legend
`],
  ['Contenders Optic Season Ticket Signatures', `
___ 1 – Batista – Legend
___ 2 – Undertaker – Legend
___ 3 – Shawn Michaels – Legend
___ 4 – Hulk Hogan – Legend
___ 5 – Booker T – Legend
___ 6 – John Cena – Legend
___ 7 – Lita – Legend
___ 8 – "Stone Cold" Steve Austin – Legend
___ 9 – Torrie Wilson – Legend
`],
  ['Tools of the Trade Signatures — Parallels: Gold #/10; Platinum 1/1', `
___ 1 – Angelo Dawkins – SmackDown
___ 2 – Austin Theory – SmackDown
___ 3 – Chad Gable – Raw
___ 4 – Zelina Vega – SmackDown
___ 5 – "Dirty" Dominik Mysterio – Raw
___ 6 – Erik – Raw
___ 7 – Ivar – Raw
___ 8 – Karl Anderson – SmackDown
___ 9 – Kevin Owens – SmackDown
___ 10 – Liv Morgan – Raw
___ 13 – Joaquin Wilde – SmackDown
___ 14 – Nikki Cross – Raw
___ 15 – Natalya – Raw
___ 16 – Omos – WWE
___ 17 – Piper Niven – Raw
___ 18 – Otis – Raw
___ 19 – Ridge Holland – SmackDown
___ 20 – Scrypts – NXT
___ 21 – Shinsuke Nakamura – Raw
___ 22 – Solo Sikoa – SmackDown
___ 23 – Xavier Woods – Raw
___ 26 – Cameron Grimes – SmackDown
___ 27 – Dakota Kai – SmackDown
___ 28 – Santos Escobar – SmackDown
___ 29 – Johnny Gargano – Raw
___ 31 – Raquel Rodriguez – Raw
___ 33 – Tommaso Ciampa – Raw
___ 34 – Bron Breakker – NXT
___ 35 – Cora Jade – NXT
___ 36 – Ivy Nile – Raw
___ 37 – JD McDonagh – Raw
___ 38 – Kayden Carter – Raw
`],
  ['Voices of the Ring Signatures — Parallels: Blue #/45; Holo Silver #/25; Gold #/10; Platinum 1/1', `
___ 1 – Jerry Lawler – Legend
___ 2 – Dok Hendrix – Legend
___ 3 – Corey Graves – SmackDown
___ 4 – Kayla Braxton – SmackDown
___ 5 – Wade Barrett – Legend
___ 6 – Michael Cole – SmackDown
___ 7 – Alicia Taylor – NXT
___ 8 – John "Bradshaw" Layfield – Legend
___ 9 – Byron Saxton – Raw
___ 10 – Sarah Schreiber – WWE
`],
  ['National Treasures Insert Set — Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 – Jey Uso – Raw
___ 2 – "Stone Cold" Steve Austin – Legend
___ 3 – Kofi Kingston – Raw
___ 4 – Bayley – SmackDown
___ 5 – Paul Heyman – SmackDown
___ 7 – Roxanne Perez – NXT
___ 8 – Damian Priest – Raw
___ 9 – Thea Hail – NXT
___ 10 – Finn Balor – Raw
___ 11 – John Cena – Legend
___ 12 – Alba Fyre – SmackDown
___ 13 – Lita – Legend
___ 14 – Bob Backlund – Legend
___ 15 – Rey Mysterio – SmackDown
___ 16 – Dude Love – Legend
___ 17 – Seth "Freakin" Rollins – Raw
___ 18 – Randy Orton – SmackDown
___ 19 – Triple H – Legend
___ 20 – Gunther – Raw
___ 21 – Kane – Legend
___ 22 – Austin Theory – SmackDown
___ 23 – Maxxine Dupri – Raw
___ 24 – Braun Strowman – Raw
___ 25 – Sycho Sid – Legend
___ 26 – Charlotte Flair – SmackDown
___ 27 – Solo Sikoa – SmackDown
___ 28 – Drew McIntyre – Raw
___ 29 – William Regal – Legend
___ 30 – Iyo Sky – SmackDown
`],
  ['The Biggest Little Man Insert Set', `
___ 1 – Rey Mysterio – SmackDown
___ 2 – Rey Mysterio – SmackDown
___ 3 – Rey Mysterio – SmackDown
___ 4 – Rey Mysterio – SmackDown
___ 5 – Rey Mysterio – SmackDown
___ 6 – Rey Mysterio – SmackDown
___ 7 – Rey Mysterio – SmackDown
___ 8 – Rey Mysterio – SmackDown
___ 9 – Rey Mysterio – SmackDown
___ 10 – Rey Mysterio – SmackDown
___ 11 – Rey Mysterio – SmackDown
___ 12 – Rey Mysterio – SmackDown
___ 13 – Rey Mysterio – SmackDown
___ 14 – Rey Mysterio – SmackDown
___ 15 – Rey Mysterio – SmackDown
___ 16 – Rey Mysterio – SmackDown
___ 17 – Rey Mysterio – SmackDown
___ 18 – Rey Mysterio – SmackDown
___ 19 – Rey Mysterio – SmackDown
___ 20 – Rey Mysterio – SmackDown
___ 21 – Rey Mysterio – SmackDown
___ 22 – Rey Mysterio – SmackDown
___ 23 – Rey Mysterio – SmackDown
___ 24 – Rey Mysterio – SmackDown
___ 25 – Rey Mysterio – SmackDown
___ 26 – Rey Mysterio – SmackDown
___ 27 – Rey Mysterio – SmackDown
___ 28 – Rey Mysterio – SmackDown
___ 29 – Rey Mysterio – SmackDown
___ 30 – Rey Mysterio – SmackDown
___ 31 – Rey Mysterio – SmackDown
___ 32 – Rey Mysterio – SmackDown
___ 33 – Rey Mysterio – SmackDown
___ 34 – Rey Mysterio – SmackDown
___ 35 – Rey Mysterio – SmackDown
___ 36 – Rey Mysterio – SmackDown
___ 37 – Rey Mysterio – SmackDown
___ 38 – Rey Mysterio – SmackDown
___ 39 – Rey Mysterio – SmackDown
___ 40 – Rey Mysterio – SmackDown
___ 41 – Rey Mysterio – SmackDown
___ 42 – Rey Mysterio – SmackDown
___ 43 – Rey Mysterio – SmackDown
___ 44 – Rey Mysterio – SmackDown
`],
  ['Action Packed — Parallels: 24kt Gold', `
___ 1 – Batista – Legend
___ 2 – Charlotte Flair – SmackDown
___ 3 – Triple H – Legend
___ 4 – Roman Reigns – SmackDown
___ 5 – Mankind – Legend
___ 6 – The Miz – Raw
___ 7 – Sami Zayn – Raw
___ 8 – Alexa Bliss – WWE
___ 9 – Rhea Ripley – Raw
___ 10 – Bianca Belair – SmackDown
___ 11 – Hulk Hogan – Legend
___ 12 – "The American Nightmare" Cody Rhodes – Raw
___ 13 – The Rock – Legend
___ 14 – Natalya – Raw
___ 15 – Trish Stratus – Legend
___ 16 – Finn Balor – Raw
___ 17 – Seth "Freakin" Rollins – Raw
___ 18 – Becky Lynch – Raw
___ 19 – "Stone Cold" Steve Austin – Legend
___ 21 – Shawn Michaels – Legend
___ 22 – John Cena – Legend
___ 23 – Undertaker – Legend
___ 24 – Liv Morgan – Raw
___ 25 – Kurt Angle – Legend
`],
  ['Main Event Insert Set', `
___ 1 – Roman Reigns – SmackDown
___ 2 – The Rock – Legend
___ 3 – John Cena – Legend
___ 4 – Rhea Ripley – Raw
___ 5 – Hulk Hogan – Legend
`],
  ['Timeless Treasures Insert Set — Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 – Diamond Dallas Page – Legend
___ 2 – Tiffany Stratton – NXT
___ 3 – Gigi Dolin – NXT
___ 4 – Jimmy Uso – SmackDown
___ 5 – X-Pac – Legend
___ 6 – Kurt Angle – Legend
___ 7 – Becky Lynch – Raw
___ 8 – Randy Orton – SmackDown
___ 9 – Bron Breakker – NXT
___ 10 – Sami Zayn – Raw
___ 11 – "Dirty" Dominik Mysterio – Raw
___ 12 – Trish Stratus – Legend
___ 13 – "Hollywood" Hulk Hogan – Legend
___ 14 – Red Rooster – Legend
___ 15 – Alexa Bliss – WWE
___ 16 – Liv Morgan – Raw
___ 17 – "The All Mighty" Bobby Lashley – SmackDown
___ 18 – Rhea Ripley – Raw
___ 19 – Carmella – WWE
___ 20 – Shawn Michaels – Legend
___ 21 – Kevin Owens – SmackDown
___ 22 – Zelina Vega – SmackDown
___ 23 – Jacy Jayne – NXT
___ 24 – Karrion Kross – SmackDown
___ 25 – The Rock – Legend
___ 26 – Montez Ford – SmackDown
___ 27 – Bray Wyatt – WWE
___ 28 – Roman Reigns – SmackDown
___ 29 – "The American Nightmare" Cody Rhodes – Raw
___ 30 – The Great Khali – Legend
`],
  ['Noir Insert Set — Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 – Cora Jade – NXT
___ 2 – Torrie Wilson – Legend
___ 3 – Faarooq – Legend
___ 4 – Jerry Lawler – Legend
___ 5 – "The Million Dollar Man" Ted DiBiase – Legend
___ 6 – Kevin Owens – SmackDown
___ 7 – Batista – Legend
___ 8 – Nikkita Lyons – NXT
___ 9 – Bret "Hit Man" Hart – Legend
___ 10 – Iyo Sky – SmackDown
___ 11 – Diesel – Legend
___ 12 – Undertaker – Legend
___ 13 – Grayson Waller – SmackDown
___ 14 – John "Bradshaw" Layfield – Legend
___ 15 – AJ Styles – SmackDown
___ 16 – LA Knight – SmackDown
___ 17 – Bianca Belair – Raw
___ 18 – Raquel Rodriguez – Raw
___ 19 – Bubba Ray Dudley – Legend
___ 20 – Shotzi – SmackDown
___ 21 – Dragon Lee – SmackDown
___ 22 – Scarlett – SmackDown
___ 23 – Iron Sheik – Legend
___ 24 – Kama – Legend
___ 25 – Asuka – SmackDown
___ 26 – "The American Nightmare" Cody Rhodes – WWE
___ 27 – Booker T – Legend
___ 28 – Road Dogg – Legend
___ 29 – Carmelo Hayes – NXT
___ 30 – The Miz – Raw
`],
  ['Gala Rookies Insert Set', `
___ 1 – Lola Vice – NXT
___ 2 – Hank Walker – NXT
___ 3 – Ava – NXT
___ 4 – Thea Hail – NXT
___ 5 – Maxxine Dupri – Raw
___ 6 – Sol Ruca – NXT
___ 7 – Kiana James – NXT
___ 8 – Channing "Stacks" Lorenzo – NXT
___ 9 – Tatum Paxley – NXT
___ 10 – Dragon Lee – SmackDown
`],
]));

// ── 2023 PANINI WWE DONRUSS ELITE ─────────────────────────────────────────────
setsHtml.push(makeSet('eli23', '2023', '2023 Panini WWE Donruss Elite', [
  ['Base Set — Parallels: Green; Pink; Razzle Dazzle; Red; Status Explosion #/275; Blue #/149; Purple #/99; Status #/80; Aspirations #/53; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – Tony D'Angelo
___ 2 – Liv Morgan
___ 3 – Quincy Elliott
___ 4 – Andre Chase
___ 5 – Dolph Ziggler
___ 6 – Alexa Bliss
___ 7 – Joe Gacy
___ 8 – Sami Zayn
___ 9 – Piper Niven
___ 10 – Damian Priest
___ 11 – Tyler Bate
___ 12 – Matt Riddle
___ 13 – Tatum Paxley
___ 14 – Ava
___ 15 – Dragon Lee
___ 16 – Becky Lynch
___ 17 – Karrion Kross
___ 18 – AJ Styles
___ 19 – Ricochet
___ 20 – "Dirty" Dominik Mysterio
___ 21 – Wes Lee
___ 22 – Nathan Frazer
___ 23 – Top Dolla
___ 24 – Braun Strowman
___ 25 – Elektra Lopez
___ 26 – Bianca Belair
___ 27 – Kofi Kingston
___ 28 – Asuka
___ 29 – Riddick Moss
___ 30 – Drew McIntyre
___ 31 – Xavier Woods
___ 32 – Paul Heyman
___ 33 – B-Fab
___ 34 – Bronson Reed
___ 35 – Elias
___ 36 – Brock Lesnar
___ 37 – LA Knight
___ 38 – "The All Mighty" Bobby Lashley
___ 39 – Sheamus
___ 40 – Edge
___ 41 – Zelina Vega
___ 42 – Raquel Rodriguez
___ 43 – Alba Fyre
___ 44 – Candice LeRae
___ 45 – Gigi Dolin
___ 46 – Charlotte Flair
___ 47 – Montez Ford
___ 48 – Bayley
___ 49 – Shinsuke Nakamura
___ 50 – Finn Balor
___ 51 – Arianna Grace
___ 52 – Rey Mysterio
___ 53 – Butch
___ 54 – Carmella
___ 55 – Grayson Waller
___ 56 – "The American Nightmare" Cody Rhodes
___ 57 – Natalya
___ 58 – Austin Theory
___ 59 – Shotzi
___ 60 – Gunther
___ 61 – Channing "Stacks" Lorenzo
___ 62 – Roxanne Perez
___ 63 – Johnny Gargano
___ 64 – Chad Gable
___ 65 – Ilja Dragunov
___ 66 – Randy Orton
___ 67 – Nikki Cross
___ 68 – Bray Wyatt
___ 69 – Sol Ruca
___ 70 – Iyo Sky
___ 71 – Hank Walker
___ 72 – Scarlett
___ 73 – Santos Escobar
___ 74 – Chelsea Green
___ 75 – Jacy Jayne
___ 76 – Rhea Ripley
___ 77 – Nikkita Lyons
___ 78 – Bron Breakker
___ 79 – Sonya Deville
___ 80 – Jey Uso
___ 81 – Kiana James
___ 82 – Seth "Freakin" Rollins
___ 83 – Rick Boogs
___ 84 – Dakota Kai
___ 85 – Ivy Nile
___ 86 – Roman Reigns
___ 87 – Omos
___ 88 – Carmelo Hayes
___ 89 – The Miz
___ 90 – Jimmy Uso
___ 91 – Maxxine Dupri
___ 92 – Solo Sikoa
___ 93 – Xia Li
___ 94 – Dijak
___ 95 – JD McDonagh
___ 96 – Lola Vice
___ 97 – Otis
___ 98 – Cora Jade
___ 99 – Tiffany Stratton
___ 100 – Kevin Owens
`],
  ['Legends — Parallels: Green; Pink; Razzle Dazzle; Red; Status Explosion #/275; Blue #/149; Purple #/99; Status #/80; Aspirations #/53; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 101 – Mankind
___ 102 – "Rowdy" Roddy Piper
___ 103 – Stacy Keibler
___ 104 – Undertaker
___ 105 – "Stone Cold" Steve Austin
___ 106 – Iron Sheik
___ 107 – Diesel
___ 108 – Tito Santana
___ 109 – Kane
___ 110 – Dusty Rhodes
___ 111 – Ricky "The Dragon" Steamboat
___ 112 – Sherri Martel
___ 113 – The Godfather
___ 114 – 1-2-3 Kid
___ 115 – Batista
___ 116 – Miss Elizabeth
___ 117 – Eric Bischoff
___ 118 – William Regal
___ 119 – Ken Shamrock
___ 120 – Eddie Guerrero
___ 121 – Rob Van Dam
___ 122 – Ultimate Warrior
___ 123 – Torrie Wilson
___ 124 – "Million Dollar Man" Ted DiBiase
___ 125 – Booker T
___ 126 – Rikishi
___ 127 – Hulk Hogan
___ 128 – Andre The Giant
___ 129 – Kurt Angle
___ 130 – "Mr. Perfect" Curt Hennig
___ 131 – Scott Steiner
___ 132 – Red Rooster
___ 133 – Triple H
___ 134 – Bob Backlund
___ 135 – Bret "Hit Man" Hart
___ 136 – Road Dogg
___ 137 – Jerry Lawler
___ 138 – British Bulldog
___ 139 – Lex Luger
___ 140 – Razor Ramon
___ 141 – Shawn Michaels
___ 142 – The Rock
___ 143 – Trish Stratus
___ 144 – Bubba Ray Dudley
___ 145 – Diamond Dallas Page
___ 146 – The Honky Tonk Man
___ 147 – John Cena
___ 148 – Bruno Sammartino
___ 149 – Lita
___ 150 – "Ravishing" Rick Rude
`],
  ['Elite Deck Insert Set — Parallels: Green; Red #/99; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – Roman Reigns
___ 2 – Edge
___ 3 – John Cena
___ 4 – Bianca Belair
___ 5 – "Stone Cold" Steve Austin
___ 6 – Trish Stratus
___ 7 – Hulk Hogan
___ 8 – Bron Breakker
___ 9 – Randy Orton
___ 10 – Triple H
___ 11 – Brock Lesnar
___ 12 – Becky Lynch
___ 13 – The Rock
___ 14 – Charlotte Flair
___ 15 – Undertaker
`],
  ['Family Lineage Insert Set — Parallels: Green; Red #/99; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – Rikishi / Jimmy Uso
___ 2 – Jim "The Anvil" Neidhart / Natalya
___ 3 – Sika / Roman Reigns
___ 4 – "Cowboy" Bob Orton / Randy Orton
___ 5 – Solo Sikoa / Rikishi
___ 6 – Rick Steiner / Bron Breakker
___ 7 – "Dirty" Dominik Mysterio / Rey Mysterio
___ 8 – Charlie Dempsey / William Regal
___ 9 – The Rock / Rocky Johnson
___ 10 – Dusty Rhodes / "The American Nightmare" Cody Rhodes
`],
  ['Full Throttle Insert Set — Parallels: Green; Red #/99; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – Kofi Kingston
___ 2 – Carmelo Hayes
___ 3 – Shawn Michaels
___ 4 – X-Pac
___ 5 – Seth "Freakin" Rollins
___ 6 – Matt Riddle
___ 7 – Jey Uso
___ 8 – Dolph Ziggler
___ 9 – Jimmy Uso
___ 10 – Montez Ford
___ 11 – AJ Styles
___ 12 – Austin Theory
___ 13 – Xavier Woods
___ 14 – Finn Balor
___ 15 – Rob Van Dam
`],
  ['Powerhouse Insert Set — Parallels: Green; Red #/99; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – Andre The Giant
___ 2 – Bianca Belair
___ 3 – Chyna
___ 4 – Braun Strowman
___ 5 – John Cena
`],
  ['Spellbound Insert Set — Parallels: Green; Red #/99; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – Roman Reigns
___ 2 – Roman Reigns
___ 3 – Roman Reigns
___ 4 – Roman Reigns
___ 5 – Roman Reigns
___ 6 – Brock Lesnar
___ 7 – Brock Lesnar
___ 8 – Brock Lesnar
___ 9 – Brock Lesnar
___ 10 – Brock Lesnar
___ 11 – John Cena
___ 12 – John Cena
___ 13 – John Cena
___ 14 – John Cena
___ 15 – "Stone Cold" Steve Austin
___ 16 – "Stone Cold" Steve Austin
___ 17 – "Stone Cold" Steve Austin
___ 18 – "Stone Cold" Steve Austin
___ 19 – "Stone Cold" Steve Austin
___ 20 – "Stone Cold" Steve Austin
___ 21 – "Stone Cold" Steve Austin
___ 22 – "Stone Cold" Steve Austin
___ 23 – "Stone Cold" Steve Austin
___ 24 – Lita
___ 25 – Lita
___ 26 – Lita
___ 27 – Lita
___ 28 – Rey Mysterio
___ 29 – Rey Mysterio
___ 30 – Rey Mysterio
`],
  ['Star Status Insert Set — Parallels: Green; Red #/99; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – Undertaker
___ 2 – "Stone Cold" Steve Austin
___ 3 – Lita
___ 4 – Hulk Hogan
___ 5 – Bray Wyatt
___ 6 – Randy Orton
___ 7 – Brock Lesnar
___ 8 – Roman Reigns
___ 9 – The Rock
___ 10 – John Cena
___ 11 – Bayley
___ 12 – Trish Stratus
___ 13 – "The All Mighty" Bobby Lashley
___ 14 – Sami Zayn
___ 15 – "The American Nightmare" Cody Rhodes
___ 16 – Triple H
___ 17 – Becky Lynch
___ 18 – Edge
___ 19 – Charlotte Flair
___ 20 – Bianca Belair
`],
  ['Title Waves Insert Set — Parallels: Green; Red #/99; Orange #/49; Teal #/25; Gold #/10; Black 1/1', `
___ 1 – John Cena
___ 2 – Charlotte Flair
___ 3 – Triple H
___ 4 – Becky Lynch
___ 5 – Randy Orton
`],
  ['Elite Impressions Autographs — Parallels: Gold #/10; Black 1/1', `
___ 1 – Oro Mensah
___ 2 – Edris Enofe
___ 3 – Booker T
___ 4 – Wendy Choo
___ 5 – "Hacksaw" Jim Duggan
___ 6 – Rick Boogs
___ 7 – Axiom
___ 9 – Rip Fowler
___ 10 – Mace
___ 11 – Wolfgang
___ 12 – Elektra Lopez
___ 14 – Yulisa Leon
___ 15 – Rob Van Dam
___ 16 – Ridge Holland
___ 17 – Boa
___ 19 – "Stone Cold" Steve Austin
___ 20 – Shelton Benjamin
___ 21 – Dijak
___ 22 – Fallon Henley
___ 23 – Kane
___ 24 – Angelo Dawkins
___ 25 – Sika
___ 27 – Brutus Creed
___ 28 – Angel
___ 29 – Von Wagner
___ 31 – Batista
___ 33 – Bret "Hit Man" Hart
___ 34 – Chad Gable
___ 35 – Afa
___ 36 – R-Truth
___ 38 – Cedric Alexander
___ 39 – Wes Lee
___ 41 – Hulk Hogan
___ 42 – Josh Briggs
___ 43 – Don Muraco
___ 44 – Dana Brooke
___ 45 – Simon Dean
___ 48 – Cruz Del Toro
___ 49 – Blair Davenport
___ 50 – Amari Miller
___ 51 – Ivan Putski
___ 52 – Malik Blade
___ 53 – "Cowboy" Bob Orton
___ 54 – Erik
___ 55 – Jerry Lawler
___ 56 – Emma
___ 57 – Ivy Nile
___ 58 – Dexter Lumis
___ 59 – Charlie Dempsey
___ 60 – Andre Chase
___ 61 – Torrie Wilson
___ 62 – Mr. Stone
___ 63 – Alundra Blayze
___ 64 – Ivar
___ 65 – The Boogeyman
___ 66 – Joaquin Wilde
___ 67 – Jagger Reid
___ 68 – Giovanni Vinci
___ 70 – Brooks Jensen
___ 71 – Paul Heyman
___ 72 – Nathan Frazer
___ 73 – Gerald Brisco
___ 74 – Mustafa Ali
___ 75 – Alba Fyre
___ 76 – Valhalla
___ 77 – Julius Creed
___ 78 – Humberto
___ 79 – Joe Coffey
___ 80 – Damon Kemp
___ 81 – Kevin Nash
___ 82 – Trick Williams
___ 83 – Michael Hayes
___ 84 – MVP
___ 85 – Bron Breakker
___ 86 – The Honky Tonk Man
___ 87 – Kayden Carter
___ 88 – LA Knight
___ 89 – Lyra Valkyria
___ 90 – Dante Chen
___ 91 – Diamond Dallas Page
___ 92 – Valentina Feroz
___ 94 – Nikki Cross
___ 95 – Cora Jade
___ 96 – Scrypts
___ 98 – Ludwig Kaiser
___ 99 – Mark Coffey
___ 100 – Duke Hudson
`],
  ['Elite Signatures — Parallels: Green; Red #/99; Blue #/25; Gold #/10; Black 1/1', `
___ 1 – Grayson Waller
___ 2 – John Cena
___ 3 – "Stone Cold" Steve Austin
___ 5 – Baron Corbin
___ 6 – Rey Mysterio
___ 8 – Shinsuke Nakamura
___ 9 – Damian Priest
___ 11 – Gunther
___ 13 – "The American Nightmare" Cody Rhodes
___ 14 – Liv Morgan
___ 15 – Batista
___ 16 – Rhea Ripley
___ 17 – Bret "Hit Man" Hart
___ 18 – Shotzi
___ 19 – Dolph Ziggler
___ 20 – Trish Stratus
___ 21 – Hulk Hogan
___ 22 – Karrion Kross
___ 23 – Alba Fyre
___ 24 – Luke Gallows
___ 25 – Bayley
___ 26 – Sami Zayn
___ 28 – Solo Sikoa
___ 29 – "Dirty" Dominik Mysterio
___ 30 – Undertaker
___ 31 – Jimmy Uso
___ 32 – Katana Chance
___ 33 – Alexa Bliss
___ 35 – Bianca Belair
___ 36 – Shawn Michaels
___ 37 – Carmella
___ 38 – The Miz
___ 39 – Drew McIntyre
___ 40 – Xavier Woods
___ 41 – Joe Gacy
___ 42 – Kofi Kingston
___ 43 – Austin Theory
___ 44 – Natalya
___ 45 – Big E
___ 46 – Shayna Baszler
___ 47 – Carmelo Hayes
___ ES-TST – Tiffany Stratton
___ 50 – Zelina Vega
`],
  ['New Breed — Parallels: Green; Red #/49; Blue #/25; Gold #/10; Black 1/1', `
___ 1 – JD McDonagh
___ 3 – Sol Ruca
___ 5 – Arianna Grace
___ 6 – Blair Davenport
___ 7 – Tatum Paxley
___ 8 – Dijak
___ 9 – Bron Breakker
___ 10 – Noam Dar
___ 11 – Joe Gacy
___ 12 – Ivy Nile
___ 13 – Tyler Bate
___ 14 – Rip Fowler
___ 15 – Channing "Stacks" Lorenzo
___ 16 – Charlie Dempsey
___ 17 – Thea Hail
___ 18 – Gigi Dolin
___ 19 – Alba Fyre
___ 20 – Scrypts
___ 21 – Katana Chance
___ 22 – Jagger Reid
___ 23 – Zoey Stark
___ 24 – Von Wagner
___ 25 – Kiana James
___ 26 – Fallon Henley
___ 27 – Tiffany Stratton
___ 28 – Jacy Jayne
___ 29 – Carmelo Hayes
___ 30 – Axiom
___ 31 – Quincy Elliott
___ 32 – Julius Creed
___ 33 – Cameron Grimes
___ 34 – Wes Lee
___ 35 – Nikkita Lyons
___ 36 – Nathan Frazer
___ 37 – Tony D'Angelo
___ 38 – Ava
___ 39 – Grayson Waller
___ 40 – Brutus Creed
`],
  ['Passing the Torch — Serial #/25; Parallels: Gold #/10; Black 1/1', `
___ 1 – "Stone Cold" Steve Austin / Shawn Michaels
___ 2 – Seth "Freakin" Rollins / Triple H
___ 3 – John "Bradshaw" Layfield / Baron Corbin
___ 4 – John Cena / Roman Reigns
___ 5 – Kurt Angle / Baron Corbin
___ 6 – Kurt Angle / John Cena
___ 7 – Roman Reigns / Undertaker
___ 8 – Cactus Jack / Don Muraco
___ 9 – "Dirty" Dominik Mysterio / Rey Mysterio
___ 10 – Bron Breakker / Rick Steiner
`],
  ['Pen Pals — Parallels: Red #/49; Blue #/25; Gold #/10; Black 1/1', `
___ 1 – Charlotte Flair
___ 2 – Jey Uso
___ 4 – Cora Jade
___ 5 – Asuka
___ 6 – Quincy Elliott
___ 7 – Montez Ford
___ 8 – Dakota Kai
___ 9 – Roman Reigns
___ 10 – Scarlett
___ 11 – Finn Balor
___ 12 – Michin
___ 13 – Sheamus
___ 14 – Gigi Dolin
___ 15 – Kevin Owens
___ 16 – Roxanne Perez
___ 17 – B-Fab
___ 18 – Iyo Sky
___ 20 – Raquel Rodriguez
___ 21 – Seth "Freakin" Rollins
___ 22 – Santos Escobar
___ 23 – Braun Strowman
___ 24 – Ava
___ 25 – Apollo Crews
___ 26 – Thea Hail
___ 27 – Butch
___ 28 – Johnny Gargano
___ 30 – Sonya Deville
___ 31 – "The All Mighty" Bobby Lashley
___ 32 – Bron Breakker
___ 33 – AJ Styles
___ 34 – Nikkita Lyons
___ 35 – Gable Steveson
___ 36 – Jacy Jayne
___ 37 – Candice LeRae
___ 38 – Maxxine Dupri
___ 39 – Becky Lynch
___ 40 – Top Dolla
`],
  ['Turn of the Century — Parallels: Blue #/25; Gold #/10; Black 1/1', `
___ 1 – Road Dogg
___ 2 – Diamond Dallas Page
___ 4 – John "Bradshaw" Layfield
___ 5 – Kurt Angle
___ 7 – "Hacksaw" Jim Duggan
___ 8 – Michael Hayes
___ 9 – Beth Phoenix
___ 10 – Rob Van Dam
___ 11 – Don Muraco
___ 12 – Tatanka
___ 13 – Madusa
___ 14 – Bradshaw
___ 15 – "The Million Dollar Man" Ted DiBiase
___ 16 – Dok Hendrix
___ 17 – Terry Taylor
___ 18 – Papa Shango
___ 19 – Faarooq
___ 20 – Jerry Lawler
___ 21 – Kane
___ 22 – The Shockmaster
___ 23 – Bad News Brown
___ 24 – Booker T
___ 25 – Greg "The Hammer" Valentine
___ 26 – The Godfather
___ 27 – D-Lo Brown
___ 28 – Wade Barrett
___ 29 – Ivan Putski
___ 30 – 1-2-3 Kid
___ 31 – Torrie Wilson
___ 32 – Jimmy Hart
___ 33 – Johnny Rodz
___ 34 – Wendi Richter
___ 35 – Scotty 2 Hotty
___ 36 – Brutus Beefcake
___ 37 – Stevie Ray
___ 38 – Hulk Hogan
___ 39 – Tyson Kidd
___ 40 – Eric Bischoff
___ 41 – The Honky Tonk Man
___ 43 – X-Pac
___ 44 – Jason Jordan
___ 45 – Rikishi
___ 46 – Eve Torres
___ 47 – Fit Finlay
___ 48 – Scott Steiner
___ 49 – Red Rooster
___ 50 – Rick Steiner
___ 51 – Mighty Molly
___ 52 – "Cowboy" Bob Orton
___ 53 – Jimmy Garvin
___ 54 – Lex Luger
___ 55 – Albert
___ 56 – Undertaker
___ 57 – Tyler Breeze
___ 58 – The Boogeyman
___ 59 – Norman Smiley
___ 60 – Mike Rotunda
`],
  ['Turn of the Century Red Parallel — All serial #/49', `
___ 1 – Road Dogg
___ 6 – IRS
___ 7 – "Hacksaw" Jim Duggan
___ 8 – Michael Hayes
___ 10 – Rob Van Dam
___ 11 – Don Muraco
___ 12 – Tatanka
___ 13 – Madusa
___ 16 – Dok Hendrix
___ 17 – Terry Taylor
___ 18 – Papa Shango
___ 19 – Faarooq
___ 20 – Jerry Lawler
___ 22 – The Shockmaster
___ 23 – Bad News Barrett
___ 25 – Greg "The Hammer" Valentine
___ 26 – The Godfather
___ 27 – D-Lo Brown
___ 28 – Wade Barrett
___ 30 – 1-2-3 Kid
___ 32 – Jimmy Hart
___ 33 – Johnny Rodz
___ 34 – Wendi Richter
___ 35 – Scotty 2 Hotty
___ 36 – Brutus Beefcake
___ 37 – Stevie Ray
___ 39 – Tyson Kidd
___ 43 – X-Pac
___ 44 – Jason Jordan
___ 46 – Eve Torres
___ 47 – Fit Finlay
___ 48 – Scott Steiner
___ 49 – Red Rooster
___ 50 – Rick Steiner
___ 51 – Mighty Molly
___ 52 – "Cowboy" Bob Orton
___ 53 – Jimmy Garvin
___ 54 – Lex Luger
___ 55 – Albert
___ 57 – Tyler Breeze
___ 58 – The Boogeyman
___ 59 – Norman Smiley
___ 60 – Mike Rotunda
`],
]));

// ── 2023 PANINI WWE IMMACULATE ────────────────────────────────────────────────
setsHtml.push(makeSet('imm23', '2023', '2023 Panini Immaculate Collection WWE', [
  ['Base Set — Serial #/75; Parallels: Red #/35; Gold #/10; Green #/5; Platinum 1/1', `
___ 1 Dragon Lee
___ 2 Paul Bearer
___ 3 Bayley
___ 4 John Cena
___ 5 Omos
___ 6 Trick Williams
___ 8 Braun Strowman
___ 9 Lyra Valkyria
___ 10 Sami Zayn
___ 11 Bray Wyatt
___ 12 Jimmy Uso
___ 13 Razor Ramon
___ 14 Bianca Belair
___ 15 "Stone Cold" Steve Austin
___ 16 Alexa Bliss
___ 17 Joe Gacy
___ 18 CM Punk
___ 19 Nikkita Lyons
___ 20 Becky Lynch
___ 21 British Bulldog
___ 22 Karrion Kross
___ 23 "Ravishing" Rick Rude
___ 24 Charlotte Flair
___ 25 Triple H
___ 26 Baron Corbin
___ 27 Arianna Grace
___ 28 "The American Nightmare" Cody Rhodes
___ 29 Roxanne Perez
___ 30 Liv Morgan
___ 31 Bruno Sammartino
___ 32 Kevin Owens
___ 33 The Rock
___ 34 IYO SKY
___ 35 Bret "Hit Man" Hart
___ 36 Carmelo Hayes
___ 37 Ava
___ 38 Damian Priest
___ 39 Sol Ruca
___ 40 Maxxine Dupri
___ 41 Chyna
___ 42 LA Knight
___ 43 "Rowdy" Roddy Piper
___ 44 Kairi Sane
___ 45 Eddie Guerrero
___ 46 Channing "Stacks" Lorenzo
___ 47 Blair Davenport
___ 48 "Dirty" Dominik Mysterio
___ 49 Thea Hail
___ 50 Nia Jax
___ 51 Miss Elizabeth
___ 52 Randy Orton
___ 53 Sid Vicious
___ 54 Naomi
___ 55 Hulk Hogan
___ 56 Dijak
___ 57 Cora Jade
___ 58 Drew McIntyre
___ 59 Diamond Dallas Page
___ 60 Rhea Ripley
___ 61 Harley Race
___ 62 Rey Mysterio
___ 63 Terry Funk
___ 64 Scarlett
___ 65 Kurt Angle
___ 66 Ilja Dragunov
___ 67 Gigi Dolin
___ 68 Finn Balor
___ 69 Bam Bam Bigelow
___ 70 AJ Styles
___ 71 Iron Sheik
___ 72 Roman Reigns
___ 73 "Superstar" Billy Graham
___ 74 Tiffany Stratton
___ 75 Trish Stratus
___ 76 Noam Dar
___ 77 Jacy Jayne
___ 78 Gunther
___ 79 Batista
___ 80 Austin Theory
___ 81 Jake Roberts
___ 82 Solo Sikoa
___ 83 Ultimate Warrior
___ 84 Paul Heyman
___ 85 Lita
___ 86 Oro Mensah
___ 87 Kiana James
___ 88 Jey Uso
___ 89 Big Boss Man
___ 90 "The All Mighty" Bobby Lashley
___ 91 Mr. T
___ 92 Asuka
___ 93 Yokozuna
___ 94 Bron Breakker
___ 95 Stacy Keibler
___ 96 Tony D'Angelo
___ 97 Lola Vice
___ 98 The Miz
___ 99 Big John Studd
___ 100 Carlito
___ SP Bobby "The Brain" Heenan
`],
  ['All-Time Greats Signatures — Parallels: Red #/75; Gold #/10; Platinum 1/1', `
___ 1 Eric Bischoff (#/49)
___ 2 Shawn Michaels (#/35)
___ 3 Eric Bischoff (#/99)
___ 4 John Cena (#/49)
___ 5 Lita (#/99)
___ 6 Lita (#/49)
___ 7 The Honky Tonk Man (#/49)
___ 8 Dude Love (#/49)
___ 10 The Honky Tonk Man (#/35)
___ 11 Dude Love (#/99)
___ 13 DIESEL (#/35)
___ 14 DIESEL (#/49)
___ 15 Torrie Wilson (#/99)
___ 16 Torrie Wilson (#/49)
___ 17 Rikishi (#/49)
___ 19 Rikishi (#/49)
___ 20 Undertaker (#/35)
`],
  ['All-Time Greats Signatures — Parallels: Gold #/10; Platinum 1/1 (Gold tier)', `
___ 1 Kurt Angle (#/10)
___ 2 Kurt Angle (#/10)
___ 3 "Stone Cold" Steve Austin (#/10)
___ 4 "Stone Cold" Steve Austin (#/10)
___ 5 Trish Stratus (#/10)
___ 6 Trish Stratus (#/10)
___ 7 Jerry Lawler (#/10)
___ 8 Jerry Lawler (#/10)
___ 9 Bret "Hit Man" Hart (#/10)
___ 10 Bret "Hit Man" Hart (#/10)
___ 11 Kane (#/10)
___ 13 Kane (#/10)
___ 14 Booker T (#/10)
___ 15 Booker T (#/10)
___ 16 Hulk Hogan (#/10)
___ 17 Hulk Hogan (#/10)
___ 19 Eric Bischoff (#/10)
___ 20 Shawn Michaels (#/10)
`],
  ['Catchphrase Calligraphy — Parallels: Platinum 1/1', `
___ 1 John Cena (#/25)
___ 2 Undertaker (#/25)
___ 3 "Stone Cold" Steve Austin (#/25)
___ 4 Mankind (#/49)
___ 5 Roman Reigns (#/25)
`],
  ['Championship Glory — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Seth "Freakin" Rollins (#/25)
___ 2 Gunther (#/25)
___ 3 Roman Reigns (#/25)
`],
  ['Championship Lineage Triple Autographs — Serial #/10; Parallels: Platinum 1/1', `
___ 1 Kane / Shawn Michaels / "Stone Cold" Steve Austin
___ 2 Rey Mysterio / Batista / Kurt Angle
___ 3 Bret "Hit Man" Hart / Shawn Michaels / DIESEL
___ 4 Bianca Belair / Charlotte Flair / Becky Lynch
`],
  ['Dual Autographed Memorabilia — Serial #/10; Parallels: Platinum 1/1', `
___ 1 Bianca Belair / Asuka
___ 2 Luke Gallows / Karl Anderson
___ 3 Andre Chase / Duke Hudson
___ 4 Alba Fyre / Isla Dawn
___ 5 Angelo Dawkins / Montez Ford
___ 6 Gunther / Ludwig Kaiser
___ 7 Finn Balor / Damian Priest
___ 8 Chad Gable / Otis
___ 9 IYO SKY / Dakota Kai
___ 10 LA Knight / Roman Reigns
___ 11 Charlotte Flair / Rhea Ripley
___ 12 Rey Mysterio / Santos Escobar
___ 13 Tony D'Angelo / Channing "Stacks" Lorenzo
___ 14 Maxxine Dupri / Chad Gable
___ 15 Jimmy Uso / Jey Uso
___ 16 Gunther / Giovanni Vinci
___ 17 Dakota Kai / Bayley
___ 18 Veer / Sanga
___ 19 Solo Sikoa / Roman Reigns
___ 20 Sami Zayn / Kevin Owens
___ 21 "The American Nightmare" Cody Rhodes / Seth "Freakin" Rollins
___ 22 Cruz Del Toro / Joaquin Wilde
___ 23 Trick Williams / Carmelo Hayes
___ 24 Otis / Maxxine Dupri
___ 25 Ashante Adonis / B-Fab
___ 26 Giovanni Vinci / Ludwig Kaiser
___ 27 Bayley / IYO SKY
___ 28 "Dirty" Dominik Mysterio / Rhea Ripley
___ 29 "The American Nightmare" Cody Rhodes / Roman Reigns
___ 30 Liv Morgan / Raquel Rodriguez
`],
  ['Dual Autographs — Serial #/25; Parallels: Platinum 1/1', `
___ 1 Rhea Ripley / Charlotte Flair
___ 2 Eric Bischoff / "Hollywood" Hulk Hogan
___ 3 Bianca Belair / Asuka
___ 4 John Cena / Rob Van Dam
___ 5 "The American Nightmare" Cody Rhodes / Roman Reigns
___ 7 Carmelo Hayes / Bron Breakker
___ 8 Roman Reigns / Sami Zayn
___ 9 Kurt Angle / Jason Jordan
___ 10 Luke Gallows / Karl Anderson
___ 11 Kevin Owens / Sami Zayn
___ 12 The Honky Tonk Man / Brutus "The Barber" Beefcake
___ 13 Bret "Hit Man" Hart / Lex Luger
___ 14 Stacy Keibler / Torrie Wilson
___ 15 Maxxine Dupri / Otis
___ 18 Roman Reigns / Kevin Owens
___ 19 John Cena / Austin Theory
___ 20 Jimmy Garvin / Michael Hayes
___ 21 Gunther / Sheamus
___ 22 Lex Luger / Tatanka
___ 23 Johnny Gargano / Candice LeRae
___ 24 Stacy Keibler / Trish Stratus
___ 25 Cora Jade / Roxanne Perez
___ 26 Becky Lynch / Trish Stratus
___ 27 Rick Steiner / Scott Steiner
___ 28 Seth "Freakin" Rollins / Becky Lynch
___ 29 Scarlett / Karrion Kross
___ 30 Liv Morgan / Raquel Rodriguez
`],
  ['Footwear Spotlight Signatures — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Hulk Hogan (#/25)
___ 2 Bret "Hit Man" Hart (#/49)
___ 3 Shawn Michaels (#/99)
___ 4 Shawn Michaels (#/49)
___ 6 Kurt Angle (#/25)
___ 8 Bianca Belair (#/49)
___ 9 Bianca Belair (#/49)
___ 10 Becky Lynch (#/25)
___ Zelina Vega
`],
  ['Heralded Signatures — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Gerald Brisco (#/99)
___ 2 "Million Dollar Man" Ted DiBiase (#/49)
___ 3 "Million Dollar Man" Ted DiBiase (#/99)
___ 4 Jimmy Hart (#/49)
___ 5 Lita (#/99)
___ 6 Lita (#/49)
___ 7 "Hacksaw" Jim Duggan (#/49)
___ 8 Red Rooster (#/79)
___ 9 Red Rooster (#/49)
___ 10 Batista (#/79)
___ 11 Batista (#/99)
___ 12 Stacy Keibler (#/49)
___ 13 Diamond Dallas Page (#/99)
___ 14 Tugboat (#/49)
___ 15 Hulk Hogan (#/35)
___ 16 1-2-3 Kid (#/49)
___ 17 1-2-3 Kid (#/49)
___ 18 Johnny Rodz (#/79)
___ 19 Mighty Molly (#/99)
___ 20 "Stone Cold" Steve Austin (#/35)
___ 21 "Hacksaw" Jim Duggan (#/84)
___ 22 Ricky "The Dragon" Steamboat (#/99)
___ 23 Booker T (#/49)
___ 24 Terry Taylor (#/79)
___ 25 Batista (#/99)
___ 26 Rob Van Dam (#/99)
___ 27 Bret "Hit Man" Hart (#/49)
___ 28 The Godfather (#/99)
___ 29 Eric Bischoff (#/49)
___ 30 X-Pac (#/99)
___ 31 Jerry Lawler (#/99)
___ 32 Bad News Barrett (#/99)
___ 34 Norman Smiley (#/99)
___ 35 Alundra Blayze (#/99)
___ 36 Shawn Michaels (#/35)
___ 38 Titus O'Neil (#/99)
___ 39 Faarooq (#/99)
___ 40 "Cowboy" Bob Orton (#/99)
`],
  ['Immaculate Championship Runs — Parallels: Platinum 1/1', `
___ 1 Roman Reigns (#/49)
___ 2 The Honky Tonk Man (#/99)
___ 3 Drew McIntyre (#/49)
___ 4 Shawn Michaels (#/49)
___ 5 John Cena (#/99)
___ 6 John Cena (#/49)
___ 7 Bron Breakker (#/49)
___ 8 Hulk Hogan (#/25)
___ 9 Bianca Belair (#/49)
___ 10 Alexa Bliss (#/25)
___ 11 Seth "Freakin" Rollins (#/99)
___ 12 John "Bradshaw" Layfield (#/49)
___ 13 AJ Styles (#/49)
___ 14 AJ Styles (#/49)
___ 15 Bret "Hit Man" Hart (#/99)
___ 16 DIESEL (#/49)
___ 17 "Hollywood" Hulk Hogan (#/49)
___ 18 Lex Luger (#/25)
___ 19 Becky Lynch (#/99)
___ 20 Becky Lynch (#/49)
`],
  ['Immaculate Ink — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Torrie Wilson (#/49)
___ 2 Torrie Wilson (#/35)
___ 3 John Cena (#/99)
___ 4 John Cena (#/49)
___ 5 Lex Luger (#/49)
___ 6 Beth Phoenix (#/99)
___ 7 Beth Phoenix (#/49)
___ 8 Molly Holly (#/99)
___ 9 Molly Holly (#/49)
___ 10 Ivan Putski (#/99)
___ 11 Rikishi (#/49)
___ 12 Rikishi (#/99)
___ 13 Eve Torres (#/99)
___ 14 Stevie Ray (#/99)
___ 15 Stevie Ray (#/99)
___ 16 Iron Sheik (#/99)
___ 17 Iron Sheik (#/99)
___ 18 Tyson Kidd (#/99)
___ 19 Tyson Kidd (#/49)
___ 20 Kane (#/99)
___ 21 Kane (#/99)
___ 22 Michael Hayes (#/49)
___ 23 Michael Hayes (#/99)
___ 24 Bradshaw (#/99)
___ 25 Papa Shango (#/99)
___ 26 Papa Shango (#/30)
___ 27 D-Lo Brown (#/99)
___ 28 D-Lo Brown (#/99)
___ 29 Scott Steiner (#/99)
___ 30 Fit Finlay (#/99)
___ The Boogeyman
___ Jason Jordan
___ Wendi Richter
___ Kurt Angle
___ Cactus Jack
___ Brutus "The Barber" Beefcake
___ Rick Steiner
___ Dude Love
___ Sika
___ Greg "The Hammer" Valentine
___ The Hurricane
___ Jimmy Garvin
`],
  ['Immaculate Legends — Parallels: Platinum 1/1', `
___ 1 Hulk Hogan (#/49)
___ 2 Torrie Wilson (#/99)
___ 3 Kane (#/25)
___ 4 Molly Holly (#/49)
___ 5 Jimmy Hart (#/99)
___ 6 Kurt Angle (#/99)
___ 7 Brutus "The Barber" Beefcake (#/99)
___ 8 Faarooq (#/99)
___ 9 Rikishi (#/99)
___ 10 Road Dogg (#/49)
___ 11 Rob Van Dam (#/99)
___ 12 Don Muraco (#/99)
___ 13 Greg "The Hammer" Valentine (#/99)
___ 14 Alundra Blayze (#/99)
___ 15 Alundra Blayze (#/99)
`],
  ['Immaculate Milestones — Parallels: Platinum 1/1', `
___ 1 Roman Reigns (#/25)
___ 2 R-Truth (#/99)
___ 3 Gunther (#/99)
___ 4 Undertaker (#/25)
___ 5 The Honky Tonk Man (#/99)
`],
  ['Immaculate Moments — Parallels: Platinum 1/1', `
___ 1 Eric Bischoff (#/49)
___ 2 Sami Zayn (#/49)
___ 4 Finn Balor (#/49)
___ 5 Kane (#/49)
___ 6 Rhea Ripley (#/99)
___ 7 "Stone Cold" Steve Austin (#/25)
___ 8 "Hollywood" Hulk Hogan (#/25)
___ 9 1-2-3 Kid (#/99)
___ 10 "Dirty" Dominik Mysterio (#/25)
___ 12 "Stone Cold" Steve Austin (#/99)
___ 13 "The American Nightmare" Cody Rhodes (#/25)
___ 14 Shawn Michaels (#/49)
___ 15 Gunther (#/25)
___ 16 The Shockmaster (#/99)
___ 17 Seth "Freakin" Rollins (#/99)
___ 18 Bret "Hit Man" Hart (#/49)
___ 19 Kurt Angle (#/49)
___ 20 Hulk Hogan (#/99)
`],
  ['Immaculate Nicknames — Serial #/25; Parallels: Platinum 1/1', `
___ 1 Asuka
___ 2 Rhea Ripley
___ 3 Gunther
___ 4 Alexa Bliss
___ 5 Becky Lynch
___ 6 Charlotte Flair
___ 7 Bianca Belair
___ 8 John Cena
___ 9 IYO SKY
___ 10 Johnny Gargano
___ 11 Michin
___ 12 Sheamus
___ 14 Drew McIntyre
___ 15 Roman Reigns
`],
  ['Immaculate Signature Moves — Parallels: Platinum 1/1', `
___ 1 John Cena (#/25)
___ 2 Rikishi (#/49)
___ 3 Rey Mysterio (#/49)
___ 4 Bayley (#/49)
___ 5 "The American Nightmare" Cody Rhodes (#/49)
___ 8 Tommaso Ciampa (#/99)
___ 10 Mankind (#/99)
___ 13 Bron Breakker (#/99)
___ 15 Kane (#/99)
___ 17 Rob Van Dam (#/99)
___ 19 Big E (#/25)
___ 20 IYO SKY (#/25)
___ Karrion Kross
___ Scott Steiner
___ Hulk Hogan
___ Undertaker
___ Finn Balor
`],
  ['Jumbo Memorabilia — Shirt (Print runs vary per card)', `
___ 12 Blair Davenport
___ 13 Drew McIntyre
___ 14 Sheamus
___ 15 Ilja Dragunov
___ 16 Tommaso Ciampa
___ 17 Joe Gacy
___ 18 LA Knight
___ 19 Austin Theory
___ 20 Natalya
___ 21 Charlie Dempsey
___ 22 Robert Roode
___ 23 Edris Enofe
___ 24 Shinsuke Nakamura
___ 25 Alexa Bliss
___ 26 Asuka
___ 27 Josh Briggs
___ 28 Liv Morgan
___ 29 "The American Nightmare" Cody Rhodes
___ 30 Nikki Cross
___ 31 Charlotte Flair
___ 32 Roman Reigns
___ 33 Bayley
___ 34 Braun Strowman
___ 35 Isla Dawn
___ 36 Trick Williams
___ 37 Karl Anderson
___ 38 Luke Gallows
___ 39 Ava
___ 40 Nikkita Lyons
___ 41 Cora Jade
___ 42 Roxanne Perez
___ 43 Elton Prince
___ 44 Shotzi
___ 45 Ivy Nile
___ 46 Valentina Feroz
___ 47 Zoey Stark
___ 48 Malik Blade
___ 49 Brooks Jensen
___ 50 Omos
___ 51 Dakota Kai
___ 52 Sami Zayn
___ 53 Fallon Henley
___ 54 Sol Ruca
___ 55 Becky Lynch
___ 56 Bron Breakker
___ 57 Karrion Kross
___ 58 Maxxine Dupri
___ 59 Pete Dunne
___ 60 Otis
___ 61 Damian Priest
___ 62 Sanga
___ 63 Finn Balor
___ 64 Solo Sikoa
___ 65 IYO SKY
___ 66 Veer
___ 67 Kayden Carter
___ 68 Angel
___ 69 Cameron Grimes
___ 70 Raquel Rodriguez
___ 71 Dante Chen
___ 72 Scarlett
___ 73 Gigi Dolin
___ 74 Tamina
___ 75 JD McDonagh
___ 76 Wendy Choo
___ 77 Bianca Belair
___ 78 Meiko Satomura
___ 79 Carmella
___ 80 Rey Mysterio
___ 81 Dijak
___ 82 Scrypts
___ 83 Giovanni Vinci
___ 84 The Miz
___ 85 Jey Uso
___ 86 Wolfgang
___ 87 Kevin Owens
___ 88 Montez Ford
___ 89 AJ Styles
___ 90 Apollo Crews
___ 91 "Dirty" Dominik Mysterio
___ 92 Seth "Freakin" Rollins
___ 93 Grayson Waller
___ 94 Thea Hail
___ 95 Jimmy Uso
___ 96 Zelina Vega
___ 97 Kit Wilson
___ 98 Big E
___ 99 Carmelo Hayes
___ 100 Rhea Ripley
___ Chad Gable
___ Ricochet
___ Akira Tozawa
___ Ashante Adonis
___ Gunther
___ Tiffany Stratton
___ Joaquin Wilde
___ Kofi Kingston
___ "The All Mighty" Bobby Lashley
___ MVP
___ Baron Corbin
`],
  ['Jumbo Memorabilia — Specialty (Print runs vary per card)', `
___ 2 Tiffany Stratton
___ 6 "The All Mighty" Bobby Lashley
___ 9 LA Knight
___ 18 Liv Morgan
___ 28 Sami Zayn
___ 52 Maxxine Dupri
___ 58 IYO SKY
___ 65 Montez Ford
___ 88 Seth "Freakin" Rollins
___ 92 Rhea Ripley
___ 100 "The All Mighty" Bobby Lashley
___ Ricochet
`],
  ['Jumbo Ring Canvas — Serial #/99', `
___ 1 Otis
___ 2 Solo Sikoa
___ 3 Rhea Ripley
___ 4 "The American Nightmare" Cody Rhodes
___ 5 Roman Reigns
___ 6 AJ Styles
___ 7 Jey Uso
___ 8 Bianca Belair
___ 9 Becky Lynch
___ 10 Bronson Reed
___ 11 Omos
___ 12 Jey Uso
___ 13 Kofi Kingston
___ 14 "The American Nightmare" Cody Rhodes
___ 15 Bianca Belair
___ 16 Charlotte Flair
___ 17 Drew McIntyre
___ 18 IYO SKY
___ 19 Charlotte Flair
___ 21 Rhea Ripley
___ 22 Sami Zayn
___ 23 Jimmy Uso
___ 24 Xavier Woods
___ 25 Seth "Freakin" Rollins
___ 26 Liv Morgan
___ 27 Baron Corbin
___ 28 Randy Orton
___ 29 Seth "Freakin" Rollins
___ 30 Angelo Dawkins
___ 31 Zelina Vega
___ 32 Naomi
___ 33 Kevin Owens
___ 34 Austin Theory
___ 35 Omos
___ 36 Jimmy Uso
___ 37 Roman Reigns
___ 38 "Stone Cold" Steve Austin
___ 39 Omos
___ 40 Montez Ford
___ 41 Damian Priest
___ 42 Liv Morgan
___ 43 Sami Zayn
___ 44 Roman Reigns
___ 45 "The All Mighty" Bobby Lashley
___ 46 Jey Uso
___ 47 Jimmy Uso
___ 48 "The American Nightmare" Cody Rhodes
___ 49 Austin Theory
___ 50 Chad Gable
___ 100 "The All Mighty" Bobby Lashley
`],
  ['Main Event Dual Mat Autographs — Serial #/10; Parallels: Platinum 1/1', `
___ 1 "Stone Cold" Steve Austin / Kevin Owens
___ 3 Becky Lynch / Bianca Belair
___ 5 "The American Nightmare" Cody Rhodes / Seth "Freakin" Rollins
___ 6 Gunther / LA Knight
___ 7 Jey Uso / Roman Reigns
___ 8 IYO SKY / Bianca Belair
___ 9 Finn Balor / Seth "Freakin" Rollins
`],
  ['Marks of Greatness — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Becky Lynch (#/49)
___ 2 "Hacksaw" Jim Duggan (#/99)
___ 3 Lita (#/49)
___ 4 Torrie Wilson (#/49)
___ 5 Tyson Kidd (#/99)
___ 6 Mighty Molly (#/99)
___ 7 Jason Jordan (#/99)
___ 8 Faarooq (#/99)
___ 10 Greg "The Hammer" Valentine (#/99)
___ 11 Bianca Belair (#/49)
___ 12 Michael Hayes (#/99)
___ 13 Trish Stratus (#/49)
___ 15 Norman Smiley (#/99)
___ 16 Jimmy Hart (#/99)
___ 18 Rikishi (#/49)
___ 19 Diamond Dallas Page (#/49)
___ 20 Alundra Blayze (#/99)
___ 21 Charlotte Flair (#/49)
___ 22 Papa Shango (#/99)
___ 23 Albert (#/99)
___ 24 Hulk Hogan (#/35)
___ 25 Tyler Breeze (#/99)
___ 26 Kurt Angle (#/99)
___ 28 Road Dogg (#/99)
___ 29 Big E (#/49)
___ 30 Jerry Lawler (#/99)
___ 31 Alexa Bliss (#/49)
___ 32 Booker T (#/49)
___ 33 Jimmy Garvin (#/99)
___ 34 Kane (#/49)
___ 35 Wendi Richter (#/99)
___ 36 Brutus "The Barber" Beefcake (#/99)
___ 37 Roman Reigns (#/35)
___ 38 Don Muraco (#/99)
___ 39 "The American Nightmare" Cody Rhodes (#/49)
___ 40 1-2-3 Kid (#/99)
`],
  ['Memorabilia Autographs — Base #/99; Parallels: Red #/25; Acetate #/8; Gold #/10; Green #/5; Platinum 1/1', `
___ 1 Sami Zayn
___ 2 "Dirty" Dominik Mysterio
___ 3 Grayson Waller
___ 4 "The All Mighty" Bobby Lashley
___ 5 Kevin Owens
___ 6 Sol Ruca
___ 7 Rey Mysterio
___ 8 Shinsuke Nakamura
___ 9 Seth "Freakin" Rollins
___ 10 Bron Breakker
___ 11 Becky Lynch
___ 12 Drew McIntyre (#/49)
___ 14 Gunther
___ 15 Ava
___ 16 Kofi Kingston
___ 17 Thea Hail
___ 18 Rhea Ripley (#/49)
___ 19 Austin Theory
___ 20 Sheamus
___ 21 Carmelo Hayes
___ 22 LA Knight
___ 23 Baron Corbin
___ 24 Jey Uso
___ 26 Liv Morgan
___ 27 Alexa Bliss
___ 28 Roman Reigns (#/35)
___ 29 Bayley
___ 30 Solo Sikoa
___ 31 Cora Jade
___ 32 Roxanne Perez
___ 33 Candice LeRae
___ 34 Jimmy Uso
___ 35 "The American Nightmare" Cody Rhodes (#/49)
___ 36 Charlotte Flair
___ 37 Asuka
___ 38 Gigi Dolin
___ 39 Bianca Belair (#/49)
___ 40 The Miz
___ 41 Damian Priest
___ 42 Tiffany Stratton
___ 43 Finn Balor
___ 44 Karrion Kross
___ 45 AJ Styles
___ 46 Nikkita Lyons
___ 47 Shotzi
___ 48 Scarlett
___ 49 Braun Strowman
___ 50 Xavier Woods
___ SP Angelo Dawkins
`],
  ['Modern Marks — Parallels: Gold #/10; Platinum 1/1', `
___ 1 Kit Wilson (#/99)
___ 4 Paul Heyman (#/99)
___ 6 Dakota Kai (#/99)
___ 9 Karrion Kross (#/99)
___ 12 Asuka (#/99)
___ 13 Becky Lynch (#/49)
___ 15 Rey Mysterio (#/49)
___ 16 Pete Dunne (#/49)
___ 17 Roman Reigns (#/49)
___ 18 Drew McIntyre (#/35)
___ 19 Xavier Woods (#/49)
___ 20 Kevin Owens (#/99)
___ 22 Austin Theory (#/49)
___ 23 Nikkita Lyons (#/99)
___ 24 Big E (#/99)
___ 25 Rhea Ripley (#/49)
___ 26 Finn Balor (#/99)
___ 29 Zelina Vega (#/49)
___ 30 IYO SKY (#/99)
`],
  ['Past and Present Signatures — Parallels: Gold #/10; Platinum 1/1 (dual-image cards)', `
___ 1 Big E (#/49)
___ 2 "The American Nightmare" Cody Rhodes (#/49)
___ 4 Roman Reigns (#/35)
___ 5 Damian Priest (#/99)
___ 6 Becky Lynch (#/49)
___ 7 Bianca Belair (#/49)
___ 8 Charlotte Flair (#/49)
___ 9 Drew McIntyre (#/49)
___ 10 Finn Balor (#/49)
___ 11 Rey Mysterio (#/49)
___ 12 Seth "Freakin" Rollins (#/49)
___ 13 "The All Mighty" Bobby Lashley (#/49)
___ 14 AJ Styles (#/49)
___ 15 Alexa Bliss (#/49)
___ 16 Bayley (#/49)
___ 17 Braun Strowman (#/49)
___ 18 Jey Uso (#/49)
___ 19 Jimmy Uso (#/49)
___ 20 Kevin Owens (#/49)
___ 21 Sami Zayn (#/49)
___ 22 Sheamus (#/49)
___ 23 The Miz (#/49)
___ 24 Baron Corbin (#/99)
___ 25 Carmella (#/99)
___ 26 Otis (#/99)
___ 27 Jinder Mahal (#/99)
___ 28 Karrion Kross (#/99)
___ 29 Kofi Kingston (#/99)
___ 30 Liv Morgan (#/99)
___ 31 MVP (#/99)
___ 32 Rhea Ripley (#/99)
___ 33 Zelina Vega (#/99)
___ 34 Natalya (#/99)
___ 35 Johnny Gargano (#/99)
___ 36 Tommaso Ciampa (#/99)
___ 37 Luke Gallows (#/99)
___ 38 Tamina (#/99)
___ 39 "Dirty" Dominik Mysterio (#/99)
___ 40 Maryse (#/99)
`],
  ['Patch Autographs Booklets — Parallels: Gold #/10; Platinum 1/1 (print runs vary)', `
___ 1 Charlotte Flair
___ 2 Solo Sikoa
___ 3 Jey Uso
___ 4 Dakota Kai
___ 5 Sami Zayn
___ 6 Austin Theory
___ 7 "The All Mighty" Bobby Lashley
___ 8 Gunther
___ 9 Bayley
___ 10 Omos
___ 11 Drew McIntyre
___ 12 Scarlett
___ 13 Kevin Owens
___ 14 Bron Breakker
___ 15 Seth "Freakin" Rollins
___ 16 Karrion Kross
___ 17 "The American Nightmare" Cody Rhodes
___ 18 Kofi Kingston
___ 19 Becky Lynch
___ 20 Rhea Ripley
___ 21 Grayson Waller
___ 22 Raquel Rodriguez
___ 23 Jimmy Uso
___ 24 Carmelo Hayes
___ 25 Sheamus
___ 26 Damian Priest
___ 27 AJ Styles
___ 28 Liv Morgan
___ 29 Bianca Belair
___ 30 Shinsuke Nakamura
___ 31 Finn Balor
___ 32 LA Knight
___ 33 Rey Mysterio
___ 34 Tiffany Stratton
___ 35 The Miz
___ 36 "Dirty" Dominik Mysterio
___ 37 Asuka
___ 38 Montez Ford
___ 39 Braun Strowman
___ 40 Shotzi
___ 41 Otis
___ 42 IYO SKY
`],
  ['Premium Memorabilia Autographs — Base #/99; Parallels: Acetate #/8; Gold #/10; Green #/5; Platinum 1/1', `
___ 1 Kevin Owens
___ 2 Raquel Rodriguez
___ 3 Rey Mysterio
___ 4 Zoey Stark
___ 5 Seth "Freakin" Rollins
___ 6 IYO SKY
___ 7 Sami Zayn
___ 8 "Dirty" Dominik Mysterio
___ 9 Grayson Waller
___ 10 Montez Ford
___ 11 Kofi Kingston
___ 13 Sonya Deville
___ 14 Rhea Ripley (#/49)
___ 15 Austin Theory
___ 16 Sheamus
___ 17 Bron Breakker
___ 18 Becky Lynch (#/49)
___ 19 Drew McIntyre
___ 20 Gunther
___ 21 Natalya
___ 22 Liv Morgan
___ 23 Alexa Bliss
___ 24 Roman Reigns (#/35)
___ 25 Bayley
___ 26 Solo Sikoa
___ 27 Carmelo Hayes
___ 28 LA Knight
___ 29 Johnny Gargano
___ 30 Jey Uso
___ 31 "The American Nightmare" Cody Rhodes (#/49)
___ 32 Tommaso Ciampa
___ 33 Asuka
___ 34 Tony D'Angelo
___ 35 Bianca Belair (#/49)
___ 36 The Miz
___ 37 Cora Jade
___ 38 Roxanne Perez
___ 39 Otis
___ 40 Jimmy Uso
___ 41 AJ Styles
___ 42 Nikkita Lyons
___ 43 Zelina Vega
___ 44 Scarlett
___ 45 Braun Strowman
___ 46 Xavier Woods
___ 47 Damian Priest
___ 48 Tiffany Stratton
___ 49 Finn Balor
___ 50 Karrion Kross
___ SP "The All Mighty" Bobby Lashley
`],
]));

// ── 2023 PANINI WWE IMPECCABLE ────────────────────────────────────────────────
setsHtml.push(makeSet('imp23', '2023', '2023 Panini Impeccable WWE', [
  ['Base Set — Serial #/99; Parallels: Silver #/49; Gold #/35; Holo Silver #/25; Holo Gold #/10; Amethyst #/5; Platinum 1/1', `
___ 1 Roman Reigns
___ 2 Seth "Freakin" Rollins
___ 3 Asuka
___ 4 Rhea Ripley
___ 5 Gunther
___ 6 Austin Theory
___ 7 Sami Zayn
___ 8 Kevin Owens
___ 9 Alexa Bliss
___ 10 Liv Morgan
___ 11 Carmelo Hayes
___ 12 Tiffany Stratton
___ 13 Wes Lee
___ 14 AJ Styles
___ 17 Damian Priest
___ 18 "Dirty" Dominik Mysterio
___ 19 Finn Balor
___ 20 Eddie Guerrero
___ 21 The Sandman
___ 22 Dragon Lee
___ 23 Charlotte Flair
___ 25 Jey Uso
___ 26 CM Punk
___ 27 LA Knight
___ 28 Rey Mysterio
___ 30 Sheamus
___ 31 The Miz
___ 33 Shinsuke Nakamura
___ 34 Becky Lynch
___ 35 "Cowboy" Bob Orton
___ 37 The Rock
___ 38 "Stone Cold" Steve Austin
___ 39 "Rowdy" Roddy Piper
___ 40 "The American Nightmare" Cody Rhodes
___ 41 Drew McIntyre
___ 43 Dexter Lumis
___ 44 Erik
___ 46 John Cena
___ 47 Baron Corbin
___ 48 Triple H
___ 49 Kofi Kingston
___ 51 Big E
___ 52 Kairi Sane
___ 53 Karrion Kross
___ 54 Katana Chance
___ 55 Kayden Carter
___ 57 Luke Gallows
___ 58 Karl Anderson
___ 59 Dijak
___ 60 Elton Prince
___ 61 Kit Wilson
___ 63 "The All Mighty" Bobby Lashley
___ 64 Gigi Dolin
___ 66 Solo Sikoa
___ 69 Dakota Kai
___ 71 Otis
___ 75 Robert Roode
___ 76 Sonya Deville
___ 77 Booker T
___ 78 Rob Van Dam
___ 79 Shotzi
___ 80 R-Truth
___ 82 Randy Orton
___ 83 Red Rooster
___ 84 Shayna Baszler
___ 86 Bron Breakker
___ 87 Bronson Reed
___ 88 Ricochet
___ 89 Braun Strowman
___ 90 Bayley
___ 91 Angelo Dawkins
___ 95 Rikishi
___ 96 Hulk Hogan
___ 97 Andre The Giant
___ 99 Natalya
___ 100 Jacy Jayne
`],
  ['Elegance Memorabilia Autographs — Base #/75; Parallels: Red FOTL #/25; Gold #/10; Amethyst #/5; Platinum 1/1', `
___ 4 Zoey Stark
___ 6 Austin Theory
___ 9 Drew McIntyre
___ 11 Braun Strowman
___ 12 Cora Jade
___ 14 AJ Styles
___ 15 Kofi Kingston
___ 17 Roman Reigns
___ 18 "Dirty" Dominik Mysterio
___ 19 Finn Balor
___ 20 Carmelo Hayes
___ 23 Damian Priest
___ 25 Alba Fyre
___ 26 Rhea Ripley
___ 29 Rey Mysterio
___ 30 Raquel Rodriguez
___ 32 Grayson Waller
___ 36 Ricochet
___ 37 "The American Nightmare" Cody Rhodes
___ 39 Seth "Freakin" Rollins
___ 41 Kevin Owens
___ 42 Jacy Jayne
___ 46 Shayna Baszler
___ 47 Becky Lynch
___ 50 Zelina Vega
___ 51 Sami Zayn
___ 52 JD McDonagh
___ 53 Bron Breakker
___ 56 Shinsuke Nakamura
___ 57 Bianca Belair
___ 58 Dakota Kai
___ 59 Alexa Bliss
___ 61 Sheamus
___ 62 Omos
___ 63 Gunther
___ 68 Candice LeRae
___ 69 Asuka
___ 71 The Miz
___ 72 Katana Chance
___ 73 Karl Anderson
___ 76 Sonya Deville
___ 77 Charlotte Flair
___ 79 Bayley
`],
  ['Elegance Jumbo Memorabilia Autographs — Base #/49; Parallels: Silver #/25; Gold #/10; Amethyst #/15; Red FOTL #/4; Platinum 1/1', `
___ 1 "The All Mighty" Bobby Lashley
___ 2 Kevin Owens
___ 3 Asuka
___ 4 Becky Lynch
___ 5 Braun Strowman
___ 7 Drew McIntyre
___ 9 Rey Mysterio
___ 12 "The American Nightmare" Cody Rhodes
___ 13 Bayley
___ 14 Bianca Belair
___ 15 Sami Zayn
___ 16 Charlotte Flair
___ 17 Finn Balor
___ 18 Roman Reigns
___ 19 Seth "Freakin" Rollins
`],
  ['Stainless Stars Autographs — Base #/99; Parallels: Gold #/10; Platinum 1/1', `
___ 3 Roxanne Perez
___ 6 IYO SKY
___ 7 Katana Chance
___ 9 Kofi Kingston
___ 10 Bron Breakker
___ 11 Carmelo Hayes
___ 11 Raquel Rodriguez
___ 12 Cora Jade
___ 13 Scarlett
___ 16 Jacy Jayne
___ 17 Kevin Owens
___ 18 "The All Mighty" Bobby Lashley
___ 21 Rhea Ripley
___ 22 Dakota Kai
___ 23 Sheamus
___ 24 Grayson Waller
`],
  ['Stainless Stars — Base #/75; Parallels: Orange #/25; Purple #/49; Platinum 1/1', `
___ 1 Damian Priest
___ 2 "The American Nightmare" Cody Rhodes
___ 3 Becky Lynch
___ 4 The Rock
___ 5 Batista
___ 7 Shawn Michaels
___ 9 Andre The Giant
___ 11 "Rowdy" Roddy Piper
___ 12 LA Knight
___ 13 Bianca Belair
___ 14 "Stone Cold" Steve Austin
___ 17 Razor Ramon
___ 19 Chyna
___ 20 Roman Reigns
___ 21 Undertaker
___ 22 Alexa Bliss
___ 23 Charlotte Flair
___ 57 Mankind
___ 82 Randy Orton
`],
  ['Illustrious Ink — Base #/75; Parallels: Silver #/25; Gold #/10; Platinum 1/1', `
___ 1 Rob Van Dam
___ 2 Brutus Beefcake
___ 4 Don Muraco
___ 6 The Honky Tonk Man
___ 7 Bradshaw
___ 10 Batista
___ 11 Scott Steiner
___ 12 Mighty Molly
___ 13 IRS
___ 14 Eric Bischoff
___ 15 Wade Barrett
___ 17 Rick Steiner
___ 18 "Stone Cold" Steve Austin
___ 19 Lita
___ 20 Booker T
___ 21 Jimmy Hart
___ 21 Shawn Michaels
___ 21 Undertaker
___ 22 D-Lo Brown
___ 24 Faarooq
___ 24 Michael Hayes
___ 27 Road Dogg
___ 28 Greg "The Hammer" Valentine
___ 29 Jerry Lawler
`],
  ['Immortal Ink — Base varies per card; Parallels: Gold #/10; Platinum 1/1', `
___ 3 Stan Hansen
___ 4 Bob Backlund
___ 5 Dory Funk Jr.
___ 6 Rockin' Robin
___ 10 Thrasher
___ 11 Scotty 2 Hotty
___ 12 The Sandman
___ 14 Theodore Long
___ 15 Haku
___ 16 Juventud Guerrera
___ 17 Jerry Sags
___ 18 Leilani Kai
___ 22 Tito Santana
___ 24 "Stone Cold" Steve Austin
___ 27 Brian Knobs
___ 30 Stevie Richards
___ 36 Tony Atlas
___ 76 Spike Dudley
___ 79 Simon Dean
___ 92 Mosh
`],
  ['Indelible Ink — Base #/75; Parallels: Silver #/25; Gold #/10; Platinum 1/1', `
___ 3 Beth Phoenix
___ 4 Bob Backlund
___ 5 Bret "Hit Man" Hart
___ 7 DIESEL
___ 8 Dory Funk Jr.
___ 9 Dude Love
___ 10 Batista
___ 11 Haku
___ 12 Tony Atlas
___ 15 Jerry Sags
___ 16 Juventud Guerrera
___ 17 Kane
___ 18 Kurt Angle
___ 19 Leilani Kai
___ 22 Ricky "The Dragon" Steamboat
___ 23 Rikishi
___ 24 Rockin' Robin
___ 25 Scotty 2 Hotty
___ 30 Stevie Richards
___ 31 Theodore Long
___ 33 The Sandman
___ 34 Thrasher
___ 35 Tito Santana
___ 35 Tom Prichard
___ 50 Spike Dudley
___ 92 Mosh
___ 96 Hulk Hogan
`],
  ['Watercolor Signatures — Base #/75; Parallels: Silver #/25; Gold #/10; Amethyst #/5; Platinum 1/1', `
___ 3 Elton Prince
___ 5 Sanga
___ 6 Charlotte Flair
___ 7 Damon Kemp
___ 8 MVP
___ 14 Roman Reigns
___ 15 Wes Lee
___ 15 Wolfgang
___ 16 Alexa Bliss
___ 17 Edris Enofe
___ 18 Veer
___ 20 Dexter Lumis
___ 23 Kayden Carter
___ 24 Becky Lynch
___ 24 Joe Coffey
___ 25 Andre Chase
___ 26 Apollo Crews
___ 26 Axiom
___ 27 Fallon Henley
___ 32 Boa
___ 34 Bianca Belair
___ 35 Channing "Stacks" Lorenzo
___ 35 Liv Morgan
___ 36 Tommaso Ciampa
___ 40 LA Knight
___ 68 Cameron Grimes
`],
  ['Canvas Creations Signatures — Base #/75; Parallels: Silver #/25; Gold #/10; Amethyst #/5; Platinum 1/1', `
___ 1 Amari Miller
___ 3 Blair Davenport
___ 5 Cruz Del Toro
___ 9 Ivy Nile
___ 11 Angelo Dawkins
___ 15 Dante Chen
___ 16 Scrypts
___ 17 Erik
___ 18 Valhalla
___ 20 Kit Wilson
___ 21 Ashante Adonis
___ 24 Ridge Holland
___ 25 Duke Hudson
___ 28 Wendy Choo
___ 30 Ludwig Kaiser
___ 64 Giovanni Vinci
`],
  ['Impeccable Hall of Fame Signatures — Print run varies per card; Parallels: Gold #/10; Platinum 1/1', `
___ 1 Bob Backlund
___ 2 Ricky "The Dragon" Steamboat
___ 3 Don Muraco
___ 5 The Honky Tonk Man
___ 6 Wendi Richter
___ 7 Kevin Nash
___ 8 Kurt Angle
___ 11 Brutus Beefcake
___ 13 Eric Bischoff
___ 14 Tito Santana
___ 26 Stan Hansen
`],
  ['Impeccable Returns Signatures — Serial #/22; Parallels: Gold #/10; Platinum 1/1', `
___ 1 "The American Nightmare" Cody Rhodes
___ 3 Karrion Kross
___ 4 Braun Strowman
___ 5 "Stone Cold" Steve Austin
`],
  ['Impeccable SummerSlam Signatures — Print run varies per card', `
___ 1 Rey Mysterio
___ 2 Lex Luger
___ 3 Alundra Blayze
___ 4 Shawn Michaels
___ 5 Roman Reigns
___ 7 Rob Van Dam
___ 10 Bret "Hit Man" Hart
___ 12 Jerry Lawler
___ 19 Batista
___ 21 Undertaker
___ 22 Drew McIntyre
___ 23 Becky Lynch
___ 25 Charlotte Flair
___ 46 John Cena
`],
  ['Impeccable Tag Teams Dual Signatures — Serial #/25; Parallels: Gold #/10; Platinum 1/1', `
___ 1 Thrasher / Mosh
___ 2 Jerry Sags / Brian Knobs
___ 3 Rikishi / Scotty 2 Hotty
___ 4 "Million Dollar Man" Ted DiBiase / IRS
___ 5 Booker T / Stevie Ray
___ 6 Shawn Michaels / DIESEL
___ 7 Juventud Guerrera / Rey Mysterio
`],
  ['Impeccable Jumbo Memorabilia — Serial #/25; Parallels: Gold #/10; Platinum 1/1', `
___ 1 Rhea Ripley
___ 2 LA Knight
___ 4 Bron Breakker
___ 5 Alexa Bliss
___ 6 Cora Jade
___ 7 Bianca Belair
___ 9 "The American Nightmare" Cody Rhodes
___ 11 Roman Reigns
___ 12 Gunther
___ 15 Becky Lynch
___ 17 Charlotte Flair
___ 18 "Dirty" Dominik Mysterio
___ 20 IYO SKY
___ 21 Jey Uso
___ 29 Montez Ford
___ 49 AJ Styles
___ 69 Asuka
`],
  ['Gold WWE Logo — 1/1 (current superstars)', `
___ 2 CM Punk
___ 3 Braun Strowman
___ 5 Kofi Kingston
___ 6 Austin Theory
___ 7 Becky Lynch
___ 9 Alexa Bliss
___ 10 Roxanne Perez
___ 12 LA Knight
___ 13 Tiffany Stratton
___ 14 Wes Lee
___ 15 Sheamus
___ 17 Charlotte Flair
___ 18 Gunther
___ 19 Finn Balor
___ 20 Otis
___ 22 Bray Wyatt
___ 24 The Miz
___ 25 Rhea Ripley
___ 27 Rey Mysterio
___ 31 "The American Nightmare" Cody Rhodes
___ 33 Damian Priest
___ 34 Sami Zayn
___ 35 "The All Mighty" Bobby Lashley
___ 36 Roman Reigns
___ 40 Kevin Owens
___ 68 Candice LeRae
___ 82 Randy Orton
`],
  ['Silver WWE Logo — Serial #/35 (current superstars)', `
___ 2 CM Punk
___ 3 Ava
___ 3 Braun Strowman
___ 5 Kofi Kingston
___ 6 Baron Corbin
___ 7 Becky Lynch
___ 9 Alexa Bliss
___ 10 Roxanne Perez
___ 12 LA Knight
___ 13 Tiffany Stratton
___ 14 Wes Lee
___ 15 Sheamus
___ 15 Solo Sikoa
___ 17 Charlotte Flair
___ 18 Gunther
___ 21 Asuka
___ 22 Bray Wyatt
___ 24 The Miz
___ 25 Rhea Ripley
___ 27 Rey Mysterio
___ 31 "The American Nightmare" Cody Rhodes
___ 33 Damian Priest
___ 34 Sami Zayn
___ 35 "The All Mighty" Bobby Lashley
___ 36 Roman Reigns
___ 40 Kevin Owens
___ 49 AJ Styles
___ 99 Natalya
`],
  ['Gold WWE Legends Logo — 1/1 (legends)', `
___ 1 Batista
___ 2 Lex Luger
___ 3 "Rowdy" Roddy Piper
___ 6 Dusty Rhodes
___ 7 Chyna
___ 8 Eddie Guerrero
___ 12 Molly Holly
___ 15 The Rock
___ 16 Eric Bischoff
___ 17 Diamond Dallas Page
___ 19 Dude Love
___ 20 Jerry Lawler
___ 21 X-Pac
___ 23 Kevin Nash
___ 25 Shawn Michaels
___ 26 Vader
___ 28 Rob Van Dam
___ 30 Paul Bearer
___ 32 The Hurricane
___ 33 Booker T
___ 36 The Honky Tonk Man
___ 39 Ron Simmons
___ 40 Lita
___ 50 Stacy Keibler
___ 96 Hulk Hogan
`],
  ['Silver WWE Legends Logo — Serial #/35 (legends)', `
___ 1 Batista
___ 2 Lex Luger
___ 3 "Rowdy" Roddy Piper
___ 6 Dusty Rhodes
___ 7 Chyna
___ 8 Eddie Guerrero
___ 12 Michael Hayes
___ 13 IRS
___ 15 The Rock
___ 16 Eric Bischoff
___ 17 Diamond Dallas Page
___ 19 Dude Love
___ 20 Jerry Lawler
___ 23 Kevin Nash
___ 24 Trish Stratus
___ 25 Shawn Michaels
___ 26 Vader
___ 28 Rob Van Dam
___ 32 The Hurricane
___ 33 Booker T
___ 35 "Cowboy" Bob Orton
___ 36 The Honky Tonk Man
___ 37 The Godfather
___ 39 Ron Simmons
___ 50 Yokozuna
___ 96 Hulk Hogan
`],
]));

// ── 2023 WWE PANINI PRIZM ─────────────────────────────────────────────────────
setsHtml.push(makeSet('prz23', '2023', '2023 WWE Panini Prizm Trading Cards', [
  ['Base Set #1–100 (Horizontal) — Parallels: Silver; Red #/299; Blue #/199; Purple #/149; Orange #/99; Teal #/49; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 "The American Nightmare" Cody Rhodes
___ 2 Edris Enofe
___ 3 Luke Gallows
___ 4 Jagger Reid
___ 5 Kofi Kingston
___ 6 "The All Mighty" Bobby Lashley
___ 7 Mustafa Ali
___ 8 Batista
___ 9 Rob Van Dam
___ 10 Karl Anderson
___ 11 Tamina
___ 12 Elton Prince
___ 13 Von Wagner
___ 14 Jerry Lawler
___ 15 Liv Morgan
___ 16 Solo Sikoa
___ 17 Natalya
___ 18 Becky Lynch
___ 19 "Rowdy" Roddy Piper
___ 20 Tommaso Ciampa
___ 21 Candice LeRae
___ 22 Fallon Henley
___ 23 Wendy Choo
___ 24 Jimmy Uso
___ 25 Ludwig Kaiser
___ 26 Alba Fyre
___ 27 Nikki Cross
___ 28 Bianca Belair
___ 29 Roman Reigns
___ 30 Cora Jade
___ 31 The Miz
___ 32 Gable Steveson
___ 33 Wes Lee
___ 34 Joaquin Wilde
___ 35 "Macho Man" Randy Savage
___ 36 Aliyah
___ 37 Noam Dar
___ 38 Blair Davenport
___ 39 Roxanne Perez
___ 40 Dakota Kai
___ 41 The Rock
___ 42 Giovanni Vinci
___ 43 Xavier Woods
___ 44 Joe Gacy
___ 45 Malik Blade
___ 46 Andre Chase
___ 47 Omos
___ 48 Scott Steiner
___ 49 Sami Zayn
___ 50 Damon Kemp
___ 51 Tiffany Stratton
___ 52 Grayson Waller
___ 53 X-Pac
___ 54 John Cena
___ 55 Mankind
___ 56 Ava Raine
___ 57 Zelina Vega
___ 58 Bret "Hit Man" Hart
___ 59 Santos Escobar
___ 60 Dante Chen
___ 61 Top Dolla
___ 62 Baron Corbin
___ 63 Yokozuna
___ 64 Josh Briggs
___ 65 Mansoor
___ 66 Aoife Valkyrie
___ 67 Razor Ramon
___ 68 Brooks Jensen
___ 69 Scarlett
___ 70 Dolph Ziggler
___ 71 Triple H
___ 72 Ilja Dragunov
___ 73 Yulisa Leon
___ 74 Mia Yim
___ 75 Matt Riddle
___ 76 Arianna Grace
___ 77 Emma
___ 78 Butch
___ 79 Shawn Michaels
___ 80 Doudrop
___ 81 Tyler Bate
___ 82 Isla Dawn
___ 83 Zoey Stark
___ 84 Katana Chance
___ 85 Maxxine Dupri
___ 86 Ashante "Thee" Adonis
___ 87 Rick Boogs
___ 88 Carmella
___ 89 Sheamus
___ 90 Duke Hudson
___ 91 Vader
___ 92 Ivy Nile
___ 93 Wolfgang
___ 94 Kevin Owens
___ 95 Montez Ford
___ 96 Austin Theory
___ 97 Ricochet
___ 98 Cedric Alexander
___ 99 Shotzi
___ 100 Edge
`],
  ['Base Set #101–200 (Vertical) — Parallels: Silver; Red #/299; Blue #/199; Purple #/149; Orange #/99; Teal #/49; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 101 B-Fab
___ 102 Tatum Paxley
___ 103 Chad Gable
___ 104 Quincy Elliot
___ 105 Sol Ruca
___ 106 Humberto
___ 107 R-Truth
___ 108 Karrion Kross
___ 109 "Mr. Perfect" Curt Hennig
___ 110 Joe Coffey
___ 111 Bayley
___ 112 Rey Mysterio
___ 113 Channing "Stacks" Lorenzo
___ 114 Terry Funk
___ 115 Eliza Alexander
___ 116 Indi Hartwell
___ 117 Sanga
___ 118 Kayden Carter
___ 119 AJ Styles
___ 120 LA Knight
___ 121 Big E
___ 122 Thea Hail
___ 123 Charlotte Flair
___ 124 Meiko Satomura
___ 125 Erik
___ 126 Ivar
___ 127 Sarray
___ 128 Kevin Nash
___ 129 Akira Tozawa
___ 130 Mr. T
___ 131 Boa
___ 132 Tony D'Angelo
___ 133 Cruz Del Toro
___ 134 Rhea Ripley
___ 135 Elias
___ 136 Iyo Sky
___ 137 Seth "Freakin" Rollins
___ 138 Kiana James
___ 139 Alexa Bliss
___ 140 Mr. Stone
___ 141 Braun Strowman
___ 142 Trick Williams
___ 143 Damian Priest
___ 144 Ricky "The Dragon" Steamboat
___ 145 Finn Balor
___ 146 Jacy Jayne
___ 147 Shayna Baszler
___ 148 Kit Wilson
___ 149 Amari Miller
___ 150 MVP
___ 151 Brock Lesnar
___ 152 Typhoon
___ 153 Dana Brooke
___ 154 Ridge Holland
___ 155 Gigi Dolin
___ 156 JD McDonagh
___ 157 Bray Wyatt
___ 158 Lacey Evans
___ 159 Andre The Giant
___ 160 Nathan Frazer
___ 161 Bron Breakker
___ 162 Ultimate Warrior
___ 163 Dexter Lumis
___ 164 Rip Fowler
___ 165 The Godfather
___ 166 Jey Uso
___ 167 Shinsuke Nakamura
___ 168 Mace
___ 169 Angelo Dawkins
___ 170 Nikkita Lyons
___ 171 Brutus Creed
___ 172 Undertaker
___ 173 Dominik Mysterio
___ 174 Robert Roode
___ 175 Goldberg
___ 176 Jinder Mahal
___ 177 Bubba Ray Dudley
___ 178 Madcap Moss
___ 179 Apollo Crews
___ 180 Oro Mensah
___ 181 Cameron Grimes
___ 182 Valentina Feroz
___ 183 Roderick Strong
___ 184 Drew McIntyre
___ 185 Gunther
___ 186 Johnny Gargano
___ 187 Sonya Deville
___ 188 Valhalla
___ 189 Asuka
___ 190 Otis
___ 191 Carmelo Hayes
___ 192 Raquel Rodriguez
___ 193 Eddie Guerrero
___ 194 Ronda Rousey
___ 195 Hulk Hogan
___ 196 Julius Creed
___ 197 "Stone Cold" Steve Austin
___ 198 Mark Coffey
___ 199 Axiom
___ 200 Randy Orton
`],
  ['Base Under Card Variations — Parallels: Red #/99; Blue #/25; Gold #/10', `
___ 1 Stardust
___ 8 Deacon Batista
___ 20 Tommaso Ciampa
___ 41 Rocky Maivia
___ 53 1-2-3 Kid
___ 54 John Cena
___ 55 Cactus Jack
___ 67 Scott Hall
___ 71 Hunter Hearst Helmsley
___ 100 Edge
___ 128 Diesel
___ 135 Ezekiel
___ 151 Brock Lesnar
___ 152 The Shockmaster
___ 165 Papa Shango
___ 172 "Mean" Mark Callous
___ 186 Johnny Gargano
___ 195 "Hollywood" Hulk Hogan
___ 197 "Stunning" Steve Austin
___ 200 Randy Orton
`],
  ['Champions Signatures — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ 1 Liv Morgan
___ 2 Braun Strowman
___ 3 Gunther
___ 4 Bron Breakker
___ 5 Bianca Belair
___ 6 Roxanne Perez
___ 7 Jey Uso
___ 8 The Miz
___ 9 Jimmy Uso
___ 10 Drew McIntyre
`],
  ['Iconic Rivals Dual Autographs — Serial #/25; Parallels: Gold #/10; Black 1/1', `
___ 1 Liv Morgan / Ronda Rousey
___ 2 Roman Reigns / Drew McIntyre
___ 4 Undertaker / Mankind
___ 5 Batista / Triple H
___ 6 Tommaso Ciampa / Johnny Gargano
___ 7 Trish Stratus / Lita
___ 8 Kane / X-Pac
___ 9 AJ Styles / John Cena
___ 10 Bret "Hit Man" Hart / Shawn Michaels
`],
  ['Legendary Signatures — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ 1 Lita
___ 3 Kane
___ 4 Eric Bischoff
___ 6 "Million Dollar Man" Ted DiBiase
___ 7 Shawn Michaels
___ 8 Booker T
___ 9 Torrie Wilson
___ 10 Iron Sheik
___ 11 Dude Love
___ 12 Diamond Dallas Page
___ 13 Diesel
___ 14 Goldberg
___ 15 Rikishi
___ 16 Beth Phoenix
___ 17 Stacy Keibler
___ 18 Bret "Hit Man" Hart
___ 19 Trish Stratus
___ 20 John "Bradshaw" Layfield
`],
  ['Sensational Signatures — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ 1 Nova
___ 2 Leilani Kai
___ 3 Bubba Ray Dudley
___ 4 Spike Dudley
___ 5 Dory Funk Jr.
___ 6 Haku
___ 8 Rockin' Robin
___ 9 Brian Knobs
___ 10 Juventud Guerrera
___ 11 Stevie Richards
___ 12 Stan Hansen
___ 13 The Sandman
___ 14 Teddy Long
___ 15 Mosh
___ 16 Thrasher
___ 17 Jerry Sags
___ 18 Terri Runnels
___ 19 The Blue Meanie
___ 20 Al Snow
___ 21 Tom Prichard
___ 22 Johnny Rodz
___ 23 Arianna Grace
___ 24 Channing "Stacks" Lorenzo
___ 25 Kiana James
___ 26 Ricky "The Dragon" Steamboat
___ 27 Tatum Paxley
___ 28 Thea Hail
___ 29 B-Fab
___ 30 Maxxine Dupri
___ 31 Top Dolla
___ 32 Amari Miller
___ 33 Andre Chase
___ 34 Typhoon
___ 35 Brooks Jensen
___ 36 Cruz Del Toro
___ 37 Damon Kemp
___ 38 Dante Chen
___ 39 Duke Hudson
___ 40 Edris Enofe
___ 41 Elektra Lopez
___ 42 Fallon Henley
___ 43 Josh Briggs
___ 44 Malik Blade
___ 45 Mr. Stone
___ 46 Nathan Frazer
___ 47 Nikkita Lyons
___ 48 Roxanne Perez
___ 49 Sanga
___ 50 Tiffany Stratton
___ 51 Tony D'Angelo
___ 52 Trick Williams
___ 53 Valentina Feroz
___ 54 Wendy Choo
___ 55 Yulisa Leon
___ 56 Tito Santana
___ 57 Sheamus
___ 58 Shinsuke Nakamura
___ 59 Xavier Woods
___ 60 Johnny Gargano
___ 61 Solo Sikoa
___ 62 Aliyah
___ 63 Angel
___ 64 Angelo Dawkins
___ 65 Apollo Crews
___ 66 Akira Tozawa
___ 67 Cedric Alexander
___ 68 Chad Gable
___ 69 Dana Brooke
___ 70 Dexter Lumis
___ 71 Erik
___ 72 Gable Steveson
___ 73 Giovanni Vinci
___ 74 Baron Corbin
___ 75 Humberto
___ 76 Ivar
___ 77 Ludwig Kaiser
___ 78 Mace
___ 79 Madcap Moss
___ 80 Mansoor
___ 81 LA Knight
___ 82 Mustafa Ali
___ 83 MVP
___ 84 Nikki Cross
___ 85 Bray Wyatt
___ 86 Rick Boogs
___ 87 Ridge Holland
___ 88 Robert Roode
___ 89 R-Truth
___ 90 Shelton Benjamin
___ 91 Sonya Deville
___ 92 Tamina
___ 93 Ava Raine
___ 94 Veer Mahaan
___ 95 Cameron Grimes
___ 96 Alba Fyre
___ 97 Cora Jade
___ 98 Gigi Dolin
___ 99 Jacy Jayne
___ 100 Ilja Dragunov
`],
  ['Superstar Autographs — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ 1 Montez Ford
___ 2 Austin Theory
___ 3 Raquel Rodriguez
___ 4 Matt Riddle
___ 5 Shotzi
___ 6 "The American Nightmare" Cody Rhodes
___ 7 Dolph Ziggler
___ 8 Rey Mysterio
___ 9 Iyo Sky
___ 10 Asuka
___ 11 Natalya
___ 12 Big E
___ 13 Ricochet
___ 14 Zelina Vega
___ 15 Butch
___ 16 Becky Lynch
___ 17 Dominik Mysterio
___ 18 Seth "Freakin" Rollins
___ 19 Jinder Mahal
___ 20 Bayley
___ 21 Omos
___ 22 Carmella
___ 23 Sami Zayn
___ 24 Rhea Ripley
___ 25 Tommaso Ciampa
___ 26 Edge
___ 27 Doudrop
___ 28 AJ Styles
___ 29 Kofi Kingston
___ 30 Charlotte Flair
___ 31 Otis
___ 32 Kevin Owens
___ 33 Shayna Baszler
___ 34 Scarlett
___ 35 Dakota Kai
___ 36 Finn Balor
___ 37 Elias
___ 38 Alexa Bliss
___ 39 Lacey Evans
___ 40 Karrion Kross
`],
  ['Throwback Signatures — Parallels: Green; Silver; Red #/99; Blue #/49; Mojo #/25; Gold #/10; Black 1/1; White Sparkle 1/1', `
___ 1 "Stone Cold" Steve Austin
___ 3 Undertaker
___ 4 Triple H
___ 5 Ronda Rousey
___ 6 Batista
___ 7 Roman Reigns
___ 8 Brock Lesnar
___ 9 Hulk Hogan
___ 10 John Cena
`],
  ['Throwback Signatures Premium Box Set', `
___ 1 "Stone Cold" Steve Austin (#/20)
___ 3 Undertaker (#/20)
___ 4 Triple H (#/20)
___ 5 Ronda Rousey (#/20)
___ 6 Batista (#/30)
___ 7 Roman Reigns (#/20)
___ 8 Brock Lesnar (#/20)
___ 9 Hulk Hogan (#/30)
___ 10 John Cena (#/20)
`],
  ['Color Blast', `
___ 1 Bray Wyatt
___ 2 Bron Breakker
___ 3 Edge
___ 4 "The American Nightmare" Cody Rhodes
___ 5 Undertaker
___ 6 Ronda Rousey
___ 7 Hulk Hogan
___ 8 Roman Reigns
___ 9 Triple H
___ 10 Randy Orton
`],
  ['Legends of the Hall — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 Kevin Nash
___ 2 Dusty Rhodes
___ 3 Kane
___ 4 "Million Dollar Man" Ted DiBiase
___ 5 Bruno Sammartino
___ 6 Andre The Giant
___ 7 Booker T
___ 8 "Rowdy" Roddy Piper
___ 9 Razor Ramon
___ 10 Bret "Hit Man" Hart
___ 11 Kurt Angle
___ 12 "Stone Cold" Steve Austin
___ 13 Rob Van Dam
___ 14 Shawn Michaels
___ 15 Mick Foley
___ 16 Hulk Hogan
___ 17 Ultimate Warrior
___ 18 Iron Sheik
___ 19 "Macho Man" Randy Savage
___ 20 Eddie Guerrero
___ 21 Goldberg
___ 22 Ricky "The Dragon" Steamboat
___ 23 Undertaker
___ 24 Yokozuna
___ 25 Trish Stratus
`],
  ['Prizmatic Entrances — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 Ultimate Warrior
___ 2 Charlotte Flair
___ 3 Bianca Belair
___ 4 Eddie Guerrero
___ 5 Undertaker
___ 6 Karrion Kross
___ 7 Edge
___ 8 "Macho Man" Randy Savage
___ 9 "The American Nightmare" Cody Rhodes
___ 10 The Sandman
___ 11 "Mr. Perfect" Curt Hennig
___ 12 Becky Lynch
___ 13 John "Bradshaw" Layfield
___ 14 Ronda Rousey
___ 15 Triple H
___ 16 Roman Reigns
___ 17 Brock Lesnar
___ 18 Shawn Michaels
___ 19 "Stone Cold" Steve Austin
___ 20 AJ Styles
`],
  ['Ring Royalty — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 "Stone Cold" Steve Austin
___ 2 Wade Barrett
___ 3 "Million Dollar Man" Ted DiBiase
___ 4 Booker T
___ 5 Edge
___ 6 Xavier Woods
___ 7 Ken Shamrock
___ 8 Queen Zelina
___ 9 Triple H
___ 10 Baron Corbin
___ 11 Bret "Hit Man" Hart
___ 12 Sheamus
___ 13 "Macho Man" Randy Savage
___ 14 Brock Lesnar
___ 15 Kurt Angle
`],
  ['Top Tier — Parallels: Green; Silver; Green Pulsar #/25; Mojo #/25; Gold #/10; Black 1/1', `
___ 1 Brock Lesnar
___ 2 Seth "Freakin" Rollins
___ 3 Dolph Ziggler
___ 4 Austin Theory
___ 5 Gunther
___ 6 Kevin Owens
___ 7 "The All Mighty" Bobby Lashley
___ 8 Roxanne Perez
___ 9 Asuka
___ 10 Rey Mysterio
___ 11 Bron Breakker
___ 12 Shinsuke Nakamura
___ 13 Drew McIntyre
___ 14 Shotzi
___ 15 Jey Uso
___ 16 Kofi Kingston
___ 17 "The American Nightmare" Cody Rhodes
___ 18 Natalya
___ 19 Bayley
___ 20 Rhea Ripley
___ 21 Carmella
___ 22 The Miz
___ 23 Edge
___ 24 Johnny Gargano
___ 25 Jimmy Uso
___ 26 Lacey Evans
___ 27 AJ Styles
___ 28 Nikkita Lyons
___ 29 Becky Lynch
___ 30 Roman Reigns
___ 31 Charlotte Flair
___ 32 Matt Riddle
___ 33 Finn Balor
___ 34 Braun Strowman
___ 35 Karrion Kross
___ 36 Liv Morgan
___ 37 Alexa Bliss
___ 38 Randy Orton
___ 39 Bianca Belair
___ 40 Ronda Rousey
`],
]));

// ── 2023 PANINI WWE REVOLUTION ────────────────────────────────────────────────
setsHtml.push(makeSet('rev23', '2023', '2023 Panini WWE Revolution', [
  ['Base #1–100 — Parallels: Astro; Fractal; Galactic; Groove; Impact #/199; Cosmic #/149; Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 1 Brooks Jensen
___ 2 Ronda Rousey
___ 3 Dexter Lumis
___ 4 Solo Sikoa
___ 5 Ilja Dragunov
___ 6 Karl Anderson
___ 7 "The All Mighty" Bobby Lashley
___ 8 Thea Hail
___ 9 Bayley
___ 10 Omos
___ 11 Butch
___ 12 Roxanne Perez
___ 13 Dominik Mysterio
___ 14 Sonya Deville
___ 15 Indi Hartwell
___ 16 Karrion Kross
___ 17 "The American Nightmare" Cody Rhodes
___ 18 Mansoor
___ 19 Becky Lynch
___ 20 Oro Mensah
___ 21 Candice LeRae
___ 22 Sami Zayn
___ 23 Drew McIntyre
___ 24 The Miz
___ 25 Iyo Sky
___ 26 Katana Chance
___ 27 AJ Styles
___ 28 Matt Riddle
___ 29 B-Fab
___ 30 Otis
___ 31 Carmella
___ 32 Santos Escobar
___ 33 Edge
___ 34 Top Dolla
___ 35 Jacy Jayne
___ 36 Kayden Carter
___ 37 Alba Fyre
___ 38 Maxxine Dupri
___ 39 Bianca Belair
___ 40 Paul Heyman
___ 41 Carmelo Hayes
___ 42 Scarlett
___ 43 Elias
___ 44 Tyler Bate
___ 45 JD McDonagh
___ 46 Kevin Owens
___ 47 Alexa Bliss
___ 48 Meiko Satomura
___ 49 Big E
___ 50 Quincy Elliott
___ 51 Chad Gable
___ 52 Seth "Freakin" Rollins
___ 53 Elton Prince
___ 54 Von Wagner
___ 55 Jey Uso
___ 56 Kit Wilson
___ 57 Apollo Crews
___ 58 Mustafa Ali
___ 59 Blair Davenport
___ 60 Randy Orton
___ 61 Charlotte Flair
___ 62 Shayna Baszler
___ 63 Emma
___ 64 Wes Lee
___ 65 Jimmy Uso
___ 66 Kofi Kingston
___ 67 Asuka
___ 68 Natalya
___ 69 Braun Strowman
___ 70 Raquel Rodriguez
___ 71 Cora Jade
___ 72 Sheamus
___ 73 Finn Balor
___ 74 Xavier Woods
___ 75 Joe Gacy
___ 76 Liv Morgan
___ 77 Austin Theory
___ 78 Nathan Frazer
___ 79 Bray Wyatt
___ 80 Rey Mysterio
___ 81 Dakota Kai
___ 82 Shinsuke Nakamura
___ 83 Gigi Dolin
___ 84 Zelina Vega
___ 85 Johnny Gargano
___ 86 Luke Gallows
___ 87 Ava
___ 88 Nikki Cross
___ 89 Brock Lesnar
___ 90 Rhea Ripley
___ 91 Damian Priest
___ 92 Shotzi
___ 93 Gunther
___ 94 Zoey Stark
___ 95 Josh Briggs
___ 96 Mace
___ 97 Baron Corbin
___ 98 Nikkita Lyons
___ 99 Bron Breakker
___ 100 Roman Reigns
`],
  ['Legends #101–130 — Parallels: Astro; Fractal; Galactic; Groove; Impact #/199; Cosmic #/149; Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 101 Big Boss Man
___ 102 Triple H
___ 103 Bret "Hit Man" Hart
___ 104 Undertaker
___ 105 Goldberg
___ 106 Mankind
___ 107 Miss Elizabeth
___ 108 "Rowdy" Roddy Piper
___ 109 Andre The Giant
___ 110 John Cena
___ 111 Bobby "The Brain" Heenan
___ 112 Trish Stratus
___ 113 Diamond Dallas Page
___ 114 Vader
___ 115 Hulk Hogan
___ 116 Paul Bearer
___ 117 "Stone Cold" Steve Austin
___ 118 Shawn Michaels
___ 119 Bam Bam Bigelow
___ 120 Terry Funk
___ 121 Scott Steiner
___ 122 Ultimate Warrior
___ 123 Eddie Guerrero
___ 124 Yokozuna
___ 125 Kevin Nash
___ 126 Razor Ramon
___ 127 Alundra Blayze
___ 128 Stacy Keibler
___ 129 Batista
___ 130 The Rock
___ 131 Typhoon/Earthquake
`],
  ['Tag Teams & Factions #132–150 — Parallels: Astro; Fractal; Galactic; Groove; Impact #/199; Cosmic #/149; Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 132 Elton Prince/Kit Wilson
___ 133 Rick Steiner/Scott Steiner
___ 134 Angelo Dawkins/Montez Ford
___ 135 Karl Anderson/Luke Gallows
___ 136 Jey Uso/Jimmy Uso
___ 137 Sami Zayn/Kevin Owens
___ 138 Ivar/Erik
___ 139 Nikolai Volkoff/Iron Sheik
___ 140 Brutus Creed/Julius Creed
___ 141 Billy Gunn/Road Dogg
___ 142 Jagger Reid/Rip Fowler
___ 143 Afa/Sika
___ 144 Chad Gable/Otis
___ 145 Wolfgang/Mark Coffey
___ 146 nWo
___ 147 Damage CTRL
___ 148 D-Generation X
___ 149 The Bloodline
___ 150 The Judgment Day
`],
  ['Liftoff! — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 1 Montez Ford
___ 2 Kofi Kingston
___ 3 Rey Mysterio
___ 4 Eddie Guerrero
___ 5 Rob Van Dam
___ 6 Ricochet
___ 7 Alexa Bliss
___ 8 AJ Styles
___ 9 Mustafa Ali
___ 10 Lita
`],
  ['Revolutionary Finishers — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 1 The Rock
___ 2 Randy Orton
___ 3 "Stone Cold" Steve Austin
___ 4 Undertaker
___ 5 Brock Lesnar
___ 6 "Mr. Perfect" Curt Hennig
___ 7 Shawn Michaels
___ 8 Bret "Hit Man" Hart
___ 9 Roman Reigns
___ 10 John Cena
___ 11 Becky Lynch
___ 12 Triple H
___ 13 Sheamus
___ 14 The Miz
___ 15 Charlotte Flair
___ 16 Bianca Belair
___ 17 Austin Theory
___ 18 Baron Corbin
___ 19 Braun Strowman
___ 20 "The All Mighty" Bobby Lashley
`],
  ['Shockwave — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 1 Bayley
___ 2 Roman Reigns
___ 3 "The All Mighty" Bobby Lashley
___ 4 Seth "Freakin" Rollins
___ 5 Carmelo Hayes
___ 6 The Miz
___ 7 Finn Balor
___ 8 JD McDonagh
___ 9 AJ Styles
___ 10 Roxanne Perez
___ 11 Becky Lynch
___ 12 Ronda Rousey
___ 13 Braun Strowman
___ 14 Sheamus
___ 15 "The American Nightmare" Cody Rhodes
___ 16 Wes Lee
___ 17 Gunther
___ 18 Johnny Gargano
___ 19 Alba Fyre
___ 20 Matt Riddle
___ 21 Bianca Belair
___ 22 Sami Zayn
___ 23 Bron Breakker
___ 24 Shinsuke Nakamura
___ 25 Drew McIntyre
___ 26 Zoey Stark
___ 27 Ilja Dragunov
___ 28 Kevin Owens
___ 29 Austin Theory
___ 30 Otis
`],
  ['Star Gazing — Parallels: Galactic; Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 1 Lita
___ 2 Bron Breakker
___ 3 Bret "Hit Man" Hart
___ 4 AJ Styles
___ 5 Ricky "The Dragon" Steamboat
___ 6 Ultimate Warrior
___ 7 Brock Lesnar
___ 8 Hulk Hogan
___ 9 JBL
___ 10 Triple H
___ 11 Becky Lynch
___ 12 Sami Zayn
___ 13 Braun Strowman
___ 14 Seth "Freakin" Rollins
___ 15 "The American Nightmare" Cody Rhodes
___ 16 Andre The Giant
___ 17 Trish Stratus
___ 18 Undertaker
___ 19 Booker T
___ 20 Randy Orton
___ 21 Bray Wyatt
___ 22 Shawn Michaels
___ 23 "Rowdy" Roddy Piper
___ 24 Eddie Guerrero
___ 25 Gunther
___ 26 Edge
___ 27 Rey Mysterio
___ 28 "Stone Cold" Steve Austin
___ 29 Kofi Kingston
___ 30 Roman Reigns
___ 31 Rikishi
___ 32 Asuka
___ 33 Batista
___ 34 Alexa Bliss
___ 35 Drew McIntyre
___ 36 Mankind
___ 37 The Miz
___ 38 The Rock
___ 39 John Cena
___ 40 Charlotte Flair
`],
  ['Autographs — Parallels: Sunburst #/99; Cubic #/49; Lava #/10; Kaleido 1/1', `
___ 1 Finn Balor
___ 2 Rhea Ripley
___ 3 Seth "Freakin" Rollins
___ 4 Asuka
___ 5 "Stone Cold" Steve Austin
___ 6 Liv Morgan
___ 7 Undertaker
___ 8 Big E
___ 9 Becky Lynch
___ 10 Iyo Sky
___ 11 Diesel
___ 12 Shotzi
___ 13 Shawn Michaels
___ 14 Bayley
___ 15 Brock Lesnar
___ 16 Diamond Dallas Page
___ 17 Batista
___ 18 Booker T
___ 19 Bret "Hit Man" Hart
___ 20 John "Bradshaw" Layfield
___ 21 Lita
___ 22 Tommaso Ciampa
___ 23 Trish Stratus
___ 24 Bianca Belair
___ 25 John Cena
___ 26 "Million Dollar Man" Ted DiBiase
___ 27 Hulk Hogan
___ 28 Butch
___ 29 Kane
___ 30 Kevin Owens
___ 31 Mankind
___ 32 Johnny Gargano
___ 33 AJ Styles
___ 34 Charlotte Flair
___ 35 Roman Reigns
___ 36 Austin Theory
___ 37 "The American Nightmare" Cody Rhodes
___ 38 Carmella
___ 39 Drew McIntyre
___ 40 Matt Riddle
___ 41 Rey Mysterio
___ 42 Solo Sikoa
___ 43 Alexa Bliss
___ 44 Karrion Kross
___ 45 Goldberg
___ 46 Beth Phoenix
___ 47 Paul Heyman
___ 48 Dakota Kai
___ 49 Edge
___ 50 Zelina Vega
`],
  ['Kaboom! Insert Set', `
___ 1 Roman Reigns
___ 2 Edge
___ 3 Triple H
___ 4 Brock Lesnar
___ 5 "The American Nightmare" Cody Rhodes
___ 6 The Rock
___ 7 Undertaker
___ 8 Ronda Rousey
___ 9 Andre The Giant
___ 10 Bray Wyatt
___ 11 John Cena
___ 12 Randy Orton
___ 13 Drew McIntyre
___ 14 Hulk Hogan
___ 15 Alexa Bliss
___ 16 Charlotte Flair
___ 17 Finn Balor
___ 18 Shawn Michaels
___ 19 Goldberg
___ 20 Ultimate Warrior
___ 21 Bianca Belair
___ 22 "Stone Cold" Steve Austin
___ 23 Liv Morgan
___ 24 Bayley
___ 25 Becky Lynch
`],
]));

// ── 2023 PANINI WWE SELECT ────────────────────────────────────────────────────
setsHtml.push(makeSet('sel23', '2023', '2023 Panini WWE Select', [
  ['Base Concourse #1–100 — Parallels: Silver; Light Blue #/249; Red #/175; White #/125; Blue Wave #/99; Neon Green #/75; Black & Blue #/49; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Razor Ramon
___ 2 Big E
___ 3 Alba Fyre
___ 4 Ludwig Kaiser
___ 5 Ivy Nile
___ 6 Xyon Quinn
___ 7 Thea Hail
___ 8 Brock Lesnar
___ 9 Diamond Dallas Page
___ 10 Mia Yim
___ 11 Shawn Michaels
___ 12 Bray Wyatt
___ 13 Axiom
___ 14 Raquel Rodriguez
___ 15 Jacy Jayne
___ 16 AJ Styles
___ 17 "Mr. Perfect" Curt Hennig
___ 18 Carmella
___ 19 DIESEL
___ 20 Omos
___ 21 The Boogeyman
___ 22 Charlotte Flair
___ 23 Bron Breakker
___ 24 Rey Mysterio
___ 25 Joe Coffey
___ 26 Akira Tozawa
___ 27 "Rowdy" Roddy Piper
___ 28 "The American Nightmare" Cody Rhodes
___ 29 Eddie Guerrero
___ 30 Randy Orton
___ 31 The Rock
___ 32 Drew McIntyre
___ 33 Cameron Grimes
___ 34 Ricochet
___ 35 Katana Chance
___ 36 Alexa Bliss
___ 37 "Stone Cold" Steve Austin
___ 38 Dexter Lumis
___ 39 George "The Animal" Steele
___ 40 R-Truth
___ 41 Torrie Wilson
___ 42 Giovanni Vinci
___ 43 Charlie Dempsey
___ 44 Roman Reigns
___ 45 Kiana James
___ 46 Asuka
___ 47 Alundra Blayze
___ 48 Piper Niven
___ 49 Goldberg
___ 50 Seth "Freakin" Rollins
___ 51 Trish Stratus
___ 52 Gunther
___ 53 Dabbo Kato
___ 54 Sami Zayn
___ 55 Mark Coffey
___ 56 Austin Theory
___ 57 Bam Bam Bigelow
___ 58 Edge
___ 59 Hulk Hogan
___ 60 Shelton Benjamin
___ 61 Ultimate Warrior
___ 62 Ivar
___ 63 Cora Jade
___ 64 Sheamus
___ 65 Nathan Frazer
___ 66 Bayley
___ 67 Batista
___ 68 Elias
___ 69 Jake Roberts
___ 70 The Miz
___ 71 Undertaker
___ 72 Jimmy Uso
___ 73 Elektra Lopez
___ 74 Sonya Deville
___ 75 Nikkita Lyons
___ 76 Becky Lynch
___ 77 Booker T
___ 78 Johnny Gargano
___ 79 John Cena
___ 80 Tommaso Ciampa
___ 81 X-Pac
___ 82 Karrion Kross
___ 83 Gigi Dolin
___ 84 Xavier Woods
___ 85 Roxanne Perez
___ 86 Bianca Belair
___ 87 Bret "Hit Man" Hart
___ 88 Luke Gallows
___ 89 Mankind
___ 90 Angel
___ 91 Yokozuna
___ 92 Liv Morgan
___ 93 Hank Walker
___ 94 Top Dolla
___ 95 Valentina Feroz
___ 96 "The All Mighty" Bobby Lashley
___ 97 Brutus Beefcake
___ 98 Matt Riddle
___ 99 William Regal
___ 100 Bronson Reed
`],
  ['Base Premiere Level #101–200 — Parallels: Silver; Blue #/199; Maroon #/149; Blue Wave #/99; Purple #/99; Black & Blue #/49; Orange #/49; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 101 Randy Orton
___ 102 Shawn Michaels
___ 103 Cruz Del Toro
___ 104 Carmelo Hayes
___ 105 Mace
___ 106 Julius Creed
___ 107 Veer
___ 108 "Ravishing" Rick Rude
___ 109 Brock Lesnar
___ 110 Eddie Guerrero
___ 111 Rhea Ripley
___ 112 The Godfather
___ 113 Drew Gulak
___ 114 Cora Jade
___ 115 Ridge Holland
___ 116 Chelsea Green
___ 117 Yulisa Leon
___ 118 "Rowdy" Roddy Piper
___ 119 Candice LeRae
___ 120 Greg Valentine
___ 121 Tamina
___ 122 The Rock
___ 123 Drew McIntyre
___ 124 Dijak
___ 125 Roman Reigns
___ 126 Lyra Valkyria
___ 127 AJ Styles
___ 128 "Stone Cold" Steve Austin
___ 129 "The American Nightmare" Cody Rhodes
___ 130 Hulk Hogan
___ 131 The Miz
___ 132 Triple H
___ 133 Emma
___ 134 Elton Prince
___ 135 Ronda Rousey
___ 136 Meiko Satomura
___ 137 Alexa Bliss
___ 138 Andre The Giant
___ 139 Dakota Kai
___ 140 Jerry Lawler
___ 141 Aliyah
___ 142 Ultimate Warrior
___ 143 Gunther
___ 144 Gigi Dolin
___ 145 Sami Zayn
___ 146 Nikkita Lyons
___ 147 Angelo Dawkins
___ 148 Batista
___ 149 Finn Balor
___ 150 John Cena
___ 151 Ashante Adonis
___ 152 Undertaker
___ 153 Jey Uso
___ 154 Guru Raaj
___ 155 Santos Escobar
___ 156 Odyssey Jones
___ 157 Asuka
___ 158 Beth Phoenix
___ 159 IYO SKY
___ 160 Lita
___ 161 Big E
___ 162 Yokozuna
___ 163 Jimmy Uso
___ 164 Hank Walker
___ 165 Shinsuke Nakamura
___ 166 Roxanne Perez
___ 167 Baron Corbin
___ 168 Booker T
___ 169 Kevin Owens
___ 170 Rick Steiner
___ 171 Braun Strowman
___ 172 Apollo Crews
___ 173 Karrion Kross
___ 174 Ilja Dragunov
___ 175 Solo Sikoa
___ 176 Sanga
___ 177 Bayley
___ 178 Cactus Jack
___ 179 Matt Riddle
___ 180 Rob Van Dam
___ 181 Bray Wyatt
___ 182 Bron Breakker
___ 183 Kofi Kingston
___ 184 Jagger Reid
___ 185 Valhalla
___ 186 Tatum Paxley
___ 187 Becky Lynch
___ 188 Chyna
___ 189 Montez Ford
___ 190 Scott Steiner
___ 191 Charlotte Flair
___ 192 Brooks Jensen
___ 193 Liv Morgan
___ 194 Josh Briggs
___ 195 Xia Li
___ 196 Tony D'Angelo
___ 197 Bianca Belair
___ 198 Diamond Dallas Page
___ 199 Otis
___ 200 Zeus
`],
  ['Base Ringside #201–300 — Parallels: Silver; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 201 Mustafa Ali
___ 202 Fit Finlay
___ 203 Humberto
___ 204 Rob Van Dam
___ 205 Rey Mysterio
___ 206 Trish Stratus
___ 207 Joe Gacy
___ 208 "Hollywood" Hulk Hogan
___ 209 "The American Nightmare" Cody Rhodes
___ 210 Ava
___ 211 Randy Orton
___ 212 Goldberg
___ 213 Jey Uso
___ 214 Scott Hall
___ 215 Roman Reigns
___ 216 Ultimate Warrior
___ 217 Nikkita Lyons
___ 218 Dragon Lee
___ 219 Damian Priest
___ 220 Batista
___ 221 Rhea Ripley
___ 222 Howard Finkel
___ 223 Jimmy Uso
___ 224 Shane Helms
___ 225 Ronda Rousey
___ 226 Undertaker
___ 227 Roxanne Perez
___ 228 "Stone Cold" Steve Austin
___ 229 Dolph Ziggler
___ 230 Bayley
___ 231 Seth "Freakin" Rollins
___ 232 John Cena
___ 233 Jinder Mahal
___ 234 Shawn Michaels
___ 235 Sami Zayn
___ 236 Blair Davenport
___ 237 Thea Hail
___ 238 1-2-3 Kid
___ 239 Dominik Mysterio
___ 240 B-Fab
___ 241 The Miz
___ 242 Kevin Nash
___ 243 LA Knight
___ 244 Stephanie McMahon
___ 245 Scarlett
___ 246 Bron Breakker
___ 247 Becky Lynch
___ 248 AJ Styles
___ 249 Edge
___ 250 Billy Gunn
___ 251 Braun Strowman
___ 252 Lex Luger
___ 253 Liv Morgan
___ 254 The Blue Meanie
___ 255 Shotzi
___ 256 Carmelo Hayes
___ 257 Bianca Belair
___ 258 Alexa Bliss
___ 259 Finn Balor
___ 260 Bret "Hit Man" Hart
___ 261 Bray Wyatt
___ 262 Lita
___ 263 Riddick Moss
___ 264 The Honky Tonk Man
___ 265 Solo Sikoa
___ 266 Cora Jade
___ 267 "The All Mighty" Bobby Lashley
___ 268 Andre The Giant
___ 269 Gable Steveson
___ 270 Captain Lou Albano
___ 271 Charlotte Flair
___ 272 Mr. T
___ 273 Natalya
___ 274 The Rock
___ 275 Tegan Nox
___ 276 Gigi Dolin
___ 277 Brock Lesnar
___ 278 Apollo Crews
___ 279 Karl Anderson
___ 280 Chyna
___ 281 Drew McIntyre
___ 282 Papa Shango
___ 283 Pat McAfee
___ 284 Torrie Wilson
___ 285 Uncle Howdy
___ 286 Indi Hartwell
___ 287 Carmella
___ 288 Asuka
___ 289 Kevin Owens
___ 290 Diamond Dallas Page
___ 291 Erik
___ 292 Ricky "The Dragon" Steamboat
___ 293 Paul Heyman
___ 294 Triple H
___ 295 Zelina Vega
___ 296 Jacy Jayne
___ 297 Chad Gable
___ 298 Austin Theory
___ 299 Matt Riddle
___ 300 Madusa
`],
  ['Base Mezzanine #301–400 (Blaster Exclusives) — Parallels: Silver; Tie-Dye #/25; Gold #/10; Green #/5; Black 1/1', `
___ 301 Dory Funk Jr.
___ 302 Dana Brooke
___ 303 Steve Blackman
___ 304 Big E
___ 305 Undertaker
___ 306 Mansoor
___ 307 Edris Enofe
___ 308 Oro Mensah
___ 309 Dijak
___ 310 Zoey Stark
___ 311 Eddie Guerrero
___ 312 Edge
___ 313 Paul Bearer
___ 314 Braun Strowman
___ 315 Tito Santana
___ 316 Maxxine Dupri
___ 317 Fallon Henley
___ 318 Quincy Elliott
___ 319 "Million Dollar Man" Ted DiBiase
___ 320 Alexa Bliss
___ 321 Al Snow
___ 322 Finn Balor
___ 323 Rob Van Dam
___ 324 Butch
___ 325 Andre Chase
___ 326 Rey Mysterio
___ 327 Grayson Waller
___ 328 Rip Fowler
___ 329 "Rowdy" Roddy Piper
___ 330 Austin Theory
___ 331 Freddie Blassie
___ 332 Kevin Owens
___ 333 Shawn Michaels
___ 334 Charlotte Flair
___ 335 Arianna Grace
___ 336 Rick Boogs
___ 337 Isla Dawn
___ 338 Scrypts
___ 339 "Stone Cold" Steve Austin
___ 340 Becky Lynch
___ 341 Goldberg
___ 342 MVP
___ 343 The Hurricane
___ 344 Gunther
___ 345 Ava
___ 346 Roman Reigns
___ 347 Jacy Jayne
___ 348 Sol Ruca
___ 349 Alundra Blayze
___ 350 Bianca Belair
___ 351 Hulk Hogan
___ 352 Nikki Cross
___ 353 The Sandman
___ 354 Jey Uso
___ 355 Brutus Creed
___ 356 Ronda Rousey
___ 357 JD McDonagh
___ 358 Tiffany Stratton
___ 359 Andre The Giant
___ 360 "The All Mighty" Bobby Lashley
___ 361 Iron Sheik
___ 362 Randy Orton
___ 363 Tom Prichard
___ 364 Joaquin Wilde
___ 365 Carmelo Hayes
___ 366 Shanky
___ 367 Katana Chance
___ 368 Trick Williams
___ 369 Bob Backlund
___ 370 Brock Lesnar
___ 371 Lola Vice
___ 372 Rhea Ripley
___ 373 Torrie Wilson
___ 374 Karrion Kross
___ 375 Channing "Stacks" Lorenzo
___ 376 Solo Sikoa
___ 377 Kayden Carter
___ 378 Tyler Bate
___ 379 Bobby "The Brain" Heenan
___ 380 Carmella
___ 381 Lita
___ 382 Robert Roode
___ 383 Triple H
___ 384 Lacey Evans
___ 385 Damon Kemp
___ 386 Tony Atlas
___ 387 Kit Wilson
___ 388 Von Wagner
___ 389 Booker T
___ 390 Cedric Alexander
___ 391 Virgil
___ 392 Seth "Freakin" Rollins
___ 393 Trish Stratus
___ 394 Liv Morgan
___ 395 Duke Hudson
___ 396 Chelsea Green
___ 397 Lash Legend
___ 398 Wes Lee
___ 399 Bret "Hit Man" Hart
___ 400 "The American Nightmare" Cody Rhodes
`],
  ['Autographed Memorabilia — Serial #/99; Parallels: Red #/99; Blue #/35; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Dominik Mysterio
___ 2 Sheamus
___ 3 Finn Balor
___ 4 Jimmy Uso
___ 5 AJ Styles
___ 6 Lacey Evans
___ 7 Austin Theory
___ 8 Natalya
___ 9 Bianca Belair
___ 10 Roman Reigns
___ 11 Drew McIntyre
___ 12 Shinsuke Nakamura
___ 13 Gunther
___ 14 Kevin Owens
___ 15 Alexa Bliss
___ 16 Liv Morgan
___ 17 Bayley
___ 18 Rey Mysterio
___ 19 Carmella
___ 20 Sami Zayn
___ 21 Edge
___ 22 The Miz
___ 23 Jey Uso
___ 24 Kofi Kingston
___ 25 Asuka
___ 26 Matt Riddle
___ 27 Becky Lynch
___ 28 Rhea Ripley
___ 29 Charlotte Flair
___ 30 Seth "Freakin" Rollins
`],
  ['Legendary Signatures — Parallels: Flash; Red Wave #/60; Blue #/49; Purple #/35; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Booker T
___ 2 "Hacksaw" Jim Duggan
___ 3 Ivan Putski
___ 4 Trish Stratus
___ 5 Goldberg
___ 6 John "Bradshaw" Layfield
___ 7 "Million Dollar Man" Ted DiBiase
___ 8 Kane
___ 9 Batista
___ 10 Lita
___ 11 Bret "Hit Man" Hart
___ 12 Shawn Michaels
___ 14 Undertaker
___ 15 Hulk Hogan
___ 16 John Cena
___ 17 "Stone Cold" Steve Austin
___ 18 Diesel
___ 19 Beth Phoenix
___ 20 Mankind
`],
  ['Ringside Action Signatures — Parallels: Flash; Red Wave; Blue #/49; Purple #/35; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Lex Luger
___ 2 Bayley
___ 3 Rey Mysterio
___ 4 Butch
___ 5 Seth "Freakin" Rollins
___ 6 D-Lo Brown
___ 7 Finn Balor
___ 8 "Cowboy" Bob Orton
___ 9 Iyo Sky
___ 10 Alexa Bliss
___ 11 Liv Morgan
___ 12 Becky Lynch
___ 13 Rhea Ripley
___ 14 Carmella
___ 15 Shotzi
___ 16 Drew McIntyre
___ 17 Fit Finlay
___ 18 "The American Nightmare" Cody Rhodes
___ 19 Paul Heyman
___ 20 Asuka
___ 21 Maryse
___ 22 Bianca Belair
___ 23 Rick Steiner
___ 24 Charlotte Flair
___ 25 Tommaso Ciampa
___ 26 Edge
___ 27 The Honky Tonk Man
___ 28 Adam Pearce
___ 29 Karrion Kross
___ 30 Austin Theory
___ 31 Matt Riddle
___ 32 Big E
___ 33 Scott Steiner
___ 34 Dakota Kai
___ 35 Zoey Stark
___ 36 Eve Torres
___ 37 IRS
___ 38 AJ Styles
___ 39 Kevin Owens
___ 40 Papa Shango
`],
  ['Signature Selections — Parallels: Flash; Red #/49; Blue #/35; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Elias
___ 2 Terri Runnels
___ 3 Jagger Reid
___ 4 Top Dolla
___ 5 Karl Anderson
___ 6 Riddick Moss
___ 7 Al Snow
___ 8 Noam Dar
___ 9 Bron Breakker
___ 10 Sami Zayn
___ 11 Elton Prince
___ 12 The Blue Meanie
___ 13 JD McDonagh
___ 14 Torrie Wilson
___ 15 Katana Chance
___ 16 Mark Coffey
___ 17 Alba Fyre
___ 18 Omos
___ 19 Brutus Creed
___ 20 Santos Escobar
___ 21 Grayson Waller
___ 22 The Miz
___ 23 Jerry Sags
___ 24 Tyler Bate
___ 25 Kayden Carter
___ 26 Maryse
___ 27 Arianna Grace
___ 28 Oro Mensah
___ 29 Bubba Ray Dudley
___ 30 Scarlett
___ 31 Dijak
___ 32 The Sandman
___ 33 Jey Uso
___ 34 Von Wagner
___ 35 Kiana James
___ 36 Maxxine Dupri
___ 37 Ashante Adonis
___ 38 Otis
___ 39 Cameron Grimes
___ 40 Shayna Baszler
___ 41 Gunther
___ 42 Thea Hail
___ 43 Jimmy Uso
___ 44 Wes Lee
___ 45 Kit Wilson
___ 46 Meiko Satomura
___ 47 Axiom
___ 48 Quincy Elliott
___ 49 Candice LeRae
___ 50 Sol Ruca
___ 51 Haku
___ 52 Thrasher
___ 53 Jinder Mahal
___ 54 Wolfgang
___ 55 Kofi Kingston
___ 56 Mia Yim
___ 57 B-Fab
___ 58 Raquel Rodriguez
___ 59 Carmelo Hayes
___ 60 Sonya Deville
___ 61 Indi Hartwell
___ 62 Tiffany Stratton
___ 63 Joe Coffey
___ 64 X-Pac
___ 65 Lacey Evans
___ 66 Montez Ford
___ 67 Blair Davenport
___ 68 Ricochet
___ 69 Channing "Stacks" Lorenzo
___ 70 Stan Hansen
___ 71 Iron Sheik
___ 72 Tito Santana
___ 73 Joe Gacy
___ 74 Scotty 2 Hotty
___ 75 Leilani Kai
___ 76 Mosh
___ 77 Boa
___ 78 Rikishi
___ 79 Charlie Dempsey
___ 80 Stevie Richards
___ 81 Isla Dawn
___ 82 Tom Prichard
___ 83 Julius Creed
___ 84 The Boogeyman
___ 85 Luke Gallows
___ 86 Natalya
___ 87 Braun Strowman
___ 88 Rip Fowler
___ 89 Damian Priest
___ 90 Tatum Paxley
___ 91 Ivy Nile
___ 92 Tony D'Angelo
___ 93 Juventud Guerrera
___ 94 The Hurricane
___ 95 Lyra Valkyria
___ 96 Nikkita Lyons
___ 97 Brian Knobs
___ 98 Rockin' Robin
___ 99 Dory Funk Jr.
___ 100 Theodore Long
`],
  ['Signatures — Parallels: Flash; Red Wave; Red #/60; Blue #/49; Purple #/35; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Greg Valentine
___ 2 Piper Niven
___ 3 Michael Hayes
___ 4 Jacy Jayne
___ 5 Superstar Billy Graham
___ 6 Roman Reigns
___ 7 Shinsuke Nakamura
___ 8 Apollo Crews
___ 9 Alundra Blayze
___ 10 Brock Lesnar
___ 11 Jerry Lawler
___ 12 Emma
___ 13 Molly Holly
___ 14 Joaquin Wilde
___ 15 The Godfather
___ 16 Roxanne Perez
___ 17 Xavier Woods
___ 18 Ava
___ 19 Brutus Beefcake
___ 20 Cora Jade
___ 21 Jimmy Hart
___ 22 Gable Steveson
___ 23 Road Dogg
___ 24 Mansoor
___ 25 Kelly Kelly
___ 26 Valhalla
___ 27 Zelina Vega
___ 28 Baron Corbin
___ 29 Don Muraco
___ 30 Dolph Ziggler
___ 31 Kurt Angle
___ 32 Gigi Dolin
___ 33 Rob Van Dam
___ 34 Scrypts
___ 35 Michelle McCool
___ 36 Sheamus
___ 37 "Hacksaw" Jim Duggan
___ 38 Bray Wyatt
___ 39 Faarooq
___ 40 Dominik Mysterio
`],
  ['Selective Swatches — Parallels: Red #/99; Blue #/49; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Natalya
___ 2 Carmella
___ 3 Ricochet
___ 4 Dolph Ziggler
___ 5 Shotzi
___ 6 Gunther
___ 7 Jimmy Uso
___ 8 AJ Styles
___ 9 LA Knight
___ 10 Becky Lynch
___ 11 Omos
___ 12 Tommaso Ciampa
___ 13 Sami Zayn
___ 14 Piper Niven
___ 15 "The All Mighty" Bobby Lashley
___ 16 Ilja Dragunov
___ 17 Johnny Gargano
___ 18 Alexa Bliss
___ 19 Liv Morgan
___ 20 Bron Breakker
___ 21 Zelina Vega
___ 22 Dakota Kai
___ 23 Seth "Freakin" Rollins
___ 24 Edge
___ 25 Austin Theory
___ 26 Jacy Jayne
___ 27 Kevin Owens
___ 28 Apollo Crews
___ 29 Montez Ford
___ 30 Cameron Grimes
___ 31 Rey Mysterio
___ 32 Dana Brooke
___ 33 Sheamus
___ 34 Gigi Dolin
___ 35 Xia Li
`],
  ['Sparks — Parallels: Red #/99; Blue #/49; Tie-Dye #/25; Gold #/10; Black 1/1', `
___ 1 Alba Fyre
___ 2 Matt Riddle
___ 3 Butch
___ 4 Raquel Rodriguez
___ 5 Damian Priest
___ 6 Shayna Baszler
___ 7 Finn Balor
___ 8 The Miz
___ 9 Iyo Sky
___ 10 Katana Chance
___ 11 Angelo Dawkins
___ 12 MVP
___ 13 Candice LeRae
___ 14 Rhea Ripley
___ 15 Dexter Lumis
___ 16 Shinsuke Nakamura
___ 17 Grayson Waller
___ 18 Xavier Woods
___ 19 Jey Uso
___ 20 Kofi Kingston
___ 21 Asuka
___ 22 Nikki Cross
___ 23 Carmelo Hayes
___ 24 Roman Reigns
___ 25 Dominik Mysterio
___ 26 Sonya Deville
___ 27 Baron Corbin
___ 28 Zoey Stark
___ 29 Joe Gacy
___ 30 Lacey Evans
___ 31 Bianca Belair
___ 32 Otis
___ 33 Cora Jade
___ 34 Santos Escobar
___ 35 Drew McIntyre
`],
  ['And New! — Parallels: Flash; Red Wave; Silver; Gold #/10; Black 1/1', `
___ 1 "Hollywood" Hulk Hogan
___ 2 Gunther
___ 3 The Rock
___ 4 Roxanne Perez
___ 5 Bron Breakker
___ 6 Roman Reigns
___ 7 Becky Lynch
___ 8 Bianca Belair
___ 9 Kevin Owens
___ 10 Charlotte Flair
`],
  ['Artistic Selections', `
___ 1 Roman Reigns
___ 2 AJ Styles
___ 3 Asuka
___ 4 The Rock
___ 5 Undertaker
`],
  ['Color Wheel', `
___ 1 John Cena
___ 2 Alexa Bliss
___ 3 Bron Breakker
___ 4 Charlotte Flair
___ 5 Rey Mysterio
___ 6 Ultimate Warrior
___ 7 Cora Jade
___ 8 Shawn Michaels
___ 9 Hulk Hogan
___ 10 Seth "Freakin" Rollins
`],
  ['Firestorm', `
___ 1 "Stone Cold" Steve Austin
___ 2 Ronda Rousey
___ 3 Randy Orton
___ 4 Kane
___ 5 Becky Lynch
___ 6 Bray Wyatt
___ 7 Bret "Hit Man" Hart
___ 8 Brock Lesnar
___ 9 Triple H
___ 10 "The American Nightmare" Cody Rhodes
`],
  ['Global Icons — Parallels: Flash; Red Wave; Silver; Gold #/10; Black 1/1', `
___ 1 "Rowdy" Roddy Piper
___ 2 Sami Zayn
___ 3 John Cena
___ 4 Finn Balor
___ 5 The Rock
___ 6 Bruno Sammartino
___ 7 Dakota Kai
___ 8 Grayson Waller
___ 9 Ivan Putski
___ 10 Kevin Owens
___ 11 Haku
___ 12 Natalya
___ 13 Gable Steveson
___ 14 JD McDonagh
___ 15 Tegan Nox
___ 16 Iyo Sky
___ 17 Omos
___ 18 Rhea Ripley
___ 19 Ilja Dragunov
___ 20 Maryse
___ 21 Ronda Rousey
___ 22 Butch
___ 23 Kurt Angle
___ 24 Becky Lynch
___ 25 William Regal
___ 26 Asuka
___ 27 Ultimate Warrior
___ 28 Emma
___ 29 Alba Fyre
___ 30 Bret "Hit Man" Hart
`],
  ['Sensations — Parallels: Flash; Red Wave; Silver; Gold #/10; Black 1/1', `
___ 1 Bayley
___ 2 Roman Reigns
___ 3 "The All Mighty" Bobby Lashley
___ 4 Shawn Michaels
___ 5 Charlotte Flair
___ 6 The Rock
___ 7 Drew McIntyre
___ 8 Karrion Kross
___ 9 Alexa Bliss
___ 10 Matt Riddle
___ 11 Becky Lynch
___ 12 Sami Zayn
___ 13 Bray Wyatt
___ 14 Solo Sikoa
___ 15 "The American Nightmare" Cody Rhodes
___ 16 Triple H
___ 17 Gunther
___ 18 Kevin Owens
___ 19 Asuka
___ 20 Randy Orton
___ 21 Bianca Belair
___ 22 Seth "Freakin" Rollins
___ 23 Bron Breakker
___ 24 "Stone Cold" Steve Austin
___ 25 Cora Jade
___ 26 Undertaker
___ 27 John Cena
___ 28 Liv Morgan
___ 29 Austin Theory
___ 30 Rey Mysterio
`],
  ['Snapshots — Parallels: Flash; Red Wave; Silver; Gold #/10; Black 1/1', `
___ 1 Lita
___ 2 Carmelo Hayes
___ 3 Otis
___ 4 Damian Priest
___ 5 Shawn Michaels
___ 6 Dominik Mysterio
___ 7 Ilja Dragunov
___ 8 AJ Styles
___ 9 Kane
___ 10 Batista
___ 11 Montez Ford
___ 12 Chad Gable
___ 13 Ricochet
___ 14 Dexter Lumis
___ 15 Shinsuke Nakamura
___ 16 Elias
___ 17 Iyo Sky
___ 18 Alba Fyre
___ 19 Kofi Kingston
___ 20 Big E
___ 21 Nikkita Lyons
___ 22 Dakota Kai
___ 23 Rob Van Dam
___ 24 Dolph Ziggler
___ 25 Zoey Stark
___ 26 Gigi Dolin
___ 27 Jacy Jayne
___ 28 Apollo Crews
___ 29 LA Knight
___ 30 Braun Strowman
`],
]));

// ── 2024 PANINI WWE FLAWLESS ──────────────────────────────────────────────────
setsHtml.push(makeSet('flaw24', '2024', '2024 Panini Flawless WWE', [
  ['Base Set — Serial #/25; Parallels: Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Charlotte Flair
___ 2 Jimmy Uso
___ 3 Roxanne Perez
___ 4 Stephanie Vaquer
___ 5 Finn Balor
___ 6 Seth "Freakin" Rollins
___ 7 Rhea Ripley
___ 8 AJ Styles
___ 9 Bianca Belair
___ 10 Solo Sikoa
___ 11 Oba Femi
___ 12 Ethan Page
___ 13 Sol Ruca
___ 14 "Dirty" Dominik Mysterio
___ 15 Gunther
___ 16 Uncle Howdy
___ 17 Randy Orton
___ 18 Austin Theory
___ 19 Jade Cargill
___ 20 Tama Tonga
___ 21 Cora Jade
___ 22 Shawn Spears
___ 23 Bron Breakker
___ 24 Sami Zayn
___ 25 Jey Uso
___ 26 Asuka
___ 27 CM Punk
___ 28 Giulia
___ 29 Tiffany Stratton
___ 30 Tonga Loa
___ 31 Lola Vice
___ 32 Trick Williams
___ 33 Damian Priest
___ 34 Kevin Owens
___ 35 The Miz
___ 36 IYO SKY
___ 37 Liv Morgan
___ 38 Carmelo Hayes
___ 39 Roman Reigns
___ 40 Bayley
___ 41 Becky Lynch
___ 42 Kelani Jordan
___ 43 Drew McIntyre
___ 44 Jacob Fatu
___ 45 Rey Mysterio
___ 46 Scarlett
___ 47 "The American Nightmare" Cody Rhodes
___ 48 LA Knight
___ 49 Alexa Bliss
___ 50 Paul Heyman
`],
  ['Base Legends #51–100 — Serial #/25; Parallels: Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 51 Torrie Wilson
___ 52 Alundra Blayze
___ 53 "Million Dollar Man" Ted DiBiase
___ 54 DIESEL
___ 55 Batista
___ 56 Jerry Lawler
___ 57 John Cena
___ 58 Road Dogg
___ 59 The Rock
___ 60 Umaga
___ 61 Triple H
___ 62 Bam Bam Bigelow
___ 63 Booker T
___ 64 Dusty Rhodes
___ 65 "The Fiend" Bray Wyatt
___ 66 Kurt Angle
___ 67 Kane
___ 68 Scott Steiner
___ 69 "Rowdy" Roddy Piper
___ 70 Vader
___ 71 Trish Stratus
___ 72 British Bulldog
___ 73 Chyna
___ 74 The Godfather
___ 75 Bret "Hit Man" Hart
___ 76 Lex Luger
___ 77 Lita
___ 78 "Superstar" Billy Graham
___ 79 Shawn Michaels
___ 80 William Regal
___ 81 Ultimate Warrior
___ 82 Brutus "The Barber" Beefcake
___ 83 "Mr. Perfect" Curt Hennig
___ 84 The Honky Tonk Man
___ 85 Eddie Guerrero
___ 86 Michelle McCool
___ 87 Mankind
___ 88 Sycho Sid
___ 89 Stacy Keibler
___ 90 X-Pac
___ 91 Undertaker
___ 92 Brian Pillman
___ 93 Diamond Dallas Page
___ 94 Razor Ramon
___ 95 Hulk Hogan
___ 96 "Ravishing" Rick Rude
___ 97 Rob Van Dam
___ 98 Terry Funk
___ 99 "Stone Cold" Steve Austin
___ 100 Yokozuna
`],
  ['5x7 Box Topper Cut Signatures — 1/1', `
___ 1 Dusty Rhodes
___ 2 "Chief" Jay Strongbow
___ 3 "Rowdy" Roddy Piper
___ 4 "Superstar" Billy Graham
___ 5 Iron Sheik
___ 7 Razor Ramon
___ 8 Sherri Martel
___ 9 Bruno Sammartino
___ 11 Bray Wyatt
___ 12 Captain Lou Albano
___ 13 "Mr. Perfect" Curt Hennig
___ 14 Umaga
___ 15 Scott Hall
___ 16 Yokozuna
___ 17 Terry Funk
___ 19 Nikolai Volkoff
`],
  ['Flawless Achievements — Parallels: Sapphire #/20; Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Kurt Angle (#/25)
___ 3 Seth "Freakin" Rollins (#/15)
___ 4 Bayley (#/25)
___ 5 The Miz (#/25)
___ 6 Charlotte Flair (#/15)
___ 7 Hulk Hogan (#/25)
___ 8 "Stone Cold" Steve Austin (#/25)
___ 9 Michelle McCool (#/25)
___ 10 Alexa Bliss (#/25)
___ 11 Lita (#/25)
___ 13 Shawn Michaels (#/25)
___ 14 Braun Strowman (#/25)
___ 15 Trish Stratus (#/25)
___ 16 CM Punk (#/25)
___ 17 John Cena (#/25)
___ 18 "The American Nightmare" Cody Rhodes (#/15)
___ 19 Randy Orton (#/15)
___ 21 Mankind (#/25)
___ 23 Sheamus (#/25)
___ 24 Bianca Belair (#/15)
___ 25 Undertaker (#/25)
___ 26 Drew McIntyre (#/15)
___ 27 Kevin Owens (#/25)
___ 28 AJ Styles (#/25)
___ 30 Asuka (#/15)
`],
  ['Flawless Dual Memorabilia — Base #/15; Parallels: Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Hulk Hogan / Ultimate Warrior
___ 2 The Rock / "Stone Cold" Steve Austin
___ 3 Roman Reigns / The Rock
___ 4 Shawn Michaels / Bret "Hit Man" Hart
___ 5 Shawn Michaels / Triple H
___ 6 Dusty Rhodes / "The American Nightmare" Cody Rhodes
___ 7 Undertaker / Mankind
___ 8 Eddie Guerrero / Chyna
___ 9 John Cena / CM Punk
___ 10 Kevin Nash / Scott Hall (#/12)
___ 11 Yokozuna / Bret "Hit Man" Hart
___ 12 D-Von Dudley / Bubba Ray Dudley
___ 13 Bron Breakker / Scott Steiner
___ 14 "Hollywood" Hulk Hogan / The Rock
___ 15 Bret "Hit Man" Hart / British Bulldog
`],
  ['Flawless Triple Memorabilia — Base #/15; Parallels: Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Kevin Nash / Scott Hall / "Hollywood" Hulk Hogan
___ 2 Triple H / Batista / Randy Orton
___ 4 Cactus Jack / Mankind / Dude Love
___ 5 Chyna / Shawn Michaels / Triple H
`],
  ['Flawless Memorabilia — Serial #/15; Parallels: Gold #/10; Amethyst #/6; Emerald #/3; Platinum 1/1', `
___ 1 Ken Shamrock
___ 2 Carmelo Hayes
___ 5 "Million Dollar Man" Ted DiBiase
___ 7 Bubba Ray Dudley
___ 8 Bayley
___ 9 Dusty Rhodes
___ 10 Bret "Hit Man" Hart
___ 12 CM Punk
___ 13 Scott Hall
___ 15 Big E
___ 16 "The American Nightmare" Cody Rhodes
___ 18 Becky Lynch
___ 19 D-Von Dudley
___ 20 Batista
___ 22 Drew McIntyre
___ 23 Scott Steiner
___ 24 Umaga
___ 25 British Bulldog
___ 26 Asuka
___ 27 Chyna
___ 28 Bianca Belair
___ 29 Eddie Guerrero
___ 30 "Rowdy" Roddy Piper
___ 32 Finn Balor
___ 33 Sycho Sid
___ 34 Yokozuna
___ 35 Brutus "The Barber" Beefcake
___ 36 Austin Theory
___ 37 Dude Love
___ 38 Bray Wyatt
___ 39 Kane
___ 40 Bron Breakker
`],
  ['Jumbo Memorabilia — Serial #/15; Parallels: Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Scarlett
___ 4 "The American Nightmare" Cody Rhodes
___ 5 Braun Strowman
___ 6 Sami Zayn
___ 7 Karrion Kross
___ 8 CM Punk
___ 9 Rey Mysterio
___ 10 Kevin Owens
___ 11 Tiffany Stratton
___ 12 Jey Uso
___ 13 "Dirty" Dominik Mysterio
___ 14 AJ Styles
___ 16 Bayley
___ 17 Kofi Kingston
___ 18 Seth "Freakin" Rollins
___ 19 Rhea Ripley
___ 20 Solo Sikoa
___ 21 Grayson Waller
___ 22 Carmelo Hayes
___ 23 Alexa Bliss
___ 24 Bianca Belair
___ 25 Finn Balor
___ 27 LA Knight
___ 28 Bron Breakker
___ 29 Roman Reigns
___ 31 Ultimate Warrior
___ 33 Asuka
___ 35 Gigi Dolin
___ 36 Drew McIntyre
___ 37 Montez Ford
___ 38 Randy Orton
___ 39 Roxanne Perez
`],
  ['Flawless Finishing Moves — Parallels: Sapphire #/20; Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Shinsuke Nakamura (#/25)
___ 3 Lita (#/25)
___ 4 Faarooq (#/25)
___ 5 Kurt Angle (#/25)
___ 6 Bianca Belair (#/15)
___ 7 Asuka (#/15)
___ 8 Sheamus (#/25)
___ 9 The Miz (#/25)
___ 10 Rey Mysterio (#/25)
___ 11 Nia Jax (#/25)
___ 12 Charlotte Flair (#/15)
___ 13 Great Muta (#/25)
___ 14 Gunther (#/25)
___ 15 Drew McIntyre (#/15)
___ 16 Kane (#/25)
___ 17 LA Knight (#/25)
___ 19 Alexa Bliss (#/25)
___ 20 CM Punk (#/25)
___ 22 Booker T (#/25)
___ 25 Randy Orton (#/20)
___ 26 DIESEL (#/25)
___ 27 Rhea Ripley (#/15)
___ 29 Jade Cargill (#/25)
___ 30 "The American Nightmare" Cody Rhodes (#/15)
___ 31 Damian Priest (#/25)
___ 32 Uncle Howdy (#/25)
___ 34 Bret "Hit Man" Hart (#/25)
___ 35 Seth "Freakin" Rollins (#/15)
___ 36 AJ Styles (#/25)
___ 37 Finn Balor (#/25)
___ 38 Sami Zayn (#/25)
___ 40 Naomi (#/25)
`],
  ['Flawless Performances — Parallels: Sapphire #/20; Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Randy Orton (#/15)
___ 2 Big E (#/25)
___ 4 Carmelo Hayes (#/25)
___ 5 Sami Zayn (#/25)
___ 6 Drew McIntyre (#/15)
___ 7 Ilja Dragunov (#/25)
___ 8 "The American Nightmare" Cody Rhodes (#/15)
___ 9 Johnny Gargano (#/25)
___ 10 Asuka (#/15)
___ 11 Rey Mysterio (#/25)
___ 12 Braun Strowman (#/25)
___ 13 Rob Van Dam (#/25)
___ 14 Charlotte Flair (#/15)
___ 15 Seth "Freakin" Rollins (#/15)
___ 16 Finn Balor (#/25)
___ 19 Kurt Angle (#/25)
___ 21 Rhea Ripley (#/15)
___ 22 Bret "Hit Man" Hart (#/25)
___ 24 CM Punk (#/25)
___ 25 Shawn Michaels (#/25)
___ 26 Gunther (#/25)
___ 27 John Cena (#/25)
___ 28 Andrade (#/25)
___ 29 LA Knight (#/25)
___ 30 Bianca Belair (#/15)
`],
  ['Flawless Patch Autographs — Base #/25; Parallels: Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 2 Bron Breakker
___ 3 Xavier Woods
___ 4 Carmelo Hayes
___ 5 Alexa Bliss
___ 6 IYO SKY
___ 7 Kevin Nash
___ 8 "Hollywood" Hulk Hogan
___ 9 Oba Femi
___ 10 Austin Theory
___ 11 Solo Sikoa
___ 12 Brutus "The Barber" Beefcake
___ 13 Andrade
___ 14 Dude Love
___ 15 Kelani Jordan
___ 16 Jey Uso
___ 17 Kevin Owens
___ 18 "Million Dollar Man" Ted DiBiase
___ 20 Bayley
___ 22 Bubba Ray Dudley
___ 23 Jade Cargill
___ 24 D-Von Dudley
___ 25 Carlito
___ 26 Kairi Sane
___ 27 Kofi Kingston
___ 29 Rob Van Dam
___ 31 Tiffany Stratton
___ 32 Cactus Jack
___ 33 Shinsuke Nakamura (#/13)
___ 34 Finn Balor
___ 35 Dragon Lee
___ 36 Ken Shamrock
___ 37 Maxxine Dupri
___ 38 Asuka
___ 39 Sami Zayn
___ 40 Big E (#/10)
`],
  ['Flawless WrestleMania Autographs — Parallels: Sapphire #/20; Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 AJ Styles (#/25)
___ 2 Rob Van Dam (#/25)
___ 3 Bianca Belair (#/15)
___ 4 Shawn Michaels (#/25)
___ 5 CM Punk (#/25)
___ 6 Trish Stratus (#/25)
___ 7 Hulk Hogan (#/25)
___ 8 Kurt Angle (#/25)
___ 9 "Stone Cold" Steve Austin (#/25)
___ 10 Rey Mysterio (#/25)
___ 13 Charlotte Flair (#/15)
___ 14 The Honky Tonk Man (#/25)
___ 15 Diamond Dallas Page (#/25)
___ 16 Undertaker (#/25)
___ 17 John Cena (#/25)
___ 18 Randy Orton (#/20)
___ 19 "The American Nightmare" Cody Rhodes (#/15)
___ 22 Seth "Freakin" Rollins (#/15)
___ 23 Bret "Hit Man" Hart (#/25)
___ 25 DIESEL (#/25)
`],
  ['Flawless Royal Rumble Autographs — Parallels: Sapphire #/20; Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Shinsuke Nakamura (#/25)
___ 2 Drew McIntyre (#/15)
___ 3 John Cena (#/25)
___ 4 "Stone Cold" Steve Austin (#/25)
___ 5 Randy Orton (#/20)
___ 6 Asuka (#/15)
___ 7 Rhea Ripley (#/15)
___ 9 Seth "Freakin" Rollins (#/15)
___ 10 Kane (#/25)
___ 11 Undertaker (#/25)
___ 12 Hulk Hogan (#/25)
___ 13 John Cena (#/25)
___ 14 "The American Nightmare" Cody Rhodes (#/15)
___ 15 Randy Orton (#/20)
___ 16 Bayley (#/25)
___ 18 Bianca Belair (#/15)
___ 19 Shawn Michaels (#/25)
___ 20 Charlotte Flair (#/15)
___ 21 Shawn Michaels (#/25)
___ 22 Hulk Hogan (#/25)
___ 24 "The American Nightmare" Cody Rhodes (#/15)
___ 25 Rey Mysterio (#/25)
`],
  ['Flawless SummerSlam Autographs — Parallels: Sapphire #/20; Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Bret "Hit Man" Hart (#/25)
___ 2 Shawn Michaels (#/25)
___ 3 Drew McIntyre (#/15)
___ 4 John Cena (#/25)
___ 5 "Stone Cold" Steve Austin (#/25)
___ 6 Mankind (#/25)
___ 7 AJ Styles (#/25)
___ 8 Rey Mysterio (#/25)
___ 11 Charlotte Flair (#/15)
___ 13 Finn Balor (#/25)
___ 14 Kurt Angle (#/25)
___ 16 Randy Orton (#/20)
___ 17 Asuka (#/15)
___ 18 Rob Van Dam (#/25)
___ 19 Bianca Belair (#/15)
___ 20 Seth "Freakin" Rollins (#/15)
___ 21 CM Punk (#/25)
___ 22 Undertaker (#/25)
___ 23 Hulk Hogan (#/25)
___ 25 "The American Nightmare" Cody Rhodes (#/15)
`],
  ['Flawless Survivor Series Autographs — Parallels: Sapphire #/20; Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Randy Orton (#/20)
___ 3 Charlotte Flair (#/15)
___ 4 Undertaker (#/25)
___ 7 Gunther (#/25)
___ 8 Nia Jax (#/25)
___ 9 Sheamus (#/25)
___ 10 Shawn Michaels (#/25)
___ 11 John Cena (#/25)
___ 12 Hulk Hogan (#/25)
___ 13 Asuka (#/15)
___ 14 Bret "Hit Man" Hart (#/25)
___ 15 Bianca Belair (#/15)
___ 17 Rhea Ripley (#/15)
___ 18 Trish Stratus (#/25)
___ 19 Austin Theory (#/25)
___ 20 Kane (#/25)
___ 21 CM Punk (#/25)
___ 22 "Million Dollar Man" Ted DiBiase (#/15)
___ 23 Seth "Freakin" Rollins (#/15)
`],
  ['Horizontal Autographed Memorabilia — Base #/25; Parallels: Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Bronze FOTL #/3; Platinum 1/1', `
___ 1 Asuka
___ 2 Raquel Rodriguez (#/15)
___ 3 Carmella
___ 4 R-Truth
___ 5 Finn Balor
___ 6 Tiffany Stratton
___ 7 Jacy Jayne
___ 8 Julius Creed
___ 9 "Dirty" Dominik Mysterio
___ 10 Naomi
___ 11 Bianca Belair
___ 12 Rey Mysterio
___ 13 Carmelo Hayes
___ 14 Sami Zayn
___ 15 Gigi Dolin
___ 16 Tommaso Ciampa
___ 17 Jade Cargill
___ 18 Karrion Kross
___ 19 Akam
___ 20 Natalya (#/15)
___ 21 Braun Strowman
___ 22 Rezar
___ 23 Damian Priest
___ 24 Scarlett
___ 25 Grayson Waller
___ 26 Wes Lee
___ 27 Jey Uso
___ 28 Kelani Jordan
___ 29 Alexa Bliss
___ 30 Nathan Frazer
___ 31 Bron Breakker
___ 33 Drew McIntyre
___ 34 Shotzi
___ 35 Ilja Dragunov
___ 36 Xavier Woods
___ 38 Kevin Owens
___ 39 Angelo Dawkins
___ 40 Nikkita Lyons
___ 41 Pete Dunne
___ 42 Roxanne Perez
___ 43 Elektra Lopez
___ 44 Solo Sikoa
___ 45 IYO SKY
___ 46 Zelina Vega
___ 47 Josh Briggs
___ 48 LA Knight
___ 49 Arianna Grace
___ 50 Noam Dar
`],
  ['Vertical Autographed Memorabilia — Base #/25; Parallels: Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Bronze FOTL #/3; Platinum 1/1', `
___ 1 Trick Williams
___ 2 Dexter Lumis
___ 3 Ilja Dragunov
___ 5 Karrion Kross
___ 7 Mark Coffey
___ 8 Candice LeRae
___ 9 Natalya (#/15)
___ 10 Chelsea Green
___ 11 Wes Lee
___ 12 Jacob Fatu
___ 13 IYO SKY
___ 14 AJ Styles
___ 15 Kofi Kingston
___ 16 Bayley
___ 17 Maryse
___ 18 Carlito
___ 19 Omos
___ 20 Cora Jade
___ 21 Xavier Woods
___ 22 Dragon Lee
___ 23 Jimmy Uso
___ 24 Andre Chase
___ 25 Charlie Dempsey
___ 27 Dani Palmer
___ 28 Chad Gable
___ 29 Raquel Rodriguez (#/12)
___ 30 Dakota Kai
___ 31 Zelina Vega
___ 32 Big E (#/10)
___ 33 Johnny Gargano
___ 34 Austin Theory
___ 35 Liv Morgan
___ 36 Brooks Jensen
___ 37 Maxxine Dupri
___ 38 Channing "Stacks" Lorenzo
___ 39 Shotzi
___ 40 Damian Priest
___ 41 Kiana James
___ 42 Gunther
___ 43 Kairi Sane
___ 44 Ava
___ 45 Lyra Valkyria
___ 46 Brutus Creed
___ 47 Montez Ford
___ 48 Charlotte Flair
___ 49 Solo Sikoa
___ 50 Uncle Howdy
`],
  ['Signature Prime Materials — Serial #/25; Parallels: Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 Grayson Waller
___ 2 Wendy Choo
___ 3 Karmen Petrovic
___ 4 Naomi
___ 5 "Dirty" Dominik Mysterio
___ 6 Otis
___ 7 Angelo Dawkins
___ 8 Roxanne Perez
___ 9 Bron Breakker
___ 10 The Miz
___ 11 Jacy Jayne
___ 12 Xavier Woods
___ 13 Karrion Kross
___ 14 Nia Jax
___ 15 "The American Nightmare" Cody Rhodes
___ 16 Piper Niven
___ 17 Asuka
___ 18 Scarlett
___ 19 Pete Dunne
___ 20 Tony D'Angelo
___ 21 Jakara Jackson
___ 22 Tiffany Stratton
___ 23 Kevin Owens
___ 24 Noam Dar
___ 26 Rhea Ripley
___ 27 Bianca Belair
___ 28 Seth "Freakin" Rollins
___ 29 Carmelo Hayes
___ 30 Trick Williams
___ 31 Julius Creed
___ 32 Zoey Stark
___ 33 Kofi Kingston
___ 34 Oro Mensah
___ 35 Alexa Bliss
___ 37 Braun Strowman
___ 38 Tatum Paxley
___ 39 Gigi Dolin
___ 40 Tyler Bate
`],
  ['Star Swatch Signatures — Serial #/25; Parallels: Ruby #/15; Gold #/10; Amethyst #/8; Emerald #/5; Platinum 1/1', `
___ 1 "The American Nightmare" Cody Rhodes
___ 2 John Cena
___ 3 Drew McIntyre
___ 4 LA Knight
___ 5 Rhea Ripley
___ 6 Mankind
___ 8 "Stone Cold" Steve Austin
___ 9 Trish Stratus
___ 10 CM Punk
___ 11 Bianca Belair
___ 12 Kane
___ 13 Rey Mysterio
___ 14 Liv Morgan
___ 15 Seth "Freakin" Rollins
___ 16 Randy Orton
___ 17 Shawn Michaels
___ 18 Bret "Hit Man" Hart
___ 19 Undertaker
___ 20 Hulk Hogan
`],
  ['NXT Logo Gems — 1/1', `
___ 1 Ava
___ 2 Cora Jade
___ 3 Ethan Page
___ 4 Gigi Dolin
___ 5 Kelani Jordan
___ 6 Trick Williams
___ 7 Sol Ruca
___ 8 Oba Femi
___ 9 Nikkita Lyons
___ 10 Roxanne Perez
`],
  ['Raw Logo Gems — 1/1', `
___ 1 Damian Priest
___ 2 CM Punk
___ 3 Bron Breakker
___ 4 Seth "Freakin" Rollins
___ 5 Kairi Sane
___ 6 Gunther
___ 7 "Dirty" Dominik Mysterio
___ 8 Sami Zayn
___ 9 The Miz
___ 10 Scarlett
___ 11 Rey Mysterio
___ 12 Liv Morgan
___ 13 Asuka
___ 14 Drew McIntyre
___ 15 Finn Balor
___ 16 Braun Strowman
___ 17 Jey Uso
___ 18 IYO SKY
___ 19 Kofi Kingston
___ 20 Uncle Howdy
`],
  ['SmackDown Logo Gems — 1/1', `
___ 1 AJ Styles
___ 2 Tiffany Stratton
___ 3 Grayson Waller
___ 4 "The American Nightmare" Cody Rhodes
___ 5 Kevin Owens
___ 6 Bianca Belair
___ 7 LA Knight
___ 8 Jade Cargill
___ 9 Randy Orton
___ 10 Shinsuke Nakamura
___ 11 Bayley
___ 12 Tama Tonga
___ 13 Tonga Loa
___ 14 Austin Theory
___ 15 Solo Sikoa
___ 16 Paul Heyman
___ 17 Angelo Dawkins
___ 18 Carmelo Hayes
___ 19 Naomi
___ 20 Jacob Fatu
`],
  ['Superstar Logo Gems — 1/1', `
___ 1 John Cena
___ 2 Randy Orton
___ 3 Hulk Hogan
___ 4 Roman Reigns
___ 5 "The American Nightmare" Cody Rhodes
___ 6 Seth "Freakin" Rollins
___ 7 CM Punk
___ 8 Undertaker
___ 9 Bray Wyatt
___ 10 "Stone Cold" Steve Austin
`],
  ['WWE Logo Gems — 1/1', `
___ 1 Roman Reigns
___ 2 Drew McIntyre
___ 3 Liv Morgan
___ 4 Charlotte Flair
___ 5 "The Fiend" Bray Wyatt
___ 6 Hulk Hogan
___ 7 "The American Nightmare" Cody Rhodes
___ 8 Bianca Belair
___ 9 CM Punk
___ 10 LA Knight
___ 11 Seth "Freakin" Rollins
___ 12 "Stone Cold" Steve Austin
___ 13 Alexa Bliss
___ 14 Roxanne Perez
___ 15 John Cena
___ 16 Jade Cargill
___ 17 Randy Orton
___ 18 Mankind
___ 19 Rhea Ripley
___ 20 The Rock
`],
  ['WWE Legends Logo Gems — 1/1', `
___ 1 Eddie Guerrero
___ 2 Undertaker
___ 3 Triple H
___ 4 The Rock
___ 5 "Stone Cold" Steve Austin
___ 6 Bret "Hit Man" Hart
___ 7 Hulk Hogan
___ 8 Chyna
___ 9 Cactus Jack
___ 10 Lita
___ 11 Razor Ramon
___ 12 "Rowdy" Roddy Piper
___ 13 Trish Stratus
___ 14 Dusty Rhodes
___ 15 Shawn Michaels
___ 16 Vader
___ 17 Ultimate Warrior
___ 18 Batista
___ 19 Kane
___ 20 Diamond Dallas Page
`],
]));

// ── 2024 PANINI WWE NATIONAL TREASURES ───────────────────────────────────────
setsHtml.push(makeSet('nt24', '2024', '2024 Panini National Treasures WWE', [
  ['Base Set — Serial #/99; Parallels: Red #/75; Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 AJ Styles
___ 2 "The American Nightmare" Cody Rhodes
___ 3 LA Knight
___ 4 Jaida Parker
___ 5 Naomi
___ 6 Oba Femi
___ 7 Bret "Hit Man" Hart
___ 8 John Cena
___ 9 Myles Borne
___ 10 Sami Zayn
___ 11 Sol Ruca
___ 12 Adriana Rizzo
___ 13 Rey Mysterio
___ 14 Shinsuke Nakamura
___ 15 Solo Sikoa
___ 16 Finn Balor
___ 17 Shawn Michaels
___ 18 Tank Ledger
___ 19 Carmelo Hayes
___ 20 Asuka
___ 21 Gunther
___ 22 Dani Palmer
___ 23 Kane
___ 24 Bronco Nima
___ 25 Hulk Hogan
___ 26 Kurt Angle
___ 27 Ilja Dragunov
___ 28 Lucien Price
___ 29 IYO SKY
___ 30 Jey Uso
___ 31 Eddie Guerrero
___ 32 Kofi Kingston
___ 33 Rob Van Dam
___ 34 Brinley Reece
___ 35 Tama Tonga
___ 36 Roxanne Perez
___ 37 Bayley
___ 38 Bianca Belair
___ 39 D-Von Dudley
___ 40 The Miz
___ 41 Nikkita Lyons
___ 42 Riley Osborne
___ 43 Trick Williams
___ 44 Uncle Howdy
___ 45 Razor Ramon
___ 46 Paul Bearer
___ 47 Jakara Jackson
___ 48 Zelina Vega
___ 49 Tiffany Stratton
___ 50 Roman Reigns
___ 51 The Rock
___ 52 Triple H
___ 53 Paul Heyman
___ 54 Karmen Petrovic
___ 55 Eddy Thorpe
___ 56 Mankind
___ 57 Damian Priest
___ 58 "Dirty" Dominik Mysterio
___ 59 Cora Jade
___ 60 Lita
___ 61 Alexa Bliss
___ 62 Chad Gable
___ 63 Baron Corbin
___ 64 Booker T
___ 65 Ava
___ 66 Wren Sinclair
___ 67 Dusty Rhodes
___ 68 "The Fiend" Bray Wyatt
___ 69 Trish Stratus
___ 70 Scarlett
___ 71 Izzi Dame
___ 72 Undertaker
___ 73 Yokozuna
___ 74 Maxxine Dupri
___ 75 Lola Vice
___ 76 Jade Cargill
___ 77 Gigi Dolin
___ 78 Drew McIntyre
___ 79 CM Punk
___ 80 "Stone Cold" Steve Austin
___ 81 "Rowdy" Roddy Piper
___ 82 Nia Jax
___ 83 Umaga
___ 84 The Sandman
___ 85 The Honky Tonk Man
___ 86 JBL
___ 87 Iron Sheik
___ 88 Charlotte Flair
___ 89 Batista
___ 90 Jake Roberts
___ 91 Wes Lee
___ 92 Big E
___ 93 Austin Theory
___ 94 Bubba Ray Dudley
___ 95 Natalya
___ 96 Thea Hail
___ 97 Kevin Owens
___ 98 X-Pac
___ 99 The Boogeyman
___ 100 Braun Strowman
`],
  ['Clutch Factor Signatures — Print runs vary; Parallels: Holo Silver #/75; Holo Gold #/10; Platinum 1/1', `
___ 4 Shawn Michaels (#/99)
___ 6 "Million Dollar Man" Ted DiBiase (#/99)
___ 10 Liv Morgan (#/35)
___ 11 Rhea Ripley (#/49)
___ 13 Solo Sikoa (#/99)
___ 15 Big E (#/35)
___ 17 John Cena (#/99)
___ 19 Maxxine Dupri (#/99)
___ 20 Rob Van Dam (#/99)
___ 22 Bret "Hit Man" Hart (#/75)
___ 23 Brutus "The Barber" Beefcake (#/99)
___ 24 Finn Balor (#/25)
___ 27 The Sandman (#/99)
___ 28 Oba Femi (#/30)
___ 33 Hulk Hogan (#/99)
___ 38 Cactus Jack (#/75)
___ 39 Kane (#/99)
`],
  ['Colossal Mat Material Signatures — Print runs vary; Parallels: Holo Gold #/10; Platinum 1/1', `
___ 1 Liv Morgan (#/30)
___ 4 Charlotte Flair (#/25)
___ 14 Baron Corbin (#/91)
___ 15 Jimmy Uso (#/59)
___ 25 Shinsuke Nakamura (#/99)
___ 30 Solo Sikoa (#/99)
___ 32 Solo Sikoa (#/99)
___ 34 Jimmy Uso (#/59)
___ 36 Rey Mysterio (#/84)
___ 37 Charlotte Flair (#/20)
___ 38 Liv Morgan (#/30)
___ 39 Sami Zayn (#/30)
___ 49 Naomi (#/99)
___ 55 Rey Mysterio (#/85)
___ 56 Finn Balor (#/25)
`],
  ['Colossal Mat Materials — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Tiffany Stratton
___ 2 Damian Priest
___ 3 Seth "Freakin" Rollins
___ 4 Bron Breakker
___ 5 Jey Uso
___ 6 Kevin Owens
___ 7 Chad Gable
___ 9 IYO SKY
___ 10 "The American Nightmare" Cody Rhodes
___ 11 Naomi
___ 12 Alba Fyre
___ 13 Damian Priest
___ 14 "The American Nightmare" Cody Rhodes
___ 15 Carmelo Hayes
___ 16 Solo Sikoa
___ 17 LA Knight
___ 18 Jacob Fatu
___ 19 Chelsea Green
___ 20 Jade Cargill
___ 21 Zoey Stark
___ 22 Isla Dawn
___ 23 Sami Zayn
___ 24 Randy Orton
___ 25 Andrade
___ 26 Tama Tonga
___ 27 Drew McIntyre
___ 28 AJ Styles
___ 29 Lyra Valkyria
___ 30 Bayley
`],
  ['Colossal Materials — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Solo Sikoa
___ 2 Finn Balor
___ 3 Jimmy Uso
___ 4 "Dirty" Dominik Mysterio
___ 5 Kit Wilson
___ 6 Asuka
___ 7 Naomi
___ 8 Braun Strowman
___ 9 Roman Reigns
___ 10 Charlotte Flair
___ 11 Sonya Deville
___ 12 Giovanni Vinci
___ 13 Joaquin Wilde
___ 15 Kofi Kingston
___ 16 Austin Theory
___ 17 Nikki Cross
___ 18 Bron Breakker
___ 19 Sami Zayn
___ 20 Cruz Del Toro
___ 21 Tiffany Stratton
___ 22 Grayson Waller
___ 23 Johnny Gargano
___ 24 "The American Nightmare" Cody Rhodes
___ 25 LA Knight
___ 26 Baron Corbin
___ 28 Brutus Creed
___ 29 Santos Escobar
___ 30 Damian Priest
___ 31 Tyler Bate
___ 32 Ilja Dragunov
___ 33 Julius Creed
___ 34 AJ Styles
___ 35 Ludwig Kaiser
___ 36 Bayley
___ 37 Pete Dunne
___ 38 Candice LeRae
___ 39 Scarlett
___ 40 Dexter Lumis
___ 41 Xavier Woods
___ 42 Ivar
___ 43 Karl Anderson
___ 44 Alexa Bliss
___ 45 Luke Gallows
___ 46 Becky Lynch
___ 48 Carmella
___ 49 Seth "Freakin" Rollins
___ 50 Drew McIntyre
___ 51 Zelina Vega
___ 52 IYO SKY
___ 53 Karrion Kross
___ 54 Angelo Dawkins
___ 55 Maxxine Dupri
___ 56 B-Fab
___ 57 Rey Mysterio
___ 58 Carmelo Hayes
___ 59 Shayna Baszler
___ 60 Elton Prince
___ 61 Montez Ford
___ 62 Jey Uso
___ 63 Kevin Owens
___ 64 Apollo Crews
___ 65 Michin
___ 66 Bianca Belair
___ 67 Rhea Ripley
___ 68 Chad Gable
___ 69 Shotzi
___ 70 Noam Dar
`],
  ['Definitive Ink — Print runs vary; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 2 Gunther (#/35)
___ 3 Kiana James (#/99)
___ 5 Tatum Paxley (#/84)
___ 6 Maxxine Dupri (#/99)
___ 9 Bronco Nima (#/84)
___ 10 Jakara Jackson (#/84)
___ 11 Edris Enofe (#/99)
___ 13 Lucien Price (#/84)
___ 15 Wolfgang (#/99)
___ 16 Raquel Rodriguez (#/99)
___ 17 Adam Pearce (#/84)
___ 18 Stevie Turner (#/99)
___ 19 Channing "Stacks" Lorenzo (#/99)
___ 20 Karmen Petrovic (#/75)
___ 21 Elektra Lopez (#/99)
___ 23 Malik Blade (#/84)
___ 28 Rezar (#/99)
___ 30 Nia Jax (#/99)
___ 31 Fallon Henley (#/84)
___ 32 Naomi (#/99)
___ 38 Shinsuke Nakamura (#/99)
___ 40 Akam (#/99)
___ 41 Hank Walker (#/84)
___ 42 Liv Morgan (#/25)
___ 43 Nathan Frazer (#/84)
___ 48 Andrade (#/99)
___ 49 Dani Palmer (#/84)
___ 51 Izzi Dame (#/84)
___ 52 Trick Williams (#/99)
___ 53 Oro Mensah (#/99)
___ 54 Jimmy Uso (#/59)
___ 58 Alexa Bliss (#/99)
___ 59 Dante Chen (#/99)
___ 61 Jaida Parker (#/84)
___ 62 Finn Balor (#/25)
___ 63 Tank Ledger (#/83)
___ 68 Arianna Grace (#/84)
___ 69 Duke Hudson (#/84)
___ 70 Dragon Lee (#/99)
`],
  ['Dual Signatures — Print runs vary; Parallels: Holo Gold #/10; Platinum 1/1', `
___ 2 Shawn Michaels / Bret "Hit Man" Hart (#/25)
___ 3 John Cena / Shawn Michaels (#/25)
___ 4 Hulk Hogan / Brutus "The Barber" Beefcake (#/99)
___ 5 Kane / Lita (#/99)
___ 6 Mighty Molly / The Hurricane (#/99)
___ 7 Kairi Sane / Asuka (#/15)
___ 11 John Cena / Hulk Hogan (#/25)
___ 13 Stacy Keibler / Torrie Wilson (#/99)
___ 14 "Million Dollar Man" Ted DiBiase / IRS (#/25)
___ 20 Hulk Hogan / Iron Sheik (#/21)
`],
  ['Triple Signatures — Print runs vary; Parallels: Holo Gold #/10; Platinum 1/1', `
___ 6 Akam / Rezar / Paul Ellering (#/49)
___ 10 Torrie Wilson / Trish Stratus / Stacy Keibler (#/25)
`],
  ['International Treasures Signatures — Print runs vary; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 3 Finn Balor (#/25)
___ 4 Rikishi (#/99)
___ 7 Andrade (#/99)
___ 10 Ilja Dragunov (#/99)
___ 13 Chelsea Green (#/69)
___ 15 Rezar (#/99)
___ 16 Charlie Dempsey (#/99)
___ 17 Karmen Petrovic (#/75)
___ 18 Blair Davenport (#/99)
___ 19 Dragon Lee (#/90)
___ 23 Bret "Hit Man" Hart (#/49)
___ 25 Shinsuke Nakamura (#/99)
___ 26 William Regal (#/99)
___ 29 Gunther (#/35)
`],
  ['Legendary Signatures — Print runs vary; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 2 Jimmy Hart (#/99)
___ 3 Mighty Molly (#/99)
___ 4 Papa Shango (#/99)
___ 6 The Boogeyman (#/99)
___ 7 Kevin Nash (#/99)
___ 9 Shawn Michaels (#/60)
___ 11 Bret "Hit Man" Hart (#/67)
___ 12 John Cena (#/99)
___ 13 Fit Finlay (#/99)
___ 15 William Regal (#/99)
___ 16 Tugboat (#/99)
___ 17 Lita (#/99)
___ 18 Norman Smiley (#/99)
___ 19 "Million Dollar Man" Ted DiBiase (#/99)
___ 20 Ken Shamrock (#/99)
___ 21 Rikishi (#/99)
___ 22 Jimmy Garvin (#/39)
___ 23 IRS (#/99)
___ 24 Don Muraco (#/99)
___ 25 The Sandman (#/99)
___ 26 Tyler Breeze (#/99)
___ 27 Kane (#/99)
___ 28 Eve Torres (#/99)
___ 29 Torrie Wilson (#/99)
___ 30 "Cowboy" Bob Orton (#/99)
___ 31 Tensai (#/99)
___ 32 1-2-3 Kid (#/99)
___ 34 Bradshaw (#/66)
___ 35 Eric Bischoff (#/99)
___ 36 Red Rooster (#/99)
___ 37 Hulk Hogan (#/99)
___ 38 Wendi Richter (#/99)
___ 39 Stacy Keibler (#/99)
___ 40 Theodore Long (#/99)
___ 41 Kurt Angle (#/99)
___ 42 Rob Van Dam (#/99)
___ 44 Diamond Dallas Page (#/75)
___ 45 Big E (#/35)
___ 46 Tatanka (#/99)
___ 47 Batista (#/99)
___ 48 Bad News Barrett (#/64)
___ 49 Booker T (#/99)
___ 50 Paul Ellering (#/99)
`],
  ['Material Treasures — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Nikki Cross
___ 2 Andre Chase
___ 3 Zelina Vega
___ 4 Mark Coffey
___ 5 B-Fab
___ 6 Trick Williams
___ 7 Giovanni Vinci
___ 8 Bron Breakker
___ 9 Santos Escobar
___ 10 Finn Balor
___ 11 Pete Dunne
___ 12 Arianna Grace
___ 13 "The All Mighty" Bobby Lashley
___ 14 Nathan Frazer
___ 15 Bianca Belair
___ 16 Wendy Choo
___ 17 Kit Wilson
___ 18 Brutus Creed
___ 19 Solo Sikoa
___ 20 Ivar
___ 21 Rhea Ripley
___ 22 Gigi Dolin
___ 23 AJ Styles
___ 24 Nikkita Lyons
___ 25 Candice LeRae
___ 26 Wes Lee
___ 27 Luke Gallows
___ 28 Chad Gable
___ 29 Becky Lynch
___ 30 Joaquin Wilde
___ 31 Sami Zayn
___ 32 Jacy Jayne
___ 33 Angelo Dawkins
___ 34 Roxanne Perez
___ 35 Cedric Alexander
___ 36 Alba Fyre
___ 37 Montez Ford
___ 38 Cruz Del Toro
___ 39 Jimmy Uso
___ 40 Kiana James
___ 41 Shayna Baszler
___ 42 Josh Briggs
___ 43 Apollo Crews
___ 44 Tony D'Angelo
___ 45 Elton Prince
___ 46 Braun Strowman
___ 47 Naomi
___ 48 Drew McIntyre
___ 49 "The American Nightmare" Cody Rhodes
___ 50 Lyra Valkyria
`],
  ['Peerless Signatures — Print runs vary; Parallels: Holo Gold #/10; Platinum 1/1', `
___ 3 Adam Pearce (#/84)
___ 4 Alexa Bliss (#/99)
___ 7 Naomi (#/99)
___ 8 Shinsuke Nakamura (#/99)
___ 9 Gunther (#/35)
___ 12 Jimmy Uso (#/59)
___ 18 Akam (#/99)
___ 19 Kiana James (#/99)
___ 24 Finn Balor (#/25)
___ 25 Rezar (#/99)
___ 26 Blair Davenport (#/99)
___ 28 Liv Morgan (#/25)
___ 31 Raquel Rodriguez (#/99)
___ 35 Nia Jax (#/99)
___ 36 Dragon Lee (#/99)
___ 39 Maxxine Dupri (#/99)
___ 40 Andrade (#/99)
`],
  ['Retro Materials — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Dude Love
___ 2 Ultimate Warrior
___ 3 Big E
___ 4 "Rowdy" Roddy Piper
___ 5 Dusty Rhodes
___ 6 Bray Wyatt
___ 7 Scott Hall
___ 8 John Cena
___ 9 Yokozuna
___ 10 Shawn Michaels
___ 11 Bubba Ray Dudley
___ 12 Undertaker
___ 13 British Bulldog
___ 14 "Stone Cold" Steve Austin
___ 15 Eddie Guerrero
___ 16 Bret "Hit Man" Hart
___ 17 Sycho Sid
___ 18 Razor Ramon
___ 19 Cactus Jack
___ 20 The Rock
___ 21 D-Von Dudley
___ 22 "Million Dollar Man" Ted DiBiase
___ 23 Chyna
___ 24 Batista
___ 26 Hulk Hogan
___ 27 Umaga
___ 28 Rob Van Dam
___ 29 Mankind
___ 30 Triple H
`],
  ['Superstar Material Signatures — Print runs vary; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 2 Alexa Bliss (#/85)
___ 5 Apollo Crews (#/81)
___ 7 Andrade (#/99)
___ 12 Karrion Kross (#/35)
___ 16 Nia Jax (#/99)
___ 17 Finn Balor (#/25)
___ 18 Naomi (#/99)
___ 20 Otis (#/30)
___ 21 Jimmy Uso (#/55)
___ 22 Solo Sikoa (#/49)
___ 26 Carlito (#/99)
___ 27 Rey Mysterio (#/99)
___ 28 Liv Morgan (#/35)
___ 29 Piper Niven (#/40)
___ 31 "Dirty" Dominik Mysterio (#/25)
___ 34 Dragon Lee (#/48)
___ 36 Chelsea Green (#/99)
___ 43 Shinsuke Nakamura (#/99)
`],
  ['Superstar Signature Jumbo Material Booklet — Print runs vary; Parallels: Holo Gold #/10; Platinum 1/1', `
___ 11 Kairi Sane (#/35)
___ 13 Sami Zayn (#/35)
___ 14 John Cena (#/35)
___ 16 Roxanne Perez (#/35)
___ 22 Bret "Hit Man" Hart (#/35)
___ 24 Liv Morgan (#/35)
___ 25 Naomi (#/35)
___ 29 Jade Cargill (#/32)
___ 30 Bayley (#/35)
`],
  ['Tag Team Material Signature Booklet', `
___ 7 Kairi Sane / Asuka (#/15)
`],
  ['Timeline Materials — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Ricky "The Dragon" Steamboat
___ 2 British Bulldog
___ 3 Shawn Michaels
___ 4 CM Punk
___ 5 Trish Stratus
___ 6 Hulk Hogan
___ 7 Kevin Nash
___ 8 "Hollywood" Hulk Hogan
___ 10 Austin Theory
___ 11 Rob Van Dam
___ 12 Bron Breakker
___ 13 Solo Sikoa
___ 14 Drew McIntyre
___ 15 Ultimate Warrior
___ 16 IYO SKY
___ 17 Kevin Owens
___ 18 "Million Dollar Man" Ted DiBiase
___ 19 Oba Femi
___ 20 Batista
___ 21 Roman Reigns
___ 22 Brutus "The Barber" Beefcake
___ 23 Sycho Sid
___ 24 Dude Love
___ 25 Umaga
___ 26 Jey Uso
___ 27 Kofi Kingston
___ 28 "Rowdy" Roddy Piper
___ 29 Randy Orton
___ 30 Bayley
___ 31 Sami Zayn
___ 32 Bubba Ray Dudley
___ 33 The Rock
___ 34 Dusty Rhodes
___ 35 Undertaker
___ 36 John Cena
___ 37 LA Knight
___ 38 "Stone Cold" Steve Austin
___ 39 Noam Dar
___ 40 Bianca Belair
___ 41 Scott Hall
___ 42 Cactus Jack
___ 43 The Sandman
___ 44 D-Von Dudley
___ 45 Xavier Woods
___ 46 Kairi Sane
___ 47 Liv Morgan
___ 49 Razor Ramon
___ 50 Big E
___ 51 Scott Steiner
___ 52 Carmelo Hayes
___ 53 Tiffany Stratton
___ 54 Eddie Guerrero
___ 55 Yokozuna
___ 56 Kane
___ 57 Mankind
___ 58 "The American Nightmare" Cody Rhodes
___ 59 Rey Mysterio
___ 60 Bray Wyatt
___ 61 Seth "Freakin" Rollins
___ 62 Chyna
___ 63 Triple H
___ 64 Finn Balor
___ 65 Carmella
___ 66 Ken Shamrock
___ 67 Maxxine Dupri
___ 68 Asuka
___ 69 Rhea Ripley
___ 70 Bret "Hit Man" Hart
`],
  ['Treasured Threads — Serial #/99; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 1 Johnny Gargano
___ 2 Asuka
___ 3 Tiffany Stratton
___ 4 IYO SKY
___ 5 CM Punk
___ 6 Kofi Kingston
___ 7 Seth "Freakin" Rollins
___ 8 Big E
___ 9 Baron Corbin
___ 10 Joe Coffey
___ 11 Karl Anderson
___ 12 Dakota Kai
___ 13 Tommaso Ciampa
___ 14 Jey Uso
___ 15 Omos
___ 16 Ludwig Kaiser
___ 17 Sonya Deville
___ 18 Axiom
___ 19 Bayley
___ 20 Mr. Stone
___ 21 Kevin Owens
___ 22 Damian Priest
___ 23 Alexa Bliss
___ 24 Julius Creed
___ 25 Raquel Rodriguez
___ 26 Maxxine Dupri
___ 27 Tyler Bate
___ 28 Brooks Jensen
___ 29 Carmelo Hayes
___ 30 Noam Dar
___ 31 LA Knight
___ 32 Dexter Lumis
___ 33 Carmella
___ 34 Karrion Kross
___ 35 Roman Reigns
___ 36 Rey Mysterio
___ 37 Xavier Woods
___ 38 Channing "Stacks" Lorenzo
___ 39 Grayson Waller
___ 40 Ridge Holland
___ 41 Michin
___ 42 Ilja Dragunov
___ 43 Charlotte Flair
___ 44 Katana Chance
___ 45 Shotzi
___ 46 Scarlett
___ 47 Austin Theory
___ 48 Cora Jade
___ 49 Indi Hartwell
___ 50 "Dirty" Dominik Mysterio
`],
  ['Treasures of WWE Signatures — Print runs vary; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1', `
___ 2 Rikishi (#/99)
___ 4 Hulk Hogan (#/99)
___ 6 Kevin Nash (#/99)
___ 8 Trish Stratus (#/65)
___ 10 Kane (#/99)
___ 11 R-Truth (#/75)
___ 12 Eric Bischoff (#/99)
___ 15 Brutus "The Barber" Beefcake (#/99)
___ 16 DIESEL (#/99)
___ 17 Papa Shango (#/99)
___ 18 Bret "Hit Man" Hart (#/75)
___ 19 Dragon Lee (#/99)
___ 20 Big E (#/35)
___ 21 Zoey Stark (#/99)
___ 24 John Cena (#/99)
___ 25 Greg "The Hammer" Valentine (#/99)
___ 26 Lita (#/99)
___ 30 Diamond Dallas Page (#/88)
___ 32 Kurt Angle (#/99)
___ 36 Stacy Keibler (#/99)
___ 37 1-2-3 Kid (#/99)
___ 38 Cactus Jack (#/31)
___ 40 "Million Dollar Man" Ted DiBiase (#/99)
___ 42 Michelle McCool (#/99)
___ 43 Mighty Molly (#/99)
___ 44 Shawn Michaels (#/49)
___ 45 Rob Van Dam (#/99)
___ 46 Torrie Wilson (#/99)
___ 47 Alundra Blayze (#/99)
___ 48 Dude Love (#/28)
___ 50 Booker T (#/99)
`],
  ['Viewpoint Signatures — Print runs vary; Parallels: Holo Gold #/10; Platinum 1/1', `
___ 2 Eddy Thorpe (#/99)
___ 3 Hank Walker (#/84)
___ 4 Bronco Nima (#/84)
___ 5 Izzi Dame (#/84)
___ 6 Lucien Price (#/84)
___ 7 Ava (#/49)
___ 8 Channing "Stacks" Lorenzo (#/99)
___ 9 Tank Ledger (#/83)
___ 10 Malik Blade (#/84)
___ 12 Tatum Paxley (#/84)
___ 13 Nathan Frazer (#/84)
___ 14 Jakara Jackson (#/84)
___ 15 Trick Williams (#/99)
___ 18 Karmen Petrovic (#/77)
___ 19 Arianna Grace (#/84)
___ 22 Javier Bernal (#/99)
___ 23 Dani Palmer (#/84)
___ 24 Edris Enofe (#/99)
___ 25 Oro Mensah (#/99)
___ 26 Stevie Turner (#/99)
___ 27 Jaida Parker (#/84)
___ 29 Duke Hudson (#/84)
___ 30 Fallon Henley (#/84)
`],
  ["WWE's Greatest Signatures — Print runs vary; Parallels: Holo Silver #/25; Holo Gold #/10; Platinum 1/1", `
___ 1 John Cena (#/99)
___ 3 Lita (#/99)
___ 7 Kane (#/99)
___ 8 "Million Dollar Man" Ted DiBiase (#/99)
___ 9 Hulk Hogan (#/99)
___ 10 Kurt Angle (#/99)
___ 13 Stacy Keibler (#/99)
___ 15 Bret "Hit Man" Hart (#/49)
___ 17 Big E (#/35)
___ 18 Booker T (#/99)
___ 19 Shawn Michaels (#/55)
___ 21 Kevin Nash (#/99)
___ 23 Torrie Wilson (#/99)
___ 27 Diamond Dallas Page (#/75)
___ 28 Rikishi (#/99)
`],
]));

// ── 2024 PANINI WWE PHOTOGENIC ────────────────────────────────────────────────
setsHtml.push(makeSet('phg24', '2024', '2024 Panini PhotoGenic WWE', [
  ['Base Set #1–100 (Horizontal) — Parallels: Silver #/99; Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Wedges #/49; Swirl FOTL; Platinum 1/1', `
___ 1 Braun Strowman
___ 2 Alexa Bliss
___ 3 Bayley
___ 4 Sheamus
___ 5 Rey Mysterio
___ 6 LA Knight
___ 7 Grayson Waller
___ 8 Elton Prince
___ 9 "Hollywood" Hulk Hogan
___ 10 Zelina Vega
___ 11 Fit Finlay
___ 12 "Rowdy" Roddy Piper
___ 13 "Stone Cold" Steve Austin
___ 14 Pete Dunne
___ 15 MVP
___ 16 Lita
___ 17 Brutus Creed
___ 18 Finn Balor
___ 19 Johnny Gargano
___ 20 Kiana James
___ 21 Liv Morgan
___ 22 Rob Van Dam
___ 23 The Honky Tonk Man
___ 24 Sol Ruca
___ 25 CM Punk
___ 26 Jake Roberts
___ 27 Austin Theory
___ 28 Kevin Owens
___ 29 Jaida Parker
___ 30 Myles Borne
___ 31 Eddy Thorpe
___ 32 Izzi Dame
___ 33 Lucien Price
___ 34 Bronco Nima
___ 35 Dani Palmer
___ 36 Kelani Jordan
___ 37 Bray Wyatt
___ 38 D-Von Dudley
___ 39 Bobby Lashley
___ 40 Tiffany Stratton
___ 41 Naomi
___ 42 Jade Cargill
___ 43 Bianca Belair
___ 44 Carmelo Hayes
___ 45 Asuka
___ 46 Becky Lynch
___ 47 Drew McIntyre
___ 48 Ludwig Kaiser
___ 49 Tyler Bate
___ 50 Scarlett
___ 51 JD McDonagh
___ 52 Carlito
___ 53 AJ Styles
___ 54 Rezar
___ 55 Roxanne Perez
___ 56 Michael Hayes
___ 57 Tommaso Ciampa
___ 58 Roman Reigns
___ 59 Bruno Sammartino
___ 60 "Cowboy" Bob Orton
___ 61 Faarooq
___ 62 Ken Shamrock
___ 63 Earthquake
___ 64 Razor Ramon
___ 65 Brutus "The Barber" Beefcake
___ 66 Michelle McCool
___ 67 Tonga Loa
___ 68 Wade Barrett
___ 69 Cactus Jack
___ 70 Bret "Hit Man" Hart
___ 71 The Boogeyman
___ 72 Hulk Hogan
___ 73 Big E
___ 74 Baron Corbin
___ 75 Rhea Ripley
___ 76 Nikki Cross
___ 77 Arianna Grace
___ 78 Scott Steiner
___ 79 Trish Stratus
___ 80 Eve Torres
___ 81 Alundra Blayze
___ 82 IYO SKY
___ 83 X-Pac
___ 84 Brother Love
___ 85 Ricky "The Dragon" Steamboat
___ 86 Paul Bearer
___ 87 Batista
___ 88 Ridge Holland
___ 89 Nikkita Lyons
___ 90 Jey Uso
___ 91 Luke Gallows
___ 92 Kurt Angle
___ 93 Tama Tonga
___ 94 Chyna
___ 95 Gigi Dolin
___ 96 Dijak
___ 97 Bron Breakker
___ 98 Elektra Lopez
___ 99 Ilja Dragunov
___ 100 Lyra Valkyria
`],
  ['Base Set #101–200 (Vertical) — Parallels: Silver #/99; Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Wedges #/49; Swirl FOTL; Platinum 1/1', `
___ 101 Mick Foley
___ 102 The Rock
___ 103 Sami Zayn
___ 104 R-Truth
___ 105 Randy Orton
___ 106 Michin
___ 107 Maxxine Dupri
___ 108 Lexis King
___ 109 Lex Luger
___ 110 Kevin Nash
___ 111 "Dirty" Dominik Mysterio
___ 112 Kairi Sane
___ 113 Karl Anderson
___ 114 Torrie Wilson
___ 115 Xavier Woods
___ 116 The Miz
___ 117 Natalya
___ 118 MVP
___ 119 Otis
___ 120 Ricochet
___ 121 Ultimate Warrior
___ 122 Dragon Lee
___ 123 Undertaker
___ 124 Umaga
___ 125 Sycho Sid
___ 126 Gunther
___ 127 Karrion Kross
___ 128 Eddie Guerrero
___ 129 Dude Love
___ 130 Kofi Kingston
___ 131 Jakara Jackson
___ 132 Adriana Rizzo
___ 133 Karmen Petrovic
___ 134 Brinley Reece
___ 135 Riley Osborne
___ 136 Tank Ledger
___ 137 Wren Sinclair
___ 138 Bubba Ray Dudley
___ 139 Diamond Dallas Page
___ 140 Candice LeRae
___ 141 Solo Sikoa
___ 142 Piper Niven
___ 143 Kit Wilson
___ 144 Andrade
___ 145 Chelsea Green
___ 146 Indi Hartwell
___ 147 Alba Fyre
___ 148 "The American Nightmare" Cody Rhodes
___ 149 Bronson Reed
___ 150 Chad Gable
___ 151 Dakota Kai
___ 152 Damian Priest
___ 153 Seth "Freakin" Rollins
___ 154 Shayna Baszler
___ 155 Odyssey Jones
___ 156 Kayden Carter
___ 157 Katana Chance
___ 158 Andre Chase
___ 159 Ava
___ 160 Booker T
___ 161 Shawn Michaels
___ 162 Lash Legend
___ 163 Joe Gacy
___ 164 Trick Williams
___ 165 JBL
___ 166 Carmella
___ 167 Cora Jade
___ 168 Jacy Jayne
___ 169 IRS
___ 170 The Sandman
___ 171 Oba Femi
___ 172 Mankind
___ 173 "Million Dollar Man" Ted DiBiase
___ 174 Stacy Keibler
___ 175 Triple H
___ 176 The Hurricane
___ 177 Ron Simmons
___ 178 Molly Holly
___ 179 Blair Davenport
___ 180 Shotzi
___ 181 Tegan Nox
___ 182 Tatum Paxley
___ 183 "Ravishing" Rick Rude
___ 184 Sid Vicious
___ 185 John Cena
___ 186 Miss Elizabeth
___ 187 The Godfather
___ 188 Rikishi
___ 189 Vader
___ 190 Sherri Martel
___ 191 Big Boss Man
___ 192 DIESEL
___ 193 British Bulldog
___ 194 "Mr. Perfect" Curt Hennig
___ 195 Iron Sheik
___ 196 Jim "The Anvil" Neidhart
___ 197 The Great Khali
___ 198 Jimmy Uso
___ 199 Wes Lee
___ 200 Yokozuna
`],
  ['Championship Feels — Parallels: Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Platinum 1/1', `
___ 1 "Stone Cold" Steve Austin
___ 2 John Cena
___ 3 The Rock
___ 4 "The Fiend" Bray Wyatt
___ 5 "The American Nightmare" Cody Rhodes
___ 6 Sami Zayn
___ 7 Damian Priest
___ 8 Becky Lynch
___ 9 Bayley
___ 10 Roxanne Perez
`],
  ['Down The Ramp — Parallels: Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Platinum 1/1', `
___ 1 Shawn Michaels
___ 2 John Cena
___ 3 "Stone Cold" Steve Austin
___ 4 The Rock
___ 5 Shinsuke Nakamura
___ 6 "The Demon" Finn Balor
___ 7 Undertaker
___ 8 Charlotte Flair
___ 9 Becky Lynch
___ 10 Rhea Ripley
___ 11 Bret "Hit Man" Hart
___ 12 Triple H
___ 13 Randy Orton
___ 14 LA Knight
___ 15 "Rowdy" Roddy Piper
`],
  ['Dual Autographs — Serial #/25; Parallels: Gold #/10; Swirl FOTL #/5; Platinum 1/1', `
___ 1 AJ Styles / "The American Nightmare" Cody Rhodes
___ 2 Jade Cargill / Bianca Belair
___ 3 CM Punk / Drew McIntyre
___ 4 "Dirty" Dominik Mysterio / Becky Lynch
___ 5 Undertaker / Michelle McCool
___ 6 The Honky Tonk Man / Ricky "The Dragon" Steamboat
___ 7 Rezar / Akam
___ 8 William Regal / Fit Finlay
___ 9 Booker T / The Boogeyman
___ 10 Shinsuke Nakamura / Sami Zayn
`],
  ['Immortalized — Parallels: Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Platinum 1/1', `
___ 1 Paul Bearer
___ 2 Booker T
___ 3 Rey Mysterio
___ 4 Hulk Hogan
___ 5 Undertaker
___ 6 "Stone Cold" Steve Austin
___ 7 Alundra Blayze
___ 8 Eddie Guerrero
___ 9 Shawn Michaels
___ 10 Razor Ramon
___ 11 Paul Heyman
___ 12 Lita
___ 13 Dusty Rhodes
___ 14 Mick Foley
___ 15 Stacy Keibler
`],
  ['Photo Finish — Parallels: Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Platinum 1/1', `
___ 1 Randy Orton
___ 2 The Rock
___ 3 "Stone Cold" Steve Austin
___ 4 Kevin Nash
___ 5 Trish Stratus
___ 6 Lita
___ 7 Drew McIntyre
___ 8 Nikkita Lyons
___ 9 Rhea Ripley
___ 10 Roman Reigns
___ 11 Shawn Michaels
___ 12 Sol Ruca
___ 13 AJ Styles
___ 14 CM Punk
___ 15 Kevin Owens
`],
  ['Picture Perfect Signatures — Parallels: Maze #/25; Gold #/10; Fireworks #/5; Swirl FOTL; Platinum 1/1', `
___ 1 Diamond Dallas Page
___ 2 Dragon Lee
___ 3 Michelle McCool
___ 4 Karrion Kross
___ 5 The Boogeyman
___ 6 Nia Jax
___ 7 Stacy Keibler
___ 9 Sol Ruca
___ 10 Bianca Belair
___ 11 Grayson Waller
___ 12 IYO SKY
___ 14 Kurt Angle
___ 15 The Sandman
___ 16 Roman Reigns
___ 18 AJ Styles
___ 19 Trick Williams
___ 20 Bret "Hit Man" Hart
___ 21 Iron Sheik
___ 22 Jey Uso
___ 23 Rob Van Dam
___ 24 Lita
___ 25 William Regal
___ 26 Seth "Freakin" Rollins
___ 27 Lola Vice
___ 28 Asuka
___ 29 Austin Theory
___ 30 Charlotte Flair
___ 32 Kairi Sane
___ 34 Mankind
___ 35 John Cena
___ 36 Shotzi
___ 37 Oba Femi
___ 38 Becky Lynch
___ 39 Carmelo Hayes
___ 40 Damian Priest
`],
  ['Progressions — Parallels: Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Platinum 1/1', `
___ 1 Seth "Freakin" Rollins
___ 2 Drew McIntyre
___ 3 Triple H
___ 4 Mick Foley
___ 5 "The American Nightmare" Cody Rhodes
___ 6 Bray Wyatt
___ 7 Hulk Hogan
___ 8 John Cena
___ 9 The Rock
___ 10 Undertaker
___ 11 Rey Mysterio
___ 12 CM Punk
___ 13 The Miz
___ 14 Shawn Michaels
___ 15 Roman Reigns
`],
  ['Step By Step — Parallels: Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Platinum 1/1', `
___ 1 Damian Priest
___ 2 CM Punk
___ 3 Kofi Kingston
___ 4 Shawn Michaels
___ 5 D-Von Dudley
___ 6 Bubba Ray Dudley
___ 7 Eddie Guerrero
___ 8 Seth "Freakin" Rollins
___ 9 Razor Ramon
___ 10 IYO SKY
___ 11 Liv Morgan
___ 12 Alexa Bliss
___ 13 Asuka
___ 14 Rob Van Dam
___ 15 Bayley
`],
  ['Superstar Signatures — Parallels: Maze #/25; Gold #/10; Fireworks #/5; Swirl FOTL; Platinum 1/1', `
___ 1 "Million Dollar Man" Ted DiBiase
___ 2 Tiffany Stratton
___ 3 Batista
___ 4 Hulk Hogan
___ 5 Drew McIntyre
___ 6 Scarlett
___ 7 Kevin Nash
___ 8 Booker T
___ 9 Rey Mysterio
___ 10 The Miz
___ 11 "The American Nightmare" Cody Rhodes
___ 12 "Stone Cold" Steve Austin
___ 13 Braun Strowman
___ 15 Gunther
___ 16 Shawn Michaels
___ 17 Kofi Kingston
___ 18 Finn Balor
___ 19 Rikishi
___ 20 Trish Stratus
___ 21 Alexa Bliss
___ 22 Bron Breakker
___ 23 Carlito
___ 24 Maxxine Dupri
___ 25 Jade Cargill
___ 26 The Godfather
___ 27 LA Knight
___ 28 Kevin Owens
___ 29 Sami Zayn
___ 30 Lexis King
___ 31 Bayley
___ 32 Cora Jade
___ 33 CM Punk
___ 35 Jimmy Uso
___ 36 Undertaker
___ 37 Liv Morgan
___ 38 Rhea Ripley
___ 39 Shinsuke Nakamura
___ 40 Nikkita Lyons
___ 41 Iron Sheik
___ 42 Gigi Dolin
___ 43 "Dirty" Dominik Mysterio
___ 45 Kane
___ 48 Torrie Wilson
___ 49 Solo Sikoa
___ 50 Roxanne Perez
`],
  ['Zero Gravity — Parallels: Diamond #/75; Maze #/25; Gold #/10; Fireworks #/5; Platinum 1/1', `
___ 1 Rey Mysterio
___ 2 Dragon Lee
___ 3 AJ Styles
___ 4 Kofi Kingston
___ 5 Ricochet
___ 6 Xavier Woods
___ 7 Charlotte Flair
___ 8 1-2-3 Kid
___ 9 Eddie Guerrero
___ 10 Lita
___ 11 Alexa Bliss
___ 12 Kairi Sane
___ 13 IYO SKY
___ 14 The Hurricane
___ 15 Shawn Michaels
`],
]));

// ── 2024 PANINI WWE PRIZM ─────────────────────────────────────────────────────
setsHtml.push(makeSet('prz24', '2024', '2024 Panini Prizm WWE', [
  ['Base Set #1–100 (Horizontal) — Parallels: Silver; Red; Blue; Purple; Orange; Teal; Mojo; Green; Ice; Green Ice; Green Pulsar; Red Pulsar; Blue Pulsar; Ruby Wave; Gold; Lucky Envelopes; WrestleMania; Under Card; White Sparkle; Black; Black Finite; Shimmer FOTL; Premium Box Set', `
___ 1 Trick Williams
___ 2 Jaida Parker
___ 3 Kiana James
___ 4 "Dirty" Dominik Mysterio
___ 5 Myles Borne
___ 6 Braun Strowman
___ 7 Piper Niven
___ 8 Channing "Stacks" Lorenzo
___ 9 Seth "Freakin" Rollins
___ 10 Dusty Rhodes
___ 11 Ultimate Warrior
___ 12 Jakara Jackson
___ 13 Brian Pillman
___ 14 "Stone Cold" Steve Austin
___ 15 Natalya
___ 16 Bray Wyatt
___ 17 Randy Orton
___ 18 Charlie Dempsey
___ 19 Sherri Martel
___ 20 Eddie Guerrero
___ 21 Umaga
___ 22 JD McDonagh
___ 23 LA Knight
___ 24 Akam
___ 25 Nathan Frazer
___ 26 Bret "Hit Man" Hart
___ 27 Raquel Rodriguez
___ 28 Charlotte Flair
___ 29 Shinsuke Nakamura
___ 30 Finn Balor
___ 31 Undertaker
___ 32 Jey Uso
___ 33 Lex Luger
___ 34 Alba Fyre
___ 35 Nick Aldis
___ 36 Brinley Reece
___ 37 Rhea Ripley
___ 38 Chyna
___ 39 Sol Ruca
___ 40 Gigi Dolin
___ 41 Tama Tonga
___ 42 Joe Gacy
___ 43 Lucien Price
___ 44 Andrade
___ 45 Nikkita Lyons
___ 46 Bron Breakker
___ 47 Riley Osborne
___ 48 Cora Jade
___ 49 Solo Sikoa
___ 50 Gunther
___ 51 Shawn Spears
___ 52 Johnny Gargano
___ 53 Ludwig Kaiser
___ 54 Angelo Dawkins
___ 55 Nikolai Volkoff
___ 56 Bronco Nima
___ 57 "Rowdy" Roddy Piper
___ 58 Damian Priest
___ 59 Sycho Sid
___ 60 The Honky Tonk Man
___ 61 Yokozuna
___ 62 Kane
___ 63 Lyra Valkyria
___ 64 Asuka
___ 65 Noam Dar
___ 66 Bronson Reed
___ 67 R-Truth
___ 68 Dani Palmer
___ 69 Tank Ledger
___ 70 Hulk Hogan
___ 71 Zelina Vega
___ 72 Karrion Kross
___ 73 Mark Coffey
___ 74 Great Muta
___ 75 Oro Mensah
___ 76 Brutus Creed
___ 77 Sami Zayn
___ 78 Dexter Lumis
___ 79 The Godfather
___ 80 Indi Hartwell
___ 81 Zoey Stark
___ 82 Kayden Carter
___ 83 Meiko Satomura
___ 84 Batista
___ 85 Otis
___ 86 Carlito
___ 87 Jake Roberts
___ 88 DIESEL
___ 89 Thea Hail
___ 90 IYO SKY
___ 91 Adriana Rizzo
___ 92 Kevin Owens
___ 93 MVP
___ 94 Bayley
___ 95 Paul Ellering
___ 96 Carmelo Hayes
___ 97 Scrypts
___ 98 Drew McIntyre
___ 99 Tony D'Angelo
___ 100 Jacy Jayne
`],
  ['Base Set #101–200 (Vertical) — Parallels: Silver; Red; Blue; Purple; Orange; Teal; Mojo; Green; Ice; Green Ice; Green Pulsar; Red Pulsar; Blue Pulsar; Ruby Wave; Gold; Lucky Envelopes; WrestleMania; Under Card; White Sparkle; Black; Black Finite; Shimmer FOTL; Premium Box Set', `
___ 101 Roxanne Perez
___ 102 Chad Gable
___ 103 Odyssey Jones
___ 104 Earthquake
___ 105 The Sandman
___ 106 Ivy Nile
___ 107 Karmen Petrovic
___ 108 Adam Pearce
___ 109 Malik Blade
___ 110 Baron Corbin
___ 111 Omos
___ 112 Chelsea Green
___ 113 Santos Escobar
___ 114 Eddy Thorpe
___ 115 Tiffany Stratton
___ 116 Izzi Dame
___ 117 Katana Chance
___ 118 AJ Styles
___ 119 Dude Love
___ 120 Becky Lynch
___ 121 Paul Heyman
___ 122 CM Punk
___ 123 Scarlett
___ 124 Elton Prince
___ 125 Tommaso Ciampa
___ 126 Jade Cargill
___ 127 Kelani Jordan
___ 128 Akira Tozawa
___ 129 Maxxine Dupri
___ 130 Bianca Belair
___ 131 Pete Dunne
___ 132 "The American Nightmare" Cody Rhodes
___ 133 Shayna Baszler
___ 134 Fallon Henley
___ 135 Triple H
___ 136 Jimmy Uso
___ 137 Ken Shamrock
___ 138 Alexa Bliss
___ 139 Michin
___ 140 Blair Davenport
___ 141 Rey Mysterio
___ 142 Dakota Kai
___ 143 Sheamus
___ 144 Giovanni Vinci
___ 145 Brother Love
___ 146 Joe Coffey
___ 147 Kofi Kingston
___ 148 Andre Chase
___ 149 Miss Elizabeth
___ 150 "The All Mighty" Bobby Lashley
___ 151 Rezar
___ 152 Diamond Dallas Page
___ 153 Shotzi
___ 154 Grayson Waller
___ 155 Wendy Choo
___ 156 John Cena
___ 157 Kurt Angle
___ 158 X-Pac
___ 159 Montez Ford
___ 160 Booker T
___ 161 Ricochet
___ 162 Dijak
___ 163 Terry Funk
___ 164 The Great Khali
___ 165 Wes Lee
___ 166 Josh Briggs
___ 167 Lexis King
___ 168 Apollo Crews
___ 169 Naomi
___ 170 Bubba Ray Dudley
___ 171 Rikishi
___ 172 Dragon Lee
___ 173 Tatanka
___ 174 Harley Race
___ 175 William Regal
___ 176 Julius Creed
___ 177 Liv Morgan
___ 178 Austin Theory
___ 179 Nia Jax
___ 180 Terry Gordy
___ 181 Road Dogg
___ 182 Duke Hudson
___ 183 The Miz
___ 184 Ilja Dragunov
___ 185 Wolfgang
___ 186 Kairi Sane
___ 187 Lola Vice
___ 188 Ava
___ 189 Nikki Cross
___ 190 Candice LeRae
___ 191 Roman Reigns
___ 192 D-Von Dudley
___ 193 The Rock
___ 194 Isla Dawn
___ 195 Wren Sinclair
___ 196 Karl Anderson
___ 197 Luke Gallows
___ 198 Xavier Woods
___ 199 Oba Femi
___ 200 Carmella
`],
  ['Champion Signatures — Parallels: Green; Red; Blue; Mojo; Green Pulsar; Under Card; Gold; White Sparkle; Black', `
___ 1 Drew McIntyre
___ 2 Finn Balor
___ 3 Seth "Freakin" Rollins
___ 4 Alexa Bliss
___ 5 Bianca Belair
___ 6 Charlotte Flair
___ 7 Rey Mysterio
___ 8 Bron Breakker
___ 9 Asuka
___ 10 Bayley
`],
  ['Iconic Rivals Dual Autographs — Serial #/25; Parallels: Gold; Black', `
___ 1 Roman Reigns / LA Knight
___ 2 Undertaker / Hulk Hogan
___ 3 Seth "Freakin" Rollins / Drew McIntyre
___ 4 Batista / John Cena
___ 5 Seth "Freakin" Rollins / "The American Nightmare" Cody Rhodes
___ 6 "Stone Cold" Steve Austin / Kurt Angle
___ 7 Becky Lynch / Trish Stratus
___ 8 CM Punk / John Cena
___ 9 Bron Breakker / Carmelo Hayes
___ 10 Bret "Hit Man" Hart / DIESEL
`],
  ['Legendary Signatures — Parallels: Green; Red; Blue; Mojo; Green Pulsar; Under Card; Gold; White Sparkle; Black', `
___ 1 The Honky Tonk Man
___ 2 Dude Love
___ 3 Michelle McCool
___ 4 Torrie Wilson
___ 5 Road Dogg
___ 6 Diamond Dallas Page
___ 8 Jerry Lawler
___ 9 Rikishi
___ 10 Kevin Nash
___ 11 Kurt Angle
___ 12 Stacy Keibler
___ 13 Ricky "The Dragon" Steamboat
___ 14 Kane
___ 15 Rob Van Dam
___ 16 "Million Dollar Man" Ted DiBiase
___ 17 Booker T
___ 18 Bret "Hit Man" Hart
___ 19 Brother Love
___ 20 Lita
`],
  ['Sensational Signatures — Parallels: Green; Red; Blue; Mojo; Green Pulsar; Under Card; Gold; White Sparkle; Black', `
___ 1 Oro Mensah
___ 2 Dante Chen
___ 3 Solo Sikoa
___ 4 Fallon Henley
___ 5 Tiffany Stratton
___ 6 Jerry Lawler
___ 7 Lash Legend
___ 8 Alundra Blayze
___ 9 Molly Holly
___ 10 Bronco Nima
___ 11 Ricochet
___ 12 Don Muraco
___ 13 Afa
___ 14 Gerald Brisco
___ 15 Trick Williams
___ 16 Jimmy Hart
___ 17 Lexis King
___ 18 Great Muta
___ 19 Montez Ford
___ 20 Brooks Jensen
___ 21 Piper Niven
___ 22 Dragon Lee
___ 23 Tank Ledger
___ 24 Grayson Waller
___ 25 Tyler Bate
___ 26 Joe Coffey
___ 27 Lola Vice
___ 28 Andre Chase
___ 29 Mosh
___ 30 Brutus "The Barber" Beefcake
___ 31 Roxanne Perez
___ 32 Duke Hudson
___ 33 Theodore Long
___ 34 Greg "The Hammer" Valentine
___ 35 Valentina Feroz
___ 36 John "Bradshaw" Layfield
___ 37 Lucien Price
___ 38 Angelo Dawkins
___ 39 Mr. Stone
___ 40 Bubba Ray Dudley
___ 41 Tatanka
___ 42 D-Von Dudley
___ 43 Karrion Kross
___ 44 Hank Walker
___ 45 Wendy Choo
___ 46 Josh Briggs
___ 47 Luke Gallows
___ 48 Arianna Grace
___ 49 Nathan Frazer
___ 50 Bushwhacker Luke
___ 51 Santos Escobar
___ 52 Eddy Thorpe
___ 53 Tatum Paxley
___ 54 IYO SKY
___ 55 William Regal
___ 56 Kairi Sane
___ 57 Lyra Valkyria
___ 58 Austin Theory
___ 59 Nikki Cross
___ 60 Carlito
___ 61 Scarlett
___ 62 Edris Enofe
___ 63 The Godfather
___ 64 Izzi Dame
___ 65 Wolfgang
___ 66 Karl Anderson
___ 67 Malik Blade
___ 68 Ava
___ 69 Nikkita Lyons
___ 70 Channing "Stacks" Lorenzo
___ 71 Shotzi
___ 72 Elektra Lopez
___ 73 The Sandman
___ 74 Jaida Parker
___ 75 X-Pac
___ 76 Akam
___ 77 Mark Coffey
___ 78 Axiom
___ 79 Noam Dar
___ 80 Charlie Dempsey
___ 81 Sika
___ 82 Eric Bischoff
___ 83 Thea Hail
___ 84 Jakara Jackson
___ 85 Zelina Vega
___ 86 Kelani Jordan
___ 87 Meiko Satomura
___ 88 Blair Davenport
___ 89 Oba Femi
___ 90 Damon Kemp
___ 91 Sol Ruca
___ 92 Faarooq
___ 93 Thrasher
___ 94 Paul Ellering
___ 95 Tony D'Angelo
___ 96 Kiana James
___ 97 Michael Hayes
___ 98 Boa
___ 99 Omos
___ 100 Dani Palmer
`],
  ['Superstar Autographs — Parallels: Green; Red; Blue; Mojo; Green Pulsar; Under Card; Gold; White Sparkle; Black', `
___ 1 Sami Zayn
___ 2 Bronson Reed
___ 3 Big E
___ 4 Damian Priest
___ 5 Sheamus
___ 6 Liv Morgan
___ 7 Xavier Woods
___ 8 Gigi Dolin
___ 9 Braun Strowman
___ 10 Wes Lee
___ 11 The Miz
___ 12 Carmella
___ 13 Jimmy Uso
___ 14 "Dirty" Dominik Mysterio
___ 15 Baron Corbin
___ 16 Natalya
___ 17 Carmelo Hayes
___ 18 Jacy Jayne
___ 19 Jey Uso
___ 20 Ilja Dragunov
___ 21 "The All Mighty" Bobby Lashley
___ 22 Chad Gable
___ 23 Kevin Owens
___ 24 Gunther
___ 25 Scrypts
___ 26 Nia Jax
___ 27 Cora Jade
___ 28 Joe Gacy
___ 29 Rhea Ripley
___ 30 Apollo Crews
___ 31 AJ Styles
___ 32 Chelsea Green
___ 33 LA Knight
___ 34 Kofi Kingston
___ 35 Dijak
`],
  ['Throwback Signatures — Parallels: Green; Red; Blue; Mojo; Green Pulsar; Under Card; Gold; White Sparkle; Black', `
___ 1 "Stone Cold" Steve Austin
___ 2 Becky Lynch
___ 3 Shawn Michaels
___ 4 CM Punk
___ 5 Hulk Hogan
___ 6 Trish Stratus
___ 7 John Cena
___ 8 Roman Reigns
___ 9 Undertaker
___ 10 "The American Nightmare" Cody Rhodes
`],
  ['Emergent — Parallels: Silver; Green; Mojo; Green Pulsar; Under Card; Gold; Black', `
___ 1 Roxanne Perez
___ 2 Bron Breakker
___ 3 Wes Lee
___ 4 Thea Hail
___ 5 Solo Sikoa
___ 6 "Dirty" Dominik Mysterio
___ 7 Trick Williams
___ 8 Lexis King
___ 9 Liv Morgan
___ 10 Carmelo Hayes
___ 11 Tatum Paxley
___ 12 Rhea Ripley
___ 13 Dragon Lee
___ 14 Tiffany Stratton
___ 15 Jade Cargill
___ 16 Oba Femi
___ 17 Cora Jade
___ 18 Nikkita Lyons
___ 19 Austin Theory
___ 20 Lola Vice
`],
  ['Prizmatic Entrances — Parallels: Silver; Green; Mojo; Green Pulsar; Under Card; Gold; Black', `
___ 1 Bret "Hit Man" Hart
___ 2 The Boogeyman
___ 3 The Miz
___ 4 Bray Wyatt
___ 5 R-Truth
___ 6 Damian Priest
___ 7 Undertaker
___ 8 The Godfather
___ 9 Liv Morgan
___ 10 Kane
___ 11 Lex Luger
___ 12 The Rock
___ 13 Triple H
___ 14 Batista
___ 15 John "Bradshaw" Layfield
___ 16 Razor Ramon
___ 17 "Hollywood" Hulk Hogan
___ 18 Kofi Kingston
___ 19 Rey Mysterio
___ 20 Alexa Bliss
`],
  ['Rumble Performances — Parallels: Silver; Green; Mojo; Green Pulsar; Under Card; Gold; Black', `
___ 1 Hulk Hogan
___ 2 Rey Mysterio
___ 3 Yokozuna
___ 4 "The American Nightmare" Cody Rhodes
___ 5 "The American Nightmare" Cody Rhodes
___ 6 Kane
___ 7 Chyna
___ 8 Triple H
___ 9 DIESEL
___ 10 Braun Strowman
___ 11 Roman Reigns
___ 12 "Mr. Perfect" Curt Hennig
___ 13 Shawn Michaels
___ 14 Rhea Ripley
___ 15 AJ Styles
___ 16 "Stone Cold" Steve Austin
___ 17 Becky Lynch
___ 18 Bianca Belair
___ 19 John Cena
___ 20 Gunther
`],
  ['WrestleMania Moments — Parallels: Silver; Green; Mojo; Green Pulsar; Under Card; Gold; Black', `
___ 1 Rhea Ripley
___ 2 DIESEL
___ 4 Hulk Hogan
___ 5 Undertaker
___ 6 Bret "Hit Man" Hart
___ 7 "Stone Cold" Steve Austin
___ 8 Shawn Michaels
___ 9 John Cena
___ 10 "Stone Cold" Steve Austin
___ 11 Roman Reigns
___ 12 Mr. T
___ 13 Undertaker
___ 14 Ultimate Warrior
___ 15 Hulk Hogan
___ 16 Seth "Freakin" Rollins
___ 17 Roman Reigns
___ 18 "Stone Cold" Steve Austin
___ 19 Hulk Hogan
___ 21 Hulk Hogan
___ 22 Undertaker
___ 23 Ultimate Warrior
___ 24 CM Punk
___ 25 "Stone Cold" Steve Austin
___ 26 Hulk Hogan
___ 27 Roman Reigns
___ 28 Becky Lynch
___ 29 John Cena
___ 31 Rey Mysterio
___ 32 Undertaker
___ 33 Undertaker
___ 34 Bret "Hit Man" Hart
___ 35 Razor Ramon
___ 36 Roman Reigns
___ 37 Undertaker
___ 38 John Cena
___ 39 John Cena
___ 40 "The American Nightmare" Cody Rhodes
`],
  ['Color Blast', `
___ 1 Jade Cargill
___ 2 CM Punk
___ 3 Bret "Hit Man" Hart
___ 4 Liv Morgan
___ 5 Roman Reigns
___ 6 LA Knight
___ 7 Shawn Michaels
___ 8 The Rock
___ 9 "The American Nightmare" Cody Rhodes
___ 10 "Stone Cold" Steve Austin
`],
  ['Black Color Blast', `
___ 1 Rhea Ripley
___ 2 Roman Reigns
___ 3 "Hollywood" Hulk Hogan
___ 4 Undertaker
___ 5 "The Fiend" Bray Wyatt
`],
]));

// ── INJECTION ─────────────────────────────────────────────────────────────────
const htmlPath = path.join(__dirname, 'wrestling', 'panini-era.html');
let content = fs.readFileSync(htmlPath, 'utf8');
const inner = setsHtml.join('\n\n');
// Always replace the full checklist-panel block so re-runs are idempotent
content = content.replace(
  /<div class="checklist-panel">[\s\S]*?<\/div>\s*(?=\n<\/div>\s*\n<footer)/,
  `<div class="checklist-panel">\n${inner}\n  </div>\n`
);
fs.writeFileSync(htmlPath, content, 'utf8');
console.log(`Injected ${setsHtml.length} sets into panini-era.html`);
