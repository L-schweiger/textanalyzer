package com.textanalyzer.textanalyzer.services;

import com.textanalyzer.textanalyzer.AnalysisModeEnum;

import java.util.HashMap;

public interface TextAnalyzerService {

    HashMap<String, Integer> analyzeText(String text, AnalysisModeEnum analysisMode);
}
