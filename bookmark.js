{literal}
<script>

// скрипт подключается только для страницы закладки!!!
$(document).ready(function(){

//устанавливаю заголовок страницы
$('.category-name').html('Товары в закладках');
// удаляю информацию об отделках и коллекциях 
$('.line-collection').children().hide();
// удаляю наименование типа для товаров с ним
$('.item-typename').hide();
// уменьшаю размер изображения отличных от ручек товаров
$('.pl-item-image img').css('max-height','80px').css('float','left').css('margin-left','50px');













});


</script>

{/literal}