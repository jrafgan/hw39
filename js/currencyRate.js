$(function () {
    var preloader = $('#preloader');
    $(document).ajaxStart(function () {
        preloader.show();
    });
    $(document).ajaxStop(function () {
        preloader.hide();
    });

    var cityName;
    var t;
    var wind;
    var clouds;

    (function ($) {
        $.fn.currencyRate = function () {

            var url = "http://data.fixer.io/api/latest?access_key=fe5b3c765e0104de30d60043d8a5308a";

            var createTag = function () {
                var mainP = $('<p class="mainP">Rates shown in Kyrgyz SOM<img src="img/kyrgyzsom.jpeg" class="image" alt="Kyrgyz SOM"></p>');
                var todayDate = $('<p class="date">' + today + '</p>')
                var dollarDiv = $('<div class="currency_name_div">Dollar </div>' + '<div class="image_div"><img class="image" src="img/usd.webp" alt="US dollar" /></div>' + '<div class="currency_price">' + dollar + '</div>');
                var euroDiv = $('<br /><div class="currency_name_div">Euro </div>' + '<div class="image_div"><img class="image" src="img/eur.webp" alt="Euro" /></div>' + '<div class="currency_price">' + euro + '</div>');
                var poundDiv = $('<br /><div class="currency_name_div">Pound </div>' + '<div class="image_div"><img class="image" src="img/gbp.webp" alt="GB Pounds" /></div>' + '<div class="currency_price">' + pounds + '</div>');
                var rubDiv = $('<br /><div class="currency_name_div">Rub </div>' + '<div class="image_div"><img class="image" src="img/rub.webp" alt="Rubl" /></div>' + '<div class="currency_price">' + rub + '</div>');
                var kazDiv = $('<br /><div class="currency_name_div">KZT </div>' + '<div class="image_div"><img class="image" src="img/kzt.webp" alt="Kaz Tenge" /></div>' + '<div class="currency_price">' + kaz + '</div>');
                var forecastDiv = $('<div id="forecast">Forecast<p>' + cityName + '</p><p>' + 'C ' + t + '</p><p>' + 'Wind ' + wind + '</p><p>' + 'Cloudy ' + clouds + '</p></div>');
                var mainDiv = $('<div id="main">');
                $('body').append(mainDiv);
                $(mainDiv).append(mainP);
                $(mainDiv).append(todayDate);
                $(mainDiv).append(dollarDiv);
                $(mainDiv).append(euroDiv);
                $(mainDiv).append(poundDiv);
                $(mainDiv).append(rubDiv);
                $(mainDiv).append(kazDiv);
                $(mainDiv).append(forecastDiv);
            }
            $.get(url, function (response) {
                var currencyRate = response.rates;
                euro = Math.round(currencyRate.KGS * 100) / 100;
                dollar = currencyRate.USD;
                rub = currencyRate.RUB;
                kaz = currencyRate.KZT;
                pounds = currencyRate.GBP;
                dollar = Math.round(euro / dollar * 100) / 100;
                rub = Math.round(euro / rub * 100) / 100;
                kaz = Math.round(euro / kaz * 100) / 100;
                pounds = Math.round(euro / pounds * 100) / 100;
                createTag();

            });
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = dd + '/' + mm + '/' + yyyy;

            $.get('http://api.openweathermap.org/data/2.5/weather?q=Bishkek,kg&APPID=d5e27e67b9a8f6754441b25b052cd21f', function (response) {
                cityName = response.name;
                t = Math.round(response.main.temp - 266);
                wind = response.wind.speed + ' m/s';
                clouds = response.clouds.all + ' %';
                console.log(response.name);
            });

        }
    }(jQuery));
    $('document').currencyRate();
});