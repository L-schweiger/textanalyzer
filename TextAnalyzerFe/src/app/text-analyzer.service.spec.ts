import { TestBed } from '@angular/core/testing';

import { TextAnalyzerService } from './text-analyzer.service';
import {AnalysisModeEnum} from "./text-analyer/analysis-mode.enum";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TextAnalyzerService]
    });
    service = TestBed.inject(TextAnalyzerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TextAnalyzerService]
    });
    service = TestBed.inject(TextAnalyzerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should analyze consonants offline', () => {
    const text = 'Hello World';
    const expectedResult = new Map([
      ['H', 1],
      ['L', 3],
      ['W', 1],
      ['R', 1],
      ['D', 1]
    ]);

    service.analyzeText(text, AnalysisModeEnum.CONSONANTS, false);

    service.analysis$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('should analyze vowels offline', () => {
    const text = 'Hello World';
    const expectedResult = new Map([
      ['E', 1],
      ['O', 2]
    ]);

    service.analyzeText(text, AnalysisModeEnum.VOWELS, false);

    service.analysis$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('should analyze consonants online', () => {
    const text = 'Hello World';
    const expectedResult = new Map([
      ['H', 1],
      ['L', 3],
      ['W', 1],
      ['R', 1],
      ['D', 1]
    ]);

    service.analyzeText(text, AnalysisModeEnum.CONSONANTS, true);

    const req = httpTestingController.expectOne('http://localhost:8080/api/analyzetext?analysisMode=CONSONANTS');
    expect(req.request.method).toEqual('PUT');
    req.flush(expectedResult);

    service.analysis$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('should analyze vowels online', () => {
    const text = 'Hello World';
    const expectedResult = new Map([
      ['E', 1],
      ['O', 2]
    ]);

    service.analyzeText(text, AnalysisModeEnum.VOWELS, true);

    const req = httpTestingController.expectOne('http://localhost:8080/api/analyzetext?analysisMode=VOWELS');
    expect(req.request.method).toEqual('PUT');
    req.flush(expectedResult);

    service.analysis$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });
});
