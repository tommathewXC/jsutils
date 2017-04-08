const partialDoms = ['input', 'br', 'hr']; // <dom />
const halfDoms    = []; // <dom>
function HtmlBuilder(type, value, opts){
  this.type  = type;
  this.value = value;
  this.opts  = opts;
}
HtmlBuilder.prototype = Object.create(HtmlBuilder.prototype);
HtmlBuilder.prototype.encodingType = function(){
  let _type = 0; // 0 = regular, 1=partial, 2=half
  if(partialDoms.indexOf(this.type) > -1){
    _type = 1;
  }
  if(partialDoms.indexOf(this.type) > -1){
    _type = 2;
  }
  return _type;
};
HtmlBuilder.prototype.build = function(){
  let output = "";
  let _type = this.encodingType();
  let options = "";
  let opts = [];
  for(let k in this.opts){
    opts.push(String(k)+'="'+String(this.opts[k])+'"');
  }
  options = opts.join(' ');
  switch(_type){
    case 0:
      output ='<'+this.type +' '+options + '>'+this.value + '</'+this.type+'>';
      break;
    case 1:
      output ='<'+this.type +' '+options + '/>';
      break;
    case 2:
      output ='<'+this.type +' '+options + '>';
      break;
    default:
      break;
  }
  return output;
};
