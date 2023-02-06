const getElem = (elem)=> document.querySelector(elem);
window.addEventListener('scroll', ()=>{
    if(window.pageYOffset >= 15 && !(getElem('.header').classList.contains('active'))){
        getElem('.header').classList.add('hidden');
    } else{
        document.querySelector('.header').classList.remove('hidden');
    }
});
   

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', function(){
    if(!this.classList.contains('hamburger_active')){
        document.querySelector('.header').classList.add('active');
        this.classList.add('hamburger_active');
        document.querySelector('.header__button').classList.add('header__button_toggle');
        getElem('body').style.overflow = "hidden";
    } else
   {
        this.classList.remove('hamburger_active');
        document.querySelector('.header__button').classList.remove('header__button_toggle');
        document.querySelector('.header').classList.remove('active');
        getElem('body').style.overflow = "";
    }
});
//////////////////////////////////////////////SLIDER////////////////////////////////////////
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let time = 2,
  cc = 1;
 ////////////////////////////////////////////END SLIDER//////////////////////////////////////
 ///////////////////////////////////////////PROMO COUNT///////////////////////////////////// 
document.querySelectorAll('.promo__count-container p').forEach((el)=>{
    let i = 1,
    num = el.dataset.num,
    step = 1000 * time / num,
    int = setInterval(()=>{
        if(i<=num){
            el.innerHTML = i;
        } else{
            clearInterval(int);
        }
        i++;
    }, step);
});
//////////////////////////////////////////////END PROMO COUNT////////////////////////////////
// (function($) {
//     ////TABS///
//     ///MODAL///
//     $('[data-modal=promo]').on('click', function() {
//         $('.overlay, #promo').fadeIn('slow');
//     });
//     $('[data-modal=video]').on('click', function() {
//         $('.overlay, #video').fadeIn('slow');
//     });
//     $('[data-modal=map]').on('click', function() {
//         $('.overlay, #map').fadeIn('slow');
//     });
//     $('[data-modal=franchise]').on('click', function() {
//         $('.overlay, #franchise').fadeIn('slow');
//     });
    
//     $('.modal__close').on('click', function() {
//         $('.overlay,#promo, #products, #video,#map,#franchise').fadeOut('slow');
//     });

