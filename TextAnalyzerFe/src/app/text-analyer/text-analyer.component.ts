import {Component, OnDestroy, OnInit} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {TextAnalyzerService} from "../text-analyzer.service";
import {Subscription} from "rxjs";
import {AnalysisModeEnum} from "./analysis-mode.enum";

@Component({
  selector: 'app-text-analyer',
  templateUrl: './text-analyer.component.html',
  styleUrls: ['./text-analyer.component.css']
})
export class TextAnalyerComponent implements OnInit, OnDestroy {

  textAnalyzerGroup = this.nonNullableFormBuilder.group({
    text: ['', [Validators.required]],
    online: [false],
    analysisMode: [AnalysisModeEnum.CONSONANTS]
  });
  private textAnalysis$: Subscription|null = null;
  textAnalysisResult:  Map<string, number> | null = null;
  readonly AnalysisModeEnum: typeof AnalysisModeEnum = AnalysisModeEnum;

  constructor(private nonNullableFormBuilder: NonNullableFormBuilder,
              private textAnalyzerService: TextAnalyzerService) {
  }

  ngOnInit(): void {
    this.textAnalysis$ = this.textAnalyzerService.analysis$.subscribe(textAnalysisResult => {
      this.textAnalysisResult = textAnalysisResult;
    });
  }

  ngOnDestroy(): void {
    this.textAnalysis$?.unsubscribe();
  }

  analyzeText(): void {
    this.textAnalyzerService.analyzeText(this.textAnalyzerGroup.controls.text.getRawValue(),
      this.textAnalyzerGroup.controls.analysisMode.getRawValue(),
      this.textAnalyzerGroup.controls.online.getRawValue());
  }

}
