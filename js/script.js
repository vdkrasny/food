$(document).ready(function () {
  $.reject({
    reject: {
      safari6: true, // Apple Safari
      chrome24: true, // Google Chrome
      firefox23: true, // Mozilla Firefox
      msie7: true, // Microsoft Internet Explorer
      msie8: true, // Microsoft Internet Explorer
      opera17: true // Opera
    },
    header: 'Вы используете устаревший браузер.',

    paragraph1: 'Вы пользуетесь устравшим браузером, который не поддерживает' +
    ' современные веб-стандарты и представляет угрозу вашей безопасности. ' +
    'found below.',

    paragraph2: 'Пожалуйста, установите современный браузер:',
    closeMessage: '',
    closeLink: 'Зактрыть окно'
  });
  // в toLocaleString передать 'en' для изменения языка даты
  // год заменить соответсвенно
  var date =  new Date().toLocaleString('ru', {
    day: 'numeric',
    month: 'long'
  }).split(',');
  var year =  new Date().toLocaleString('ru', {
    year: 'numeric'
  }).split(',');
  $('.td-widget .date .day ').text(date[0]);
  $('.td-widget .date .year ').text(year[0]+' год');
  var time = $('.td-widget .time span');

  function startTime() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    //var s = now.getSeconds(); // if need sec
    m = checkTime(m);
    //s = checkTime(s); // if need sec
    time.text(h+':'+m);
    setTimeout(startTime, 500)
  }
  function checkTime(i) {
    return i >= 10 ? i : '0' + i;
  }
  startTime();

  $('.owl-carousel').owlCarousel({
    margin: 30,
    loop: true,
    dots: false,
    nav: true,
    navText: [],
    items: 5
  });

  // Base return func

  function isActive(param) {
    return param.hasClass('active');
  }
  // --------------------

  function makeActiveOne(param) {
    if (isActive(param)) {
      param.removeClass('active');
    } else {
      param.addClass('active');
    }
  }

  function makeActive(param) {
    param.removeClass('active');
    $(this).addClass('active');
  }

  var navMain = $('.nav-line li > a');
  navMain.click(function() {
    navMain.removeClass('active');
    $(this).addClass('active');
  });

  var navMain1 = $('.language a');
  navMain1.on('click',function() {
    navMain1.removeClass('active');
    $(this).addClass('active');
  });

  /*
  $('.docimg').magnificPopup({
    type: 'image',
    closeBtnInside: true,
    showCloseBtn: false
  }); */

  $('#vSlider').ionRangeSlider({
    type: "single",
    min: 0,
    max: 5000,
    hide_min_max: true,
    grid: true,
    grid_num: 5,
    force_edges: true
  });

  $('.selct').selectric();
  // --------------------------------------------------
  // Collect data
  // Parse chart data from the DOM
  // i {number}
  // elt {DOMElement}
  
  function collectData(i, elt) {
    var result = [];
    $(elt).find('li').each(function(i, elt) {
      result.push($(this).text());
    });
    return result
  }

  // --------------------------------------------------
  // Bar chart
  // Create `Bar' chart with data storied in `chart-data' node.
  // i {number}
  // chart {DOMElement}

  function barChart(i, chart) {
    var opt = {
      height: '210px',
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
      stackMode: 'accumulate',
      seriesBarDistance: 15,
      axisX: {
        labelOffset: {
          x: 10,
          y: -15
        },
        offset: 40,
        position: 'start',
        showGrid: false
      },
      axisY: {
        offset: 50,
        labelInterpolationFnc: function(value) {
          return '$' + value
        },
        scaleMinSpace: 20
      }
    },
    data = {
      labels: [],
      series: []
    };
    $(chart).find('.axisXlabels li').each(function(i, elt){
      data.labels.push($(this).text())
    }); // Labels accomulation
    $(chart).find('.series').each(function(i, elt) {
      data.series.push(collectData(i, elt))
    }); // Series accomulation
    new Chartist.Bar(chart, data, opt);
  }
  // --------------------------------------------------
  // Donut chart

  function donutChart(i, elt) {
    var opt = {
      width: '150px',
      height: '150px',
      chartPadding: 1,
      donut: true,
      donutWidth: 7,
      startAngle: 0,
      total: 100,
      showLabel: false };
    var FULL_ROUND = 100;
    var chart   = $(elt);
    var percent = Math.min(Math.abs(chart.data().percent), 100)
    var data    = {
      series: [
        percent,
        FULL_ROUND
      ]
    };
    new Chartist.Pie(elt, data, opt);
  }

  // --------------------------------------------------
  // Account Invest Charts -- half-round chart.

  function chartLoader(i, elt) {
    var opt     = {
      total: 200, // 100/200 -- half pie
      // width: '170px',
      donut: true,
      startAngle: 270,
      showLabel: false,
      donutWidth: 16
    };
    var chart   = $(elt);
    var percent = Math.min(chart.data().percent, 100);
    var data    = {
      series: [
        percent,
        percent > 100 ? 0 : 100 - percent 
      ]
    };
    new Chartist.Pie(elt, data, opt);
  }
  // --------------------------------------------------
  // Chart initialization
  $('.ct-donut').each(donutChart);
  $('.account-invest').length > 0 && $('.ct-invest').each(chartLoader);
  $('.tariff').length > 0 && $('.ct-tariff').each(chartLoader);
  // --------------------------------------------------
  // faq tabs
  $('.faq-tab .left .item.btn').click(function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('.faq-tab .right .item').removeClass('active');
    $('.faq-tab .right .item').eq($('.faq-tab .left .item.btn').index(this)).addClass('active');
  });
  // --------------------------------------------------
  // ads tabs
  $('.account-ad .magrs .item').click(function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('.account-ad .magble .item').removeClass('active');
    $('.account-ad .magble .item').eq($('.account-ad .magrs .item').index(this)).addClass('active');
  });
  // ------------------- copy
  function copyButton() {
    $(this).zclip({
      path: 'js/ZeroClipboard.swf',
      setCSSEffects: true,
      copy: function() {
        return $(this).siblings('input').val()
      }
    });
  }
  $('.cp').each(copyButton);
  // ------------------- copy
  function occupancyBar() {
    var bar   = $(this);
    var prt = bar.data('barPercent');
    var nPrt = (prt / 10);
    bar.children().removeClass('f');
    for (var e = 0; e < nPrt; e++) {
      bar.children().eq(e).addClass('f')
    }
  }

  $('.bar').each(occupancyBar);
  $('#main-hcs').highcharts({
    colors: ["#1d9ccd", "#ffd825"],
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'],
      opposite: true,
      labels: {
        style: {
          color: '#fff',
          fontSize: '14px'
        }
      }
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        format: '${value}',
        style: {
          color: '#fff',
          fontSize: '14px'
        }
      },
      gridLineColor: '#194651'
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Выплачено',
      data: [7900, 8100, 1900, 6300, 5000, 1100]
    }, {
      name: 'Инвестировано',
      data: [4200, 5800, 7900, 4500, 8000, 200]
    }]
  });
});
