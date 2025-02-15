registerKeyboardHandler = function(callback) {
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};

var plot = function(elemid, data, params){
     // if data is an array do nothing, if json, makes an array
      if (typeof(data)=='string'){ 
          if (data.match(/\.json/)!=null){
              // alert('it is a json')
              d3.json(data, function(dat) {
                     new make_plot(elemid, dat, params)
                     }); // end d3.json
                 }  // end if json
            } // end if string     
        else{
            plot(data)
          }
     }// end function


make_plot = function(elemid, dataset, params) {
  var self = this;
  
  this.id = elemid
  this.dataset = dataset
  this.chart = document.getElementById(elemid);
  this.params = params || {};
  this.xlim = this.params['xlim']
  this.ylim = this.params['ylim']
  this.xlabel = this.params['xlabel']
  this.ylabel = this.params['ylabel']
  this.title = this.params['title']
  this.col = this.params['color'] || 'k';
  this.cx = this.chart.clientWidth;
  this.cy = this.chart.clientHeight;
  fillplot = this.params['fill'] || "#EEEEEE"
  var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
  // Interaction Parameters 
  this.show_circle = false;
  this.moveaxis = false
  this.drag_zoom = false
  this.brush_active = false
  this.list_domains = []
  // Commands
  // Each commands executed is supposed to eliminates the other one in possible conflict.
  // * c : show the circles for modifying the plot
  // * b : mode brush
  // * q : zoom for mode brush
  // * d : toggle for drag and zoom.
  

  
  var tr = function(w, h, ang){      // Translation and Rotation
     ang = ang || 0
     return "translate(" + w + ","+ h + ") rotate("+ang+")"
      }
      
  // var add_html = function(node,htm,w,h,ang){ // adding html in the plot
  //     node.append('foreignObject')
  //         .attr("transform", tr(self.cx/2,self.cy/4, ang))
  //         .attr('width', 200)
  //         .attr('height', 100)
  //         .append("xhtml:body")
  //         .html(htm)
  //     }
  
  var add_txt = function(node,label,w,h,ang){    // adding text in the plot, position : (w, h), angle : ang
      newtext = node.append("text").style("text-anchor", "middle")
          .attr("transform", tr(w,h, ang)) 
          .text(label)
       return newtext
      }
  var add_txt_axis = function(node, label,w,h,ang){    // adding axis, (for Title and axis)
      newax = add_txt(node, label,w,h,ang)
      newax.attr('class','axis')
      return newax
      }
          
  this.padding = {                                  // padding
     // "top":    this.title  ? 40 : 20,
      "top":    this.title  ? 80 : 20,
     "right":                 30,
     "bottom": this.xlabel ? 80 : 10,
     "left":   this.ylabel ? 70 : 45
  };

  this.size = {                                                         // real size of the figure
    "width":  this.cx - this.padding.left - this.padding.right,
    "height": this.cy - this.padding.top  - this.padding.bottom
  };
  

  make_scale = function(lim, size, inv){            // scale for the axis
      var inv = inv || false
      if (!inv){interv = [lim[0], lim[1]]} else {interv = [lim[1], lim[0]]}
      var scale = d3.scale.linear().domain(interv).nice().range([0, size]).nice();
      return scale
  }

  this.x = make_scale(this.xlim,this.size.width)          // x-scale
  this.y = make_scale(this.ylim,this.size.height, true)  // y-scale (inverted domain)
  this.downx = Math.NaN; // drag x-axis logic
  this.downy = Math.NaN; // drag y-axis logic
  this.dragged = this.selected = null;
  
  this.line = d3.svg.line()                                      // defining line function
      .x(function(d, i) { return this.x(this.dataset[i].x); })
      .y(function(d, i) { return this.y(this.dataset[i].y); })
      .interpolate('linear')
      //

  datacount = this.size.width/30;
  
  // var posleft = this.padding.left+this.size.width
  // $('#chart1').append($('<div/>')
  //             .addClass('infos')
  //             .html("il était une fois <br> a little red hood girl  <br> walking in the wood")
  //             .css({"left":posleft+'px',
  //              "width":this.size.width/5+'px',
  //               // "top":this.padding.top+'px'
  //               })
  //             )

  this.vis = d3.select(this.chart).append("svg")
      .attr("width",  this.cx)
      .attr("height", this.cy)
      .append("g")
        .attr("transform", tr(this.padding.left, this.padding.top));

  this.plot = this.vis.append("rect")
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .style("fill", fillplot) 
      .attr("pointer-events", "all")

      // htm = '<div style="width: 150px; color:blue">\
      //         This is some information about whatever</div>'
      // add_html(this.vis, htm, 100, 130, 0)


  if (this.drag_zoom == true){                  // drag and zoom of the whole plot
    alert('permitting drag')
      this.plot
          .on("mousedown.drag", self.plot_drag())
          .on("touchstart.drag", self.plot_drag())
          .call(d3.behavior.zoom().x(this.x).y(this.y)
          .on("zoom", this.redraw_all()));
      }

  d3.select(this.chart)                         // drag the points of the curve
          .on("mousemove.drag", self.mousemove())
          .on("touchmove.drag", self.mousemove())
          .on("mouseup.drag",   self.mouseup())
          .on("touchend.drag",  self.mouseup());

  this.vis.append("svg") // line attached to svg block"viewBox
      .attr("top", 0)
      .attr("left", 0)
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .attr("viewBox", "0 0 "+this.size.width+" "+this.size.height)
      .attr("class", "line")
      .append("path")
          .attr("class", "line")
          .attr("d", this.line(this.dataset))
          .style({stroke : colrs[this.col], fill : 'none','stroke-width' : '1.5px'})

  // add Chart Title
  if (this.title) {
        tit = add_txt_axis(this.vis, this.title, this.size.width/2, 0)
        tit.attr("dy","-1em")
           .attr("font-family", "Times New Roman")
           .attr("font-size", "25px")
  }
  // Add the x-axis label
  if (this.xlabel) {
      var xlab = add_txt(this.vis, this.xlabel, this.size.width/2, this.size.height)
      xlab.attr("dy","2.4em")
          .attr("font-family", "Times New Roman")
          .attr("font-size", "20px")
  }
  // add y-axis label
  if (this.ylabel) {
      var ylab = add_txt(this.vis, this.ylabel, this.size.width/2, this.size.height)
      ylab. attr("transform", tr(-40,this.size.height/2,-90))
          .attr("font-family", "Times New Roman")
          .attr("font-size", "20px")
  }
  this.redraw_all()();
  
  make_brush = function(){                // zoom box with brush tool
      self.brush = self.vis.append("g")
         .attr("class", "brush")
         .call(d3.svg.brush()
           .x(d3.scale.identity().domain([0, self.size.width]))
           .y(d3.scale.identity().domain([0, self.size.height])) 
           .on("brush", function() {
               //alert(self.id)
           extent = d3.event.target.extent();
           }) // end on
         ); // end call
  }
  
  set_view = function(extent){                      // set the view for a given extent double list. 
        x1 = self.x.invert(extent[0][0]); x2 = self.x.invert(extent[1][0]) // x1, x2
        y1 = self.y.invert(extent[0][1]); y2 = self.y.invert(extent[1][1])  // y1, y2
        self.x.domain([x1,x2]);                     // set x domain
        self.y.domain([y1,y2]);                     // set y domain
        self.list_domains.push([[x1,x2],[y1,y2]])       // save in history
  }
  set_view([[0,0],[this.size.width, this.size.height]]) // Save the first view in self.list_domains (Initialisation)
  
  var desactivate_all_not = function(avoid){  // desactivate all the tools but.. 
      if (avoid != 'b'){
          d3.selectAll(".brush").remove();  // desactivate brush
          self.brush_active = false;
        }
  }
  
  $(document).keydown(function(event){             // add and remove circles.. 

      if(event.keyCode == "w".charCodeAt(0)-32){                            // home view
          desactivate_all_not('w')   // desactivate all the other tools
          var elem_first = self.list_domains[0]
          self.x.domain(elem_first[0]);
          self.y.domain(elem_first[1]);
          self.redraw_all()();
          } // end if
      if(event.keyCode == "q".charCodeAt(0)-32){                        // Apply the zoom
          set_view(extent)
          self.redraw_all()();
          d3.selectAll(".brush").remove();
          make_brush()                  // remake brush
      } // end if

      if(event.keyCode == "b".charCodeAt(0)-32){                    // select the brush tool
        if (self.brush_active == true){
            desactivate_all_not('b') // desactivate all the other tools
        }
        else{
            make_brush();
            self.brush_active = true;
            }
       } // end if
      if(event.keyCode == "d".charCodeAt(0)-32){ 
        desactivate_all_not('d')   // desactivate all the other tools
        self.drag_zoom = ! self.drag_zoom;                          // toggle drag_zoom
        self.redraw_all()();
       } // end if
  }) // end keydown
};
  
