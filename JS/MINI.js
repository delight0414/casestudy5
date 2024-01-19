window.onload = function(){
    const progressLine = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");
    const mainSwiper = new Swiper(".mainSwiper", {
        loop: true,
        autoplay: {
        delay: 6000,
        disableOnInteraction: false
        },
        on: {
        autoplayTimeLeft(s, time, progress) {
            progressLine.style.setProperty("--progress", 1 - progress);
        }
        }
    });

let carIdx=0;
let wrapper, carImage;
let navList=document.querySelectorAll(".car li");
let detailList=document.querySelectorAll(".car_detail li");

let save=[0,0,0,0,0,0]; // 과거에 돌린 정도
let dragged=0; // 이번에 돌린 정도
let sum=0; // 과거에 돌린 정도 + 이번에 돌린 정도

const sensitivity=40; // 돌리는 속도 작을수록 가속

let clickedSrc=""; // 클릭했을 때 이미지 소스
let changeSrc=""; // 드래그해서 바뀐 이미지 소스

for(let i=0; i<navList.length; i++){
    navList[i].addEventListener("click", function(e){
        e.preventDefault();

        carIdx=i;
        // save=[0,0,0,0,0,0];
        dragged=0;

        // console.log(carIdx, save, dragged);

        for(let i=0; i<navList.length; i++){
            if(i === carIdx){
                navList[i].classList.add("on");
                detailList[i].classList.add("active");
            }
            else{
                navList[i].classList.remove("on");
                detailList[i].classList.remove("active");
            }
        }
    });
}

for(let i=0; i<detailList.length; i++){
    detailList[i].addEventListener("mousedown", function(e){
        // console.log("mousedown");
        wrapper=e.currentTarget;
        let [h4, img, information]=wrapper.children;

        clickedSrc=img.getAttribute("src");
        let x=e.clientX;

        wrapper.addEventListener("mousemove", rotate);

        function rotate(e){
            // x는 이전 좌표, e.clientX 현재 좌표
            // dragged가 오른쪽으로 끌면 양수, 왼쪽으로 끌면 음수입니다.

            // dragged가 양수면 이미지 경로가 커진 숫자로 대입되고, 음수면 이미지 숫자가 작은 숫자로 대입됩니다.
            dragged=parseInt((e.clientX-x)/sensitivity);

            // 각 리스트에 저장되는 sum 변수 값입니다.
            // console.log(save);

            // dragged의 변화량을 sum에 저장합니다.
            // save[carIdx]는 저장된 dragged 값입니다.
            sum=save[carIdx]+dragged;
            // console.log(sum);
            
            if(dragged >= 0){ // 오른쪽으로 끌었을때 양수
                sum=sum%35;
            }
            else {
                if(sum < 0){
                    sum+=36;
                }
            }
            console.log(sum);

            // console.log("after : "+sum);

            changeSrc=clickedSrc.replace(/car_[0-9]+/, "car_"+sum);

            console.log(changeSrc);

            img.setAttribute("src", changeSrc);
            // wrapper.cursor.style = "grabbing";
        }

        window.addEventListener("mouseup", function(){
            wrapper.removeEventListener("mousemove", rotate);
            save[carIdx]=sum;
            dragged=0;
            // console.log(save);
        });
    });
};
};
$(function(){
    let navIdx=0;
    let menu=0;
    let aFlag=0;
    //let topFlag=false;
    $("#main .top").hover(function(){
        if(topFlag === false) {
            $("#main .top").addClass("active");
        }
    },
    function(){
        if(topFlag === false) {
            $("#main .top").removeClass("active");
        }
    
    
    });
        $("#gnb > ul > li").hover(function(){
            navIdx=$(this).index();
            if(navIdx == 0){
                $(this).find(".car_menu").stop().show(); 
            }
            else{
                $(this).find(".menu").stop().show();
            }
        },
        function(){
            if(navIdx == 0){
                $("#gnb > ul > li .car_menu").hide(); 
            }
            else{
                $("#gnb > ul > li .menu").hide();
            }
        });
    
    //focus in
    $("#gnb > ul > li").focusin(function(){
        navIdx=$(this).index();
            $("#main .top").addClass("active");
                if(navIdx == 0){
                    $(this).find(".car_menu").show(); 
                    $(this).addClass("on");
                }
                else{
                    $(this).find(".menu").show();
                    $(this).addClass("on");   
                }
    });
    $("#gnb .menu .menu_inner > ul.twoDepth > li > a ").focusin(function(){
        $(this).parent().addClass("on");
    });
    $("#gnb li:first-child ul.twoDepth li ul.threeDepth li").focusin(function(e){
            e.preventDefault();
            let path;
            let idx=0;
            idx=$(this).index()+1;
            aFlag=$(this).parent().find("a").length;
            if(aFlag === 3) {
                path="images/etc/gnb_new_"+idx+".png";
                $(".model_image img").attr({src:path});
            }
            else if(aFlag === 1) {
                path="images/etc/gnb_elec_"+idx+".png";
                $(".model_image img").attr({src:path});
            }
            else {
                path="images/etc/gnb_model_"+idx+".png";
                $(".model_image img").attr({src:path});
            }
            $("#gnb li:first-child ul.twoDepth li ul.threeDepth li").removeClass("on");
            $(this).addClass("on");
        });
    
    //focus out
    $("#gnb .menu .menu_inner > ul.twoDepth li ul.threeDepth li:last-child").focusout(function(){
        $("#gnb .menu .menu_inner > ul.twoDepth li").removeClass("on");
    });
    $("#gnb ul ul li:last-child ul li:last-child").focusout(function(){
        navIdx=$("#gnb > ul > li").index();
            if(navIdx == 0){
                $(".car_menu").hide(); 
                $("#gnb > ul > li").removeClass("on");
            }
            else{
                $(".menu").hide();
                $("#gnb > ul > li").removeClass("on");
            }
    });
    $("#gnb > ul > li").focusout(function(){
        if($(this).children().length === 1) {
            $("#gnb > ul > li").removeClass("on");
        }
    });
    $("#gnb ul li:last-child ul li:last-child ul li:last-child").focusout(function(){
        $(".menu").hide();
        $("#gnb > ul > li").removeClass("on");
    });
    
    
        // car_menu
    $("#gnb .car_menu > .menu_inner li:first-child ul.threeDepth li:first-child").addClass("on");
        $("#gnb li:first-child ul.twoDepth li ul.threeDepth li").click(function(e){
            //e.stopPropagation();
            return false;
            let path;
            let idx=0;
            idx=$(this).index()+1;
            aFlag=$(this).parent().find("a").length;
            if(aFlag === 3) {
                path="images/etc/gnb_new_"+idx+".png";
                $(".model_image img").attr({src:path});
            }
            else if(aFlag === 1) {
                path="images/etc/gnb_elec_"+idx+".png";
                $(".model_image img").attr({src:path});
            }
            else {
                path="images/etc/gnb_model_"+idx+".png";
                $(".model_image img").attr({src:path});
            }
            $("#gnb li:first-child ul.twoDepth li ul.threeDepth li").removeClass("on");
            $(this).addClass("on");
        });
        $("#gnb .car_menu").mouseleave(function(){
            //console.log($(this).parent());
            $(this).parent().removeClass("on");
        });
    
    // langauge
    let langData=["KOR", "ENG", "JPN"];
    let langN;
    $("#main .top .top_inner .lang").click(function(e){
            e.preventDefault();
            if($(this).find("ul").css("display") === "block"){
                $("#main .top .top_inner .lang > ul").slideUp(300, function(){
                    for(let i=0; i<langData.length; i++){
                        if(i === langN){
                            $(".lang li").eq(i).hide();
                        }
                        else{
                            $(".lang li").eq(i).removeAttr("style");
                        }
                    }
                });
                $(this).removeClass("active"); 
            }
            else {
                $(this).find("ul").slideDown(300);
                $(this).addClass("active");
            }
        });
        $("#main .top .top_inner .lang ul li a").click(function(e){
            e.preventDefault();
            string=$(this).text();
            //currentString=$("#main .top .top_inner .lang > a").text();
            $("#main .top .top_inner .lang > a").text(string);
            langN=$(this).parent().index();
        });
        $("#main .top .top_inner .lang ul").mouseleave(function(){
            $(this).slideUp(300);
            $(this).parent().removeClass("active"); 
        });
    
    
    // mobile menu
    let topFlag=false;
    $("a#tab").addClass("open");  
        $("a#tab").click(function(e){
            console.log(topFlag);
            e.preventDefault();
            if($("a#tab").hasClass("open")){
                topFlag=true;
                $("#mobile").slideDown(200);
                $(this).removeAttr("class");
                $(this).addClass("close");
                $("body").addClass("fixed");
            }
            else {
                topFlag=false;
                $("#main .top").addClass("active");
                $("#mobile").slideUp(200);
                $(this).removeAttr("class");
                $(this).addClass("open"); 
                $("#mobile > ul > li").removeClass("on")
                $("#mobile ul.twoDepth").slideUp();
                $("#mobile ul.twoDepth ul.threeDepth").slideUp();
                $("body").removeClass("fixed");
            }
    
        });
    
    //mobile menu
    let mobileN;
    
    $("#mobile > ul > li > a").click(function(e){
        // console.log("1depth");
        e.preventDefault();
    
        mobileN=$(this).parent().index();
    
        $("#mobile > ul > li").removeClass("on");
        $(this).parent().addClass("on");
        $("#mobile .twoDepth li").removeClass("on");
    
        if($(this).parent().children().length !== 1){
            for(let i=0; i<$("#mobile > ul > li").length; i++){
                if(i === mobileN){
                    let depth2=$(this).next();
    
                    if(depth2.is(":visible") === false){
                        depth2.show();
                    }
                    else{
                        depth2.removeAttr("style");
                    }
                }
                else{
                    $("#mobile > ul > li").eq(i).find(".twoDepth").removeAttr("style");
                }
            }
        }
        else{
            if($("#mobile .twoDepth").is(":visible")) $("#mobile .twoDepth").removeAttr("style");
        }
    
        $("#mobile .threeDepth").each(function(i){
            if($(this).is(":visible")){
                $(this).removeAttr("style");
            }
        });
    });
    
    $("#mobile .twoDepth li").click(function(e){
        // console.log("2depth");
        e.preventDefault();
        $("#mobile .twoDepth li").removeClass("on");
        $(this).addClass("on");
        if($(this).find(".threeDepth").is(":visible") === false){
            $("#mobile .threeDepth").slideUp(300);
            $(this).find(".threeDepth").slideDown(300);
            $("#mobile .twoDepth li").removeClass("on");
            $(this).addClass("on");
        }
        else{
            $(this).find(".threeDepth").slideUp(300);
            $("#mobile .twoDepth li").removeClass("on");
        }
    });
    
        // #sub car navigation
    let carNameIdx=0;
    let carFigurIdx=0;
        $("#car_configurator nav.car li").click(function(e){
        e.preventDefault();
            $("#car_configurator nav.car ul li").removeClass("on");
            $(this).addClass("on");
        carNameIdx=$(this).index()
            $("#car_configurator .car_detail ul li").removeClass("active");
            $("#car_configurator .car_detail ul li").eq(carNameIdx).addClass("active");
        });
    });