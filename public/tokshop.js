(function(window) {
    var load = function(id) {
        document.getElementById("tokshop-feed").setAttribute("data-tokshop-id", id);
        var holder = document.getElementById("tokshop-feed-holder");
        holder.parentNode.removeChild(holder);
    };

    window.TokShop = window.TokShop || {};
    window.TokShop.load = load;

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = "https://cdn.tokshop.com/tokshop.v2.js";
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);


})(window);