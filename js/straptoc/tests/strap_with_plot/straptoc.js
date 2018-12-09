// var loadtoc = function(){
//     var sc = document.createElement('script');
//     sc.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js";
//     document.head.appendChild(sc);
// }


var maketoc = function(){
    
    // Javascript code for enhancing markdown capabilities.
    // format and transformed with strapdown in html code. 
    // Maketoc supposes the code is yet in html format.
    // The whole code uses extensively jQuery library.
    // 
    
    
    // var scriptsToLoad = 0;
    
    
    // ["https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.1.1/jquery.contextMenu.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js", 
    // "https://cdn.jsdelivr.net/gh/alertifyjs/alertify.js@v1.0.6/dist/js/alertify.js", 
    // "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
    // // "https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.11/js/min/perfect-scrollbar.min.js"
    // ].forEach(
    //     function(addjs) {
    //     s = document.createElement('script');
    //     s.src = addjs;
    //     document.head.appendChild(s)
    //     scriptsToLoad += 1;
    //     s.onload = function() {
    //         scriptsToLoad -= 1;
    //         //alert(addjs+' Loaded')
    //         };
    //    }
    // ) // end for Each
    // 
    // var cssToLoad = 0;
    // [// 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.11/css/perfect-scrollbar.css', 
    //          "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.1.1/jquery.contextMenu.css", 
    //          'https://fonts.googleapis.com/css?family=Enriqueta', 
    //          'https://fonts.googleapis.com/css?family=Londrina+Solid', 
    //          'https://fonts.googleapis.com/css?family=Pathway+Gothic+One', 
    //          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
    //          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"
    //       ].forEach(function(href) {
    //          var linkEl = document.createElement('link');
    //          //alert(href)
    //          linkEl.href = href;
    //          linkEl.rel = 'stylesheet';
    //          document.head.appendChild(linkEl);
    //          cssToLoad +=1;
    //          linkEl.onload = function() {
    //                  cssToLoad -= 1;
    //                  //alert(href+' Loaded')
    //                  };
    //          }
    //      ) // end for each

 
    // var timer = setInterval(function() {
    //     //alert("scriptsToLoad "+ scriptsToLoad)
    //     if(scriptsToLoad == 0 & cssToLoad ==0) {
    //         clearInterval(timer);


   
    

    var help = function(){/*
    
    # Extended markdown: 
    * :: , makes folding list (close by default)
    * --link-- , creates a tag with id "link" 
    * [video ;;](hyperlink) insert a video with the hyperlink through iframe element.
    * [pdf §§](hyperlink) insert a pdf with object tag.
    * [blabla ,,](hyperlink) insert whatever iframe
    * [blabla %%](hyperlink) insert a local video with no autoplay by default (works with Chrome but not with Firefox)
    * novideo, at the beginning of the document to avoid loading of videos.
    * @@ blabla, copy the li, blabla @@ paste the li (@@ must be glued)
    * key "k", to make appear disappear the sliders.
    * insertion of tooltip : after h1 or h2, write the tooltip betweeen {}
    * double ^, is used to hide some text
    * Alt L for folding/unfolding lists.
    * Set notoc to true for removing the TOC.
    * Size image, enter the size after the name eg: blabla 500x500(address)
    * @color to change color, for the moment works onl for lists.
    * [blabla %caption%](address) insert the caption under the image
    * %%% for deleting symbolically a line, replacing  the tilde. 
    * $carr and list of images in markdown language  after for making a carrousel with pictures. 
    * $portf and list of images in markdown language  after for making a portfolio with pictures. 
    * noiframes, at the beginning of the document to avoid loading of iframes.
    * +++ rootpath for registering root path for \$carr or \$portf when muliple path with same root. 
        *  eg for frames :
            * blabla
                +++ root
                [title iframe ,,](whatever.html)
        * Becareful
            * no space after blabla 
            * +++ and [title .. on same column
    * ``` before code for show code.. no need to bracket the code.
    * §menu toto:hash bobo:trash, add items bobo and toto to navbar with links hash and trash
    * $input b blabla : makes a button blabla
    * $input i ohoh : makes a input for entering text with placeholder ohoh. 
    * $* : line separation
    */}.toString().slice(14,-3)
    
    var keys = function(){/*
    # Keys: 
    * Esc + k : show keys
    * Esc + s : show syntax
    * Esc + d : stopping draggable
    * 
    */}.toString().slice(14,-3)
     
    
    //https://github.com/strablabla/Tinkering/19ea7a8/js/straptoc/straptoc.js 
    //https://github.com/strablabla/Tinkering/19ea7a8/js/straptoc/straptoc.css

    basename = function(path) {  return path.replace( /.*\//, "" ); }

    dirname = function(path) { return path.match( /.*\// ); }
    
    simple_md = function(text){ // mini markdown for the help
        var all_text = text.split('\n')
        var htm = $('<div/>')
        var ul = $('<ul/>').css({'text-align':'left'})
        for (i in all_text){
            var text_insert = all_text[i].trim().slice(1)
            if (all_text[i].match(/^\s{4}\*/)){
            ul.append($('<li/>').text(text_insert))
            } // end if
            if (all_text[i].match(/\s*\#/)){
                htm.append($('<h1/>').text(text_insert))
            } // end if
        } // end for
        htm.append(ul);
        return htm.html()
    } // end function
    // Definitions of regexp 
    reg_func = function(name){return RegExp('^\\§'+name+'\\s*','g') } // function for regexp for configuration
    var reg_date = /\d{1,2}\/\d{1,2}\/\d{2}/; //find dates whatever is its position with regexp
    var reg_id = /--\w*--/; //regexp for identity
    var reg_col_sublist = reg_func('col_sublist') 
    var reg_col_toc = reg_func('col_toc')
    var reg_notoc = reg_func('notoc')
    var reg_width_video = reg_func('width_video') 
    var reg_width_pdf = reg_func('width_pdf') 
    var reg_width_iframe = reg_func('width_iframe') 
    var reg_toggle_hide = reg_func('toggle_hide') 
    var reg_menu = reg_func('menu')
    var reg_help = reg_func('help')
    var reg_sign = /[^§]§[^§]\w*/
    var reg_folder = /\<\</
    var reg_hyper = /\[\w*.*\]\(\w*.*\)/
    var reg_brack = /\[\w*.*\]/
    var reg_parent = /\(.*\w*.*\)/
    //
    var num_slider = 0
    var prefcarr = 'carousel0' // default first name for carousel
    var statekey = -1; // state for keyboard interactions
    
//===================================================================== Dictionary for parameters

    param = {
             'color_sublist':{'reg':reg_col_sublist, 'cut':'§col_sublist', 'var': 'green'},
             'color_toc':{'reg':reg_col_toc, 'cut':'§col_toc', 'var': '#FFCC99'},
             'notoc':{'reg':reg_notoc, 'cut':'§notoc', 'var': false},
             'vid_width':{'reg':reg_width_video, 'cut':'§width_video', 'var': '80%' },
             'pdf_width':{'reg':reg_width_pdf, 'cut':'§width_pdf', 'var': '80%'},
             'iframe_width':{'reg':reg_width_iframe, 'cut':'§width_iframe', 'var': '900'},
             'toggle_hide':{'reg':reg_toggle_hide, 'cut':'§toggle_hide', 'var': 'p'},
             'menu_list':{'reg':reg_menu, 'cut':'§menu', 'var': ''},
             'help':{'reg':reg_help, 'cut':'§help', 'var': false}
         }

 //===================================================================== Go to top

    $('body').prepend($('<div/>').attr('id','top'))
    $('body').append($('<a/>').attr('href','#top').addClass("scrollToTop").attr('title','go to top')
            .append($('<span/>').addClass("glyphicon glyphicon-chevron-up").attr('id','gotop')))

 //===================================================================== Context menu
 
   $('body').attr('contextmenu',"share")
   $("p").each(function(){
       var txt = $(this).text().match(/^\$menu.*/)
       if (txt) {
           var args = txt[0].trim().split(/\s+/)
           var select = args[0].split('_')[1]
           var dic_args = {}
           for (i in args){ 
               if (i>0){
               var comm = args[i]
                  var sepcomm = comm.split(/\:/)
                  var item = sepcomm[0]
                  var item_name = sepcomm[1].split('_')[1]
                  var item_icon = sepcomm[2].split('_')[1]
                  var item_href = sepcomm[3].split('_')[1]
                  dic_args[item] = JSON.stringify({ name: item_name, icon : item_icon, href : item_href })
               }
           }
           var menu  = $('<span/>').addClass("context-menu-one btn btn-neutral "+select).text('right click me')
           $(this).replaceWith(menu)
       }
       $(function() {
           $.contextMenu({
             selector: '.'+select,
             build: function() {
               var options = {
                 callback: function(key, options) {
                   var m = "clicked: " + key;
                   var id  = JSON.parse(dic_args[key])['href']
                   document.getElementById(id).scrollIntoView()
                 },
                 items: {}
               };
                for (key in dic_args){
                    options.items[key] = JSON.parse(dic_args[key])
                }
               return options;
             }
           });
           $('.context-menu-one').on('click', function(e){
               console.log('clicked', this);
           })    
       });
    }) // end each

 //===================================================================== Zoom thumbnail and image

    $('body').prepend($('<div/>').attr('id',"id_view_image_body"))
           .prepend($('<div/>').attr('id',"id_view_image"))

 //===================================================================== separating line

    $("p").each(function(){
      txt = $(this).text()
      if (txt.match(/^\$\*/)) { 
            $(this).replaceWith($('<hr/>'))
          }   // end if txt.mtch
      })   // end each p

  //===================================================================== mathjax

    $("p, li").each(function(){
      txt = $(this).text()
      if (txt.match(/^\$math/)) { 
            $(this).replaceWith('$$'+txt.split('$math')[1]+'$$')
          }   // end if txt.mtch
      })   // end each p, li

 //===================================================================== Simple bash code

  $("p, li").each(function(){
    htm = $(this).html().split('\n')[0]
    if (htm.match(/\`\`\`/)) { 
        ht = $(this).html()
        var newtxt = ht.replace('```',' ').replace('<br>','\n').trim()
        var pre = $('<pre/>').append(
            $('<code/>').addClass("prettyprint lang- prettyprinted").attr('style', "")
                .append($('<span/>').addClass("pln").text(newtxt))
                ) // end append
           $(this).text('').append(pre) 
        }   // end if txt.mtch
    })   // end each p, li

 //===================================================================== register root path for $portf or $carr

  $("p, li").each(function(){
    var htm = $(this).html()
    var txt = htm.split('\n')[1] || ' '
    if (txt.match(/\+\+\+\.*/)) { 
        var addroot = txt.split('+++')[1].trim()+'/'
        $(this).find('*').each(function(){
          
             //==============================   case of img
             
            if ($(this).parent().find('img')){    
                  $(this).attr('src', addroot+$(this).attr('src')) // changing path
                }
                
             //==============================   case of pdfs
             
            if ($(this).text().match(/§§/)){   
                $(this).attr('href', addroot+$(this).attr('href')) // changing path
               }
            //==============================   case of videos
            
            if (htm.match(/%%/)){   
                $(this).attr('href', addroot+$(this).attr('href')) // changing path
               }
            }) // end each
        } // end if txt.mtch
    }) // end each p, li

//===================================================================== list of pdfs

  $("p, li").each(function(){
        if ($(this).text().match(/^\$pdf/)) {  // detect list pdfs
           var ulpdf = $('<ul/>')
           $(this).children('a').each(function(){
                ulpdf.append($('<li/>').append($(this)))
             }) // end each 
           $(this).replaceWith(ulpdf) // replace whole p or li 
        }   // end if regexp
    })   // end each p, li

//===================================================================== list of local videos

  $("p, li").each(function(){
        if ($(this).text().match(/^\$vid/)) {  // detect list of local videos
           var ulvid = $('<ul/>')
           $(this).children('a').each(function(){
                ulvid.append($('<li/>').append($(this)))
             }) // end each 
           $(this).replaceWith(ulvid) // replace whole p or li 
        }   // end if regexp
    })   // end each p, li
    
 //===================================================================== Portfolio

   $("p, li").each(function(){
     if ($(this).text().match(/^\$portf/)) {  // detect portfolio
        var reg_caption = /\%.*\%/
        var capt = $(this).text().match(reg_caption) || '' // caption for thumbnail
        var divportf = $('<div/>').addClass("row")
        var nbcol = $(this).text().split(/^\$portf/)[1].split('\n')[0].trim() || 3 // number of columns
        var nbsuffix = 12/parseInt(nbcol) // suffix for bootstrap
        var classportf = "col-md-" +  nbsuffix
        $(this).children('img').each(function(i){
             var divportfinner = $('<div/>').addClass(classportf)
                                     .append(
                                           $('<div/>').addClass("thumbnail")   // class thumbnail
                                             .append($(this))
                                             .append($('<p/>').addClass("caption").text(capt))
                                        ) // end append thumbnail
                divportf.append(divportfinner)
        }) // end each img
        $(this).replaceWith(divportf) // replace whole p or li with portfolio. 
     }   // end if regexp
 })   // end each p

//===================================================================== Carousel

  $("p, li").each(function(){
    //alert($(this).text())
    if ($(this).text().match(/^\$carr/)) { 
        
        var newcarr = function(){
            var num = parseInt(prefcarr.split('carousel')[1])+1
            var incremcarr = 'carousel'+num ;
            prefcarr = incremcarr ;
            return incremcarr
          }
        
        var namecarr = $(this).text().split(/^\$carr/)[1].split('\n')[0].trim() || 'default'
        if (namecarr=='default'){
              namecarr=newcarr()
          }
        var divcarr = $('<div/>').addClass("carousel slide")
                                 .attr('id',namecarr)
        var divcarrinner = $('<div/>').addClass("carousel-inner").attr('role','listbox')
        //======================== go to previous
        var aprev = $('<a/>').addClass("left carousel-control")
                             .attr('role','button')
                             .attr('data-slide','prev')
                             .attr('href','#'+namecarr)
            aprev.text('<').css({"font-size": "20px"})
                         
        //======================= go to next
        var anext = $('<a/>').addClass("right carousel-control")
                 .attr('role','button')
                 .attr('data-slide','next')
                 .attr('href','#'+namecarr)
            anext.text('>').css({"font-size": "20px"})

        //======================= partial elements
        $(this).children('img').each(function(i){
    
            var divitem = $('<div/>').addClass("item")
                           .append($(this)
                                .attr('width','460')
                                .attr('height','365')
                           ) // end append
            if (i == 0){divitem.addClass("active")}
            divcarrinner.append(divitem) // end append
            }) // end each
        //=========================  make the whole div.
        divcarr.append(divcarrinner.append(aprev).append(anext)) 
        $(this).replaceWith(divcarr)
      } // end if regexp
    }) // end each p

//===================================================================== retrieving config param

    $("p").each(function(){   // correction if there is no line feeding after each parameter. 
        if ($(this).text().match(/^§/)) {              
            var txtsplit = $(this).text().split(/§/).slice(1)
            for (i in txtsplit){
                $('body').prepend($('<p/>').text('§'+txtsplit[i])) 
                $(this).hide()
            }   // end for
            $(this).remove() // remove the <p> block containign the parameters, only separated <p>
        } // end if
      }); // end each

    //============================ Load the parameters

    $("p").each(function() {          // Need to be placed before position in TOC.                       
        for (elem in param){
            //alert($(this).text())
            if ($(this).text().match(param[elem]['reg']) ){     // finds loading parameters
                var interm = $(this).text().split(param[elem]['cut'])[1]
                var newtag = $('<p/>').text('')
                $(this).replaceWith(newtag)     // remove text of the optional parameters
                param[elem]['var'] = interm.trim()    // retrieve the value of parameters in the dic param
               }// end if
        } // end for
    }); // end each

 //===================================================================== Navbar menu
   
   /*
   usage : $menu toto:hash 
            toto is the name in the menu    
            hash is the hyperlink.
   */   

    var lmenu = param['menu_list']['var'].split(/\s+/)
    var ul = $('<ul/>').addClass("nav navbar-nav")
    for (i in lmenu){
        var name = lmenu[i].split(':')[0]
        var href = lmenu[i].split(':')[1]
        ul.append($('<li/>').append($('<a/>').text(name).attr('href',href)))
       } // end for
    $('.navbar-inner').children().append(ul)
              
//=====================================================================  Dates

    /*
    eg : 12/7/1974 
    the date is recognized and integrated in the TOC.
    */
    
    $("p").each(function() { 
      if ($(this).html().match(reg_date)){
                $(this).replaceWith(function(){     // Replacing dates with p in date with h2 and 
                    var h1prev = $(this).prev("h1").text()
                    var dateh2 = $('<h2/>').text($(this).text()).addClass('date')
                    return dateh2; 
                   }) // end replaceWith
               } // end if
      }); // end each

//=====================================================================   Position in TOC.

    /*
    The current selected part of the document is indicated my a bigger police in the TOC. 
    */

    var newhtml = ''
    var list_split_h1 = $('#content').html().split('<h1')  // insert div for following position in toc
    for (i in list_split_h1){
        if ((i>=1)&(i<list_split_h1.length)){
            newhtml += '<div class="section" id="'+i+'">\n<h1'+ list_split_h1[i] + '</div>\n'
            }
        } // end for
    $('#content').html(newhtml)

//=====================================================================   line symbolic removal.

    /*
    Instead of writing tildes, just write %%% at the end of the line. 
    */

    var regcbarree = /[A-Za-z0-9\.\'\s\u0080-\u00FF]*\%\%\%/g  // replace %%% by deleted text. 
    var htm = $('#content').html()  
    var m = htm.replace(regcbarree,function(content){
        var barr = content.split('%%%')[0].trim()
        var barrcorr = '<del>'+barr+'</del>'
        return barrcorr
        }) // end replace
    $('#content').html(m) 

//=====================================================================  Tooltips

    /*
    Tooltips are added by using curly brackets at the end of the line. 
    eg: # Title{This is a title}
    */
    
    for (i=0; i<4; i++){     // Tooltips, iteration for nested list
        $("li, h1, h2, h3, h4").each(function(){     // Tooltips for h1, h2, h3, h4 and li
            var text = $(this).html().split('\n')[0]
            var reg_tooltip = /\{.*\}/
            if (text.match(reg_tooltip)){
                $(this).attr('title', text.match(reg_tooltip)[0].slice(1,-1)) // add the attribute title
                var newhtm = $(this).html().replace(reg_tooltip, ' ') // remove the brackets
                $(this).html(newhtm)
                } // end match
            })
        }

//===================================================================== Input
    
    /*
    Add input
        * button with $input b value 
        * input form with $input i value 
    */

    $('p').each( function(){
        var reginp = /^\$input\s*.*/
        var txt = $(this).text()
        var txtm = txt.match(reginp)
        var kind = {'b':'button', 'i':'input'}
        if (txtm){
            var arg = txtm[0].split('$input')[1].trim()
            var tinp = arg.split(/\s+/)[0]
            var val = arg.split(/\s+/)[1]
            var inpbutt = '<input type="'+ kind[tinp] +'" value="'+ val +'" />'
            var sub = $('<form/>').append(inpbutt)
            $(this).replaceWith(sub)
           }
        })

//===================================================================== TOC

    /*
    Table of Contents
    It sums up the h1, h2 and h3 tags in a movable window with hyperlinks. 
    */

    //alert(param['notoc']['var'])
    if(param['notoc']['var'] == false){
        $('body').prepend($('<div/>').addClass('onside').attr('id',"toc"))     // adds the Table of Contents at the beginning
    }
    
    $('.onside').css({'background-color' : param['color_toc']['var']})    // modifying backgnd color for TOC
    
    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);
    $('#toc').draggable() // make the toc draggable with jquery-ui widget draggable. 
    // read all the headers and make the TOC (with ref) and the id names
    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
        var nameh = elems[i].innerHTML.trim().split(reg_id)[0];
        elems[i].id = nameh; 

        //===================================================================== H1
        
        if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H1'){    // if H1                    
            var nameh1 = nameh
            var li1 = $("<li/>");
            ul1.append(li1);
            var ul2 = $("<ul/>").addClass('lev1');                     // second levels with class
            li1.append($('<a/>').attr('href', namehhref).css({'color': 'black'}).html(nameh)
                         .append($('<span/>').text(" [-]").addClass('li_h2'))) // en append ul
            li1.append(ul2);
        } // end if H1
        
        //===================================================================== H2
        
        else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H2'){ // if H2
            elems[i].id = nameh1 +'_'+ nameh;                               // makes an id for H2
            var nameh2 = elems[i].id
            var namehhref = '#' + nameh2;
            var li2 = $("<li/>");
            ul2.append(li2);
            var ul3 = $("<ul/>").addClass('lev2'); 
            li2.append($('<a/>').attr('href', namehhref).html(nameh)
                                .append($('<span/>').text(" [-]").addClass('li_h3'))) // end of li
                .css({'list-style': 'square inside','line-height': '20px'}) // end append li2
            li2.append(ul3)
            } // end else if H2
            
        //===================================================================== H3
        
        else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H3'){
            elems[i].id = nameh2 +'_'+ nameh;                               // makes an id for H3
            var nameh3 = elems[i].id
            var namehhref = '#'+nameh3;
            var li3 = $("<li/>");
            ul3.append(li3);
            //var ul4 = $("<ul/>").addClass('lev3'); 
            li3.append($('<a/>').attr('href', namehhref).html(nameh).addClass(nameh)) // end of li
                .css({'list-style': 'circle inside','line-height': '20px'}) // end append li3
            } // end else if H3
       }                                                                   // end for elems

//===================================================================== Glue elsewhere

    $("li").each(function(){                // plugin list from one place to another..
         var htm = $(this).html();
         if (htm.split('\n')[0].match(/@@\w+/)){
            var htmnew = htm.replace(/@@\w+/, '')
            copy = $(this).clone()
            copy.html(htmnew)
            $(this).html(htmnew)
            $("li").each(function(){ //
                var htm = $(this).html();
                if (htm.split('\n')[0].match(/\s*\w+@@/)){
                    var htmnew = htm.replace(/\s*\w+@@/, '')
                    $(this).html(htmnew)
                    $(this).append(copy)
                } // end if
            }) // end each
        }// end if
     })// end each

//===================================================================== Folding videos

    /*
    Implements the possibility to fold videos in a list. Behaviour by default. 
    */

    $('a').each(function(){            // modifying videos for permitting folded list mechanism.
            if ($(this).text().match(';;')){    
                var tlist = $(this).text().split(';;')[0] +' ::'
                var underthis = $('<ul/>').append($('<li/>').append($(this).clone())) // put inside a list, inserted in ulvid
                var ulvid = $('<li/>').append(tlist).append(underthis) // <li> with text then clone
                $(this).parent().replaceWith(ulvid) // replace <a> with a <ul> containing <a>
             } // end if
        })

//===================================================================== Folding iframes and root mechanism (+++) with multiple iframes

    /*
    Implements the possibility to fold iframes in a list
    It also registers root for multiple files with +++ mechanism. 
    */

    $("p, li").each(function(){
        var childframe = []
        $(this).children('a').each(function(){            // modifying iframe for permitting folded list mechanism.
               if ($(this).text().match(',,')){      // control that we are dealing with iframe
                    var txt = $(this).text().split(',,')[0]
                    var par = $(this).parent()
                    //================================== register root path for iframe
                    if (par.html().match(/\+\+\+\.*/)) {  
                        root = par.html().match(/\+\+\+.*/)[0].split(/\s/)[1] 
                        oldhref = $(this).attr('href') 
                        $(this).attr('href', root + '/' + oldhref) // setting the new path with root
                        }
                    var ifhref =  '<a href="'+ $(this).attr('href') + '">' + txt + '</a>' 
                    var tlist = ifhref+ ' ::'
                    var underthis = $('<ul/>').append($('<li/>').append($(this).clone())) // put inside a list
                    var ulframe = $('<li/>').append(tlist).append(underthis).addClass('iframe')  // insert class iframe
                    //==================================  root path 
                    if (par.html().match(/\+\+\+\.*/)) { 
                        var titleli = $('<li/>').append(tit ).append($('<ul/>').append(ulframe))                   
                        childframe.push(ulframe) // keep in a list
                        }
                    //====================================== no root path 
                    else{ par.replaceWith(ulframe)  // replace <a> parent with a <ul><li> containing <a>
                        }
               } // end if match ,,
            }) // end each a
            if (childframe.length> 0){
                var ul = $('<ul/>')
                for (i in childframe){
                    ul.append(childframe[i]) // adding each iframe inside a list 
                  }// end for
                var tit = $(this).html().split(/\n/)[0] // Title of the parent
                var newlistframe = $('<li/>').append(tit).append(ul)
                $(this).replaceWith(newlistframe) // replace  parent with a list containing the iframes
            } // end if childframe.length> 0
     }) // end each p, li
    
//===================================================================== Folding lists, first step

    /*
    Implements the possibility to fold lists. 
    Go to sublevels.  
    It is the first processing step. Insert :: etc.. 
    */

    $("li").each(function(i){    // need to be placed before  $("a").click    
        var htm = $(this).html(); var childr = $(this).children('ul') // closing list when it finds :: in the code
        if(htm.split('\n')[0].search('::')!=-1){ 
                childr.toggle();                // close the sub lists 
                childr.css({'color': param['color_sublist']['var']})   // change color children
                $('<a/>').append($('<span/>').text(" [-]").addClass('::'))
                         .insertBefore(childr)
            } // end if 
        }); // end each

//=====================================================================  Folding lists, second step

    /*
    Implements the possibility to fold lists. 
    Go to sublevels.  
    It is the second processing step. 
    */

    $("H1, H2, p, a, li").each(function(){       // insertion of <p> with id in tag <a>
        if($(this).html().split('\n')[0].search(reg_id)!=-1){
            match_id = $(this).html().match(reg_id)[0]
            var idslice = match_id.slice(2,-2)
            var text = $(this).html().replace(match_id,"")
            $(this).html(text);
            if ($(this).prop("tagName")=='LI'){
                if ($(this).children('a').length >0){
                    $(this).children('ul').prepend($("<a/>").attr("id", idslice))
                    } // yet existing <a> for folding list.
                else{$("<a/>").attr("id", idslice).insertBefore($(this).children('ul'))} // no  <a> for folding list.
                }
            else{$("<p/>").attr("id", idslice).insertBefore($(this))} // general case, insert <p> before the tag
            }// end if
        }); // each
    $('ul').each(function (){  // remove the :: (closing list sign)
            if ($(this).find("*").hasClass('::')){
                var html = $(this).html().replace(/\:\:[\s\w\-]*\<a\>/g,'\<a\>')
                $(this).html(html)
            }
          } // end function after each
        )// end each
    $('ul.lev1').toggle();                          //  close level 1 in TOC
    $('ul.lev2').toggle();                          //  close level 2 in TOC

//===================================================================== key actions
    
    /*
    Implements action from keys
    h : show the help
    a : make sliders appearing
    
    */

    $(document).keydown(function(event){

        if(event.keyCode == "s".charCodeAt(0)-32 && statekey == 1){   // Toggle syntax informations
            $('#syntax').toggle()
          } // end if key code
        
          if(event.keyCode == "k".charCodeAt(0)-32 && statekey == 1){   // Toggle keys informations
            $('#keys').toggle()
            } // end if key code

        if(event.keyCode == "h".charCodeAt(0)-32){    // "h", key for help documentation
            if (param['help']['var'] != false){
                $('.alertify .alert > *').css({'text-align':'left'});
                alertify.alert(simple_md(help))
                }
          } // end if key code

        if(event.keyCode == "q".charCodeAt(0)-32){  // "q" key for showing sliders
            $("a").each(function(){ 
                  if ($(this).prop('id').match(/slider_\d*/)){
                      $(this).toggle()
                  } // end if
                }); // each
            } // end if key code
        if(event.keyCode == param['toggle_hide']['var'].charCodeAt(0)-32){  // hiding text key defined in the parameters
            $("li").each(function(){ 
                if ($(this).hasClass('^^')){
                    $(this).toggle()
                } // end if
              }); // each
          }// end if key code
       if(event.keyCode == 'd'.charCodeAt(0)-32 && statekey == 1){  // stop draggable plot
            $("div").each(function(){ 
                if ($(this).hasClass('chart') || $(this).hasClass('keys')|| $(this).hasClass('toc')){
                  $(this).draggable('destroy')
              } // end if
            }); // each
          }// end if key code
    
      if(event.keyCode == 'r'.charCodeAt(0)-32 && statekey == 1){  // stop draggable plot
           $("div").each(function(){ 
               if ($(this).hasClass('chart') || $(this).hasClass('keys')|| $(this).hasClass('toc')){
                 $(this).resize()
             } // end if
           }); // each
         }// end if key code
    
        })

//===================================================================== 

    var sel = ['§§'] // ';;',
    var debend = { ',,' : {'color':'#ff0066'},
                   ';;' : {'deb' : '<iframe width='+'"' + param['vid_width']['var'] + '"' + 'height="315" src="', 'end' : '" frameborder="0" allowfullscreen></iframe>','color':'#cc99ff'},
                   '§§': {'deb' : '<object width='+'"' + param['pdf_width']['var'] + '"' + ' height="500" type="application/pdf" data="' , 'end' : '"></object>', 'color':'#ff6600'}}

//=====================================================================   No video
    
    /*
    Prevents the insertion of videos from the document parameters
    */
    
    $("p, li").each(function(){
        var textp = $(this).text()
         if (textp.match('§novideo')){ 
             $(this).hide() 
             if (textp.trim() == '§novideo'){  // hides novideo
                sel = ['§§'] // restricting the treatment to pdfs..
                $("a").each(function(){ // removing ;;
                    var texta = $(this).text()
                    if (texta.search(';;') != -1){
                        $(this).text(texta.replace(';;',''))
                               .css({'color': debend[';;']['color']}) // changes color for pdfs and videos
                        } // end if == 
                    }) // end a.each
            } // end if match
         }// end if novideo
    })  // end each 

//===================================================================== No iframe
    /*
    Prevents the insertion of iframes from the document parameters
    */

    $("p, li").each(function(){
        var textp = $(this).text()
         var regnoifr = '§noiframe'
         if (textp.match(regnoifr)){ 
             $(this).hide() 
             if (textp.trim() == regnoifr){  // hides novideo
                $("a").each(function(){ // removing ;;
                    var texta = $(this).text()
                    if (texta.search(',,') != -1){
                        $(this).text(texta.replace(',,',''))
                           .css({'color': debend[',,']['color']})
                        } // end if == 
                    }) // end a.each
            } // end if match
         }// end if noiframe
    })  // end each 

//===================================================================== // taking href with blanks

    $("p, li").each(function(){ 
         var textp = $(this).text()
         if (textp.match(reg_hyper)){    // search for format [blabla](addr blabla)
             var text1 = textp.match(reg_brack)[0].slice(1,-1)    // takes [blabla]
             var text2 = textp.match(reg_parent)[0].slice(1,-1)    // takes (addr blabla)
             var newtag = $('<a/>').text(text1).attr('href',text2)
             if ($(this).prop('tagName')== 'LI'){var newtag = $('<li/>').append(newtag)}    // correction of link to local file.
             if ($(this).prop('tagName')== 'P'){var newtag = $('<p/>').append(newtag)}   // correction to avoid gluing lines.. 
             $(this).replaceWith(newtag) // Replace the original tag
            }// end if
       })  // end each 
       
    var maketag = function(self, deb, end, select){ // makes the tags for pdfs and videos
        patt = {';;' : ["watch?v=", "embed/"], '§§' : ["none", "none"]}
        var tag = $("<ul/>").append($("<li/>")
                            .append(deb+self.attr('href')
                            .replace(patt[select][0], patt[select][1])+end)) // make doc                                    
        var text = self.text().replace(select,'')
        $('<a/>').text(text).append($('<a/>').append($('<span/>').text( " [-]").addClass(select)))
                 .insertBefore(self).css({'color':debend[select]['color']})
        return tag
    }
    
    $("a").each(function(){  // Deals with videos and pdfs
         for (i in sel){
             if($(this).text().search(sel[i]) != -1){
                   var obj = maketag($(this), debend[sel[i]]['deb'], debend[sel[i]]['end'], sel[i]) // makes the tag.
                   $(this).replaceWith(obj)
                   obj.toggle() // hide 
                 } // end if
              }// end for
         }); // end each

//=====================================================================  Toggle ;; and §§

    /*
    Toggle pdf and videos for closing the associated lists.
    */

    $("a").click(function (evt) {  
        var evtc = evt.target.className;              
        if(evtc == ';;' | evtc == '§§') {      // toggle 
            $(this).parent().next().toggle(); // if click, activate next <ul>
            } // end if event      
        });// end click

//=====================================================================  Post it

    /*
    Insert draggable postits.
    */

    $("p").each(function(){ // POST'IT
             var html = $(this).html()
             if (html.match(/^\$post\s*/)){
                 var newtag = $('<div/>').html(html.split('$post')[1]).addClass('postit').draggable()
                 $(this).replaceWith(newtag)
                }// end if
        })

//=====================================================================  Plot
    
    /*
    Insert a plot made with d3.js from given parameters. 
    */

    $("p").each(function(){ // detect plot and apply plot function..
         var text = $(this).text()
         if (text.match(/^\$plot\s*/)){
                 var txt = text.split(/\s+/)
                 var id = txt[1].trim()
                 var addr = txt[2].trim()
                 var xmin = parseFloat(txt[3]); var xmax = parseFloat(txt[4])
                 var ymin = parseFloat(txt[5]); var ymax = parseFloat(txt[6])
                 var title = txt[7].trim()
                 var xlabel = txt[8].trim()
                 var ylabel = txt[9].trim()
                 var col = txt[10].trim()
                 var newtag = $('<div/>').attr('id',id).attr('class','chart').draggable()
                 $(this).replaceWith(newtag)
                params = { "xlim": [xmin, xmax], "ylim": [ymin, ymax], "title": title,
                    "xlabel": xlabel, "ylabel": ylabel, "color": col, "fill":"#ffffff"}
                //alert(params.xlim + ' ' + params.ylim + ' ' + params.title)
                plot(id, addr, 'nolink',  params)

            }// end if
        })// end each

//=====================================================================  Hide list

    /*
    Making a hidden list with ^^
    */

    $("li").each(function(){                // hide lists
        var reg_hide = /\s*\^\^\s*/
         var htm = $(this).html()
         if (htm.match(reg_hide)){
            $(this).toggle().addClass('^^')
            var newhtm = htm.replace(reg_hide , '')
            $(this).html(newhtm)
            }// end if
    })// end each

//=====================================================================  Toggle titles and list

    $("a").click(function (evt) {                   // toggle for H1, H2, H3 etc..( has to be after hide lists)
        var evtc = evt.target.className;
        //alert(evtc)
        if(evtc == 'li_h1' | evtc == 'li_h2' | evtc == 'li_h3' | evtc == '::')  // open close list on click
            $(this).next().toggle();
        });// end click
        
//=====================================================================  Change size img 

    /*
    Give the possibility to change size of images, [img widthxheight](href)
    */
    
    $("img").each(function(){               // retrieve and change size images
            var reg_im = /\s*\d*x\d*\s*/
            if ($(this).attr('alt').match(reg_im)){
                var sizeim = $(this).attr('alt').match(reg_im)[0];
                $(this).attr('width',sizeim.split('x')[0]);
                $(this).attr('height',sizeim.split('x')[1])
            }
        })

//=====================================================================  Catption img 
    
    /*
    Adding caption to image with %caption%
    */

    $("img").each(function(){               // retrieve the caption and insert it under the image.
            var reg_caption = /\%.*\%/
            if ($(this).attr('alt').match(reg_caption)){ 
              var capt = $(this).attr('alt').match(reg_caption)[0].slice(1,-1);
              var captcl = capt.replace(/\s+/g, '')
              var caption = $('<figcaption/>').text(capt)
              $(this).wrap($('<figure/>').attr('class', captcl).css({'text-align': 'center'})) // center image with caption
              $('.'+captcl).append(caption)
            } // end if
        }) // end each
        
//=====================================================================  

 $('a').each(function(){

        //=====================================================================   Youtube

        if ($(this).text().match(';;')){      // replace the address with a div with 'youtube' class. 
            var id = $(this).attr('href').split('v=')[1].trim()
            var newtag = $('<div/>').addClass('youtube')
                   .css({'width': '500px', 'height': '281px'})
                   .attr('id', id)
            $(this).replaceWith(newtag) // replace the <a> with a <div> with class 'youtube'
         } // end if

        //=====================================================================   Insert iframe

        if  ($(this).text().match(',,')){       // insertion of iframes with regexp ',,' for inserting web pages
            var iframe_url = $(this).attr('href')
            var wid = (param['iframe_width']['var']).toString()  // width from configuration parameters
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': wid, 'height': '400' })
            var div = $('<div/>').css({'text-align':'center'})
            $(this).replaceWith(div.append(iframe)); // replace the <a> with a <div> with iframe.
        } // end if

        //=====================================================================   Local video

        if  ($(this).text().match('%%')){       // insert local video, works with Chrome
            var vid_url = $(this).attr('href')
            var vid = $('<video/>', {'frameborder': '0', 'src': vid_url, 'width': '600', 'height': '400' })
            vid .prop("controls",true);
            var div = $('<div/>').css({'text-align':'center'})
            var keeplink = $('<a/>').text($(this).text().split('%%')[0])
                                    .attr('href',$(this).attr('href'))
            keeplink.insertBefore($(this))
            $(this).replaceWith(div.append(vid)); 
        } // end if
 }) // end each

   //=====================================================================   Youtube

 $(".youtube").each(function() { // take the youtube class element and replace.. 
     $(this).css('background-image', 'url(http://img.youtube.com/vi/' + this.id + '/hqdefault.jpg)');
     // Overlay the Play icon to make it look like a video player
     $(this).append($('<div/>', {'class': 'play'}));
     $(document).delegate('#'+this.id, 'click', function() {
         // Create an iFrame with autoplay set to true
         var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
         if ($(this).data('params')) iframe_url+='&'+$(this).data('params');
         // The height and width of the iFrame should be the same as parent
         var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })
         var div = $('<div/>').css({'text-align':'center'})
         // Replace the YouTube thumbnail with YouTube HTML5 Player
         $(this).replaceWith(div.append(iframe));
     });
 });

//===================================================================== Close all the lists

  $(document).keydown(function(event){   
    /*
    Close all the lists 
    */
     if(event.keyCode == 27){ // Trigger statekeys with Escape
          statekey *= -1
         $('#esc').toggle()
        }
        if((event.keyCode == "l".charCodeAt(0)-32) && statekey == 1){  
                $('a > span').each(function(){
                  if ($(this).parent().next().css('display')=='block'){
                    if ($(this).parents('div').last().attr('id') != 'toc'){
                      $(this).trigger('click')
                    }
                  }
                } // end function
              ) //end each
           } // end if key code
     }) // end keydown

//===================================================================== 

     $("a").each(function(){                             // insert pdf from folder
         var txt = $(this).text()
         if (txt.match(reg_folder)){                     // check <<
            var txt_short = txt.split('<<')[0].trim()    // take the title
            var jsoname = 'json/' + txt_short + ".json"  // make the adress for the json
            $(this).text(txt_short)                      // remove << in the title
            alert(jsoname)
            pdf_folder = $('<div/>')                    // make a div for inserting the pdfs
            pdf_folder.insertAfter($(this))             // insert the idv after the initial element.
            $.getJSON(jsoname, function(result){
                for (i in result){                      // for each address in the json.. 
                    alert(result[i])
                var obj = $('<object/>').attr('data',result[i])
                                        .attr('type', "application/pdf")
                                        .attr('width',"100%")
                                        .attr('height',"100%")
                pdf_folder.append(obj)                  // append the obj to the div.
                } // end for
            }) // end get json
         }// end if 
     }) // end each

    $('#content').addClass('effect2')
    $('body').addClass('bodybgcol1')

    //===================================================================== syntax

    $('body').prepend($('<div/>').addClass('syntax').attr('id',"syntax")) 
    $('#syntax').html(simple_md(help)).toggle()
    $('#syntax').draggable()

    //===================================================================== keys

    $('body').prepend($('<div/>').addClass('keys').attr('id',"keys")) 
    $('#keys').html(simple_md(keys)).toggle()
    $('#keys').draggable()


    //===================================================================== esc

    $('body').prepend($('<div/>').addClass('esc').attr('id',"esc")) 
    $('#esc').toggle()

     //    }  // end if all loads done
     // },25); // end  setInterval(function() {}, time )

}// end maketoc  

