(function(){
  var newscript = document.createElement('script');
  var newscript1 = document.createElement('script');
  var newscript2 = document.createElement('script');
  var newscript3 = document.createElement('script');
  var newscript4 = document.createElement('script');
  var link = document.createElement("link");
  var link1 = document.createElement("link");
  var link2 = document.createElement("link");
     newscript.type = 'text/javascript';
     newscript1.type = 'text/javascript';
     newscript2.type = 'text/javascript';
     newscript3.type = 'text/javascript';
     newscript4.type = 'text/javascript';
     newscript.async = true;
     newscript1.async = true;
     newscript2.async = true;
     newscript3.async = true;
     newscript4.defer = true;
     newscript.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
     newscript1.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js';
     newscript2.src = 'https://apis.google.com/js/api.js';
     newscript3.src = 'https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js';
     newscript4.src = 'https://www.gstatic.com/firebasejs/7.15.0/firebase-auth.js';
    link.type = "text/css";
    link.rel = "stylesheet";
    link1.type = "text/css";
    link1.rel = "stylesheet";
    link2.type = "text/css";
    link2.rel = "stylesheet";
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css';
    link1.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link2.href = 'https://cardscrapshut.s3.ap-south-1.amazonaws.com/index.css';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript1);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(link);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(link1);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(link2);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript2);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript3);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript4);
})();
  
window.onload = function(){
  var scriptName = document.getElementById('scriptone');
  localStorage.apikey = scriptName.getAttribute('apikey');
  localStorage.companyid = scriptName.getAttribute('companyid');
  // $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
  //     function(json) {
  //       localStorage.userIpScrapplug = json.ip
  //       console.log(localStorage.userIpScrapplug)
  //     }
  // );
  fetch();
}

function fetch(){
    if(window.name != "")
    localStorage.access_token = window.name
    const companyViewUrl = "https://backend.scrapshut.com/company/view/"+localStorage.companyid
    $.ajax({
        type: "GET",
        headers : {
            "API-KEY":localStorage.apikey
        },
        contentType: 'application/json',
        url: companyViewUrl,
        timeout:5000,
        data: {},
        success: function (data) {
            const company_name = data.results[0].name
            localStorage.company_name = company_name
            console.log("Company name stored is "+localStorage.company_name)
            console.log(data.results[0])
            fetchRatings()
            // updateIp(data.results[0])
            // addToUrls(data.results[0])
        },
        error: function(xhr,textStatus)
        {
            console.log(xhr)
            console.log(textStatus)
            if(textStatus==="timeout" || xhr.status == 408 || xhr.status == 0) {
                fetch();
            } 
        }
    });  
}

// function checkIfCompanyValid(){
    // const current_url = location.href
    // const current_url = "https://cIe.iiit.ac.in/strategy-for-engaging-customers-in-times-like-covid-in-conversation-with-ashok-founder-grabon/"
    // const domain_name = current_url.split("//")[1].split("/")[0]
    // const domain_parts = domain_name.split("\.").map(function(x) { return x.toLowerCase(); });
    // const company_name = localStorage.company_name.toLowerCase()
    // if(domain_parts.includes(company_name)){
        // console.log("Matched")
        // fetchRatings()
    // }
    // else{
        // console.log("Domain Doesn't match")
    // }
// }

var presentCount = 5;
var results;
var contentReviews;
var addedMeta = 0;

