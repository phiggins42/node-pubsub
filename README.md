#### pubsub (lite)

A lightweight publish/subscribe API for Node.js

### Installation

    npm install pubsublite
    
### Documentation

Very simple API: if you want to "listen" to a topic, ``subscribe()``. Anyone who wants to say something can ``publish()``. Stop listening with ``unsubcribe()``

    var io = require("pubsublite");
    
    var subscriber = io.subscribe("/anything", function(data){
        console.log("someone said", data);
    });
    
    io.publish("/anything", ["Hello, PubSub!"]);
    io.unsubscribe(subscriber);
    io.publish("/anything", ["I don't think anyone is listening this time. But it doesn't matter. That's the point."]);
    
``publish()`` accepts a ``topic`` and an array of values to pass as ordered parameters to ``subscribe()d`` callbacks.

    io.subscribe("/foo/bar/baz", function(a, b, c, d, e, f){
        console.log(arguments);
    })
    
    io.publish("/foo/bar/baz", [1, 2, 3, 4, 5, 6, 7]);
    
No context manipulation has been included. Use ``Function.prototype.bind`` to scope your callbacks:

    var x = {
        y: 1
    };
    
    io.subscribe("/inc/xy", (function(){
        this.y++;
    }).bind(x));
    
    io.publish("/inc/xy", []);