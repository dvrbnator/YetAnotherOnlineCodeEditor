let code_editor

let default_theme = "monokai"
let default_language = "c_cpp"

window.onload = function(){
    code_editor = ace.edit("code_editor");
    code_editor.setTheme("ace/theme/"+default_theme);
    code_editor.session.setMode("ace/mode/"+default_language);
}

function changeTheme(){
    let theme = document.getElementById("themes").value;

    console.log(theme);

    code_editor.setTheme("ace/theme/"+theme);    
}

function changeLanguage(){
    let language = document.getElementById("language").value;

    console.log(language);

    code_editor.session.setMode("ace/mode/"+language);   
}

//Codex Repo
//https://github.com/Jaagrav/CodeX

//Codex Api
//https://codexweb.netlify.app/.netlify/functions/enforceCode