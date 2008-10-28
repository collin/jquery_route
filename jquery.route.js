;(function(_){
  _.route = function(name) {
    var pluralized = Inflector.pluralize(name)
      ,loc = window.location
      ,url_base = loc.protocol+'//'+loc.hostname+':'+loc.port;
    
    function query_string(options) {
      if(options == undefined) return "";
      var q = "?", slot, params = [];
      for(slot in options) params.push(slot + '=' + options[slot]);
      return q+params.join('&');
    }
    
    function path_with_options(fn) {
      return function() {
        var args = _.makeArray(arguments)
          ,options
          ,last_arg = args[args.length-1];
        
        if(last_arg 
        && last_arg.constructor !== String
        && last_arg.constructor !== Number) 
          options = args.pop();
        return fn.call(this, args) + query_string(options);
      };
    };
    
    _[pluralized+'_path'] = path_with_options(function() {
      return '/'+pluralized;
    });
    
    _[pluralized+'_url'] = path_with_options(function() {
      return url_base+'/'+pluralized;
    });
    
    _[name+'_path'] = path_with_options(function(id) {
      return _[pluralized+'_path']() + '/' + id;
    });
    
    _[name+'_url'] = path_with_options(function(id) {
      return _[pluralized+'_url']() + '/' + id;
    });
  }
})(jQuery);
