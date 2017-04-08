function TableBuilder(headers, options, data, name){
  this.headers = headers;
  this.options = options;
  this.data    = data;
  if(name === undefined || name === null ){
    name = (+ new Date()).toString();
  }
  this.name = String(name).toLowerCase();
  if(this.options === undefined || this.options === null){
    this.options = {};
  }
  if(this.options.hasOwnProperty('id') === false){
    this.options['id'] = String(this.name) + '_table';
  }

}
TableBuilder.prototype          = Object.create(TableBuilder.prototype);
TableBuilder.prototype.row      = function(type, data){
  let output = '';
  if(type === 'header' || type === undefined){
    output = this.headers.join('</th><th>');
    output = '<th>' + output+' </th>';
  }else{
    output = data.join('</td><td>');
    output = '<td>' + output+' </td>';
  }
  output = '<tr>'+output+'</tr>';
  return output;
};
TableBuilder.prototype.footers  = function(){
  return '<tfoot>'+this.row('header')+'</tfoot>';
};
TableBuilder.prototype.body     = function(data){
  let o = '';
  const t = this;
  let tdClass = this.options.body.tdClass;
  for(let i=0; i<data.length; i++){
    let rowString = '';
    for(let j=0; j <data[i].length; j++){
      let thisTd = new HtmlBuilder('td', data[i][j], {
        class: 'datarow',
        id: t.name + '_'+String(t.headers[j]).toLowerCase()
      });
      if(t.headers[j] === 'Last Update Time'){
        thisTd.opts.id = t.name+'_time';
      }
      rowString+=thisTd.build();
    }
    o+=new HtmlBuilder('tr', rowString, {}).build();
  }
  return new HtmlBuilder('tbody', o).build();
};
TableBuilder.prototype.head     = function(){
  return new HtmlBuilder('thead', this.row('header')).build();
};
TableBuilder.prototype.get      = function(data){
  let oString = '';
  let output = '';
  let options = {};
  if(this.options.hasOwnProperty('id') === true){
    oString = 'id='+String(this.options['id']);
    options['id']= this.options['id'];
  }
  if(this.options.hasOwnProperty('tableClass') === true){
    oString = ' class='+String(this.options['tableClass']);
    options['class']= this.options['tableClass'];
  }
  output = new HtmlBuilder('table',this.head()+this.body(this.data)+this.footers(), options).build();
  return output;
};