//
// plot methods
//

make_plot.prototype.plot_drag = function() {
  var self = this;
  return function() {
    registerKeyboardHandler(self.keydown());
    d3.select('body').style("cursor", "move"); 
  }
};

make_plot.prototype.update = function() {
  var self = this;
  var lines = this.vis.select("path").attr("d", this.line(this.dataset));
  if (this.show_circle == true){   // show circle for modifying the points.
      var circle = this.vis.select("svg").selectAll("circle")
          .data(this.dataset, function(d) { return d; });
      circle.enter().append("circle")
          .attr("class", function(d) { return d === self.selected ? "selected" : null; })
          .attr("cx",    function(d) { return self.x(d.x); })
          .attr("cy",    function(d) { return self.y(d.y); })
          .attr("r", 3.0)
          .style("cursor", "ns-resize")
          .on("mousedown.drag",  self.datapoint_drag())
          .on("touchstart.drag", self.datapoint_drag());
      circle
          .attr("class", function(d) { return d === self.selected ? "selected" : null; })
          .attr("cx",    function(d) { 
            return self.x(d.x); })
          .attr("cy",    function(d) { return self.y(d.y); });
      circle.exit().remove();
  }// end if show circle
  if (d3.event && d3.event.keyCode) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }
}

make_plot.prototype.datapoint_drag = function() {    // moving points
  var self = this;
  return function(d) {
    document.onselectstart = function() { return false; };
    self.selected = self.dragged = d;
    self.update();
  }
};

