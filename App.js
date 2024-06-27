const URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_d60rN3WOSf61ExLgt8DmuGqb7GrOHoJMt74q9wa5";
//  Edit your APi key from  navigate this website https://currencyapi.com/ get API KEY Through Login
const dropDown = document.querySelectorAll(".dropDown select");
const btn  = document.querySelector("form button");
let msg  = document.querySelector("form .msg");


function converted_value(From_curr_value,To_curr_value,From_curr_code,to_curr_code){
    let new_msg = `${From_curr_value} ${From_curr_code} =  ${To_curr_value} ${to_curr_code}`;
    msg.innerText = new_msg;
    msg.style.fontSize = "22px";
    msg.classList.remove("hide");
}

async function getData(From_curr_code,to_curr_code,amount_value){
    let responce = await fetch(URL);
    let data =  await responce.json();
    let currencydata = data["data"];
    let From_curr_value  = currencydata[From_curr_code]["value"];
    let To_curr_value = currencydata[to_curr_code]["value"];
    From_curr_value *= amount_value;
    To_curr_value *= amount_value;

    converted_value(From_curr_value,To_curr_value,From_curr_code,to_curr_code);
}

for(let select of dropDown){
    for(currcode in countryList){
        let new_option  = document.createElement("option");
        new_option.innerText = currcode;
        new_option.value = currcode;
        select.append(new_option);
        if(select.name === "from" && currcode === "USD"){
            new_option.selected = "selected";

        }else if(select.name === "to" && currcode === "INR"){
            new_option.selected = "selected";
        }
    }

    select.addEventListener("change",(evt) =>{
        update_flag(evt.target);
    });
}

const update_flag = (target) =>{
    let currcode = target.value;
    let countrycode = countryList[currcode];
    let new_source_link  = `https://flagsapi.com/${countrycode}/flat/64.png`;   
    let img = target.parentElement.querySelector("img");
    img.src =  new_source_link;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amount_value = amount.value;
    if(amount_value === "" || amount_value < 1){
        amount_value = 1;
        amount.value = "1";
    }
    let From_curr_code = document.querySelector(".from select").value;
    let to_curr_code = document.querySelector(".to select").value;


    getData(From_curr_code,to_curr_code,amount.value);

});


