class NetworkInterface {
  constructor(method, params, url) {
    this.method = method || 'GET'
    this.params = params || {}
    this.url = url;
  }

  sendAjax() {
    if (!!this.url) {
      $.ajax({
        type:this.method,
        url:this.url,
        data:this.params,
        beforeSend: function() {
          $("#preloader").show();
        },
        statusCode: {
          400: function() {
            $("#preloader").hide();
            $("#error-popup").show()
          },
        },
        success: function(data) {
          $("#preloader").hide();
          if (data.redirect) {
            if (data.enoughBalance) {
              $('#enough-money').show();
            }
            setTimeout(()=> {
              window.location.href = data.redirect;

            },1000)
          }
        },
      })
    }
  }
}

window.NetworkInterface = NetworkInterface;
