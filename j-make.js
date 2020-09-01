(function() {
    jMake = {};
    jMake.functions = {};
    jMake.functions.make = function(p){
        $.get(p, function(data, status){
            $(data).prependTo('*[data-path="' + p + '"]');
        });
    };
    jMake.functions.nodeTreeToArray = function(e){
        jMake.nodeTreeArray = Array();
        while(e=e.parentNode){
                if(!e.dataset.key){
                    break;
                } else {
                    jMake.nodeTreeArray.push(e.dataset.key);
                }
        }
        return jMake.nodeTreeArray;
    };
    jMake.functions.matchNode = function(e){
        jMake.nodeIndex= 0;
        while((e=e.previousElementSibling)!=null) ++jMake.nodeIndex;
        return jMake.nodeIndex;
    };
    jMake.functions.strings = function(v,e){
        jMake.element = document.createElement(v);
        e.appendChild(jMake.element);
        jMake.nodeTreeToArray = jMake.functions.nodeTreeToArray(jMake.element).reverse();
        jMake.matchNode = jMake.functions.matchNode(jMake.element);
        jMake.key = v + '_' + jMake.matchNode;
        jMake.element.dataset.key = jMake.key;
        jMake.element.className = 'j-make';
        if(jMake.nodeTreeToArray.length > 0){
            jMake.body = 'body/';
        } else {
            jMake.body = 'body';
        }
        jMake.element.dataset.path = jMake.body + jMake.nodeTreeToArray.join('/') + '/' + jMake.key;
        jMake.functions.make(jMake.element.dataset.path);
    };
    jMake.functions.arrays = function(v){
        if(jQuery.type(v) == 'array'){
            jMake.functions.j(v,jMake.element);
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
            $.getJSON("body.json", function(data) {
                jMake.functions.j(data,document.body);
            });
        }
    });
})();