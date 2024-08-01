import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {AnalysisModeEnum} from "./text-analyer/analysis-mode.enum";

@Injectable({
  providedIn: 'root'
})
export class TextAnalyzerService {
  private static readonly VOWELS = "AEIOU";
  private static readonly CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
  private analysisSubject = new BehaviorSubject<Map<string, number>|null>(null);
  public readonly analysis$ = this.analysisSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  analyzeText(text: string, analysisMode: AnalysisModeEnum, analyzeOnServer: boolean): void {
    analyzeOnServer ? this.analyzeTextOnline(text, analysisMode) : this.analyzeTextOffline(text, analysisMode);
  }

  private analyzeTextOnline(text: string, analysisMode: AnalysisModeEnum): void {
    const url = "http://localhost:8080/api/analyzetext";

    this.httpClient.put<Map<string, number>|null>(url, text,
      { params: { analysisMode: analysisMode.toString() }}).subscribe(result => {
      this.analysisSubject.next(result)
    }, error => {
        console.error('Error: ' + error.message);
      })
  }

  private analyzeTextOffline(text: string, analysisMode: AnalysisModeEnum): void {
    const result = new Map<string, number>;
    for (let char of text.toUpperCase()) {
      if ((analysisMode === AnalysisModeEnum.CONSONANTS && TextAnalyzerService.CONSONANTS.includes(char))
        || (analysisMode === AnalysisModeEnum.VOWELS && TextAnalyzerService.VOWELS.includes(char))) {
        result.has(char) ? result.set(char, result.get(char)! + 1) : result.set(char, 1);
      }
    }
    this.analysisSubject.next(result);
  }
}
