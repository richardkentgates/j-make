(function() {
    jMake = {};
    jMake.functions = {};
    jMake.functions.make = function(p,k){
        $.get(p, function(data, status){
            $(data).prependTo( "#" + k );
        });
    };
    jMake.functions.matchNode = function(e){
        jMake.nodeIdex= 0;
        while((e=e.previousElementSibling)!=null) ++i;
        return jMake.nodeIdex;
    };
    jMake.functions.strings = function(v,e){
        jMake.elements = document.createElement(v);
        e.appendChild(jMake.elements);
        jMake.key = v + '_' + jMake.functions.matchNode(jMake.elements);
        jMake.elements.id = jMake.key;
        jMake.elements.className = 'j-make';
        jMake.parentPathArray = $(jMake.elements).parents().map(function(i,mappedItem){
            if(mappedItem.id.length > 0){
              return mappedItem.id;
            } else {
                if(mappedItem.tagName.toLowerCase() !== 'html'){
                  return mappedItem.tagName;
                }
            }
        })
        .get();
        jMake.path = 'theme/' + jMake.parentPathArray.reverse().join("/").toLowerCase() + '/' + jMake.key;
        jMake.functions.make(jMake.path,jMake.key);
    };
    jMake.functions.arrays = function(v){
        if(jQuery.type(v) == 'array'){
            jMake.functions.j(v,jMake.elements);
        } else {
            alert('Invalid value: ' + jType + ' type');
        }
    };
    jMake.functions.j = function(d,e){
        $(d).each( function(key,val){
            if(jQuery.type(val) == 'string'){
                jMake.functions.strings(val,e);
            } else {
                jMake.functions.arrays(val);
            }
        });
    };
    document.addEventListener('readystatechange',function(){
        if (document.readyState == "complete") {
            $.getJSON("theme/body.json", function(data) {
                jMake.functions.j(data,document.body);
            });
        }
    });
})();