package chi.edu.au;

/**
 * Created by Vitaliy on 13/09/2014.
 */
public interface ReferencesDAO {
    String getReferencesByCitation(String citation);

    String getById(String id);
}