function loadMore(){
  const futureCount = presentCount + 5;
  if(results.length > futureCount){
    presentCount += 5;
    var html = ``;
    results_object = results;
    for(let i=0;i<presentCount;i++){
        html += `<div class="card" style="width:45vw;"><div class='card-header'><div class="row"><div class="col"><b>${results_object[i].author}</b></div> <div class="col" align="right">${results_object[i].rate}⭐️</div></div></div>`+
      `<div class='card-body'>${results_object[i].review}</div></div>`
    }
    html += `<p style="text-align:center;height:20px;"><button class='btn btn-primary ratethis' onClick="loadMore()">Load More</button><button style="margin-left:10px;" class='btn btn-danger ratethis' onClick="collapse()">Collapse</button></p>`;
    contentReviews = html;
    $("#cardgroup").html(contentReviews);
  }
  else{
    presentCount = results.length;
    var html = ``;
    results_object = results;
    for(let i=0;i<presentCount;i++){
        html += `<div class="card" style="width:45vw;"><div class='card-header'><div class="row"><div class="col"><b>${results_object[i].author}</b></div> <div class="col" align="right">${results_object[i].rate}⭐️</div></div></div>`+
      `<div class='card-body'>${results_object[i].review}</div></div>`
    }
    html += `<p style="text-align:center;height:20px;"><button class='btn btn-danger ratethis' onClick="collapse()">Collapse</button></p>`;
    contentReviews = html;
    $("#cardgroup").html(contentReviews);
  }
  buildReviews(results);
}

function collapse(){
  presentCount = 5;
  var html = ``;
  results_object = results;
  for(let i=0;i<presentCount;i++){
      html += `<div class="card" style="width:45vw;"><div class='card-header'><div class="row"><div class="col"><b>${results_object[i].author}</b></div> <div class="col" align="right">${results_object[i].rate}⭐️</div></div></div>`+
    `<div class='card-body'>${results_object[i].review}</div></div>`
  }
  if(results.length > 5)
  html += `<p style="text-align:center;height:20px;"><button class='btn btn-primary ratethis' onClick="loadMore()">Load More</button></p>`;
  contentReviews = html;
  $("#cardgroup").html(contentReviews);
}

function buildReviews(results_object) {
  addMeta(results_object);
  results = results_object;
  var html = ``;
  for(let i=0;i<presentCount;i++){
        html += `<div class="card" style="width:45vw;"><div class='card-header'><div class="row"><div class="col"><b>${results_object[i].author}</b></div> <div class="col" align="right">${results_object[i].rate}⭐️</div></div></div>`+
      `<div class='card-body'>${results_object[i].review}</div></div>`
  }
  html += `<p style="text-align:center;height:20px;"><button class='btn btn-primary ratethis' onClick="loadMore()">Load More</button></p>`;
  contentReviews = html;
}

function addMeta(results_object){
  if(addedMeta == 0){
    var reviewSet = "";
    for(let i=0;i<results_object.length;i++){
          reviewSet += results_object[i].review;
          reviewSet += " ";
    }
    var meta = document.createElement('meta');
    meta.name = "keywords";
    meta.content = reviewSet;
    document.getElementsByTagName('head')[0].appendChild(meta);
    // console.log(reviewSet);
  }
}