//     $('.button_mini').each(function(i) {
//         $(this).on('click', function() {
//             $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
//             $('.overlay, #order').fadeIn('slow');
//         });
//     });
//     ///END MODAL///
//     })(jQuery);


    /////////

    class Product {
        constructor(name, src, color, components, definitions, ingredients, quantity, parentSelector) {
          this.name = name;
          this.alt = name;
          this.src = src;
          this.color = color;
          this.components = [...components];
          this.definitions = [...definitions];
          this.ingredients = [...ingredients];
          this.quantity = [...quantity];
          this.parent = document.querySelector(parentSelector);
        }
      
        render() {
            const element = document.querySelector('.product');
            element.innerHTML = `
                    <div class="product">
                    <h3 class="product__title title title_fs20">${this.name}</h3>
                    <div class="product__photo product__photo_${this.color}">
                        <img src=${this.src} alt=${this.alt}>
                    </div> 
            `;
            const componentsUl = document.createElement('ul');
            componentsUl.classList.add('product__components');

            this.definition = this.definitions.map((el)=>{
                if(el.length > 5 && window.innerWidth <= 567){
                    el = el.substr(0, 5) + '...';
                }
                return el;
            });
            
            this.components.forEach((el,i)=>{
                let li = document.createElement('li');
                li.classList.add(`product__component`, `product__component_${this.color}`);
                li.innerHTML = `<span>${el}</span>${this.definition[i]}`;
                componentsUl.append(li);
                element.append(componentsUl);
            });
            const subtitle = document.createElement('h4');
            subtitle.classList.add('subtitle', 'subtitle_fs20', 'subtitle_med', 'subtitle_fs20_cap');
            subtitle.innerHTML = `Ingredients`;
            element.append(subtitle);
            const ingredientsUl = document.createElement('ul');
            ingredientsUl.classList.add('product__ingridients');
            this.ingredients.forEach((el,i)=>{
                let li = document.createElement('li');
                li.classList.add('product__ingridient');
                li.innerHTML = `<span>${el}</span>${this.quantity[i]}`;
                ingredientsUl.append(li);
                element.append(ingredientsUl);
            });

        }
      }
      const icecream = new Product('Chololate icecream', 'img/ingridients/icecream.png', 'olive', ['320','4g', '8,2g','40,4g'], ['kcal', 'Protein...', 'Fats', 'Carbs'], ['Milk', 'Belgian chocolate', 'Cream', 'Cocoa powder', 'Sugar', 'Vanilla sugar'], ['100ml', '20g', '150 ml', '30g', '40g', '10g'], '#products');
      const coffee = new Product('ice coffee', 'img/ingridients/coffee.png', 'orange', ['27','2g', '1g','3g'], ['kcal', 'Protein...', 'Fats', 'Carbs'], ['black coffee', 'milk', 'ice', 'maple syrup'], ['200ml', '50ml', 'optional', 'optional'], '#products');
      const shake = new Product('milkshake', 'img/ingridients/shake.png', 'choco', ['382', '9.03g', '13.84g','56.91g'], ['kcal', 'Protein...', 'Fats', 'Carbs'], ['whole milk, cold', 'ice cream', 'chocolate syrup', 'chocolate chips'], ['200ml', '50ml', 'optional', 'optional'], '#products');
      
      const sidepageTrigger = document.querySelectorAll('div [data-sidepage="product"]');
      sidepageTrigger.forEach((el)=>{
        el.addEventListener('click', function(){
            if(this.dataset.product == 'icecream'){
                icecream.render();
            }
            if(this.dataset.product == 'coffee'){
                coffee.render();
            }
            if(this.dataset.product == 'shake'){
                shake.render();
            }
            getElem('.sidepage').classList.add('active');
            getElem('body').style.overflow = "hidden";
        });
      });


    function showModal(elem, button){
        button.addEventListener('click', ()=>{
            getElem('.overlay').classList.add('active');
            elem.classList.add('active');
            getElem('body').style.overflow = "hidden"; 
            if(getElem('.header').classList.contains('active')){
                getElem('.header').classList.remove('active');
                getElem('.hamburger').classList.remove('hamburger_active');
                getElem('.header__button').classList.remove('header__button_toggle');
            }  
        });
    }
    function hideModal(elem){
        if(getElem('.overlay').classList.contains('active')){
            getElem('.overlay').classList.remove('active');
        }
        elem.classList.remove('active');
        getElem('body').style.overflow = "";
    }
    
    
    
    showModal(getElem('#promo'), getElem('button[data-modal = "promo"]'));
    showModal(getElem('#video'), getElem('button[data-modal = "video"]'));
    showModal(getElem('#map'), getElem('button[data-modal = "map"]'));
    showModal(getElem('#franchise'), getElem('button[data-modal = "franchise"]'));

    document.querySelectorAll('.modal__close').forEach((el)=>{
        el.addEventListener('click',function(){
            hideModal(getElem('.sidepage'));
            hideModal(getElem('#promo'));
            hideModal(getElem('#video'));
            hideModal(getElem('#map'));
            hideModal(getElem('#franchise'));
        });
    });

    document.querySelectorAll('.card_sm').forEach(function(element){
        element.addEventListener('click', function(){
            document.querySelectorAll('.card_sm').forEach((el)=>{
                if(el.classList.contains('active')){
                    el.classList.remove('active');
                }
            });
            element.classList.add('active');
        });
    });
/////////////////////////////////////////////////////ANCHORS//////////////////////
    $('a[href^="#"]').on('click', function(event) {

        var target = $(this.getAttribute('href'));
      
        if (target.length) {
          event.preventDefault();
          $('html, body').stop().animate({
            scrollTop: target.offset().top
          }, 1000);
          if($('.header').hasClass('active')){
                $('.header').removeClass('active');
                $('.hamburger').removeClass('hamburger_active');
                $('.header__button').removeClass('header__button_toggle');
                $('body').css('overflow', '');
          }
        }
      });


      

      
      
      

      
