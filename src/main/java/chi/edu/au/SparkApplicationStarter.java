package chi.edu.au;


import java.net.UnknownHostException;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.SparkBase.setPort;
import static spark.SparkBase.staticFileLocation;

public class SparkApplicationStarter implements spark.servlet.SparkApplication {


    ReferencesDAO dao;

    public SparkApplicationStarter() throws UnknownHostException {
        dao = new ReferencesDAOMongoDb();
    }


    @Override
    public void init() {

//        staticFileLocation("/public"); // Static files

        System.out.println("Initializing SPARK!!!!");
//        setPort(9090);
        System.out.println("Initializing 1");

        post("/references", "application/json", (request, response) -> {

            String citation = request.params(":citation");

            String refs = dao.getReferencesByCitation(citation);

            return refs;
        });

        System.out.println("Initializing 2");
    }

}