/*=====================================================================
 ========================== End of maketoc =============================
===================================================================== */

registerKeyboardHandler = function(callback) {
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};

var plot = function(elemid, add_data, add_nodes_links, params){
    if (add_nodes_links != 'nolink'){
            queue() // important !!! need of d3.js v3 at least for using queue correctly
                .defer(d3.json, add_data)
                .defer(d3.json, add_nodes_links)
                .await(function(error, dataset, nodes_links){
                    new make_plot(elemid, dataset, nodes_links, params); 
                }); // end await
        } // if links
     else{
          queue() // important !!! need of d3.js v3 at least for using queue correctly
              .defer(d3.json, add_data)
              .await(function(error, dataset){
                  new make_plot(elemid, dataset, 'nolink', params); 
              }); // end await
      } // end else
    }

make_plot = function(elemid, dataset, nodes_links, params) {
  var self = this;
  
  this.id = elemid        // identity for the plot
  this.dataset = dataset
  this.nodes_links = nodes_links
  this.chart = document.getElementById(elemid);
  $('#' + elemid).draggable()
  this.params = params || {};
  this.xlim = this.params['xlim']  // xlim 
  this.ylim = this.params['ylim']  // ylim 
  this.xlabel = this.params['xlabel'] // xlabel
  this.ylabel = this.params['ylabel']  // ylabel
  this.title = this.params['title'] // title
  this.col = this.params['color'] || 'k'; // Color used for the line
  this.cx = this.chart.clientWidth; // chart width
  this.cy = this.chart.clientHeight; // chart height
  fillplot = this.params['fill'] || "#EEEEEE"
  var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
  // Interaction Parameters 
  this.show_circle = false; //
  this.moveaxis = false
  this.drag_zoom = false  // drag and mouse rolling zoom. 
  this.brush_active = false // brush tool for zoom
  this.list_domains = []
  this.zoom_margin = 20 // margin for dragging zoom 
  this.show_grid = true; // boolean for plotting the grid or not. 
  text_nb = 0
  list_txt = []
  this.insert_text = false // boolean for inserting text in the plot or not.
  this.zoomx = false // boolean for zoom only in x. 
  this.poszoom = 0   // index of the current zoom
  this.show_navig_plot = true;
  this.nbdecim = 3; // number of decimals
  this.zoom_direct = false;
  // Commands
  // Each commands executed is supposed to eliminates the other one in possible conflict.
  // * c : show the circles for modifying the plot
  // * b : mode brush
  // * q : makes a zoom in x.. 
  // * d : toggle for drag and zoom.
  
  var help_plot = function(){/*
  
   # Commands
   Each commands executed is supposed to eliminates the other ones in possible conflict.
   * c : show the circles for modifying the plot
   * b : zoom with brush
   * q : zoom in x with brush
   * d : toggle for drag and zoom.
   * x : move backward in the zoom
   * v : move forward in the zoom
   */}.toString().slice(14,-3)
  
  var tools = function(){/*
  
   # All tools
   Click on the tool
   * c : show the circles for modifying the plot
   * b : box zoom 
   * q : zoomx
   * d : toggle for drag and zoom.
   * x : move backward in the zoom
   * v : move forward in the zoom
   */}.toString().slice(14,-3)

  simple_md = function(text){          // mini markdown for the help
      var all_text = text.split('\n')
      var htm = $('<div/>')           // main html 
      var ul = $('<ul/>')             // preparing lists
      for (i in all_text){
          var text_insert = all_text[i].trim()    // cleaning
          if (all_text[i].match(/\s*\*/)){
              ul.append($('<li/>').text(text_insert.slice(1)))    // Make li
              }     // end if
          else if (all_text[i].match(/\s*\#/)){
              htm.append($('<h1/>').text(text_insert.slice(1)))    // Make h1
              }   // end if
          else{htm.append($('<p/>').text(text_insert)).css({'text-align':'left'})}
      }    // end for
      htm.append(ul); // Append the list at the end
      return htm.html()
  }     // end function

  var tr = function(w, h, ang){      // General translations and rotations in the svg
     ang = ang || 0
     return "translate(" + w + ","+ h + ") rotate(" + ang + ")"
      }

this.mousedownonelement = false;

window.getlocalmousecoord = function (svg, evt) {
    var pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var localpoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    localpoint.x = Math.round(localpoint.x);
    localpoint.y = Math.round(localpoint.y);
    return localpoint;
};

window.createtext = function (localpoint, svg, txt, cl, ang) { // Create editable text in the svg
    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    var textdiv = document.createElement("div");
    var svgtxt = txt ||  "Click to edit";
    var angle = ang || 0;
    var clss = cl || 'noclass'
    var textnode = document.createTextNode(svgtxt);
    textdiv.appendChild(textnode);
    textdiv.setAttribute("contentEditable", "true");   // Editable
    textdiv.setAttribute("width", "auto");
    textdiv.setAttribute("class", cl);
    textdiv.setAttribute("id", txt + self.id);   //+self.id
    myforeign.setAttribute("width", "100%");
    myforeign.setAttribute("height", "60px");
    myforeign.classList.add("foreign");                      //to make div fit text
    textdiv.classList.add("insideforeign");                   //to make div fit text
    textdiv.addEventListener("mousedown", elementMousedown, false);
    myforeign.setAttributeNS(null, "transform", "translate(" + localpoint.x + " " + localpoint.y + ") rotate(" + angle + ")");
    svg.appendChild(myforeign);
    myforeign.appendChild(textdiv);

}; // end createtext

function elementMousedown(evt) {
    self.mousedownonelement = true;
}

  this.add_html = function(node, htm, w, h, ang, width, height){ // adding html in the plot
      ww = width || 200;
      hh = height || 100;
      var htmnode = node.append('foreignObject')
          .attr("transform", tr(w-100, h, ang)) //-100
          .attr('width', ww)
          .attr('height', hh)
          .append("xhtml:body")
          .html(htm)
      return htmnode
      }
  
  var add_txt = function(label, w, h, ang, cl, W, H){    // adding text in the plot, position : (w, h), angle : ang
      var vv = document.getElementById('vis' + self.id);
      createtext({"x":w,"y":h}, vv, label, cl, ang, W, H)  
      }

  var add_txt_axis = function(label, w, h, ang, W, H){    // adding axis, (for Title and axis)
      add_txt(label, w, h, ang, 'axis_txt', W, H)  
      $('.axis_txt').addClass('axis')  
      return $('#' + label + self.id)  
      } 
          
  this.padding = {                                  // padding for the plot
     // "top":    this.title  ? 40 : 20,
     "top":    this.title  ? 80 : 20,
     "right":                 70,
     "bottom": this.xlabel ? 200 : 10,
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
  this.downx = Math.NaN;       // drag x-axis logic
  this.downy = Math.NaN;        // drag y-axis logic
  this.dragged = this.selected = null;
  
  this.line = d3.svg.line()                                      // defining line function
      .x(function(d, i) { return this.x(this.dataset[i].x); })
      .y(function(d, i) { return this.y(this.dataset[i].y); })
      .interpolate('linear')
      
  datacount = this.size.width/30;
  
  this.vis = d3.select(this.chart).append("svg") // Create the main svg 
      .attr("width",  this.cx)
      .attr("height", this.cy)
      .attr("id", "vis" + self.id)
      .append("g")
        .attr("transform", tr(this.padding.left, this.padding.top));

  this.plot = this.vis.append("rect")  // For pointer events
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .style("fill", fillplot) 
      .attr("pointer-events", "all")
      .attr('class', self.id)

  if (this.drag_zoom == true){                  // drag and zoom in the whole plot
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

  // add Chart Title
  if (this.title) {
        tit = add_txt_axis(this.title, this.size.width/2, 20) // label, w, h, ang, W, H
        tit.css({"font-family": "Times New Roman","font-size": "25px"}) //"dy":"-1em",
        }
  // add the x-axis label
  if (this.xlabel) {
      var xlab = add_txt_axis(this.xlabel, this.size.width/2+50, 1.35*this.size.height) // label, w, h, ang, W, H
          xlab.css({"font-family": "Times New Roman","font-size": "20px"}) //"dy":"2.4em", 
        }
  // add y-axis label
  if (this.ylabel) {
      var ylab = add_txt_axis(this.ylabel, 20, this.size.height, -90) // label, w, h, ang, W, H
          ylab.css({"font-family": "Times New Roman","font-size": "20px"})
        }
        
    this.set_view = function(extent){                      // set the view for a given extent (double list). 
          self.x1 = self.x.invert(extent[0][0]); self.x2 = self.x.invert(extent[1][0]) // x1, x2
          self.y1 = self.y.invert(extent[0][1]); self.y2 = self.y.invert(extent[1][1])  // y1, y2
          self.x.domain([self.x1, self.x2]);                     // set x domain
          self.y.domain([self.y1, self.y2]);                     // set y domain
          self.list_domains.push([[self.x1, self.x2], [self.y1, self.y2]])       // save views in history
       }
        
    self.set_view([[0,0],[this.size.width, this.size.height]]) // Save the first view in self.list_domains (Initialisation)
  
    this.redraw_all()();
    
    this.vis.append("svg") // line attached to svg block"viewBox
      .attr("top", 0)
      .attr("left", 0)
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .attr("viewBox", "0 0 "+this.size.width+" "+this.size.height)
      .attr("class", "line")
      .append("path")
          .attr("class", "line") // line above grid
          .attr("d", this.line(this.dataset))
          .style({stroke : colrs[this.col], fill : 'none','stroke-width' : '1.5px'})

    if (self.show_navig_plot){
              $('#' + elemid).css({'height':'650'})
              $('#vis' + elemid).attr('height',650)
          }
          else{
              $('#' + elemid).css({'height':'500'})
              $('#vis' + elemid).attr('height',500)
          }

    
    self.refresh_navig_plot() // navig plot above the line

  this.make_brush = function(){                // zoom box with brush tool
      //alert("make brush")
      self.brush = self.vis.append("g")
         .attr("class", "brush")
         .call(d3.svg.brush()
           .x(d3.scale.identity().domain([0, self.size.width]))
           .y(d3.scale.identity().domain([0, self.size.height])) 
           .on("brush", function() {
               extent = d3.event.target.extent();
               if (self.zoomx ==true){                // zoomx
                   d3.selectAll(".extent")
                        .attr('height', self.size.height)
                        .attr('y',0)
                    extent[0][1] = 0;
                    extent[1][1] = self.size.height;
                }
            }) // end on brush
           .on("brushend", function(){
                d3.selectAll(".zoom_interact").remove()
                self.poszoom = self.list_domains.length;
                if ($('#direct_zoom').prop('checked')){
                  self.direct_zoom = true;
                  zoom_in()   // at the end of the brush action make a zoom
                }
                else{
                    var rr = self.vis 
                    .append('rect') // rectangle inside the brush rectangle
                    .attr("x", extent[0][0]+self.zoom_margin/2)
                    .attr("y", extent[0][1]+self.zoom_margin/2)
                    .attr("width", function(){return Math.abs(extent[0][0]-extent[1][0])-self.zoom_margin})
                    .attr("height", function(){return Math.abs(extent[0][1]-extent[1][1])-self.zoom_margin})
                    .attr("class", "brush zoom_interact")
                    .style("stroke","red")
                    .style("fill","red")
                    .style('opacity', .15)
                    .on('click', function(){
                      self.direct_zoom = false; // no direct zoom
                      zoom_in()
                    }) // end on
                } // end else
               })  // end "brushend"
            ) // end call
        } // end make_brush

  this.new_view = function(view_coord){
          self.x.domain(view_coord[0]);
          self.y.domain(view_coord[1]);
          self.redraw_all()();
     }
     
  this.deactivate_all_not = function(avoid){  // deactivate all the tools but.. 
      if ((avoid != 'b') & (avoid != 'q') ){
          d3.selectAll(".brush").remove();  // deactivate brush
          self.brush_active = false;
        }
     if (avoid != 'i'){
         if (self.insert_text == true){
             $("#vis"+self.id).off('click');
         }
     }
  }
  
  var zoom_in = function(){ // zoom in for zoom_b and zoomx
      
      d3.selectAll(".zoom_interact").remove() // remove the additional zoom windows
      self.set_view(extent)      // change the view
      self.redraw_all()();    // redraw axis etc
      d3.selectAll(".brush").remove();
      self.make_brush()    // reimplement the brush tool
      self.redraw_all()();    // redraw axis etc
  }

  var keyev = function(key, event){
    //deactivate_all_not(key)
    return (event.keyCode == key.charCodeAt(0)-32 && event.shiftKey)
  }
  
  $(document).keydown(function(event){   
      if(keyev('t', event)){    // "h", key for tools documentation
              $('.alertify .alert > *').css({'text-align':'left'});
              alertify.alert(simple_md(tools))
        } // end if key code          
      if(keyev('h', event)){    // "h", key for help documentation
              $('.alertify .alert > *').css({'text-align':'left'});
              alertify.alert(simple_md(help_plot))
        } // end if key code
      if(keyev('c', event)){    // add and remove circles.. 
          self.show_circle = !self.show_circle;
          self.vis.selectAll('circle').remove()
          self.redraw_all()();
      } // end if keyev

      if(keyev('d', event)){         // select the brush tool
           self.deactivate_all_not('d')   // deactivate all the other tools
           self.drag_zoom = ! self.drag_zoom;                          // toggle drag_zoom
           self.redraw_all()();
          } // end if keyev
          
      if(keyev('n', event)){         // remove the navig board. 
          self.show_navig_plot = ! self.show_navig_plot
          if (self.show_navig_plot){
              $('#' + elemid).css({'height':'650'})
              $('#vis' + elemid).attr('height',650)
          }
          else{
              $('#' + elemid).css({'height':'500'})
              $('#vis' + elemid).attr('height',500)
          }
          
           self.redraw_all()();
          } // end if keyev

      if(keyev('g', event)){      //  activate deactivate the grid
          self.deactivate_all_not('g')   // deactivate all the other tools
          self.show_grid = ! self.show_grid;
          self.redraw_all()();
          }     // end if keyev

      if(keyev('q', event)){      //  activate deactivate the direct zoom
          alert($('#direct_zoom').prop('checked'))
          }     // end if keyev

  }) // end keydown
}; // end make_plot

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

make_plot.prototype.refresh_navig_plot = function() {
    var self = this;
    $('#navig_plot' + self.id).remove() // removing the menu

    self.menuplot(this.vis, this.add_html) // make the menu
    if (self.show_navig_plot == false){
        $('#navig_plot'+self.id).hide(); 
        }
    }

make_plot.prototype.update = function() {
    // update graph, axes, labels, circles..
    var self = this;
    var lines = this.vis.select("path").attr("d", this.line(this.dataset));
    self.refresh_navig_plot()   
    if (d3.event && d3.event.keyCode) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
    } // end if
}

make_plot.prototype.mousemove = function() { // handling mouse movements
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

make_plot.prototype.redraw_all = function() {         // redraw the whole plot
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
    var sz_txt_ticks = "14px"                   // size of ticks text
    var make_axes = function(nodename, selfax, trans, txt, ax1, ax2, valmax, stroke){  // grid
      var node = self.vis.selectAll(nodename)
        .data(selfax.ticks(10), String)
        .attr("transform", trans);
      node.select("text")
          .text(txt);
      var nodee = node.enter().insert("g", "a")
          .attr("class", ax1)
          .attr("transform", trans);
      nodee.append("line")                          // make the lines
            .attr("class", "grid "+self.id)
            .attr("stroke", stroke)
            .attr(ax2+"1", 0)
            .attr(ax2+"2", valmax);

    return [node, nodee]
    } // end make_axes
    var ticks_txt = function(node, ax, axpos, shift, txt){          // text for the axes
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
    gg = make_axes("g.x", self.x, tx, fx, 'x', 'y', self.size.height, stroke)
    gx = gg[0]; gxe = gg[1]
    ticks_txt(gxe, "y", self.size.height, "1em", fx)
    gx.exit().remove();
    // Regenerate y-ticks…
    gg = make_axes("g.y", self.y, ty, fy, 'y', 'x', self.size.width, stroke)
    gy = gg[0]; gye = gg[1]
    ticks_txt(gye,"x",-3,".35em",fy)
    gy.exit().remove();
    grid_dic = {'x2':{true:self.size.width, false:0}, 'y2':{true:self.size.height, false:0}}
    $('g.y line.grid').each(function(){$(this).attr("x2", grid_dic['x2'][self.show_grid])}) 
    $('g.x line.grid').each(function(){$(this).attr("y2", grid_dic['y2'][self.show_grid])}) 
    if (self.drag_zoom == true){
         self.plot
         .call(d3.behavior.zoom().x(self.x).y(self.y)
                                .on("zoom", self.redraw_all())
                                )}            // end if self.drag_zoom
    self.update();       // update the whole plot
  }  
}

function make_labels(svg, nodes_links, w, h) {
    var color = d3.scale.category20();
    

    var nodes = nodes_links.nodes
    var links = nodes_links.links
    var factx = 15
    var facty = 70
    var shift = 200
    nodes.forEach(function(data, i){
          data["x"] *= factx;
          data["y"] = data["y"]*facty+shift;
          data["fixed"] = true;
        })
    links.forEach(function(data, i){
          var n = nodes[links[i]["source"]]
          n["fixed"] = false                            // not fixed 
          n["name"] = parseFloat(n["x"]).toFixed(3)     // value of position
          n["y"] += -100                                // begin above.
        })
    var texts = svg.selectAll("text")
                    .data(nodes)
                    .enter()
                    .append("text")
                    .attr("fill", "black")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "10px")
                    .text(function(d) { 
                        return d.name; }); 
    //alert('before force')
    var force = d3.layout.force()
                    .nodes(nodes)
                    .links(links)
                    .size([w,h])
                    .linkDistance([10])
                    .charge([-200])
                    .gravity(0.1)
                    .start();
                    
                    
    /* Draw the edges/links between the nodes */
    //alert('before line')
    var edges = svg.selectAll("line")
                    .data(links)
                    .enter()
                    .append("line")
                    .style("stroke", "#ccc")
                    .style("stroke-width", 1)
                    .attr("marker-end", "url(#end)")
                    .attr("class","lll")
    //alert('before circle')     
             
    var nodes = svg.selectAll("circle")
                    .data(nodes)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("opacity", function(d,i) {if (d.fixed == false){return 0.8} else {return 0}})
                    .style("fill", function(d,i) { return color(i);})
                    .call(force.drag);
    //alert('run the force')
    force.on("tick", function() {
               edges.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
               nodes.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
               texts.attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                        });
               }); // End tick func
    }; //

