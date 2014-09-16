package chi.edu.au;


import com.mongodb.*;
import org.bson.types.ObjectId;

import java.net.UnknownHostException;

public class ReferencesDAOMongoDb implements ReferencesDAO {

    DBCollection references;

    public ReferencesDAOMongoDb() throws UnknownHostException {
        MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
        DB db = mongoClient.getDB("cr");

        references = db.getCollection("references");
    }

    @Override
    public String getReferencesByCitation(String citation) {

        DBObject myDoc = references.findOne(new BasicDBObject("citation", citation));

        return myDoc.toString();
    }

    @Override
    public String getById(String id) {

        BasicDBObject query = new BasicDBObject();
        query.put("_id", new ObjectId(id));
        DBObject item = references.findOne(query);

        return item.toString();
    }
}
