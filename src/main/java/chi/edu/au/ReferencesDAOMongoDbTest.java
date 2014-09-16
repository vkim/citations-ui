package chi.edu.au;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class ReferencesDAOMongoDbTest {

    ReferencesDAOMongoDb dao;

    @Before
    public void before() throws Exception {
        dao = new ReferencesDAOMongoDb();
    }

    @Test
    public void testGetReferencesByCitation() throws Exception {

        String citation = dao.getReferencesByCitation("Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269.");

        assertNotNull(citation);
    }

    @Test
    public void referenceShouldHaveForwardsAndBackwards() throws Exception {

        String citationStr = dao.getReferencesByCitation("Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269.");

        JsonParser jsonParser = new JsonParser();
        JsonObject jo = (JsonObject)jsonParser.parse(citationStr);

        JsonArray forwards = jo.getAsJsonArray("forwards");
        assertNotNull("should not be null", forwards);
        assertTrue(forwards.size() > 0);
    }

    @Test
    public void forwardsShouldExist() throws Exception {

        String citationStr = dao.getReferencesByCitation("Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269.");

        JsonParser jsonParser = new JsonParser();
        JsonObject jo = (JsonObject)jsonParser.parse(citationStr);

        JsonArray forwards = jo.getAsJsonArray("forwards");

        for(JsonElement id: forwards) {

            String reference = dao.getById(id.getAsJsonObject().get("$oid").getAsString());
            System.out.println("reference: " + reference);

            assertNotNull(reference);
        }

    }

}