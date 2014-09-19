package chi.edu.au;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.*;
import java.net.UnknownHostException;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.SparkBase.setPort;
import static spark.SparkBase.staticFileLocation;

public class SparkApplicationStarter implements spark.servlet.SparkApplication {


    ReferencesDAO dao;
    final static String filesLocation = "/home/citations/";

    public SparkApplicationStarter() throws UnknownHostException {
        dao = new ReferencesDAOMongoDb();
    }


    @Override
    public void init() {

//        staticFileLocation("/public"); // Static files

        System.out.println("Initializing SPARK!!!!");
//        setPort(9090);

        post("/references", "application/json", (request, response) -> {

            StringBuffer jb = new StringBuffer();
            String line = null;
            try {
                BufferedReader reader = request.raw().getReader();
                while ((line = reader.readLine()) != null)
                    jb.append(line);
            } catch (Exception e) { /*report an error*/ }


            JsonElement jsonElement = new JsonParser().parse(jb.toString());
            String citation = jsonElement.getAsJsonObject().get("citation").getAsString();

            String refs = "{}";
            try {
                refs = dao.getReferencesByCitation(citation);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return refs;
        });

        get("/pdf/:source_file", (request, response) -> {

            String fileName = request.params(":source_file");

            File fullNameFile = new File(filesLocation + fileName);

            if(fullNameFile.exists()) {
                response.raw().setContentType("application/pdf");
                response.raw().addHeader("Content-Disposition", "attachment; filename=" + fileName);
                response.raw().setContentLength((int) fullNameFile.length());

                FileInputStream fileInputStream = null;
                try {
                    fileInputStream = new FileInputStream(fullNameFile);
                    OutputStream responseOutputStream = response.raw().getOutputStream();

                    int bytes;
                    while ((bytes = fileInputStream.read()) != -1) {
                        responseOutputStream.write(bytes);
                    }

                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        fileInputStream.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }

            return "";
        });

        System.out.println("Initializing 2");
    }

}
