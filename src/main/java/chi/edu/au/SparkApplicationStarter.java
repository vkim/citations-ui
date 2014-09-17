package chi.edu.au;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

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

        post("/references", "application/json", (request, response) -> {

            JsonElement jsonElement = new JsonParser().parse(request.body());
            String citation = jsonElement.getAsJsonObject().get("citation").getAsString();

            String refs = "{}";
            try {
                refs = dao.getReferencesByCitation(citation);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return refs;
        });

        System.out.println("Initializing 2");
    }

}
