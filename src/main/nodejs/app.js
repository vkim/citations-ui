var MongoClient = require('mongodb').MongoClient
    , format = require('util').format
    ,fs = require('fs')
    ,Q = require('q');

var csv = require("fast-csv");

var stream = fs.createReadStream("data.csv");

MongoClient.connect('mongodb://127.0.0.1:27017/cr', function(err, db) {
    if(err) throw err;

    var collection = db.collection('references');

    /**
     * If document is not exist then create empty "{}" one
     * @param source
     * @returns {*}
     */
    function getDocumentByDOI(source) {

        var deferred = Q.defer();

        collection.findOne({doi: source}, function(er, data) {

            console.log('Getting getDocumentByDOI: ' + source);

            if(data) {
                deferred.resolve(data);
            }
            else {
                var doc = {doi: source};
                saveOrUpdate(doc).then(function(e) {
                    deferred.resolve(e);
                });
            }
        });

        return deferred.promise;
    }

    /**
     * Search in main.forwards forward document if not exist then add to array
     *
     * @param main
     * @param forward
     */
    function addForwardTo(main, forward) {

        //if exist
        if(main.hasOwnProperty('forwards')){
            var forwards = main.forwards;
            if (forwards instanceof Array) {

                var idx = forwards.indexOf(forward._id);
                if(idx == -1) { //not in forwards
                    main.forwards.push(forward._id);
                }
            }
        }
        else {
            main.forwards = [(forward._id)];
        }
    }

    function addBackwardTo(main, backward) {

        if(main.hasOwnProperty('backwards')){
            var backwards = main.backwards;
            if (backwards instanceof Array) {

                var idx = backwards.indexOf(backward._id);
                if(idx == -1) { //not in forwards
                    main.backwards.push(backward._id);
                }
            }
        }
        else {
            main.backwards = [(backward._id)];
        }
    }

    function saveOrUpdate(doc) {
        var deferred = Q.defer();

        console.log('Trying to save entity: ' + JSON.stringify(doc));

        collection.save(doc, function(err, saved) {

            if( err || !saved ) {
                console.log("Entity not saved" + err);
            }
            else console.log("Entity saved");

            deferred.resolve(saved);
        });

        return deferred.promise;
    }


    var csvStream = csv({headers: true})
        .on("data", function(rec){ //for each rec : records

            setTimeout(function() {


                //    if(rec is forward) {
                if(rec && rec.citation != 'cited-by') {

                    Q.spread([getDocumentByDOI(rec.source), getDocumentByDOI(rec.ID)]
                        ,function(main_doc, forward_doc) {

                            console.log('Checking main and forward. main: ' + JSON.stringify(main_doc));

                            addForwardTo(main_doc, forward_doc);
                            addBackwardTo(forward_doc, main_doc);

                            /*console.log('Saving main: ' + JSON.stringify(main_doc));
                            console.log('Saving forward_doc: ' + JSON.stringify(forward_doc));*/

                            saveOrUpdate(main_doc);
                            saveOrUpdate(forward_doc);
                        })

                } else { // 2 -> 1

                    Q.spread([getDocumentByDOI(rec.source), getDocumentByDOI(rec.doi)]
                        ,function(main_doc, backward_doc) {

                            console.log('Checking main and forward. main - ' + main_doc);

                            addBackwardTo(main_doc, backward_doc);
                            addForwardTo(backward_doc, main_doc);

                            saveOrUpdate(main_doc);
                            saveOrUpdate(backward_doc);
                        });
                }
            },0);
        });

    stream.pipe(csvStream);

//    db.close();
});

    // Locate all the entries using find
    /*collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });*/
//});