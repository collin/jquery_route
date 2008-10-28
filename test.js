jQuery(function(_){
  Function.prototype.withArgs = function() {
    var f = this, args = _.makeArray(arguments);
    return function() {
      return f.apply(null, args);
    };
  };
  
  var loc = window.location,
    url_prefix = loc.protocol+'//'+loc.hostname+':'+loc.port;
      
  _.route('book');
  
  match("/books", _.books_path);
  match(url_prefix+"/books", _.books_url);
  
  match("/books?good=true", _.books_path.withArgs({good:true}));
  match(url_prefix+"/books?good=true", _.books_url.withArgs({good:true}));
  
  match("/books/1", _.book_path.withArgs(1));
  match(url_prefix+"/books/1", _.book_url.withArgs(1));
  
  match("/books/barnaby_jones",_.book_path.withArgs('barnaby_jones'));
  match(url_prefix+"/books/barnaby_jones",_.book_url.withArgs('barnaby_jones'));
  
  match("/books/the_theif?page=33", _.book_path.withArgs('the_theif', {page:33}));
  match(url_prefix+"/books/the_theif?page=33", _.book_url.withArgs('the_theif', {page:33}));
});