make_plot.prototype.navig_button = function(func, glyph, arg, tooltip){
      self = this;
      navmenu = $('#navig_plot' + self.id) 
      if (glyph != null){
            navmenu.append($('<button/>').attr('title', tooltip)
                .append($('<span/>').attr('class', glyph))
              .click(function(){
                  if (arg != null){func(arg)} // code with glyphicon and arg
                  else{func()} // code with glyphicon without arg
              })
          ) // end append button
       } // end if glyph
      else{navmenu.append(func())} // code without glyphicon
    } // end navig_button

make_plot.prototype.menuplot = function(fig, add_html){
    self = this;

    // add_html(fig,'<div id="navig_plot'+self.id+'"'+' class ="infos"></div>', 320,-0, 0, 600, 300) // x, y, ang, w, h
    add_html(fig,'<div id="navig_plot'+self.id+'"'+' class ="navig_plot"></div>', 160, 400, 0, 375, 300) // x, y, ang, w, h
    
    show_poszoom = function(){  // show current zoom position in the list of saved zoomed
        var numtot = Math.max(1, self.list_domains.length)
        var pos = self.poszoom+1 // increment zoom position
        return $('<span/>').attr('id','poszoom').text(pos+'/'+numtot)  // return position with number total of zooms saved.
    }

    zoom_nav = function(dir){         // Zoom navigation
        if (dir == 'forward'){              //  Go to next zoom view
            var elem_next = self.list_domains[self.poszoom+1]
            if (self.poszoom != self.list_domains.length-1){self.poszoom += 1}
            self.new_view(elem_next)
            }
        else if (dir == 'back'){             //  Go to previous zoom view
            var elem_prec = self.list_domains[self.poszoom-1]
            if (self.poszoom != 0){self.poszoom += -1;}
            self.new_view(elem_prec)
            }
        else if (dir == 'home'){            //  Go to first view
            var elem_first = self.list_domains[0];
            self.new_view(elem_first);
            self.poszoom = 0;
            }
      } // end zoom_nav
    
    put_text = function(){
         self.insert_text = ! self.insert_text;
            $('#vis'+self.id).click(function (evt) {
                var svg = document.getElementById('vis' + self.id);
                var localpoint = getlocalmousecoord(svg, evt);
                if (!self.mousedownonelement) {
                    createtext(localpoint, svg); // insert text with mouse
                } else {
                    self.mousedownonelement = false;
                }
            }); // end vis click
            if (self.insert_text == false){
                $("#vis"+self.id).off('click');
                } // end if
            self.redraw_all()()
       }
    
    grid_on_off = function(){    // grid on/off
        self.deactivate_all_not('g')   // deactivate all the other tools
        self.show_grid = ! self.show_grid;
        self.redraw_all()();
        } // end grid_on_off
    
    brush_b = function(){ // zoom box
        if (self.brush_active == true){
            self.deactivate_all_not('b')           // deactivate all the other tools
            if (self.zoomx == true){self.zoomx = false} //alert("passing zoomx to false")
        }
        else {
            self.make_brush();
            self.brush_active = true;
            }
        } // end brush_b
    
    brush_q = function(){   // zoom only in x
        self.zoomx = ! self.zoomx;
        if (self.brush_active == true){
            self.deactivate_all_not('q')            // deactivate all the other tools
        }
        else{
            self.make_brush();
            self.brush_active = true;
            } 
        } // end brush_q
    go_home = function(){       // return to the first view
        zoom_nav('home')
        var numtot = Math.max(1, self.list_domains.length)
        var pos = 1
        $('#poszoom').text(pos+'/'+numtot)
    }
    
    drag_plot = function(){    // drag the plot
        self.deactivate_all_not('d')   // deactivate all the other tools
        self.drag_zoom = ! self.drag_zoom;     // toggle drag_zoom
        self.redraw_all()();
    }
    
    self.navig_button(put_text, "glyphicon glyphicon-pencil", null, 'add text')  // add text
    self.navig_button(grid_on_off, "glyphicon glyphicon-th", null, 'toggle the grid')   // toggle grid
    self.navig_button(brush_b, "glyphicon glyphicon-search", null, 'pass to zoom box') // zoom box
    self.navig_button(brush_q, "glyphicon glyphicon-pause", null, 'pass to zoom in x')  // zoomx
    self.navig_button(go_home, "glyphicon glyphicon-home", null, 'go to first zoom') // go to first zoom
    self.navig_button(drag_plot, "glyphicon glyphicon-move", null, 'drag the plot')   // drag the plot
    self.navig_button(zoom_nav, "glyphicon glyphicon-chevron-left", "back", 'got to previous zoom')    // go to previous zoom
    self.navig_button(zoom_nav, "glyphicon glyphicon-chevron-right", "forward", 'got to next zoom')   // go to next zoom
    self.navig_button(show_poszoom)                  // indicate where is the view in all the views
    //alert("menu_plot "+self.x1)
    $('#navig_plot'+self.id).append($('<div/>')
                                .append($('<span/>').text('x coord : '))
                                .append($('<input/>').attr("size","25px")
                                                     .val(self.x1.toFixed(self.nbdecim)+','+self.x2.toFixed(self.nbdecim))
                                        ) // end append input
                            ) // end append div
    $('#navig_plot'+self.id).append($('<div/>')
                                .append($('<span/>').text('y coord : '))
                                    .append($('<input/>').attr("size","25px")
                                                     .val(self.y1.toFixed(self.nbdecim)+','+self.y2.toFixed(self.nbdecim))
                                        ) // end append input
                            ) // end append div
    
    $('#navig_plot'+self.id).append($('<div/>').append($('<span/>').text('direct zoom'))
                                                .append($('<input/>').attr('type','checkbox').attr('id','direct_zoom')
                                        )// end append input
                            ) // end append div
     $('#navig_plot'+self.id)
    if (self.direct_zoom == true){$('#direct_zoom').prop('checked', true)} // checkbox true for direct zoom
    $(document).ready(function(){ // activates the tooltips
                $('[data-toggle="tooltip"]').tooltip(); 
            })
} // end menu_plot


