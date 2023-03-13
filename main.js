class Character {
  constructor(obj) {
    this.name = obj.name;
    this.gender = obj.gender;
    this.height = obj.height;
    this.mass = obj.mass;
    this.hairColor = obj.hair_color;
    this.skinColor = obj.skin_color;
    this.eyeColor = obj.eye_color;
    this.numFilms = obj.films.length;
  }
}

async function getResponse() {
  const response = await fetch("https://swapi.dev/api/people", {
    method: "GET",
  });
  const data = await response.json(); // Extracting data as a JSON Object from the response
  return data.results;
}

let char1 = document.getElementById("char1");

let char2 = document.getElementById("char2");

async function getCharacter(id) {
  const response = await fetch(`https://swapi.dev/api/people/${id}`, {
    method: "GET",
  });
  const data = await response.json(); // Extracting data as a JSON Object from the response
  return data;
}

getResponse().then((response) => {
  let id = 1;
  response.forEach((char) => {
    const opt1 = document.createElement("option");
    opt1.value = id;
    opt1.innerText = char.name;
    char1.append(opt1);
    const opt2 = document.createElement("option");
    opt2.value = id;
    opt2.innerText = char.name;
    char2.append(opt2);
    id++;
  });
});

// function when you click the button
function clickBtn() {
  const attributes = [
    "name",
    "gender",
    "mass",
    "height",
    "hairColor",
    "skinColor",
    "eyeColor",
    "numFilms",
  ];
  //character id, compare
  const opt1 = document.getElementById("char1");
  let char1 = null;
  getCharacter(opt1.value).then((response) => {
    char1 = new Character(response);

    console.log(char1);
    let row = document.getElementById("char1Row");

    for (var i = 0; i < attributes.length; i++) {
      row.children[i].innerHTML = char1[attributes[i]];
    }
  });

  const opt2 = document.getElementById("char2");
  let char2 = null;
  getCharacter(opt2.value).then((response) => {
    char2 = new Character(response);

    console.log(char2);
    let row = document.getElementById("char2Row");

    for (var i = 0; i < attributes.length; i++) {
      row.children[i].innerHTML = char2[attributes[i]];
    }
  });

  //document.getElementById("nameRow").children[1].text = char1.name;
}

// 7 rader med första karaktärens hårfärg osv o andra karaktärens attribut
// under själva select, när man tryck på compare
//

/* 
if else sats för vilken bild karaktären ska ha? 
lägg till en bild till karaktären

if char1 = 


picture urls
luke: https://cdn.vox-cdn.com/thumbor/gwoIXENtTU3yoKdaaymm_rTFfrY=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22182522/luke_jabbas_palace.jpg
darth vader: https://static.feber.se/article_images/50/48/66/504866.jpg
r2d2: https://www.heromic.se/products/1159/115976/6273acd22e90e.jpg
leia: https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Princess_Leia%27s_characteristic_hairstyle.jpg/220px-Princess_Leia%27s_characteristic_hairstyle.jpg
c3po: https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/400372/c-3po_star-wars_gallery_62881a106218c.jpg
beru whitesun lars: https://static.wikia.nocookie.net/shaniverse/images/d/df/Beru.jpg/revision/latest?cb=20200819151847
owen lars: https://static.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png/revision/latest?cb=20171108050140
r5-d4: https://static.wikia.nocookie.net/starwars/images/2/2c/R5d4.jpg/revision/latest?cb=20080404200713
biggs darklighter: https://static.wikia.nocookie.net/swfanon/images/5/57/BiggsDarklighter.jpg/revision/latest?cb=20120324222406
obiwan kenobi: https://lumiere-a.akamaihd.net/v1/images/628cdaa1dbbde50001de0bd3-image_6c311046.jpeg?region=0,0,1536,864


compare characters? 

if char1 === char2 
alert same character

if char1 
*/
