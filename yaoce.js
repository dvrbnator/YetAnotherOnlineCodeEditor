let code_editor;

let default_theme = "monokai";
let default_language = "c_cpp";
let default_fontsize = "14px";

// User Selected Language
// and it's correspoding Version of the Compilor
// For API request
let version = "10.2.0";
let language = "c++";
// End

window.onload = function () {
  code_editor = ace.edit("code_editor");
  document.getElementById("code_editor").style.fontSize=default_fontsize;
  code_editor.setTheme("ace/theme/" + default_theme);
  code_editor.session.setMode("ace/mode/" + default_language);
};

// Function to change the Code Editor Theme Selected By the User
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
  //   Funcion Call to Fetch the Compiler Version of the Corresponding Language
  getVersion();
  
}

function changeFontSize(){
  let fontsize = document.getElementById("fontsize").value;
  document.getElementById("code_editor").style.fontSize= fontsize;
}

// Function to Display the Output
// Added at 19/05/2022
async function displayOutput() {
  let code = code_editor.getSession().getValue();
  let args = document.getElementById("args").value;
  let args_arr = args.split(" ");
  let stdin = document.getElementById("stdin").value;
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
    //stdin takes string as input -> optional
    stdin: stdin,
    //args take an array as input -> optional
    args: args_arr,
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