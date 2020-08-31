(function (window) {
  const load = function (id) {
    document.getElementById('tokshop-feed').setAttribute('data-tokshop-id', id);
    const holder = document.getElementById('tokshop-feed-holder');
    holder.parentNode.removeChild(holder);
  };

  window.TokShop = window.TokShop || {};
  window.TokShop.load = load;

  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://cdn.getvop.com/tokshop.v2.js';
  const x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
}(window));
