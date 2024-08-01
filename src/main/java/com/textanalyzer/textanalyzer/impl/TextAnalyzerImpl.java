package com.textanalyzer.textanalyzer.impl;

import com.textanalyzer.textanalyzer.AnalysisModeEnum;
import com.textanalyzer.textanalyzer.services.TextAnalyzerService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
@Service
public class TextAnalyzerImpl implements TextAnalyzerService {

    private static final String CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
    private static final String VOWELS = "AEIOU";

    @Override
    public HashMap<String, Integer> analyzeText(String text, AnalysisModeEnum analysisMode)
    {
        HashMap<String, Integer> countedCharMap = new HashMap<>();

        if (text != null) {
            for (Character currentChar : text.toUpperCase().toCharArray())
            {
                if (AnalysisModeEnum.VOWELS.equals(analysisMode) && VOWELS.indexOf(currentChar) > -1)
                {
                    countedCharMap.merge(currentChar.toString(), 1, Integer::sum);
                }
                else if (AnalysisModeEnum.CONSONANTS.equals(analysisMode) && CONSONANTS.indexOf(currentChar) > -1)
                {
                    countedCharMap.merge(currentChar.toString(), 1, Integer::sum);
                }
            }
        }

        return countedCharMap;
    }
}
