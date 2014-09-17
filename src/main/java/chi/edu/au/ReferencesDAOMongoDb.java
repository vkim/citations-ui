package chi.edu.au;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.mongodb.*;
import org.bson.types.ObjectId;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

public class ReferencesDAOMongoDb implements ReferencesDAO {

    DBCollection references;

    public ReferencesDAOMongoDb() throws UnknownHostException {
        MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
        DB db = mongoClient.getDB("cr");

        references = db.getCollection("references");
    }

    @Override
    public String getReferencesByCitation(String citation) {

        System.out.println("getReferencesByCitation: " + citation);
        DBObject main = references.findOne(new BasicDBObject("citation", citation));

        if(main != null) {
            extractForwards(main);
            extractBackwards(main);

            return main.toString();
        }

        /*Gson gson = new GsonBuilder().create();
        gson.toJsonTree(flist).getAsJsonArray();*/


        return "{}";
    }

    private void extractForwards(DBObject main) {
        Object forwards = main.get("forwards");
        List<DBObject> flist = new ArrayList<>();
        if(forwards != null) {
            List<ObjectId> list = (List<ObjectId>) forwards;
            for(ObjectId o : list) {
                BasicDBObject query = new BasicDBObject();
                query.put("_id", o);
                DBObject item = references.findOne(query);
                if(item != null) flist.add(item);
            }
        }

        main.put("forwards", flist);
    }

    private void extractBackwards(DBObject main) {
        Object backwards = main.get("backwards");
        List<DBObject> blist = new ArrayList<>();
        if(backwards != null) {
            for(ObjectId o : (List<ObjectId>) backwards) {
                BasicDBObject query = new BasicDBObject();
                query.put("_id", o);
                DBObject item = references.findOne(query);
                if(item != null) blist.add(item);
            }
        }

        main.put("backwards", blist);
    }

    @Override
    public String getById(String id) {

        BasicDBObject query = new BasicDBObject();
        query.put("_id", new ObjectId(id));
        DBObject item = references.findOne(query);

        return item.toString();
    }
}
