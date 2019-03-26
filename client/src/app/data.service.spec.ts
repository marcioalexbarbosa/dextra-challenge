import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  describe('#getValorLanche', () => {
    it('should return a non empty value', () => {
      const dummy = "10";
  
      service.getValorLanche('x-burguer').subscribe(valor => {
        expect(valor).toEqual(dummy);
      });
  
      const req = httpMock.expectOne(`http://localhost:3000/lanche/x-burguer`);
      expect(req.request.method).toBe("GET");
      req.flush(dummy);
    });
  });

  describe('#getLanches', () => {
    it('should return a non empty value', () => {
      const dummy = {'x-burguer': ['hamburguer', 'queijo']};
  
      service.getLanches().subscribe(valor => {
        expect(valor).toEqual(dummy);
      });
  
      const req = httpMock.expectOne(`http://localhost:3000/lanche`);
      expect(req.request.method).toBe("GET");
      req.flush(dummy);
    });
  });

  describe('#getIngredientes', () => {
    it('should return a non empty value', () => {
      const dummy = ['hamburguer', 'queijo', 'alface', 'ovo', 'bacon'];
  
      service.getIngredientes().subscribe(valor => {
        expect(valor).toEqual(dummy);
      });
  
      const req = httpMock.expectOne(`http://localhost:3000/ingrediente`);
      expect(req.request.method).toBe("GET");
      req.flush(dummy);
    });
  });

  describe('#getValorLancheComIngredientes', () => {
    it('should return a non empty value', () => {
      const dummy = "10";
  
      service.getValorLancheComIngredientes('x-burguer', ['alface']).subscribe(valor => {
        expect(valor).toEqual(dummy);
      });
  
      const req = httpMock.expectOne(`http://localhost:3000/lanche/x-burguer`);
      expect(req.request.method).toBe("POST");
      req.flush(dummy);
    });
  });

});