make_plot.prototype.mousemove = function() {
  var self = this;
  return function() {
    var p = d3.svg.mouse(self.vis[0][0]),
        t = d3.event.changedTouches;
    if (self.dragged) {
      self.dragged.y = self.y.invert(Math.max(0, Math.min(self.size.height, p[1])));
      self.update();
    };
  }
};

make_plot.prototype.mouseup = function() { // mouse in its normal state
  var self = this;
  return function() {
    document.onselectstart = function() { return true; };
    d3.select('body').style("cursor", "auto");
    if (self.dragged) { 
      self.dragged = null 
    }
  }
}

make_plot.prototype.redraw_all = function() {         // redraw_all the whole plot
  var self = this;
  return function() {
    var tx = function(d) { 
      return "translate(" + self.x(d) + ",0)"; 
    },
    ty = function(d) { 
      return "translate(0," + self.y(d) + ")";
    },
    stroke = function(d) { 
      return d ? "#ccc" : "#666"; 
    },
    fx = self.x.tickFormat(10),
    fy = self.y.tickFormat(10);

    var sz_txt_ticks = "14px" // size of ticks text

    var make_axes = function(nodename, selfax, trans, txt, ax1, ax2, valmax, stroke){
      var node = self.vis.selectAll(nodename)
        .data(selfax.ticks(10), String)
        .attr("transform", trans);
      node.select("text")
          .text(txt);
      var nodee = node.enter().insert("g", "a")
          .attr("class", ax1)
          .attr("transform", trans);
      nodee.append("line")
          .attr("stroke", stroke)
          .attr(ax2+"1", 0)
          .attr(ax2+"2", valmax);
    return [node, nodee]
    }

    var ticks_txt = function(node,ax,axpos,shift,txt){
        node.append("text")
        .attr("class", "axis")
        .attr(ax, axpos)
        .attr("dy", shift)
        .attr("text-anchor", "end")
        .attr("font-family", "Times New Roman")
        .attr("font-size", sz_txt_ticks)
        .text(txt)
        .style("cursor", "ew-resize")
    }

    // Regenerate x-ticks… 
    gg = make_axes("g.x", self.x, tx, fx, 'x','y', self.size.height, stroke)
    gx = gg[0]; gxe = gg[1]
    ticks_txt(gxe,"y",self.size.height,"1em",fx)
    gx.exit().remove();
    // Regenerate y-ticks…
    gg = make_axes("g.y", self.y, ty, fy, 'y','x', self.size.width, stroke)
    gy = gg[0]; gye = gg[1]
    ticks_txt(gye,"x",-3,".35em",fy)
    gy.exit().remove();
    if (self.drag_zoom == true){
      self.plot.call(d3.behavior.zoom().x(self.x).y(self.y)
                                .on("zoom", self.redraw_all())
                                )}// end if
    self.update();    // update the whole plot
  }  
}

