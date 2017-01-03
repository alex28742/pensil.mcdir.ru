$(function(){


  var max_count_page = $('.end-number').html()*1;
  if(max_count_page === "undefined") return false;


  var flag_catch_interval;
  var time_to_reload = 2000;// время срабатывания переадресации
  var timeOutRightDescription;
  var timeOutLeftDescription;
  var current = 1; // параметр текущей страницы




  function getUrlVars()
    {
        var vars = [], hash,temp;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('&');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
            if(temp === undefined) temp = hash[0];
        }
        return temp;
    }



    // ловлю изменение в инпуте

  function catch_change(new_value){
  flag_catch_interval = setInterval(function(){
    if($('.page-input').val() != current){
      console.log('new value up!'+' current('+current+')'+'page-input val = ('+$('.page-input').val()+')');
      // проверка на корректный ввод
      if(!check_correct_value($('.page-input').val())){
        clearInterval(flag_catch_interval);
        $('.page-input').val(current);
        return false;
      }
      // сделать переход на страницу
      // здесь по-видимому надо изменять куррент
      clearInterval(flag_catch_interval);
      redirect_new_page($('.page-input').val());// изменить параметр
      return false;
    }
  },2000);

  }

  function check_correct_value(value){
    // не число или больше допустимого, или отрицательное, или значение аналогичное прежнему, или пустая строка
    var values = $.trim(value);
    if(isNaN(values) || values > max_count_page || values < 1 || values == current || $.trim(values) === '') return false;
    else return true;
  }



  // перенаправление на страницу
  function redirect_new_page(num_page){
    var new_params = "";// новая строка сформированных параметров
    var clean_get = '';
    console.log('redirect UP! to '+num_page+' page!');

    var set = $('.get').html();// полный get
    var to_del_str = getUrlVars();// получаю параметр page=? для удаления
    // NOTE: надо разделить левую и правую части гета

    var split_path = set.split("?");
    //if(split_path[1]) console.log('есть доп. параметры: '+split_path[1]+'');


    // если нет доп параметров (?), поставить page=1
    // FIXME: не корректно работает, добавляет повторно параметр страницы

  //////////////////////////////////////////////////////////////////////////////////////////////////////
    if(!split_path[1]){ // доп параметров нет
      console.log('доп параметров нет');            // ок //////////
      clean_get = set+'?page='+num_page+'';
    }
  ////////////////////////////////////////////////////////////////////////////////////////////////////

    if(split_path[1] && !split_path[1].indexOf('page=') + 1){ // доп параметры есть, но page= не присутствует
      console.log('доп параметры есть, но page= не присутствует: '+split_path[1]+'');
      clean_get = split_path[0]+'?page='+num_page+'&'+split_path[1];
      clean_get = clean_get.replace(/&amp;/g, '&');// удаление мусора
    }
    if(split_path[1] && split_path[1].indexOf('page=') + 1){ // в доп параметрах присутствует page
      // если параметр страницы уже присутствует, заменить
      console.log('в доп параметрах присутствует page, выполняю замену');
      clean_get = set.replace(''+to_del_str+'','page='+num_page+'');// Замена параметра страницы
      clean_get = clean_get.replace(/&amp;/g, '&');// удаление мусора
    }

    console.log('путь для переадресации: '+clean_get);
    window.location.replace(clean_get);
    //alert(clean_get);
    //return false;

  }






function pagination_init(){
  // при загрузке проверять есть ли параметр страницы в get, если есть, то устанавливать инпут в это число

 var test_get = getUrlVars();
 if(test_get.indexOf('page=') + 1){
   // удаляю все, кроме цифры
   var num = (test_get.replace(/page=/g, '0'))*1;// удаление мусора
   if(num) $('.page-input').val(num); else $('.page-input').val(1);
 }



  current = $('.page-input').val();
  console.log(max_count_page);

// код отвечающий за механику кнопки ///////////////////////////////

  $('.pgn-left').click(function(){
    if(flag_catch_interval) clearInterval(flag_catch_interval);
    console.log('btn-left click');
    var val = $('.page-input').val();
    if(val > 1){ $('.page-input').val(''+val-1+''); } else return false;
    if(timeOutLeftDescription) clearTimeout(timeOutLeftDescription);
      timeOutLeftDescription = setTimeout(function(){
      current = val-1;
      redirect_new_page(val-1);
  },time_to_reload);
  });

  $('.pgn-right').click(function(){
    if(flag_catch_interval) clearInterval(flag_catch_interval);
    console.log('btn-right click');
    var val = $('.page-input').val()*1;//*1
    if(val < max_count_page){ $('.page-input').val(""+(val+1)+""); } else return false;
    if(timeOutRightDescription) clearTimeout(timeOutRightDescription);
    timeOutRightDescription = setTimeout(function(){
      current = val+1;
      redirect_new_page(val+1);
    },time_to_reload);
  });



  $('.page-input').click(function(){
    if(flag_catch_interval) clearInterval(flag_catch_interval);
    var new_val = $('.page-input').val();
    console.log('current = '+current+'');
    // проверка введено ли новое корректное значение
    catch_change(new_val);
});

////////////////////////////////////////////////////////////////////////////
}


pagination_init();  








































});
