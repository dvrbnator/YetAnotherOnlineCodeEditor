/**
 * Original Authors: Deviprakash(https://github.com/Deviprakash9908) and Jayakarthick(https://github.com/jayakarthik-jk)
 * Code editor syntax highlighting done with:  Ace - The High Performance Code Editor for the Web.
 * Code execution is done with: Piston - A high performance general purpose code execution engine [Public API V2].
 **/

let code_editor;

//Default settings
let default_theme = "monokai";
let default_language = "c_cpp";
let default_fontsize = "14px";

//Default codes for corresponding languages
let defaultC = '#include <stdio.h>\n\nint main() {\n\tprintf("Yet Another Online Code Editor");\n\treturn 0;\n}';
let defaultCPP = '#include <iostream>\n\nusing namespace std;\n\nint main() {\n\tcout << "Yet Another Online Code Editor" << endl;\n\treturn 0;\n}';
let defaultJAVA = 'import java.io.*;\n\nclass Main {\n\tpublic static void main (String[] args) {\n\t\tSystem.out.println("Yet Another Online Code Editor");\n\t}\n}';
let defaultPYTHON = 'print("Yet Another Online Code Editor")';
let defaultJS = 'console.log("Yet Another Online Code Editor");';
let defaultRUBY = 'puts "Rubi"';

// User Selected Language
// and it's correspoding Version of the Compiler
// For API request
let version = "10.2.0";
let language = "c++";

//loading Animation
let load = document.getElementById("load");
console.log(load);


window.onload = function () {
  code_editor = ace.edit("code_editor");
  document.getElementById("code_editor").style.fontSize = default_fontsize;
  code_editor.session.setValue(defaultC);
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
  if (language === "c" || language === "cpp") {
    code_editor.session.setMode("ace/mode/" + "c_cpp");
  } else code_editor.session.setMode("ace/mode/" + language);

  //Start
  //Displying Default code corresponding to the Language selected
  let code = code_editor.getSession().getValue();

  if (language === "c" && (code === '' || code === defaultC || code === defaultCPP || code === defaultJAVA || code === defaultPYTHON || code === defaultJS || code === defaultRUBY)) {
    code_editor.session.setValue(defaultC);
  } else if (language === "cpp" && (code === '' || code === defaultC || code === defaultCPP || code === defaultJAVA || code === defaultPYTHON || code === defaultJS || code === defaultRUBY)) {
    code_editor.session.setValue(defaultCPP);
  } else if (language === "java" && (code === '' || code === defaultC || code === defaultCPP || code === defaultJAVA || code === defaultPYTHON || code === defaultJS || code === defaultRUBY)) {
    code_editor.session.setValue(defaultJAVA);
  } else if (language === "python" && (code === '' || code === defaultC || code === defaultCPP || code === defaultJAVA || code === defaultPYTHON || code === defaultJS || code === defaultRUBY)) {
    code_editor.session.setValue(defaultPYTHON);
  } else if (language === "javascript" && (code === '' || code === defaultC || code === defaultCPP || code === defaultJAVA || code === defaultPYTHON || code === defaultJS || code === defaultRUBY)) {
    code_editor.session.setValue(defaultJS);
  } else if (language === "ruby" && (code === '' || code === defaultC || code === defaultCPP || code === defaultJAVA || code === defaultPYTHON || code === defaultJS || code === defaultRUBY)) {
    code_editor.session.setValue(defaultRUBY);
  }
  //End 

  // For API Details
  if (language == "c_cpp") {
    language = "c++";
  }
  //   Function Call to Fetch the Compiler Version of the Corresponding Language
  getVersion();

}

//Function to change the font size
function changeFontSize() {
  let fontsize = document.getElementById("fontsize").value;
  document.getElementById("code_editor").style.fontSize = fontsize;
}

// Function to Display the Output
// Added at 19/05/2022
async function displayOutput() {
  //Making the Loading Animation Visible
  load.style.display = "flex";
  let code = code_editor.getSession().getValue();
  let args = document.getElementById("args").value;
  let args_arr = args.split(" ");
  let stdin = document.getElementById("stdin").value;

  const url = `https://emkc.org/api/v2/piston/execute`;


  const data = {
    language: language,
    version: version,
    files: [{
      content: code,
    }, ],
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
  try {
    const response = await fetch(url, options);
    try {
      const json = await response.json();
      try {
        document.getElementById("output_textarea").textContent = json.run.output;
        load.style.display = "none";
      } catch (error) {
        load.style.display = "none";
        alert("Output Not Found Try again Later...");
      }
    } catch (error) {
      load.style.display = "none";
      console.log("Error Converting response into json");
    }
  } catch (error) {
    load.style.display = "none";
    alert("Something Went Wrong Try Again Later...");
  }
}

// Function to get the version of the corresponding language
// Added at 19/05/2022
async function getVersion() {
  try {
    let response = await fetch("https://emkc.org/api/v2/piston/runtimes");
    try {
      let json = await response.json();
      try {
        json.forEach((element) => {
          if (element.language == language) {
            version = element.version;
          }
        });
      } catch (error) {
        load.style.display = "none";
        console.log("Error getting Versions");
        alert("Something Went Wrong Try Again Later...");
      }
    } catch (error) {
      load.style.display = "none";
      console.log("Error Converting Versions Response into Json File");
      alert("Something Went Wrong Try Again Later...");
    }
  } catch (error) {
    load.style.display = "none";
    console.log("Error Getting Response for Selected Language Version");
    alert("Something Went Wrong Try Again Later...");
  }
}