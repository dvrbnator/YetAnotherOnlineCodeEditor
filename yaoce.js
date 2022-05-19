let code_editor;

let default_theme = "monokai";
let default_language = "c_cpp";

// User Selected Language
// and it's correspoding Version of the Compilor
// For API request
let version;
let language;
// End

window.onload = function () {
  code_editor = ace.edit("code_editor");
  code_editor.setTheme("ace/theme/" + default_theme);
  code_editor.session.setMode("ace/mode/" + default_language);
};

// Function to change the Code Edito Theme Selected By the User
function changeTheme() {
  let theme = document.getElementById("themes").value;

  //   console.log(theme);

  code_editor.setTheme("ace/theme/" + theme);
}

// Function to change the Language
// in the Editor and API Request Details
function changeLanguage() {
  // For Editor
  language = document.getElementById("language").value;
  code_editor.session.setMode("ace/mode/" + language);

  // For API Details
  if (language == "c_cpp") {
    language = "c++";
  }
  //   Funcion Call to Fetch the Compilor Version of the Corresponding Language
  getVersion();
}

// Function to Display the Output
// Added at 19/05/2022
async function displayOutput() {
  let code = code_editor.getSession().getValue();
  let args = document.getElementById("args").value;

  const url = `https://emkc.org/api/v2/piston/execute`;
  console.log(code, version);
  const data = {
    language: language,
    version: version,
    files: [
      {
        content: code,
      },
    ],
    args: args,
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  const json = await response.json();
  console.log(json.run.output);
  document.getElementById("output_textarea").textContent = json.run.output;
}

// Function to get the version of the coresponding language
// Added at 19/05/2022
async function getVersion() {
  let response = await fetch("https://emkc.org/api/v2/piston/runtimes");
  let json = await response.json();
  json.forEach((element) => {
    if (element.language == language) {
      version = element.version;
    }
  });
}

//Codex Repo
//https://github.com/Jaagrav/CodeX

//Codex Api
//https://codexweb.netlify.app/.netlify/functions/enforceCode
