package chi.edu.au;

import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Vitaliy on 29-Aug-14.
 */
public class AuthorsParser {

    public static List<String> parse(String subjectString) {

        List<String> matchList = new ArrayList<String>();
        Pattern regex = Pattern.compile("(\\[u(.*?)\\])");
        Pattern regex1 = Pattern.compile("u'(.*?)'(?:,\\s)*");
        Matcher regexMatcher = regex.matcher(subjectString);
        while (regexMatcher.find()) {
            System.out.println(String.format("Value: %s",  regexMatcher.group(1)));

            String group = regexMatcher.group(1);

            if(StringUtils.isNotBlank(group)) {

                StringBuffer buf = new StringBuffer();
                Matcher partsMatcher = regex1.matcher(group);
                while(partsMatcher.find()) {
//                    System.out.println(String.format("subs: %s",  partsMatcher.group(1)));
                    buf.append(partsMatcher.group(1)).append(" ");
                }

                if(buf.length() > 0) matchList.add(buf.toString());
            }
        }

        return matchList;
    }


}
