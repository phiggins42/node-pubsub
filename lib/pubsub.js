/*

    mini node pub/sub impl. SO FUKIN HANDY - @phiggins
    
*/

var cache = {},
    
    subscribe = function(topic, cb){
        if(!cache[topic]){
            cache[topic] = [];
        }

        cache[topic].push(cb);
        return [topic, cb]
    },
    
    publish = function(topic, args){
        cache[topic] && cache[topic].forEach(function(cb){
            try{
                cb.apply(this, args);
            }catch(e){
                // console.log("exception caught publishing to:", topic, e);
            }
        });
    },
    
    unsubscribe = function(handle){
        var topic = handle[0];
        cache[topic] && cache[topic].forEach(function(cb, i){
            if(handle[1] == cb){
                cache[topic].splice(i, 1);
            }
        });
    }

exports.publish = publish;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;


