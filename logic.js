//initialize firebase
//create button for new employees (update the html and update the database)
//retrieve employees from 
//create a calculate for the months.
//calculate total billed

var config = {
    apiKey: "AIzaSyBt6kScs7EOzrsN9I4AarRzlBw-ZNAlpR8",
    authDomain: "timesheet-9255e.firebaseapp.com",
    databaseURL: "https://timesheet-9255e.firebaseio.com",
    projectId: "timesheet-9255e",
    storageBucket: "timesheet-9255e.appspot.com",
    messagingSenderId: "636043031775",
    appId: "1:636043031775:web:5651d0ab0d3c6ddf3b256a"
}//컨피그 베리어블 안에 데이터 베이스를 만들 때 생성 되었던 api 키와 불러올 수 있는 정보들을 파이어 데이터에서 가져온다. 

 // Initialize Firebase
 firebase.initializeApp(config);
 //파이어 데이터베이스 이니셜라이즈 앱에 베리어블 콘피그 값을 넣어서 이니셜 라이즈 앱을 활성화 시킨다./연결 시킨다?   

 var database = firebase.database();
  //베리어블 데이터 베이스에 파이어베이스.데이터 베이스를 넣어준다. 


 //create button for new employees (update the html and update the database)
 
 $("button").on("click", function(event){
     event.preventDefault();//원래 폼이 가지고 있는 액션을 없애고 현재 페이지가 계속 유지되게 한다. 

     var trainName = $("#inputName").val().trim();
     var trainDes = $("#inputDes").val().trim();
     var trainTime = $("#inputTrainTime").val().trim(); 
     var trainFre = $("#inputFre").val().trim();
//베리어블에 html에 있는 아이디의 값을 가져와서 밸류값과 트림을 설정해준다. 
//밸류는 어떤 값을 넣든 리턴할 수 있는 펑션이고 트림은 스페이스를 없애주는 펑션이다. 

     var trainInfo = {
         name: trainName,
         destination: trainDes,
         trainTime: trainTime,
         frequency: trainFre
     };
     //베리어블 employeesInfo 오브젝트 안에는 이전에 만들어준 베리어블값을 데이터 베이스에 나타날 수 있는 이름으로 넣어준다. 

     database.ref().push(trainInfo);
     //데이터베이스의 레퍼런스(데이터를 처음부터 읽음)안에 employeesInfo를 넣어서 유저가 값을 넣었을 때 그 값을 데이터 베이스가 읽을 수 있게 만든다. 


     //make re-empty boxes
     $("#inputName").val("");
     $("#inputDes").val("");
     $("#inputTrainTime").val("");
     $("#inputFre").val("");
     //각 아이디마다 공란의 밸류를 지정해줘서 데이터가 입력되고 클릭 후 입력되었던 정보는 없애준다. 
 });

 database.ref().on("child_added", function(snap){
     //child_added 항목의 목록을 검색하거나 항목 목록에 대한 추가를 수신대기.
    var tName = snap.val().name;
    var tDes = snap.val().destination;
    var tStartTime = snap.val().trainTime;//6:00
    var tFre = snap.val().frequency;//5
    var currentTime = moment();//7:02


    var tDiffTime = currentTime.diff(moment(tStartTime, "HH:mm"), "minutes");
    //hh로 쓰면 12시간제로 나타남 //62

    //나머지계산- 현재시간에서 배차시간까지 얼마나 남았는지 알기 위한 계산
    var a = tDiffTime % tFre;//2 %사인은 나머지를 나타내는 식. 
    var b = Math.floor(tDiffTime/tFre);// 나누기 사인은 /; 결과값은 12. 
    var nextTrain;
    if(a === 0){
        nextTrain = currentTime;
    }else{
      nextTrain = moment(tStartTime, "HH:mm").add((b + 1) * tFre, "m");//add는 2가지의 매개변수를 사용. 
    }

    var tMin = tFre - a;
    //moment()<-현재시간

    var tArrival = nextTrain.format("hh:mm A");


    //add employee input information. 
    $("#trainInputInfo > tbody").append(
        "<tr><td>" + 
        tName + "</td><td>" + 
        tDes + "</td><td>" + 
        tFre+ "</td><td>" + 
        tArrival + "</td><td>" + 
        tMin + "</td></tr>");   
 });    