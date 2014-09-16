package chi.edu.au;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class AuthorsParserTest {

    @Test
    public void testParse() throws Exception {

        List<String> list = AuthorsParser.parse("[[u'Mikhail', u'N.', u'Matrosovich'], [u'Tatyana', u'Y.', u'Matrosovich']]");

        System.out.println(list);
        System.out.println(list.size());
    }
}