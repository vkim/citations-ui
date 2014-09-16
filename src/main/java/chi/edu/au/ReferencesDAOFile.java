package chi.edu.au;

import freemarker.template.Configuration;
import freemarker.template.Template;

import java.io.StringWriter;
import java.util.HashMap;

/**
 * Created by Vitaliy on 13/09/2014.
 */
public class ReferencesDAOFile implements ReferencesDAO {

    @Override
    public String getReferencesByCitation(String citation) {

        Configuration config = new Configuration();
        config.setClassForTemplateLoading(ReferencesDAOFile.class, "/");

        try {
            Template fileTemplate = config.getTemplate("data.ftl");
            StringWriter writer = new StringWriter();

            fileTemplate.process(new HashMap<String, Object>(), writer);

            return writer.toString();

        } catch (Exception e) {
            e.printStackTrace();
        }


        return "";
    }

    @Override
    public String getById(String id) {
        return null;
    }
}
