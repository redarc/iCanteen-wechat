// JavaScript Document

$(function() {

  $(".city_list li").click(function() {
    $(this).parent().children("li").removeClass("sel");
    $(this).addClass("sel");
  });

  $(".de_tab ul").children().click(function() {
    console.log('kkkkk');
    var index_num = $(this).parent().children().index(this);
    $(this).parent().children().removeClass("de_current");
    $(this).addClass("de_current");

    $(".de_con_w .de_con").css("display", "none");
    $(".de_con_w").children(".de_con").eq(index_num).css("display", "block");
  });

  $(".cu_tab ul").children().click(function() {
    var index_num = $(this).parent().children().index(this);
    $(this).parent().children().removeClass("cu_current");
    $(this).addClass("cu_current");

    $(".cu_con_w .cu_con").css("display", "none");
    $(".cu_con_w").children(".cu_con").eq(index_num).css("display", "block");

  });

  $(".cu_list li").mousemove(function() {
    $(this).parent().children("li").removeClass("cu_on");
    $(this).addClass("cu_on");
  });

})
