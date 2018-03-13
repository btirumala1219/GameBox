
//var fileName = "../Content/data.txt";

init();

function init(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var lines = this.responseText.split("\n");
      var rand = Math.floor(Math.random() * 25);
      var word = lines[rand];
      document.getElementById("tt").innerHTML = word;
      console.log(document.getElementById("tt").textContent);
      //var word = 'BISHOP';
      console.log(document.getElementById("tt").textContent);
      //console.log(word);
      var wordarray = word.split("");
      var cnt = 1;

      for(var k = 0; k<6; k++){
        var idnum = k+1;
        var id = 'l'+idnum;
        //console.log(id);
        document.getElementById(id).style.visibility = "hidden";
        var bid = 'b'+idnum;
        //console.log(bid);
        document.getElementById(bid).style.visibility = "hidden";
        document.getElementById('correct').style.visibility = "hidden";
        document.getElementById('wrong').style.visibility = "hidden";
      }

      function gotWordRight(index){
        console.log("CORRECT");
        var idnum = index+1;
        var id = 'l'+idnum;
        console.log(id);
        document.getElementById(id).style.visibility = "visible";
        var bid = 'b' + idnum;
        document.getElementById(id).style.visibility = "visible";
        document.getElementById('correct').style.visibility = "visible";
        document.getElementById('wrong').style.visibility = "hidden";
        //cnt++
      }

      function gotWordWrong(){
        console.log("WRONG");
        var bid = 'b' + cnt;
        document.getElementById(bid).style.visibility = "visible";
        console.log(bid);
        cnt++;
        document.getElementById('wrong').style.visibility = "visible";
        document.getElementById('correct').style.visibility = "hidden";
      }

      function checkTruth(tempo) {

      }

      function toggleKey(keyCode) {
        var tempo = String.fromCharCode(keyCode);
        //console.log(tempo);
        var check = 0;
        for(var i = 0; i< word.length; i++){
          if(wordarray[i] == tempo){
            gotWordRight(i);
          }
          else{
            check++;
          }
        }
        if(check != 5){
          gotWordWrong();
        }
      }

      document.onkeydown = function(evt) {
        toggleKey(evt.keyCode);
      };

    }
  };
  xhttp.open("GET", "../Content/data.txt", true);
  xhttp.send();
}



//localStorage.setItem("word", 'HHHH');