function fetchRatings(){
    const ratingsUrl = "https://backend.scrapshut.com/company/post/?search="+localStorage.company_name.split(" ")[0]
    $.ajax({
        type: "GET",
        headers : {
            "API-KEY": localStorage.apikey
        },
        contentType: 'application/json',
        url: ratingsUrl,
        data: {},
        timeout:5000,
        success: function (data,textStatus, xhr) {
            console.log(xhr.status);
            const object = data
            // const current_url = location.href
            // const current_url = "https://blog.iiit.com/?p=198"
            console.log(object)
            var results = object.results
            // console.log(results)
            const len = results.length
            const results_object = results
            var avgrating = 0
            var cnt = 0
            for(let i=0;i<results_object.length;i++){
                avgrating += results_object[i].rate
                // console.log(results_object[i])
                cnt += 1
            }
            avgrating = avgrating/cnt
            roundedAvg = Math.round(avgrating)
            var html = ``;
            html += `<div class="row insidecontainer" style="width:50vw;">`+
            `<div class="col-4" align="center"><img src="https://scrapshut.s3.ap-south-1.amazonaws.com/scrapshut.gif" height="150px" width="150px"></div>`+
            `<div class="col-8"><h3 class='company'>${localStorage.company_name}</h3>`
            for(let j=0;j<roundedAvg;j++){
                html += `<span class='star' style='color:gold;'>★</span>`
            }
            let remain = 5 - roundedAvg;
            for(let j=0;j<remain;j++){
                html += `<span class='star remain'>&#9734;</span>`
            }
            if(results.length != 0){
                html += `<span class='rate'> ${avgrating.toFixed(1)} out of 5</span>`
            }
            if(results.length != 0)
            html += `<br/>${cnt} ratings<br/>`
            else
            html += `${cnt} ratings<br/><br/>`
            if(localStorage.access_token)
            html += `<button class="btn btn-primary ratethis" onclick="openratepopup()">Rate this</button></div>`
            else
            html += `<button class="btn btn-primary ratethis" onclick="openpopup()">Signup to review</button></div>`
            html += `<p>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="mod" style="display:none;">
              Button with data-target
            </button>
          </p>
          <div class="collapse" id="collapseExample" style="width:100%;">
            <br/>
            <div class="card card-body">
              <form id="formId">
          <p>Review</p>
          <input name="review" type="text" id="inputEmail4" placeholder="Title" style="margin-bottom:20px;margin-top:-15px;width:100%;border:1px solid #C1C3C2;padding:5px;border-radius:5px;" required>
          <p >Tags</p>
          <input name="tags" type="text" id="inputAddress2" placeholder="Comma seperated tags" style="margin-bottom:20px;margin-top:-15px;width:100%;border:1px solid #C1C3C2;padding:5px;border-radius:5px;" required>
          <p>Rate</p>
          <!-- <label for="inputZip">Rate</label> -->
          <!-- <input name="rate" type="number" class="form-control" id="inputZip"> -->
          <fieldset class="rating" style="margin-top:-18px;">
            <input type="radio" id="star5" name="rating" value="5" onclick="updaterate(5)" /><label class="full"
              for="star5" title="5 stars"></label>
            <!-- <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label> -->
            <input type="radio" id="star4" name="rating" value="4" onclick="updaterate(4)" /><label class="full"
              for="star4" title="4 stars"></label>
            <!-- <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label> -->
            <input type="radio" id="star3" name="rating" value="3" onclick="updaterate(3)" /><label class="full"
              for="star3" title="3 stars"></label>
            <!-- <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label> -->
            <input type="radio" id="star2" name="rating" value="2" onclick="updaterate(2)" /><label class="full"
              for="star2" title="2 stars"></label>
            <!-- <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label> -->
            <input type="radio" id="star1" name="rating" value="1" onclick="updaterate(1)" /><label class="full"
              for="star1" title="1 star"></label>
            <!-- <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label> -->
            </fieldset>
            <br/><br/>
          <input name="anonymous" type="checkbox" id="gridCheck1" onclick="updatean()"> &nbspAnonymous 
          <br/>
          <input name="fake" type="checkbox" id="gridCheck2" onclick="updatefk()"> &nbspMight be Fake 
          <br/><br/>
      <p style="text-align:center;"><button type="button" class="btn btn-primary" onclick="post()">Submit</button></p>
    </form>
            </div>
          </div>`
            if(results.length != 0)
            html +=`</div><br/><div class='container review' onclick="showhide()"><b>REVIEWS &#8595;</b></div><br/><div id="cardgroup">`
            else
            html +=`</div><br/><div class='container review'><b>Be the first person to review</b></div><br/><div id="cardgroup">`
            if(results_object.length > 0 && results_object.length < 5){
              for(let i=0;i<results_object.length;i++){
                  html += `<div class="card" style="width:45vw;"><div class='card-header'><div class="row"><div class="col"><b>${results_object[i].author}</b></div> <div class="col" align="right">${results_object[i].rate}⭐️</div></div></div>`+
                  `<div class='card-body'>${results_object[i].review}</div></div>`
              }
            }
            else{
              buildReviews(results_object);
              html += contentReviews;
            }
            html += `</div>`
            $("#result").html(html)
            $("#cardgroup").hide()
        },
        error: function(xhr,textStatus)
        {
            console.log(xhr)
            console.log(textStatus)
            if(textStatus==="timeout" || xhr.status == 408 || xhr.status == 0) {
                fetch();
            } 
        }
    });
}

