$(document).ready(function() {

    // скрипт с последними изменениями
    //   $.session.set('some key', 'a value');

    // $.session.get('some key');
    // > "a value"

    // $.session.clear();

    // $.session.get('some key');
    // > undefined

    // $.session.set('some key', 'a value').get('some key');
    // > "a value"

    // $.session.remove('some key');

    // $.session.get('some key');
    // > undefined


    //var a = new Array('1','2','3');

    //$.session.set('array', a);


    // $('.at-stylize-input').each(function(){

    // if($.session.get('flag_selects_active') !== 'flag_selects_active')

    //   $(this).attr('checked','checked');

    // });



    $('.at-stylize-label').live('click', function() {
        $('#id-collection-select .not-delete').removeClass('not-delete');
        setTimeout(function() {
            $('#id-collection-select .opt:not([disabled])').each(function() {
                $(this).addClass('not-delete').show();

            });

            $('#id-select-otdelka .opt:not([disabled])').each(function() {
                $(this).addClass('not-delete').show();

            });


        }, 3000);
    });


    function hideEmptyBlocks() {
        $('.at-stylize-label:not(.disabled)').closest('.block-flow').addClass('saved');
        $('.block-flow:not(.saved)').hide();
    }

    function showAllBlocks() {
        $('.block-flow').removeClass('saved').show();
    }


    function maskChanges() {
        $('#product-list').addClass('mask-hide');
        setTimeout(function() {
            $('#product-list').removeClass('mask-hide');
        }, 4000);
    }




    // сохранинеи элементов в сессии select верхней части фильтров//////


    $('#id-collection-select .opt').click(function() {
        $.session.set('collection_session', $(this).text());

    });

    $('#id-select-otdelka .opt').click(function() {
        $.session.set('otdelka_session', $(this).text());

    });




    // сброс всех сессий при уходе со страницы
    $('.art-nav').click(function() { // клик по верхнему меню    ul li
        del_session_marks();
    });




    function del_top_selects_properties() {
        $.session.clear('brend_session');
        $.session.clear('collection_session');
        $.session.clear('otdelka_session');
    }


    function del_session_marks() {

        // сброс флага активности селектов
        $.session.clear('flag_selects_active');

        del_top_selects_properties();
        $.session.remove('setboxes');
        //console.log("удаляю все сессии: brend_session "+brend_session+"  collection_session "+collection_session+"   otdelka_session "+otdelka_session+"  setboxes ("+setboxes+")");

        $('.at-stylize-input').removeAttr('checked');

        $('#brend-select').prop('selectedIndex', 0);
        $('#id-collection-select').prop('selectedIndex', 0);
        $('#id-select-otdelka').prop('selectedIndex', 0);
    }

    // при выборе "все коллекции" сделать все варианты видимыми



    $('#id-collection-select option:contains("Все коллекции")').live('click', function() {
        //alert('выбраны все коллекции отделок!');
        $('#id-collection-select option').removeAttr('disabled').css('display', 'block');
        // удаляю доп.классы в отделках
        $('#id-select-otdelka .opt.not-delete').removeClass('not-delete');
        // очищаю память отделок
        $.session.clear('collection_session');
        $.session.remove('collection_session');
        $.session.clear('otdelka_session');
        $.session.remove('otdelka_session');



    });




    $('#id-collection-select').live('click', function() {

        //сбрасываю значения отделок
        $('#id-select-otdelka').prop('selectedIndex', 0);

        // при клике на коллекции надо добавить класс not-delete отделкам...
        setTimeout(function() {
            $('#id-select-otdelka .opt:not([disabled])').each(function() {
                $(this).addClass('not-delete'); //.css('color','red');
            });
        }, 4000);


    });

    // и при клике на селекте отделок надо делать активными элементы с этим классом
    $('#id-select-otdelka').click(function() {

        //$('#id-select-otdelka .opt.not-delete').removeAttr('disabled').css('display','block');

    });


    // отмечаю чекбоксы при перезагрузке - пагинации
    setTimeout(function() {

        var brend_checked = $.session.get('brend_session');
        var collection_checked = $.session.get('collection_session');
        var otdelki_checked = $.session.get('otdelka_session');

        var selects_active = $.session.get('flag_selects_active');


        console.log("Бренды: " + brend_checked + "");
        console.log("Все коллекции: " + collection_checked + "");
        console.log("Отделки: " + otdelki_checked + "");

        console.log("Флаг активности селектов: " + selects_active + "");

        // вставляю значения в верхнюю часть фильтра
        if (brend_checked !== undefined) {

            $('#brend-select option').each(function(index) {
                console.log('Это индекс ....' + index + '');
                if ($(this).html() == brend_checked) {
                    console.log($(this).html());
                    $(this).attr("selected", "selected");

                }
            });

        }

        if (collection_checked !== undefined) {


            $('#id-collection-select option').each(function() {
                if ($(this).html() == collection_checked) {
                    console.log($(this).html());
                    $(this).attr("selected", "selected");

                }
            });


        }

        if (otdelki_checked !== undefined) {

            $('#id-select-otdelka option').each(function() {
                if ($(this).html() == otdelki_checked) {
                    console.log($(this).html());
                    $(this).attr("selected", "selected");

                }
            });


        }

        if (selects_active !== undefined) {
            $('#id-collection-select').removeAttr("disabled");
            $('#id-select-otdelka').removeAttr("disabled");
        }

        console.log("в setboxes: " + $.session.get('setboxes') + "");
        var new_arr = new Array();
        var aaa = $.session.get('setboxes');
        console.log('В СЕССИИ: ' + aaa);
        if (aaa !== undefined) {
            aaa = aaa.split(','); // разбиваю строку на массив
        }
        if (aaa !== undefined && $.isArray(aaa)) {
            $('.at-stylize-input').each(function() {
                var temp = $(this).attr('data-id');
                var isset = $.inArray(temp, aaa);
                if (isset !== -1) {
                    $(this).filter(':checkbox').prop('checked', true);
                    console.log($(this).prop('checked'));
                } else { console.log('мимо!'); }

            });

        } else {
            console.log('не попал внутрь if($.isArray(aaa))');
        }


    }, 2000);




    $('#currency option:first').prop('selectedIndex', 0);

    // флаг для проверки был ли сделан выбор коллекций
    var flag_choosed_collection = false;




    $('#brend-select').live('click', function() {
        // сброс коллекций и отделок
        $('#id-collection-select').prop('selectedIndex', 0);
        $('#id-select-otdelka').prop('selectedIndex', 0);

        showAllBlocks();
        $('.at-stylize-label').show();

        if (!flag_choosed_collection) return;

        // делаю доступными все бренды
        $('.s-select option[disabled]').css('display', 'block').removeAttr('disabled');
        // в первое поле для контроля подставляю "все бренды"
        $('#brend-select .first-value').prop('selectedIndex', 0); //.html('Все бренды');

    });



    // активность коллекций
    $('#brend-select').change(function() {


        // надо сделать not-delete коллекциям
        setTimeout(function() {
            $('#id-collection-select .opt:not([disabled])').each(function() {
                $(this).addClass('not-delete').show();

            });
        }, 4000);
        $('#id-collection-select').removeAttr('disabled');


    });


    // клик по внутреннему элементу
    $('#brend-select option').live('click', function() {



        setTimeout(function() {
            hideEmptyBlocks();
        }, 4500);


        $.session.set('brend_session', $(this).text());

        if ($(this).is(":contains('Все бренды')")) {
            $.session.remove('brend_session');
        }



        $.session.set('flag_selects_active', 'active');
        // здесь надо проверить.....
        //$.session.clear('flag_selects_active');
        $.session.remove('setboxes');
        $.session.remove('collection_session');
        $.session.remove('otdelka_session');

        if (!flag_choosed_collection) return false; // здесь надо добав. функционал перезагрузки в любом случае?



        // var id_option = $(this).val();
        // var set = $('.get').html();// полный get
        // if(set === undefined) alert('err 346');
        // var split_path = set.split("?");
        // if(id_option == '' || id_option == undefined || id_option == null){
        //   window.location.replace(''+split_path[0]+'');
        // }
        // else{
        //   var new_path = split_path[0]+'?brend[]='+id_option+'';
        //   window.location.replace(new_path);

        // }
    });


    // сохранинеи элементов в сессии select верхней части фильтров//////
    $('#brend-select .opt').click(function() {
        $.session.set('brend_session', $(this).text());

    });





    // при клике по селекту брендов
    //$('#id-collection-select').live('click',function(){

    //При использовании перестало работать сохранение при перезагрузке...
    //del_top_selects_properties();

    //});



    // делаю активными коллекции при возврате
    $('#id-collection-select').live('change', function() {





        // для контроля все бренды делаю активными
        // $('#brend-select .opt').removeAttr('disabled').css('display','block');

        // // делаю видимыми инпуты скрытые
        // $('.at-stylize-label.disabled').removeClass('disabled').css('display','block');

        // // была выбрана коллекция, сделать возможной переадресацию по брендам
        // flag_choosed_collection = true;

        // $('#id-select-otdelka').removeAttr('disabled');


        // $('#id-select-otdelka .opt[disabled]').removeAttr('disabled').removeAttr('style');

        // $('#id-collection-select .opt:not([disabled])').each(function(){

        //   $(this).addClass('not-delete');

        // });

        // для контроля все бренды делаю активными
        $('#brend-select .opt').removeAttr('disabled').css('display', 'block');

        // делаю видимыми инпуты скрытые
        $('.at-stylize-label.disabled').removeClass('disabled').css('display', 'block');

        // была выбрана коллекция, сделать возможной переадресацию по брендам
        flag_choosed_collection = true;

        // поле отделок делаю активным
        $('#id-select-otdelka').removeAttr('disabled');

        // если отделки ранее были выбраны и имеют класс not-disable удаляю этот класс
        $('#id-collection-select .opt.not-disable').removeClass('not-disable');
        // удаляю ранее скрытые отделки
        $('#id-select-otdelka .opt[disabled]').removeAttr('disabled').removeAttr('style');

        // жду отработки аякса и применяю класс not-disable отделкам которые остались




        setTimeout(function() {
            showAllBlocks();
            // добавляю класс коллекциям
            $('#id-collection-select .opt:not([disabled])').each(function() {
                $(this).addClass('not-delete');
            });
            // добавляю класс отделкам
            $('#id-select-otdelka .opt:not([disabled])').each(function() {
                $(this).addClass('not-delete');
            });

        }, 3000);






    });

    $('#id-select-otdelka').live('change', function() {



        console.log("Изменения в ОТделках");

        // для контроля все бренды делаю активными
        $('#brend-select .opt').removeAttr('disabled').css('display', 'block');


        setTimeout(function() {
            $('#id-collection-select .not-delete').each(function() {
                $(this).removeAttr('disabled').css('display', 'block');
            });
            //$('.not-delete').removeAttr('disabled').css('display','block');



        }, 4000);


    });


    // скрытие отдельных предметов в настольных аксессуарах
    $('.row-items').slideUp(1500);
    $('.data-407').live('click', function() {
        $('.row-items').slideDown(1500);
    });
    $('.data-406').live('click', function() {
        $('.row-items').slideUp(1500);
    });












    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& PAGINATION &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    var max_count_page = $('.end-number').html() * 1;
    if (max_count_page === "undefined") return false;


    var flag_catch_interval;
    var time_to_reload = 2000; // время срабатывания переадресации
    var timeOutRightDescription;
    var timeOutLeftDescription;
    var current = 1; // параметр текущей страницы




    function getUrlVars() {
        var vars = [],
            hash, temp;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('&');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
            if (temp === undefined) temp = hash[0];
        }
        return temp;
    }



    // ловлю изменение в инпуте

    function catch_change(new_value) {
        flag_catch_interval = setInterval(function() {
            if ($('.page-input').val() != current) {
                console.log('new value up!' + ' current(' + current + ')' + 'page-input val = (' + $('.page-input').val() + ')');
                // проверка на корректный ввод
                if (!check_correct_value($('.page-input').val())) {
                    clearInterval(flag_catch_interval);
                    $('.page-input').val(current);
                    return false;
                }
                // сделать переход на страницу
                // здесь по-видимому надо изменять куррент
                clearInterval(flag_catch_interval);
                redirect_new_page($('.page-input').val()); // изменить параметр
                return false;
            }
        }, 2000);

    }

    function check_correct_value(value) {
        // не число или больше допустимого, или отрицательное, или значение аналогичное прежнему, или пустая строка
        var values = $.trim(value);
        if (isNaN(values) || values > max_count_page || values < 1 || values == current || $.trim(values) === '') return false;
        else return true;
    }



    // перенаправление на страницу
    function redirect_new_page(num_page) {
        var new_params = ""; // новая строка сформированных параметров
        var clean_get = '';
        console.log('redirect UP! to ' + num_page + ' page!');

        var set = $('.get').html(); // полный get
        //var to_del_str = getUrlVars();// получаю параметр page=? для удаления

        //!!! Здесь проблема! когда в параметрах нет страницы, то для удаления подставляется другой параметр... первый по счету?



        // NOTE: надо разделить левую и правую части гета

        var split_path = set.split("?");
        //if(split_path[1]) console.log('есть доп. параметры: '+split_path[1]+'');

        if (split_path[1]) split_path[1] = split_path[1].replace(/&amp;/g, '&'); // удаление мусора

        // если нет доп параметров (?), поставить page=1
        // FIXME: не корректно работает, добавляет повторно параметр страницы

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        if (split_path[1] === undefined || split_path[1] === "") { // доп параметров нет
            console.log('доп параметров нет'); // ок //////////
            clean_get = '' + set + '?pages=' + num_page + ''; //set???
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        if (split_path[1] && split_path[1].indexOf('pages=') < 0) { // доп параметры есть, но page= не присутствует (false)
            console.log('ДОП ПАРАМЕТРЫ ЕСТЬ, но page= не присутствует: ' + split_path[1] + ''); // alert(split_path[1]);
            clean_get = split_path[0] + '?pages=' + num_page + '&' + split_path[1];
            clean_get = clean_get.replace(/&amp;/g, '&'); // удаление мусора
        }
        if (split_path[1] && split_path[1].indexOf('pages=') >= 0) { // в доп параметрах присутствует page (true)
            // если параметр страницы уже присутствует, заменить
            var to_del_str = getUrlVars(); // получаю параметр page=? для удаления
            clean_get = set.replace('' + to_del_str + '', 'pages=' + num_page + ''); // Замена параметра страницы
            clean_get = clean_get.replace(/&amp;/g, '&'); // удаление мусора
            console.log('в доп параметрах присутствует page, выполняю замену, clean_get =' + clean_get + '');
        }

        console.log('путь для переадресации: ' + clean_get);

        // устанавливаю флаг-сессию для активации селекта при смене страницы с перезагрузкой
        $.session.set('flag_selects_active', 'active');

        window.location.replace(clean_get);
        //alert(clean_get);
        //return false;
        console.log("CURRENT = " + current + "");

    }

    console.log("CURRENT = " + current + "");

    function pagination_init() {
        // при загрузке проверять есть ли параметр страницы в get, если есть, то устанавливать инпут в это число
        console.log('initializatin pagination');
        var test_get = getUrlVars();
        var num = null;
        if ((test_get.indexOf('pages=') + 1) >= 0) {
            // удаляю все, кроме цифры

            num = (test_get.replace(/pages=/g, '0')) * 1; // удаление мусора
            console.log('в параметре.... >' + num);

        }
        if (num) $('.page-input').val(num);
        else $('.page-input').val(1);


        current = $('.page-input').val();
        console.log(max_count_page);

        // код отвечающий за механику кнопки ///////////////////////////////



        $('.pgn-left').live('click', function() { //.click(function(){
            //flag_use = false;
            if (flag_catch_interval) clearInterval(flag_catch_interval);
            console.log('btn-left click');
            var val = $('.page-input').val();
            if (val > 1) { $('.page-input').val('' + val - 1 + ''); } else return false;
            if (timeOutLeftDescription) clearTimeout(timeOutLeftDescription);
            timeOutLeftDescription = setTimeout(function() {
                current = val - 1;
                redirect_new_page(val - 1);
            }, time_to_reload);
        });



        $('.pgn-right').live('click', function() {


            console.log('btn-right click');
            if (flag_catch_interval) clearInterval(flag_catch_interval);
            console.log('вхождение в обработчик клика правой кнопки');
            var val = $('.page-input').val() * 1; //*1 
            //console.log('val = '+val+'');
            if (val < max_count_page) { $('.page-input').val("" + (val + 1) + ""); } else return false;
            if (timeOutRightDescription) clearTimeout(timeOutRightDescription);
            //current = val+1;
            //console.log("val+1 = "+current+"");
            timeOutRightDescription = setTimeout(function() {
                console.log('Взятое число из инпута: ' + $('.page-input').val() * 1 + '');
                redirect_new_page($('.page-input').val() * 1); //
            }, time_to_reload);
        });






        $('.page-input').live('click', function() { //.click(function(){
            if (flag_catch_interval) clearInterval(flag_catch_interval);
            var new_val = $('.page-input').val();
            console.log('current = ' + current + '');
            // проверка введено ли новое корректное значение
            catch_change(new_val);
        });

        ////////////////////////////////////////////////////////////////////////////
    }

    pagination_init();
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& PAGINATION END &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&








    /////////////////////////////////////////



    // баннер на главной

    $(window).scroll(function() {
        var top = $(this).scrollTop();
        if (top > 1024 && top < 1100) {
            $('.als-question').css('position', 'relative');
            console.log('relative');
        } else if (top < 1024 && top > 1000) {
            $('.als-question').css('position', 'static');
            console.log('static');
        }

        if (top > 1024) {
            var diff = top - 1024;
            $('.als-question').css('top', '' + diff + 'px');
            // console.log(diff);
        }


    });


    ////////////////////////////////////



    // расчетминимальной и максимальной цен при работе фильтра

    function GetPriseByFilter() {

        var min = 0;
        var max = 0;
        var count = 0;
        $('.item-price').each(function() {
            count++;
            if (min === 0) min = $(this).text();
            if (Number($(this).text()) > max) max = Number($(this).text());
            if (Number($(this).text()) < min) min = Number($(this).text());

        });

        console.log('min = ' + min + '  max = ' + max + '  count = ' + count + '');

    }

    //////////////////////////////////


    // удаление в главном меню разделителей при наведении мыши
    setTimeout(function() { $('.art-nav li.art-parent').hover(initem, outtem); }, 500);
    setTimeout(function() { $('.art-nav li.art-parent').hover(initem, outtem); }, 1500);
    setTimeout(function() { $('.art-nav li.art-parent').hover(initem, outtem); }, 2500);

    function initem() { $(this).prev('li').css('color', '#3B3D47');
        $(this).next('li').css('color', '#3B3D47'); }

    function outtem() { $(this).prev('li').css('color', '#b4b4b7');
        $(this).next('li').css('color', '#b4b4b7'); }

    /////////////////////////////////



    // удаление класса selected из главного меню после загрузки страницы

    setTimeout(function() {
        $('li.selected').removeClass('selected');
    }, 2000);



    ////////////////////////////////


    // добавление названия типа товара в thumb
    function addTypeName(type) {
        if (type == "Тип пишущего узла") $('.prise-wrapper .type-uzel').css('display', 'none !important');
        $('.features td:contains(' + type + ')').each(function() {
            var val = $(this).next().html();
            $(this).closest('.pl-item-info-expandable.art-pl-item-info-expandable').children(':first').after('<span class="item-typename">' + val + '</span><hr class="art-thumbs-hr">');

        });
    }

    addTypeName("Тип товара");

    if ($('.get').html()) {
        if ($('.get').html().indexOf('addition=viewed') !== -1) { // если на странице сравнение
            //addTypeName("Тип пишущего узла");// для ручек
            setTimeout(function() {
                $('.prise-wrapper .type-uzel').hide();
            }, 500);

        }
    }

    ////////////////////////////////


    // кнопка сброс в верхней панели фильтра по товарам
    $('#reset-features-top').bind('click', function(e) {
        e.stopPropagation();
        // снимаю галки со всех инпутов вверху фильтра
        $("input.at-stylize-input:checkbox").removeAttr("checked");

    });




    // сворачивание блоков фильтра в подборе
    function blockFlowUp() { $('.block-flow').slideUp(1000);
        $('.art-close-filter a').text("развернуть фильтр");
        $('.art-close-filter').addClass('to-bottom'); }

    function blockFlowDown() { $('.block-flow').slideDown(1000);
        $('.art-close-filter a').text("свернуть фильтр");
        $('.art-close-filter').removeClass('to-bottom'); }

    $('.art-close-filter').toggle(blockFlowDown, blockFlowUp);


    // NOTE: здесь должно быть условие: если первая страница, то не отрабатывать
    var page_isset = $('.get').html();
    console.log('полная взятая строка из гетта = ' + page_isset + '');
    if (page_isset) { // иначе будет ошибка на главной
        var inOF = page_isset.indexOf('pages=');
        if (inOF !== -1) {
            console.log('фильтр должен свернуться page_isset.indexOf(page=) возвращает ' + inOF + '');
            blockFlowUp();
        } else {
            console.log('фильтр должен быть развернут page_isset.indexOf(page=) возвращает ' + inOF + '');
        }
    }






    // метка для скрывающихся блоков
    function setMetka() {

        // определение лимита блоков в ряду на главной
        if ($(window).width() >= 980) var limit = 9; // по пять блоков в ряд

        // изначально скрываю кнопку подробнее на брендах на главной
        $('.art-wrapper-show-button').hide();

        var count_2 = 0;
        var count_210 = 0;
        var count_252 = 0;
        $('.category-id-2 .art-img-wrap-in-main').each(function(index) {
            count_2++;
            if (index > limit) {
                $(this).addClass('flow-id-2');
            }

        });

        $('.category-id-210 .art-img-wrap-in-main').each(function(index) {
            count_210++;
            if (index > limit) {
                $(this).addClass('flow-id-210');
            }

        });

        $('.category-id-252 .art-img-wrap-in-main').each(function(index) {
            count_252++;
            if (index > limit) {
                $(this).addClass('flow-id-252');
            }

        });

        // в первом блоке больше элементов
        if (count_2 > limit) { $('.btn-id-2 .art-wrapper-show-button').show(); }
        if (count_210 > limit) { $('.btn-id-210 .art-wrapper-show-button').show(); }
        if (count_252 > limit) { $('.btn-id-252 .art-wrapper-show-button').show(); }

    }

    setMetka();




    // функции скрытия и раскрытия брендов на главной
    function hideElementsPish() {
        $('.flow-id-2').slideUp(1000);
        $('.btn-id-2 .art-sehen-alles').text("смотреть всё");
        $('.btn-id-2 .art-strelka').removeClass('to-top');
    }

    function showElementsPish() {
        $('.flow-id-2').slideDown(1000)
        $('.btn-id-2 .art-sehen-alles').text("компактный вид");
        setTimeout(function() { $('.btn-id-2 .art-strelka').addClass('to-top'); }, 1000); // время в мс
    }

    function hideElementsPaper() {
        $('.flow-id-210').slideUp(1000);
        $('.btn-id-210 .art-sehen-alles').text("смотреть всё");
        $('.btn-id-210 .art-strelka').removeClass('to-top');
    }

    function showElementsPaper() {
        $('.flow-id-210').slideDown(1000)
        $('.btn-id-210 .art-sehen-alles').text("компактный вид");
        setTimeout(function() { $('.btn-id-210 .art-strelka').addClass('to-top'); }, 1000); // время в мс
    }

    function hideElementsAccess() {
        $('.flow-id-252').slideUp(1000);
        $('.btn-id-252 .art-sehen-alles').text("смотреть всё");
        $('.btn-id-252 .art-strelka').removeClass('to-top');
    }

    function showElementsAccess() {
        $('.flow-id-252').slideDown(1000)
        $('.btn-id-252 .art-sehen-alles').text("компактный вид");
        setTimeout(function() { $('.btn-id-252 .art-strelka').addClass('to-top'); }, 1000); // время в мс
    }


    $('.btn-id-2').toggle(showElementsPish, hideElementsPish);
    $('.btn-id-210').toggle(showElementsPaper, hideElementsPaper);
    $('.btn-id-252').toggle(showElementsAccess, hideElementsAccess);

    // скрытие лишних блоков при загрузке страницы
    hideElementsPish();
    hideElementsPaper();
    hideElementsAccess();


    // удаление возникающих дублирующихся коллекций и отделок
    function removeDuplicate() {

        setTimeout(function() {
            // удаление дублирующихся коллекций
            var buffer = 'пусто';
            $('.line-collection h2:contains(Коллекция:)').each(function() {
                var text = $(this).html();
                //   console.log(text);
                //   console.log('в буфере '+buffer);
                if (text === buffer) $(this).hide(1000); //.remove();.css('background','green')
                buffer = text;
            });
            // удаление дублирующихся отделок
            $('.line-collection h4:contains(Отделка:)').each(function() {
                var text = $(this).html();
                //  console.log(text);
                //  console.log('в буфере '+buffer);
                if (text === buffer) $(this).hide(1000); //.css('background','red');//.remove();.css('background','red')
                buffer = text;
            });

        }, 500); //3000
    }



    // установка цены в фильтре

    setTimeout(function() { setPriceValue(); }, 1000); // время в мс

    function setPriceValue() {
        // min
        if ($('.ceny .min').val() === "") $('.ceny .min-value').html($('.filter-slider-wrapper .min').attr('placeholder'));
        else $('.ceny .min-value').html($('.ceny .min').val());
        //max
        if ($('.ceny .max').val() === "") $('.ceny .max-value').html($('.filter-slider-wrapper .max').attr('placeholder'));
        else $('.ceny .max-value').html($('.ceny .max').val());

    }

    // Не понятно для чего написан кусок кода.. к удалению???
    setTimeout(function() {
        // mause in
        $('.ui-slider-horizontal').mousemove(function() {
            var interval = setInterval(function(i) {
                console.log(i + 'some text');
                setPriceValue();
            }, 100);

            $('.ui-slider-horizontal').mouseleave(function() {
                if (interval != "undefined") {
                    clearInterval(interval);
                    $('.als-top').trigger('click');
                }
            });
        });

    }, 3000); // время в мс

    setPriceValue();



    // исправление ссылки на страницу, превращение в ссылку на главную сайта
    setTimeout(function() { $('.base-menu.type1.tree li:contains("Главная")').children().attr('href', '/'); }, 2000); // время в мс

    // исправление проблемы с лишним уровнем в боковом меню, удаление
    setTimeout(function() {
        $('.level-ul-2').remove();
        $('.level-ul-1 button.toggle-menu-child').remove();

        $('.level-ul-1').children('.parent').each(function() {
            $(this).removeClass('parent');
        });


    }, 2000); // время в мс



    // основная функция визуального отображения коллекций и отделок
    function setAmazingScr() {
        // если это список, не отрабатывать скрипту
        if ($('.owl-stage-outer').height() !== null) return false;


        //  Исправление проблемы : нет в наличии
        $('.price_and_stock:contains(undefined)').hide();

        // удаление инпута цвета
        $('.rem_col i').hide();
        // удаление ссылки сброса фильтра
        $('.filters-reset').hide();


        $('.list .out-of-stock:contains(Нет в наличии)').addClass('top-align-stock');


        var list_offers = $('.list .out-of-stock:contains(Нет в наличии)').addClass('top-align').closest('.offers');

        list_offers.children('.price-wrapper').remove();

        // к удалению...???
        // $('.list .out-of-stock:contains(Нет в наличии)').each(function(){
        //     // var additionWrapper  = $(this).siblings().css('background','red').detach();
        // });

        var temp = $('.list .top-align').css('border', '1px solid lightred').length; //



        // Обработка коллекций
        collectionCall = function(arr_collection, name, level_title) {
            $.each(arr_collection, function(index, value) {
                if (value !== "") {
                    $('td:contains(' + "'" + value + "'" + ')').closest('li').each(function(index) {
                        if (index === 0) {
                            if (level_title == 1) $(this).before('<div class="line-collection t1" style="clear:both"><h1>' + name + '&nbsp;<span class="art-item-name">' + value + '</span></h1></div>');
                            if (level_title == 2) $(this).before('<div class="line-collection t2" style="clear:both"><h2>' + name + '&nbsp;<span class="art-item-name">' + value + '</span></h2></div>');
                            if (level_title == 3) $(this).before('<div class="line-collection t3" style="clear:both"><h3>' + name + '&nbsp;<span class="art-item-name">' + value + '</span></h3></div>');
                            if (level_title == 4) $(this).before('<div class="line-collection t4" style="clear:both"><h4>' + name + '&nbsp;<span class="art-item-name">' + value + '</span></h4></div>');
                        }
                    });
                }
            })
        }

        /////////////////// Коллекции ///////////////////////

        var arr_collection = [];
        $('table.features td:contains(Коллекция)').each(function() {

            $(this).siblings().text();

            if ((arr_collection.indexOf('' + $(this).siblings().text() + '')) == -1) {
                arr_collection += $(this).siblings().text() + ";";
            }
        });

        var simpleStr = String(arr_collection);
        collectionArray = simpleStr.split(";");
        collectionCall(collectionArray, "Коллекция:", 2); // Массив названий, заголовок, уровень заголовка


        ////////////////  Отделки коллекции  ////////////////////

        var arr_otdelki = [];
        $('table.features td:contains(Отделка коллекции)').each(function() {
            $(this).siblings().text();
            if ((arr_otdelki.indexOf('' + $(this).siblings().text() + '')) == -1) {
                arr_otdelki += $(this).siblings().text() + ";";
            }
        });

        var simpleStr = String(arr_otdelki);
        collectionArray = simpleStr.split(";");
        collectionCall(collectionArray, "Отделка:", 4); // Массив названий, заголовок, уровень заголовка

        ////////////////////  Тип пишущего узла  ////////////////

        var type = $('table.features td:contains(Тип пишущего узла)').siblings().each(function(index) {
            var type_text = $(this).text();
            $(this).closest('.pl-item-info-expandable').children('.stock-and-rating').before('<div class="type-uzel"><span>' + type_text + '</span></div>');
        });


        ///////////////////  враппер для названия узла и названия товара  /////////////

        $('.pl-item-info-expandable > a').wrap('<div class="link">');
        $('.pl-item-info-expandable').each(function(index) {
            $(this).children("div:not('.stock-and-rating')").closest('div').wrapAll('<div class="row-line"></div>');
            var stock_element = $(this).children('.stock-and-rating').detach();
            var price_block = $(this).siblings().children().children('.price-wrapper').detach();
            //offers
            $(this).siblings().before('<div class="price_and_stock">' + price_block.html() + '' + stock_element.html() + '');
            var uzel = $(this).children().children('.type-uzel').clone();
            var price_nowrap = $(this).siblings().children('.price.nowrap');
            price_nowrap.wrap('<div class="prise-wrapper">');
            price_nowrap.after(uzel);

        });
    }





    // отработка главной функции при загрузке
    setAmazingScr();




    // добавление класса для Артема...  и для позицианирования баннера на главной
    $('.art-parent').click(function() {
        $(this).toggleClass('active');
        // скрытие и раскрытие блока над баннером на главной
        if ($(this).is('[data-toggle = ul-2]') && $(this).hasClass('active')) {
            $('.space-top').css('display', 'none');
        } else {
            $('.space-top').css('display', 'block');
        }
    });

    // удаление неактивных элементов из фильтра после выборки
    setTimeout(function() { $('.price_and_stock:contains(undefined)').hide(); }, 2000); // время в мсremoveDisabledItems();

    function removeDisabledItems() {
        console.log('в функции removeDisabledItems()');
        $('.als-bottom label.disabled').hide(); //remove();
        $('.als-bottom option:disabled').closest('label').hide(); //remove();


        setTimeout(function() {
            console.log('удаление врапперов без содержимого в фильтре');
            $('.als-bottom .overflow:not(:has(.at-stylize-label))').closest('.al-block').hide(); //.remove();
        }, 3000); // время в мс
    }
    var flag_change = false;

    // переменные для хранения элементов в сессиях при обновлении страницы
    var setboxes = new Array(); // массив для сохраниния активных чекбоксов
    var brend_session;
    var collection_session;
    var otdelka_session;

    // событие в фильтре подбора (это только инпуты!)
    $('.filters.ajax form input').bind('change', function(e) {
        //e.stopPropagation();
        maskChanges();
        $('.als-top').trigger('click');
        if (flag_change) return false;
        flag_change = true;
        console.log('Изменения в инпуте!  current = ' + current + '');
        setTimeout(function() {
            removeDisabledItems();
            setAmazingScr();
            setPriceValue();
            $('.price_and_stock:contains(undefined)').hide();
            $('.filter-wrapper option[disabled]').hide();
            GetPriseByFilter(); // расчет цены отфильтрованных товаров
            removeDuplicate();
            addTypeName(); // для вида thumb
            hideEmptyBlocks();
        }, 4000); // 3000 время в мс

        $('.filter-wrapper option[disabled]').hide();

        flag_change = false;
        removeDuplicate();

        // сохранение выбранных чекбоксов для использования после перезагрузки страницы
        $('.at-stylize-input').each(function() {
            if ($(this).prop('checked')) {
                setboxes.push($(this).attr('data-id'));
            }
        });

        // сохранинеи массива в сессии
        if (setboxes) {

            setboxes = jQuery.unique(setboxes);
            $.session.set('setboxes', setboxes);

        }

    });



    // Это обработка события в верхней части фильтра подбора и во всем фильтре элемента!!!

    $('.top-row').bind('change', function(e) {
        maskChanges();
        setTimeout(function() {
            // полупрозрачность недоступных чекбоксов в фильтре
            $('.at-stylize-input[disabled]').closest('label').css('opacity', '0.3');
            $('.at-stylize-input:not([disabled])').closest('label').css('opacity', '1');
        }, 3000);

        if (flag_change) return false;
        flag_change = true;
        console.log('Изменения в списке 1');
        setTimeout(function() {
            removeDisabledItems();
            setAmazingScr();
            setPriceValue();
            $('.price_and_stock:contains(undefined)').hide();
            $('.filter-wrapper option[disabled]').hide();
            $('.row-item-features').each(function() {
                $(this).children('.disabled').removeClass('disabled');
            });
            removeDuplicate();
            addTypeName(); // для вида thumb
            hideEmptyBlocks();

        }, 4000); // 3000 время в мс

        $('.filter-wrapper option[disabled]').hide();
        flag_change = false;
        removeDuplicate();

    });





    // кнопка применить... отправляет данные формы

    $('#btn-filter-use').on('click', function() {
        $('.product-list').addClass('time-hide');
        $(".btn-sub-form").trigger('click');
        if (flag_change) return false;
        flag_change = true;
        console.log('Нажата кнопка применить...');
        setTimeout(function() {
            removeDisabledItems();
            setAmazingScr();
            setPriceValue();
            $('.price_and_stock:contains(undefined)').hide();
            $('.filter-wrapper option[disabled]').hide();
            $('.row-item-features').each(function() {
                $(this).children('.disabled').removeClass('disabled');
            });
            removeDuplicate();
            $('.time-hide').removeClass('time-hide');
        }, 4000); // 3000 время в мс

        $('.filter-wrapper option[disabled]').hide();
        flag_change = false;
        removeDuplicate();
    });


    ///////////////////////////////


    // кнопка полного сброса фильтра в фильтре конкретного бренда

    $('#btn-filter-reset').on('click', function() {

        $('.filters-reset').trigger('click');
    });

    $('#clear-filters-expand').live('click', function() {
        // удаление из сессии вбранных в фильтре чекбоксов по клику на кнопке сброс
        del_session_marks();
    });

    $('#logo-image').live('click', function() {
        del_session_marks();
    });



});