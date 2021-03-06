var MongoClient = require('mongodb').MongoClient
    , format = require('util').format
    ,fs = require('fs')
    ,Q = require('q');

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

        if(source == "NOT found in MAS") {

            saveOrUpdate({doi: "NOT found in MAS"}).then(function(e) {
                deferred.resolve(e);
            });
        }
        else {
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
        }

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

        collection.save(doc, function(err, saved) {

            if( err || !saved ) {
                console.log("Entity not saved" + err);
            }

            deferred.resolve(saved);
        });

        return deferred.promise;
    }

    var files = fs.readdirSync("../../../demo/");
    for(var i in files) {

        var stream = fs.createReadStream("../../../demo/" + files[i]);
        var sem = require('semaphore')(1)
        var csvStream = require("fast-csv")({headers: true})
            .on("data", function(rec){ //for each rec : records

                sem.take(function() {

                    //    if(rec is forward) {
                    if(rec && rec.relation != 'cited-by') {

                        Q.spread([getDocumentByDOI(rec.source), getDocumentByDOI(rec.ID)]
                            ,function(main_doc, forward_doc) {

                                addForwardTo(main_doc, forward_doc);
                                addBackwardTo(forward_doc, main_doc);

                                //populate details
                                forward_doc.citation = rec.citation;
                                forward_doc.title = rec.title;
                                forward_doc.authors = rec.authors;
                                forward_doc.journal = rec.journal;
                                forward_doc.year = rec.year;
                                forward_doc.fulltext_online_link = rec.fulltext_online_link;
                                forward_doc.fulltext_location = rec.fulltext_location;

                                Q.spread([saveOrUpdate(main_doc), saveOrUpdate(forward_doc)], function() {
                                    sem.leave();
                                });
                            })

                    } else { // 2 -> 1

                        Q.spread([getDocumentByDOI(rec.source), getDocumentByDOI(rec.ID)]
                            ,function(main_doc, backward_doc) {

                                addBackwardTo(main_doc, backward_doc);
                                addForwardTo(backward_doc, main_doc);

                                backward_doc.citation = rec.citation;
                                backward_doc.title = rec.title;
                                backward_doc.authors = rec.authors;
                                backward_doc.journal = rec.journal;
                                backward_doc.year = rec.year;
                                backward_doc.fulltext_online_link = rec.fulltext_online_link;
                                backward_doc.fulltext_location = rec.fulltext_location;

                                Q.spread([saveOrUpdate(main_doc), saveOrUpdate(backward_doc)], function() {
                                    sem.leave();
                                });
                            });
                    }
                });
            });
        stream.pipe(csvStream); /*.on('end', function () {
            semForFiles.leave();
         });;*/

//        console.log('file: ' + files[i]);
    }



//    db.close();
});

    // Locate all the entries using find
    /*collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });*/
//});