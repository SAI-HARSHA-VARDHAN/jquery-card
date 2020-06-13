(function(){
  var newscript = document.createElement('script');
  var newscript1 = document.createElement('script');
  var newscript2 = document.createElement('script');
  var link = document.createElement("link");
     newscript.type = 'text/javascript';
     newscript1.type = 'text/javascript';
     newscript2.type = 'text/javascript';
     newscript.async = true;
     newscript1.async = true;
     newscript2.async = true;
     newscript.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
     newscript1.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js';
     newscript2.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript1);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript2);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(link);
})();
  
function fetch(){
    // alert(window.name)
    if(window.name != "")
    localStorage.access_token = window.name
    const companyViewUrl = "https://backend.scrapshut.com/company/view"
    $.ajax({
        type: "GET",
        headers : {
            "API-KEY":localStorage.apikey
        },
        contentType: 'application/json',
        url: companyViewUrl,
        data: {},
        success: function (data) {
            const company_name = data.results[0].company_name
            localStorage.company_name = company_name
            console.log("Company name stored is "+localStorage.company_name)
            checkIfCompanyValid()
        },
        error: function(data)
        {
            console.log(data)
        }
    });  
}

function checkIfCompanyValid(){
    const current_url = location.href
    // const current_url = "https://social.scrapshut.com"
    const domain_name = current_url.split("//")[1].split("/")[0]
    const domain_parts = domain_name.split("\.")
    console.log(domain_parts)
    if(domain_parts.includes(localStorage.company_name)){
        console.log("Matched")
        fetchRatings()
    }
    else{
        console.log("Domain Doesn't match")

    }
}

function fetchRatings(){
    const ratingsUrl = "https://backend.scrapshut.com/company/post/?search="+localStorage.company_name
    $.ajax({
        type: "GET",
        headers : {
            "API-KEY": localStorage.apikey
        },
        contentType: 'application/json',
        url: ratingsUrl,
        data: {},
        success: function (data) {
            const object = data
            const len = object.results.length
            const results_object = object.results
            var avgrating = 0
            var cnt = 0
            for(let i=0;i<results_object.length;i++){
                avgrating += results_object[i].rate
                console.log(results_object[i])
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
            html += `<span class='rate'> ${avgrating.toFixed(1)} out of 5</span>`+
            `<br/>${cnt} ratings<br/><button class="btn-primary ratethis" onclick="openpopup()">Rate this</button></div>`
            +`</div><br/><div class='container review' onclick="showhide()"><b>REVIEWS &#8595;</b></div><br/><div id="cardgroup">`
            for(let i=0;i<results_object.length;i++){
                html += `<div class="card" style="width:45vw;"><div class='card-header'><div class="row"><div class="col"><b>${results_object[i].author}</b></div> <div class="col" align="right">${results_object[i].rate}⭐️</div></div></div>`+
                `<div class='card-body'>${results_object[i].review}</div></div>`
            }
            html += `</div>`
            $("#result").html(html)
            $("#cardgroup").hide()
            
        },
        error: function(data)
        {
            console.log(data)
        }
    });
}

function openpopup(){
    popup = window.open("https://cardforhosting.web.app/", location.href, "width=500,height=400");
    popup.moveTo(window.innerWidth/12,window.innerHeight/4);
    popup.focus();
}

function showhide(){
    $("#cardgroup").toggle();
}