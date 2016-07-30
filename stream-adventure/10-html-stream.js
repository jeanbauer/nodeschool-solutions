/*
Your program will get some html written to stdin. Convert all the inner html to
upper-case for elements with a class name of "loud",
and pipe all the html to stdout.

You can use `trumpet` and `through2` to solve this adventure.

With `trumpet` you can create a transform stream from a css selector:

    const trumpet = require('trumpet');
    var fs = require('fs');
    var tr = trumpet();
    fs.createReadStream('input.html').pipe(tr);

    var stream = tr.select('.beep').createStream();

Now `stream` outputs all the inner html content at `'.beep'` and the data you
write to `stream` will appear as the new inner html content.

Make sure to `npm install trumpet through2` in the directory where your solution
file lives.
*/

const trumpet = require('trumpet');
const through = require('through');

const to_upper = function (buffer) {
  this.queue(buffer.toString().toUpperCase())
}

const tr = trumpet()
process.stdin.pipe(tr).pipe(process.stdout)

const stream = tr.select('.loud').createStream()
stream.pipe(through(to_upper)).pipe(stream)

/* Here's the reference solution: 

var trumpet = require('trumpet');
var through = require('through2');
var tr = trumpet();

var loud = tr.select('.loud').createStream();
loud.pipe(through(function (buf, _, next) {
    this.push(buf.toString().toUpperCase());
    next();
})).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout); */
