package chi.edu.au;

import static spark.Spark.*;

import spark.*;

import java.net.UnknownHostException;

public class Controller {

    public static void main(String[] args) throws UnknownHostException {

        new SparkApplicationStarter().init();
    }

}
