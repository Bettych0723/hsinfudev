/* Table of content
--------------------------------------------

========

--------
ANIMATION AFTER PAGE LOAD
MASONRY ON GALLERY PAGE
SLIDER ON HOME PAGE
CURSOR 
NAVIGATION ANIMATION
PAGE TRANSITIONS 
IMAGES SORTING
-----------
==========

*/


// PAGE EFFECT AFTER LOADING
// 加載後的頁面效果
$(window).on('load',function(){

  var loadertext = document.querySelector('.loader-text-stroke');

  loadertext.addEventListener('animationend',function(){

    gsap.to(loadertext,.8,{
      opacity:0,
      onComplete:function(){
        gsap.to(loadertext,0,{
          display:'none'
        })
        gsap.to('#loader',1.2,{   //LOADING PAGE TRANSITION
          y:'-100%',
          ease:'Expo.easeInOut'
      })
      }
    })

  })
  
});

// PAGE EFFECT AFTER LOADING


//MASONRY ON GALLERY PAGE
// 畫廊頁面
$(function(){
  $('.gallery-grid').masonry({
    itemSelector: '.column',
    isAnimated: true
  });

  var pagelink = document.querySelectorAll('.page-link');

  pagelink.forEach(link=>link.addEventListener('click',function(){
    setTimeout(function(){
      new Masonry( '.gallery-grid', { 
        itemSelector: '.column',
        isAnimated: true
      })
    },2000)
  }))
})
//MASONRY ON GALLERY PAGE


// GALLERY PAGE SLIDER

new Swiper(' .swiper-container', {
   direction: "vertical",
    slidesPerView: 'auto',
    speed: 1000,
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    on: {
      init: function() {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find('.img-container')
            .attr({
              'data-swiper-parallax': 1 * swiper.width,
            });
        }
      },
      resize: function() {
        this.update();
      }
    },
    // autoplay: {
    //   delay: 8000,
    //   disableOnInteraction: true,
    // },
    pagination: {
      el: '#home .swiper-pagination',
      type: 'fraction',
    },
    mousewheel: true,
    observer: true,  
    observeParents: true,
  });
  // SLIDER ON GALLERY PAGE        
  


  $(document).ready(function() {
    $(".image-type").lettering();
  });



  // CURSOR
  // 游標
   $(function(){
    var $cursor = $('.cursor');
    var $cursortwo = $('.cursor-two')
      function cursormover(e){
       
       gsap.to( $cursor , {
         x : e.clientX ,
         y : e.clientY,
        })
        gsap.to( $cursortwo , {
          x : e.clientX ,
          y : e.clientY,
         })
      }
      function cursorhover(){
       gsap.to( $cursor,{
        scale:1.5,
        opacity:.4,
        background:'#ffc000',
        border:'none',
        ease: Expo.easeOut,
       })
       gsap.to( $cursortwo,{
        scale:0,
        opacity:0
       })
     }
     function linkhover(){
      gsap.to( $cursor,{
        width:'100px',
        height:'100px',
        opacity:1,
        background:'#ffc000',
        border:'none',
        innerHTML:'view&nbsp;gallery',
        top:'-50px',
        left:'-50px',
       })
       gsap.to( $cursortwo,{
        width:'110px',
        height:'110px',
        border:'2px solid #ffc000',
        background:'transparent',
        top:'-55px',
        left:'-55px',
       })
     }
     function cursor(){
       gsap.to( $cursor, {
        width:'50px',
        height:'50px',
        top:'-25px',
        left:'-25px',
        opacity:1,
        scale:1,
        background:'transparent',
        border:'1px solid #ffc000',
        innerHTML:''
       }) 
       gsap.to( $cursortwo,{
        scale:1,
        opacity:1,
        width:'8px',
        height:'8px',
        border:'0px solid #ffc000',
        background:'#ffc000',
        top:'-4px',
        left:'-4px',
       })
     }
     $(window).on('mousemove',cursormover);
     $('#home .img-container').hover(linkhover,cursor);
     $('.hover').hover(cursorhover,cursor);
  })
// CURSOR