function openpopup(){
    popup = window.open("https://cardforhosting.web.app/", location.href, "width=500,height=400");
    popup.focus();
}

var rate=0,anonymous=false,fake=false;

function openratepopup(){
    $("#mod").click();
}

function updaterate(a) {
    rate = a;
    console.log(rate);
}

var ac = 0, fc = 0;

function updatean() {
      if (ac == 0) {
        ac = 1;
        anonymous = true;
      }
      else {
        ac = 0;
        anonymous = false;
      }
      console.log(anonymous);
    }
    function updatefk() {
      if (fc == 0) {
        fc = 1;
        fake = true;
      }
      else {
        fc = 0;
        fake = false;
    }
    console.log(fake);
}

function post(){
    const url = location.href
    const tags = $("#inputAddress2").val().split(",")
    const review = $("#inputEmail4").val()
    data = {review:review,url:url,tags:tags,rate:rate,anonymous:anonymous,fake:fake,advertisement:{url:null,title:null,advertizing_content:null}};
    data = JSON.stringify(data)
    console.log(data)
    $.ajax({
        type: "POST",
        headers : {
            Authorization :'JWT '+localStorage.access_token,
            "API-KEY": localStorage.apikey
        },
        contentType: 'application/json',
        url: 'https://backend.scrapshut.com/api/post/',
        data: data,
        success: function (data) {
            console.log(data)
            alert("Successfully posted");
            fetch();
            $("#close").click();
            // document.getElementById("mod").click();
        },
        error: function(data)
        {
            var error = JSON.parse(Object.values(data)[16]);
            var errorDetails = error.details;
            if(errorDetails == undefined){
                errorDetails = error.detail;
            }
            if(errorDetails == undefined){
                 errorDetails = error.url;
            }
            if(errorDetails == "Error decoding signature."){
                // document.getElementById("mod1").click();
                alert("Please register to reviw");
            }
            else{
                alert("Error: "+errorDetails);
            }
            $("#close").click()
        }
    });
}

//Add to URL field of company if not included already
function addToUrls(result){
  var finalArray = result.url.split('\"')[0].split("[")[1].split("]")[0].replace(/'/gi,"").split(",")
  if(finalArray.includes(location.href)){
    console.log('URL Already Included')
  }
  else{
    finalArray.push(location.href)
    result.url = `[${finalArray}]`
    console.log("Added to URLs")
    $.ajax({
        type: "PUT",
        contentType: 'application/json',
        url: 'https://backend.scrapshut.com/company/register/'+result.id+'/',
        data: JSON.stringify(result),
        success: function (data) {
            console.log(data)
        },
        error: function(data)
        {
            console.log(data)
        }
    }); 
  } 
}

function getBrowserName(){
  var browserName;
   if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
        browserName = 'Opera';
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        browserName = 'Chrome';
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        browserName = 'Safari';
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
         browserName = 'Firefox';
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
      browserName = 'IE'; 
    }  
    else 
    {
       browserName = 'Others';
    }
    return browserName
}

function updateIp(result){
  const browserName = getBrowserName()
  const ipAddressVal = localStorage.userIpScrapplug
  const url = location.href
  const ipadress = JSON.stringify({ipaddress:ipAddressVal,broswer:browserName,url:url})
  if(result.ipadress == ""){
    result.ipadress = JSON.stringify([]);
  }
  var ipArray = JSON.parse(result.ipadress) 
  var f = 1
  ipArray.forEach(element => {
    if(element === ipadress){
      f = 0
    }
  });
  console.log(f)
  if(f == 1){
    ipArray.push(ipadress)
    result.ipadress = JSON.stringify(ipArray)
    $.ajax({
          type: "PUT",
          contentType: 'application/json',
          url: 'https://backend.scrapshut.com/company/register/'+result.id+'/',
          data: JSON.stringify(result),
          success: function (data) {
              console.log(data)
          },
          error: function(data)
          {
              console.log(data)
          }
    }); 
  }
  else{
    console.log("Already IP Added")
  }
}

function showhide(){
    $("#cardgroup").toggle();
}