var drag_slider = d3.behavior.drag()
    .origin(function(d) {  return d }) 
    .on("dragstart", dragstarted)
    .on("drag", function(d) {
        if (d.dir == "x"){
            d.action(); // 
            return d3.select(this).attr("cx", d.x  = d3.event.x);
            }
        else if (d.dir == "y"){
            $("#slider_value").html(d3.event.y);
            d.action();
            return d3.select(this).attr("cy", d.y  = d3.event.y);
            }
    })
    .on("dragend", dragended);

var slide = function(data, name_svg){ // Vertical or horizontal slider
    slider_line = function(data){
          var svg_slider_line = name_svg
            .selectAll("svg_slider_line")
            .data(data)
            .enter()
            .append("line")
            .attr('x1', function(d){return d.xbar}) // 
            .attr('y1', function(d){return d.ybar})
            .attr('x2', function(d){if ( d.dir=="x" ){ return d.slength + d.xbar } else { return d.xbar }}) // 
            .attr('y2', function(d){if ( d.dir=="y" ){ return d.slength + d.ybar } else { return d.ybar }})
            .attr('stroke', function(d){return d.col})
            .attr('stroke-width', '4px')
        }
    slider_button = function(data){ 
        var slider_butt = name_svg
          .selectAll("svg_slider_button")
          .data(data)
          .enter()
          .append("ellipse")       // attach an ellipse
          .attr("cx", function(d){return d.x})           // position the x-centre
          .attr("cy", function(d){return d.y})           // position the y-centre
          .attr("rx", 7)           // set the x radius
          .attr("ry", 7)           // set the y radius
          .attr("fill", function(d){return d.col})
          .attr("class", "slide")
          .call(drag_slider);
        }  
    slider_line(data);
    slider_button(data);
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragended(d){ d3.select(this).classed("dragging", false) }

//=====================================================================  position in TOC

function fixTitle() {
    $('div.section').each(function () {  // change fontsize with position in toc
        var $this = $(this);
        var offset = $this.offset().top;
        var scrollTop = $(window).scrollTop();
        if (scrollTop > offset) {
           var ind = $this.attr('id') 
           var origftsize = $('#toc').css("font-size")
           $('#toc li a').css("font-size", origftsize)
           $('#toc  li:nth-child(' + ind + ') > a').css("font-size", "150%")
        }
    });
}

//=====================================================================  click on tumbnail-> above zoom center

function zoomabove() {
        $("img").click(function(){
        $("#id_view_image").html("<img src='"+$(this).attr('src')+"' class='view_image_img'/>");
        $("#id_view_image_body").addClass("view_image_body");
        $("#id_view_image").addClass("view_image");
        $(".thumbnail").parent().css({'z-index':'-1'})
        $("#id_view_image").css({'z-index':'4'})
    });

    $("#id_view_image").click(function(){

        $("#id_view_image").css({'z-index':'-1'})
        $(".thumbnail").parent().css({'z-index':'4'})
        $("#id_view_image").html("");
        $("#id_view_image_body").removeClass("view_image_body");
        $("#id_view_image").removeClass("view_image");
    }); 

}

//===================================================================== Go to top

function gototop(){

   //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

}

//===================================================================== 

$(document).ready(function () {
    $(window).scroll(fixTitle);
    $('[data-toggle="tooltip"]').tooltip(); // activates the tooltips
    $('.carousel').carousel({ interval: false }) // removing automatic carousel
    zoomabove()
    gototop()
    var syntaxscroll = document.querySelector('#syntax');
    Ps.initialize(syntaxscroll);
    var tocscroll = document.querySelector('#toc');
    Ps.initialize(tocscroll);
    var keyscroll = document.querySelector('#keys');
    Ps.initialize(keyscroll);

});







