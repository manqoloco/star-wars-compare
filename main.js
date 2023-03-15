// lagrar info för karaktärer från apiet

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

let charSelector1 = document.getElementById("char1");

let charSelector2 = document.getElementById("char2");

// ha id på varje rad i selektorn, det idt för att söka mer info om vad jag valt

async function getCharacter(id) {
  const response = await fetch(`https://swapi.dev/api/people/${id}`, {
    method: "GET",
  });
  const data = await response.json(); // Extracting data as a JSON Object from the response
  return data;
}

// dropdown 

getResponse().then((response) => {
  let id = 1;
  response.forEach((char) => {
    const opt1 = document.createElement("option");
    opt1.value = id;
    opt1.innerText = char.name;
    charSelector1.append(opt1);
    const opt2 = document.createElement("option");
    opt2.value = id;
    opt2.innerText = char.name;
    charSelector2.append(opt2);
    id++;
  });
});

// function when you click the button
function clickBtn() {
  const attributes = [
    { name: "name", compare: false },
    { name: "gender", compare: true, compEqual: true },
    { name: "mass", compare: true },
    { name: "height", compare: true },
    { name: "hairColor", compare: true, compEqual: true },
    { name: "skinColor", compare: true, compEqual: true },
    { name: "eyeColor", compare: false },
    { name: "numFilms", compare: true }
  ];
  let row1 = document.getElementById("char1Row");
  let row2 = document.getElementById("char2Row");

  //character id, compare, hämta ut data på vad jag har valt
  const opt1 = document.getElementById("char1");
  const opt2 = document.getElementById("char2");

  // tr's children (td)
  row1.children[8].innerHTML = `<img src="images/${opt1.value}.jpeg"/>`;
  row2.children[8].innerHTML = `<img src="images/${opt2.value}.jpeg"/>`;

  // skapar upp karaktär baserat på responsen, opt.val vilket karaktärl

  getCharacter(opt1.value).then((response1) => {
    char1 = new Character(response1);
    for (var i = 0; i < attributes.length; i++) {
      row1.children[i].innerHTML = char1[attributes[i].name];
    }
    getCharacter(opt2.value).then((response2) => {
      char2 = new Character(response2);
      for (var i = 0; i < attributes.length; i++) {
        row2.children[i].innerHTML = char2[attributes[i].name];
      }
      for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].compare) {
          if (
            parseInt(char1[attributes[i].name]) >
            parseInt(char2[attributes[i].name])
          ) {
            row1.children[i].classList.add("bigger");
            row2.children[i].classList.remove("bigger");
          } else if (
            parseInt(char1[attributes[i].name]) <
            parseInt(char2[attributes[i].name])
          ) {
            row2.children[i].classList.add("bigger");
            row1.children[i].classList.remove("bigger");
          }
          else {
            row1.children[i].classList.remove("bigger");
            row2.children[i].classList.remove("bigger");
          }
        }
        // kollar även de med compEqual
        if (attributes[i].compEqual) {
          console.log(char1[attributes[i].name]);
          console.log(char2[attributes[i].name]);
          if (char1[attributes[i].name] === char2[attributes[i].name]) {
            row1.children[i].classList.add("equal");
            row2.children[i].classList.add("equal");
          }
          else {
            row1.children[i].classList.remove("equal");
            row2.children[i].classList.remove("equal");
          }

        }
      }
    });
  });
}

