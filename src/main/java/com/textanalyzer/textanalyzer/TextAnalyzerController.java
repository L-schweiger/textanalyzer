package com.textanalyzer.textanalyzer;

import com.textanalyzer.textanalyzer.services.TextAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class TextAnalyzerController {

    @Autowired
    TextAnalyzerService textAnalyzerService;

    @PutMapping(value = "/analyzetext", produces = "application/json")
    public HashMap<String, Integer> analyzeText(@RequestBody String text, @RequestParam String analysisMode) {
        return textAnalyzerService.analyzeText(text, AnalysisModeEnum.valueOf(analysisMode));
    }
}