//DISPLAY NAVIGATION CONTENT ON MENUBAR CLICK
// 點擊菜單欄顯示導航內容
$(function(){
 $('.menu-bar').on('click',function(){ //WHEN MENUBAR IS CLICKED BRING NAVIGATION UP
    gsap.to('#navigation',1,{
    y:'0%',
    ease:'Expo.easeInOut',
    onComplete:function(){ //WHEN NAVIGATION ANIMATION IS COMPLETED DO THE FOLLOWING
      gsap.to('.navigation-opacity',.5,{  //GET ELEMENTS OF CLASS 'NAVIGATION-OPACITY' AND TURN THEIR OPACITY TO 1
        opacity:1,
        stagger:.1
      })
    }
  })
  })

  $('.navigation-close').on('click',function(){ //WHEN NAVIGATION CLOSE IS CLICKED ANIMATE NAVIGATION DOWN

    gsap.to('.navigation-opacity',.5,{  //GET ELEMENTS OF CLASS 'NAVIGATION-OPACITY' AND TURN THEIR OPACITY TO 0
    opacity:0,
    stagger:.05,
    onComplete:function(){ //WHEN OPACITY ANIMATION IS COMPLETED DO THE FOLLOWING
      gsap.to('#navigation',1,{
        y:'100%',
        ease:'Expo.easeInOut',
    })
  }

  })
})
})


//PAGE TRANSITIONS 
// 頁面轉換
$(function pagetransition(){

  var links = [...document.querySelectorAll('.page-link')]; // get all elements with class 'page link'
  var breaker = document.querySelector('#breaker');  //get element with ID Breaker 使用 ID Breaker 獲取元素


  links.forEach(link => link.addEventListener('click',function(){ //on click on page link element 點擊頁面鏈接元素
     
    var page =  link.getAttribute("href");  // get its value of attribute href 獲取其屬性href的值

    if(document.querySelector(page)){

      //DISPLAYBREAKER FUNCTION 顯示中斷功能
      function displaybreaker(){
          breaker.style.display = 'block';  //display breaker animation 顯示斷路器動畫
  
 
          breaker.addEventListener('animationend',function(){
              this.style.display="none";  // on animation end set the style of breaker to none
          })

          gsap.to('.navigation-opacity',.5,{  //close navigation
          opacity:0,
          stagger:-.05,
          onComplete:function(){ 
            gsap.to('#navigation',1,{
              y:'100%',
              ease:'Expo.easeInOut',
          })
        }}) //close navigation

      }

      //DISPLAYBREAKER FUNCTION
  
 
      displaybreaker()   // CALL DISPLAYBREAKER FUNCTION
 
 
      //  CHANGEPAGE FUNCTION 換頁功能
      function changepage(){
 
         var pages = links.map(a=>a.getAttribute("href")) // GET ALL THE PAGES 獲取所有頁面
         setTimeout(function(){
          pages.forEach(a=>document.querySelector(a).style.display='none');  // SET THE STYLE OF ALL THE PAGES TO NONE 將所有頁面的樣式設置為無
          document.querySelector(page).style.display ='block';  //SET THE STYLE OF THE PAGE THAT HAS BEEN CLICKED TO BLOCK  設置被點擊屏蔽的頁面樣式
         },1500)
       }    
      //  CHANGEPAGE FUNCTION
      
      changepage()   // CALL CHANGEPAGE FUNCTION
    }
  }))
})

//PAGE TRANSITION




// SORTING OF IMAGES 

$(function(){
  var sortingbuttons = document.querySelectorAll('.image-sort-button'); //GET ALL IMAGE SORTING BUTTON THEY HAVE A CLASS OF 'IMAGE-SORT-BUTTON'
  var images = [...document.querySelectorAll('.gallery-img')] //GET ALL IMAGES WITH CLASS 'GALLERY-IMG'

  //SORT IMAGES
  sortingbuttons.forEach(button=>button.addEventListener('click',function(){ 

  var sortvalue =  button.dataset.sort; //GET VALUE OF THE 'DATA-SORT' FROM BUTTON WHICH HAS BEEN CLICKED

  images.forEach(image=>image.style.display='none'); //GET ALL THE IMAGES AND SET THEIR DISPLAY TO NONE

  var imagestoshown = document.querySelectorAll(`[alt='${sortvalue}']`); //GET ALL THE IMAGES WHICH WE NEED TO SHOW
  
  imagestoshown.forEach(show=>show.style.display="block") //SET IMAGES TO BLOCK

  if(sortvalue == 'all'){  //IF BUTTON "ALL" IS CLICKED SET ALL IMAGES TO BLOCK 
    images.forEach(image=>image.style.display='block');
  }
  //SORT IMAGES



  //SET NEW MASONRY
    new Masonry( '.gallery-grid', { 
      itemSelector: '.column',
      isAnimated: true
    })
  //SET NEW MASONRY


  //CHANGE BUTTON STYLE 更改按鈕樣式
  sortingbuttons.forEach(buttons=>buttons.classList.remove('active')); //REMOVE CLASSLIST OF ACTIVE FROM CURRENT BUTTON
  button.classList.add('active'); // ADD CLASS LIST OF ACTIVE TO THE BUTTON WHICH HAS BEEN CLICKED

  //CHANGE BUTTON STYLE





  }))

})

  
// SORTING OF IMAGES 
